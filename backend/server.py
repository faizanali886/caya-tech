from dotenv import load_dotenv
from pathlib import Path
import os

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import logging
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from pydantic.functional_validators import BeforeValidator
from typing import List, Optional, Annotated, Any
from datetime import datetime, timezone, timedelta
import uuid
import re
import bcrypt
import jwt
from bson import ObjectId

# ---------------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


# ---------------------------------------------------------------------------
# Helpers: Mongo / ObjectId
# ---------------------------------------------------------------------------
PyObjectId = Annotated[str, BeforeValidator(str)]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def slugify(text: str) -> str:
    text = re.sub(r'[^a-zA-Z0-9\s-]', '', text or '').strip().lower()
    return re.sub(r'[\s_-]+', '-', text)[:80] or uuid.uuid4().hex[:8]


# ---------------------------------------------------------------------------
# Auth utilities
# ---------------------------------------------------------------------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id, "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SubmissionCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    form_type: str
    name: str
    email: EmailStr
    organization: Optional[str] = ""
    role: Optional[str] = ""
    phone: Optional[str] = ""
    subject: Optional[str] = ""
    message: Optional[str] = ""
    platform: Optional[str] = ""
    meta: Optional[dict] = Field(default_factory=dict)


class NewsletterCreate(BaseModel):
    email: EmailStr


class ArticleBase(BaseModel):
    title: str
    excerpt: Optional[str] = ""
    body: Optional[str] = ""
    category: Optional[str] = "Article"
    tags: List[str] = Field(default_factory=list)
    cover_image: Optional[str] = ""
    author: Optional[str] = "Caya Technologies"
    status: str = "published"  # draft | published


class ArticleCreate(ArticleBase):
    pass


# ---------------------------------------------------------------------------
# App / Router
# ---------------------------------------------------------------------------
app = FastAPI(title="Caya Technologies API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("caya")


# ----------------------------- Health --------------------------------------
@api_router.get("/")
async def root():
    return {"message": "Caya Technologies API", "status": "ok"}


# ----------------------------- Auth ----------------------------------------
@api_router.post("/auth/login")
async def login(payload: LoginRequest, request: Request):
    email = payload.email.lower().strip()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"

    # brute-force lockout: 5 failed attempts within 15 minutes
    window = datetime.now(timezone.utc) - timedelta(minutes=15)
    fails = await db.login_attempts.count_documents(
        {"identifier": identifier, "ts": {"$gte": window.isoformat()}})
    if fails >= 5:
        raise HTTPException(status_code=429, detail="Too many failed attempts. Please try again in 15 minutes.")

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        await db.login_attempts.insert_one({"identifier": identifier, "ts": now_iso()})
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_many({"identifier": identifier})
    token = create_access_token(str(user["_id"]), email)
    return {
        "token": token,
        "user": {"id": str(user["_id"]), "email": email,
                 "name": user.get("name", "Admin"), "role": user.get("role", "admin")},
    }


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return {"id": user["_id"], "email": user["email"],
            "name": user.get("name", "Admin"), "role": user.get("role", "admin")}


@api_router.post("/auth/logout")
async def logout(user: dict = Depends(get_current_user)):
    return {"message": "Logged out"}


# ----------------------------- Submissions ---------------------------------
RATE_WINDOW_SEC = 60
RATE_MAX = 8


async def rate_limited(ip: str, bucket: str) -> bool:
    cutoff = datetime.now(timezone.utc) - timedelta(seconds=RATE_WINDOW_SEC)
    count = await db.rate_events.count_documents(
        {"ip": ip, "bucket": bucket, "ts": {"$gte": cutoff.isoformat()}})
    await db.rate_events.insert_one({"ip": ip, "bucket": bucket, "ts": now_iso()})
    return count >= RATE_MAX


@api_router.post("/submissions")
async def create_submission(payload: SubmissionCreate, request: Request):
    ip = request.client.host if request.client else "unknown"
    if await rate_limited(ip, "submissions"):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again shortly.")
    # honeypot spam check
    if payload.meta and payload.meta.get("hp_field"):
        return {"id": "ok", "message": "Thank you. Our team will be in touch shortly."}
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    doc["read"] = False
    await db.submissions.insert_one(doc)
    logger.info(f"New submission ({payload.form_type}) from {payload.email}")
    return {"id": doc["id"], "message": "Thank you. Our team will be in touch shortly."}


@api_router.get("/submissions")
async def list_submissions(form_type: Optional[str] = None,
                           user: dict = Depends(get_current_user)):
    q = {}
    if form_type and form_type != "all":
        q["form_type"] = form_type
    docs = await db.submissions.find(q, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.patch("/submissions/{sid}/read")
async def mark_read(sid: str, user: dict = Depends(get_current_user)):
    await db.submissions.update_one({"id": sid}, {"$set": {"read": True}})
    return {"message": "ok"}


@api_router.delete("/submissions/{sid}")
async def delete_submission(sid: str, user: dict = Depends(get_current_user)):
    await db.submissions.delete_one({"id": sid})
    return {"message": "deleted"}


@api_router.get("/submissions/stats")
async def submission_stats(user: dict = Depends(get_current_user)):
    total = await db.submissions.count_documents({})
    unread = await db.submissions.count_documents({"read": False})
    subs = await db.newsletter.count_documents({})
    articles = await db.articles.count_documents({})
    return {"total": total, "unread": unread, "newsletter": subs, "articles": articles}


# ----------------------------- Newsletter ----------------------------------
@api_router.post("/newsletter")
async def newsletter(payload: NewsletterCreate, request: Request):
    ip = request.client.host if request.client else "unknown"
    if await rate_limited(ip, "newsletter"):
        raise HTTPException(status_code=429, detail="Too many requests.")
    email = payload.email.lower().strip()
    existing = await db.newsletter.find_one({"email": email})
    if existing:
        return {"message": "You're already subscribed."}
    await db.newsletter.insert_one({"id": str(uuid.uuid4()), "email": email, "created_at": now_iso()})
    return {"message": "Subscribed. Welcome to Caya Insights."}


@api_router.get("/newsletter")
async def list_newsletter(user: dict = Depends(get_current_user)):
    return await db.newsletter.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)


# ----------------------------- Articles (Insights) -------------------------
@api_router.get("/articles")
async def public_articles(category: Optional[str] = None, q: Optional[str] = None):
    query = {"status": "published"}
    if category and category != "All":
        query["category"] = category
    if q:
        query["$or"] = [
            {"title": {"$regex": q, "$options": "i"}},
            {"excerpt": {"$regex": q, "$options": "i"}},
            {"tags": {"$regex": q, "$options": "i"}},
        ]
    docs = await db.articles.find(query, {"_id": 0, "body": 0}).sort("created_at", -1).to_list(500)
    return docs


@api_router.get("/articles/{slug}")
async def get_article(slug: str):
    doc = await db.articles.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Article not found")
    return doc


@api_router.get("/admin/articles")
async def admin_articles(user: dict = Depends(get_current_user)):
    return await db.articles.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.post("/admin/articles")
async def create_article(payload: ArticleCreate, user: dict = Depends(get_current_user)):
    doc = payload.model_dump()
    base_slug = slugify(payload.title)
    slug = base_slug
    i = 1
    while await db.articles.find_one({"slug": slug}):
        slug = f"{base_slug}-{i}"
        i += 1
    doc.update({"id": str(uuid.uuid4()), "slug": slug,
                "created_at": now_iso(), "updated_at": now_iso()})
    await db.articles.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api_router.put("/admin/articles/{aid}")
async def update_article(aid: str, payload: ArticleCreate, user: dict = Depends(get_current_user)):
    existing = await db.articles.find_one({"id": aid})
    if not existing:
        raise HTTPException(status_code=404, detail="Article not found")
    update = payload.model_dump()
    update["updated_at"] = now_iso()
    await db.articles.update_one({"id": aid}, {"$set": update})
    doc = await db.articles.find_one({"id": aid}, {"_id": 0})
    return doc


@api_router.delete("/admin/articles/{aid}")
async def delete_article(aid: str, user: dict = Depends(get_current_user)):
    await db.articles.delete_one({"id": aid})
    return {"message": "deleted"}


# ----------------------------- Site Content (CMS key-value) -----------------
@api_router.get("/content/{key}")
async def get_content(key: str):
    doc = await db.site_content.find_one({"key": key}, {"_id": 0})
    return doc or {"key": key, "data": {}}


@api_router.put("/admin/content/{key}")
async def set_content(key: str, body: dict, user: dict = Depends(get_current_user)):
    await db.site_content.update_one(
        {"key": key}, {"$set": {"key": key, "data": body, "updated_at": now_iso()}}, upsert=True)
    return {"key": key, "data": body}


# ---------------------------------------------------------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Seed
# ---------------------------------------------------------------------------
SEED_ARTICLES = [
    {
        "title": "Why the Caribbean Needs Shared Digital Public Infrastructure",
        "excerpt": "A regional approach to identity, payments, and data exchange can unlock decades of compounding growth across island economies.",
        "category": "White Paper",
        "tags": ["DPI", "Policy", "Regional Integration"],
        "cover_image": "https://images.unsplash.com/photo-1621831337128-35676ca30868?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
    {
        "title": "Designing Responsible AI for Public Institutions",
        "excerpt": "Governance, transparency, and human oversight are the foundations of trustworthy government AI deployments.",
        "category": "Research",
        "tags": ["Nexus AI", "Governance", "Responsible AI"],
        "cover_image": "https://images.unsplash.com/photo-1653549893012-b8b4fbe97630?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
    {
        "title": "From Pilot to National Scale: A Digital Transformation Playbook",
        "excerpt": "How governments can move from isolated pilots to interoperable, citizen-centric services at national scale.",
        "category": "Guide",
        "tags": ["Government", "Implementation", "Coral DPI"],
        "cover_image": "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    },
]


async def seed():
    # indexes
    await db.users.create_index("email", unique=True)
    await db.submissions.create_index("created_at")
    await db.articles.create_index("slug", unique=True)
    await db.newsletter.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@cayatech.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "CayaAdmin2026!")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email, "password_hash": hash_password(admin_password),
            "name": "Caya Admin", "role": "admin", "created_at": now_iso(),
        })
        logger.info("Seeded admin user")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email},
                                  {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Updated admin password")

    if await db.articles.count_documents({}) == 0:
        for a in SEED_ARTICLES:
            doc = ArticleCreate(**a).model_dump()
            doc.update({"id": str(uuid.uuid4()), "slug": slugify(a["title"]),
                        "body": a["excerpt"] + "\n\nThis is placeholder long-form content for the Caya Insights knowledge centre. Replace via the CMS.",
                        "created_at": now_iso(), "updated_at": now_iso()})
            await db.articles.insert_one(doc)
        logger.info("Seeded articles")


@app.on_event("startup")
async def on_startup():
    await seed()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
