// Central content data for Caya Technologies website.
// Drives navigation, ecosystem map, platform pages, industries and government solutions.

import {
  Network, Brain, Sprout, HeartPulse, Wheat, CloudLightning, IdCard,
  Store, Activity, Palette, Landmark, GraduationCap, Plane, ShieldCheck,
  Building2, Banknote, HandHeart, Leaf,
} from "lucide-react";

export const STATS = [
  { value: 10, suffix: "+", label: "Interconnected Platforms" },
  { value: 1, suffix: "", label: "Shared DPI Foundation", display: "Coral" },
  { value: 15, suffix: "+", label: "Government Domains Served" },
  { value: 100, suffix: "%", label: "Built for Caribbean Scale" },
];

export const SECTORS = [
  "Digital Infrastructure", "Artificial Intelligence", "Government Technology",
  "Education", "Healthcare", "Agriculture", "Emergency Management",
  "Commerce", "Tourism", "Regional Integration",
];

// ---------------------------------------------------------------------------
// PLATFORMS  (slug => full detail content)
// ---------------------------------------------------------------------------
export const PLATFORMS = [
  {
    slug: "coral-dpi",
    name: "Coral",
    full: "Coral Digital Public Infrastructure",
    tagline: "The foundational layer connecting every platform, institution, and citizen.",
    accent: "coral",
    icon: "Network",
    core: true,
    overview:
      "Coral is the shared Digital Public Infrastructure that underpins the entire Caya ecosystem. It provides the identity, interoperability, payments, and data-exchange rails that let every government service and platform work together securely.",
    challenges: [
      "Fragmented government systems that cannot share data or verify identity",
      "Duplicated infrastructure spend across ministries and agencies",
      "Low citizen trust due to inconsistent, paper-based service experiences",
      "No common standards for consent, authentication, or audit",
    ],
    vision:
      "A single, sovereign, standards-based foundation on which every public and private service can be built — secure by default, interoperable by design, and owned by the region.",
    modules: [
      { title: "Digital Identity", desc: "A trusted, privacy-preserving identity for every citizen and institution." },
      { title: "Interoperability Layer", desc: "Standards-based data exchange between any two connected systems." },
      { title: "API Gateway", desc: "A unified, governed entry point for all platform and partner APIs." },
      { title: "Messaging & Notifications", desc: "Secure, auditable communication across services and citizens." },
      { title: "Verification & Consent", desc: "Citizen-controlled consent and verifiable credentials." },
      { title: "Authentication", desc: "Federated, multi-factor authentication for public services." },
      { title: "Payments Integration", desc: "Connect government and commerce payment flows on shared rails." },
      { title: "Audit Logging & Compliance", desc: "Immutable audit trails for every transaction and data access." },
    ],
    benefits: [
      "Build once, reuse everywhere across government",
      "Dramatically lower the cost and time of new digital services",
      "Consistent, trustworthy citizen experiences",
      "Sovereign control over national data and identity",
    ],
    users: ["Digital Transformation Units", "Ministries & Agencies", "Developers & Integrators", "Citizens"],
    aiFeatures: [
      "Anomaly detection on identity and transaction flows",
      "Intelligent routing across the interoperability layer",
      "Automated compliance monitoring",
    ],
  },
  {
    slug: "nexus-ai",
    name: "Nexus AI",
    full: "Nexus AI Intelligence Platform",
    tagline: "The intelligence layer powering decisions across every Caya platform.",
    accent: "nexus",
    icon: "Brain",
    core: true,
    overview:
      "Nexus is the shared artificial intelligence platform that delivers natural-language, predictive, and decision intelligence across every sector operating system in the ecosystem — governed, transparent, and responsible by design.",
    challenges: [
      "Data-rich governments that lack the tools to turn data into decisions",
      "Siloed analytics with no shared intelligence layer",
      "Concerns about AI transparency, bias, and accountability",
      "Limited capacity to operationalize AI safely at scale",
    ],
    vision:
      "A responsible AI fabric that makes every public institution measurably smarter — surfacing insight, automating routine work, and supporting better decisions while keeping humans in control.",
    modules: [
      { title: "Natural Language AI", desc: "Conversational access to services and data in plain language." },
      { title: "Decision Intelligence", desc: "Scenario modelling and recommendations for policymakers." },
      { title: "Predictive Analytics", desc: "Forecasting across population, climate, health, and agriculture." },
      { title: "Operational Intelligence", desc: "Real-time situational awareness across agencies." },
      { title: "Population Intelligence", desc: "Aggregated, privacy-safe insight into citizen needs." },
      { title: "Conversational AI", desc: "Citizen-facing assistants for any government service." },
      { title: "Workflow Automation", desc: "Automate repetitive back-office processes." },
      { title: "Knowledge Management", desc: "Institutional memory that is searchable and reusable." },
      { title: "AI Governance & Responsible AI", desc: "Transparency, oversight, and bias controls built in." },
    ],
    benefits: [
      "Faster, evidence-based decisions",
      "Automation of repetitive public-sector work",
      "Consistent intelligence shared across every platform",
      "Responsible AI with human oversight and auditability",
    ],
    users: ["Cabinet & Policy Teams", "Agency Operations", "Analysts", "Citizens"],
    aiFeatures: [
      "Domain-tuned language models for public services",
      "Explainable predictions with confidence scoring",
      "Human-in-the-loop review for sensitive decisions",
    ],
  },
  {
    slug: "sprout-os",
    name: "SproutOS",
    full: "SproutOS — Education Operating System",
    tagline: "A connected operating system for modern, equitable education.",
    accent: "nexus", icon: "Sprout",
    overview: "SproutOS modernizes education delivery — from enrolment and learning to credentials and analytics — for ministries, schools, and learners.",
    challenges: ["Disconnected school systems", "Limited visibility into learning outcomes", "Manual administration", "Unequal access to quality resources"],
    vision: "An inclusive education OS that gives every learner a connected path and every educator the tools and insight to support them.",
    modules: [
      { title: "Student Information", desc: "Unified enrolment and records." },
      { title: "Learning Management", desc: "Curriculum, content, and assessment." },
      { title: "Credentials", desc: "Verifiable certificates via Coral DPI." },
      { title: "Education Intelligence", desc: "Outcome analytics powered by Nexus AI." },
    ],
    benefits: ["Higher learning outcomes", "Reduced administration", "Equitable access", "Data-driven policy"],
    users: ["Ministry of Education", "Schools & Educators", "Students & Parents"],
    aiFeatures: ["Personalized learning pathways", "Early-warning dropout detection", "Education forecasting"],
  },
  {
    slug: "ava-healthos",
    name: "AVA HealthOS",
    full: "AVA HealthOS — Health Operating System",
    tagline: "Connected, citizen-centric healthcare for the region.",
    accent: "coral", icon: "HeartPulse",
    overview: "AVA HealthOS connects health facilities, records, and citizens into a single, secure health operating system.",
    challenges: ["Fragmented patient records", "Limited public-health visibility", "Resource constraints", "Slow emergency coordination"],
    vision: "A unified health OS where every citizen has a portable record and every provider has the insight to deliver better care.",
    modules: [
      { title: "Electronic Health Records", desc: "Portable, consented patient records." },
      { title: "Facility Management", desc: "Operations across hospitals and clinics." },
      { title: "Public Health Intelligence", desc: "Surveillance and forecasting via Nexus AI." },
      { title: "Telehealth", desc: "Remote care access for every community." },
    ],
    benefits: ["Better health outcomes", "Coordinated care", "Faster emergency response", "Population-health insight"],
    users: ["Ministry of Health", "Hospitals & Clinics", "Citizens & Patients"],
    aiFeatures: ["Outbreak prediction", "Clinical decision support", "Resource optimization"],
  },
  {
    slug: "harvest-os",
    name: "HarvestOS",
    full: "HarvestOS — Agriculture Operating System",
    tagline: "Digital infrastructure for resilient, productive agriculture.",
    accent: "nexus", icon: "Wheat",
    overview: "HarvestOS supports farmers, cooperatives, and agriculture ministries with registration, advisory, market access, and intelligence.",
    challenges: ["Low farmer visibility", "Climate vulnerability", "Limited market access", "Fragmented support programmes"],
    vision: "A connected agriculture OS that increases food security, farmer income, and climate resilience.",
    modules: [
      { title: "Farmer Registry", desc: "National registry linked to Coral identity." },
      { title: "Advisory Services", desc: "Localized guidance and alerts." },
      { title: "Market Access", desc: "Connect producers to buyers and finance." },
      { title: "Agricultural Intelligence", desc: "Yield and climate forecasting via Nexus AI." },
    ],
    benefits: ["Higher yields", "Improved food security", "Climate resilience", "Better farmer income"],
    users: ["Ministry of Agriculture", "Farmers & Cooperatives", "Agri-businesses"],
    aiFeatures: ["Yield prediction", "Pest & disease detection", "Climate-smart advisory"],
  },
  {
    slug: "climate-emergency",
    name: "Climate & Emergency",
    full: "National Climate & Emergency Intelligence Platform",
    tagline: "Real-time intelligence for climate resilience and emergency response.",
    accent: "coral", icon: "CloudLightning",
    overview: "A national platform unifying climate data, early warning, and emergency coordination across all agencies.",
    challenges: ["Climate exposure", "Slow multi-agency coordination", "Fragmented alerting", "Limited situational awareness"],
    vision: "A resilient region prepared for climate and disaster events through shared intelligence and coordinated response.",
    modules: [
      { title: "Early Warning", desc: "Multi-hazard alerting to citizens and agencies." },
      { title: "Emergency Coordination", desc: "Unified command and resource tracking." },
      { title: "Climate Intelligence", desc: "Forecasting and risk modelling via Nexus AI." },
      { title: "Citizen Alerts", desc: "Targeted notifications via Coral messaging." },
    ],
    benefits: ["Faster response", "Reduced loss of life", "Coordinated agencies", "Climate resilience"],
    users: ["Emergency Management", "Environment Ministry", "Citizens & Communities"],
    aiFeatures: ["Hazard prediction", "Impact modelling", "Resource optimization"],
  },
  {
    slug: "islandpass",
    name: "IslandPass",
    full: "IslandPass — Tourism & Mobility",
    tagline: "A seamless digital gateway for visitors and the tourism economy.",
    accent: "nexus", icon: "IdCard",
    overview: "IslandPass digitizes the visitor journey — entry, mobility, experiences, and services — while giving the tourism sector shared intelligence.",
    challenges: ["Friction at entry and customs", "Fragmented visitor services", "Limited tourism data", "Underserved local operators"],
    vision: "A frictionless, trusted visitor experience that grows the tourism economy and benefits local communities.",
    modules: [
      { title: "Digital Entry", desc: "Streamlined arrival via Coral identity." },
      { title: "Visitor Services", desc: "Unified access to experiences and transport." },
      { title: "Operator Marketplace", desc: "Connect local operators to visitors." },
      { title: "Tourism Intelligence", desc: "Demand and trend analytics via Nexus AI." },
    ],
    benefits: ["Smoother visitor journeys", "Higher tourism revenue", "Local economic inclusion", "Better planning data"],
    users: ["Ministry of Tourism", "Ports & Customs", "Operators", "Visitors"],
    aiFeatures: ["Demand forecasting", "Personalized recommendations", "Flow optimization"],
  },
  {
    slug: "commerceflow",
    name: "CommerceFlow",
    full: "CommerceFlow — Digital Commerce",
    tagline: "Inclusive digital commerce rails for businesses of every size.",
    accent: "nexus", icon: "Store",
    overview: "CommerceFlow gives businesses, especially MSMEs, the digital storefront, payments, and logistics tools to participate in the modern economy.",
    challenges: ["Limited MSME digital access", "Fragmented payments", "Weak logistics", "Low formalization"],
    vision: "A thriving digital marketplace where any business can sell, get paid, and grow on shared, trusted rails.",
    modules: [
      { title: "Digital Storefronts", desc: "Quick-launch online presence for any business." },
      { title: "Payments", desc: "Unified payments via Coral integration." },
      { title: "Logistics", desc: "Connect delivery and fulfilment partners." },
      { title: "Commerce Intelligence", desc: "Sales and demand insight via Nexus AI." },
    ],
    benefits: ["MSME growth", "Financial inclusion", "Formalized commerce", "Higher productivity"],
    users: ["MSMEs & Merchants", "Finance Ministry", "Consumers"],
    aiFeatures: ["Demand insight", "Fraud detection", "Inventory optimization"],
  },
  {
    slug: "caya-pulse",
    name: "Caya Pulse",
    full: "Caya Pulse — Citizen Engagement",
    tagline: "The unified channel between citizens and their government.",
    accent: "coral", icon: "Activity",
    overview: "Caya Pulse is the citizen engagement layer — service requests, feedback, and communication — connected directly to government operations.",
    challenges: ["Low citizen feedback loops", "Service request black holes", "Fragmented channels", "Limited transparency"],
    vision: "Responsive, transparent government where every citizen voice is heard and acted upon.",
    modules: [
      { title: "Service Requests", desc: "Single channel for citizen requests." },
      { title: "Feedback & Surveys", desc: "Continuous citizen input." },
      { title: "Notifications", desc: "Trusted updates via Coral messaging." },
      { title: "Engagement Intelligence", desc: "Sentiment and trends via Nexus AI." },
    ],
    benefits: ["Higher citizen trust", "Faster resolution", "Transparent governance", "Better services"],
    users: ["All Ministries", "Local Government", "Citizens"],
    aiFeatures: ["Sentiment analysis", "Request routing", "Priority detection"],
  },
  {
    slug: "cultureboard",
    name: "CultureBoard",
    full: "CultureBoard — Culture & Creative Economy",
    tagline: "Digital infrastructure for the region's culture and creative sector.",
    accent: "nexus", icon: "Palette",
    overview: "CultureBoard supports artists, institutions, and the creative economy with discovery, funding, and rights infrastructure.",
    challenges: ["Underserved creative sector", "Limited funding access", "Weak rights management", "Low discoverability"],
    vision: "A vibrant creative economy where culture is preserved, funded, and globally discoverable.",
    modules: [
      { title: "Creative Registry", desc: "Identity and portfolios for creatives." },
      { title: "Funding Access", desc: "Grants and finance pathways." },
      { title: "Rights Management", desc: "Verifiable rights via Coral." },
      { title: "Culture Intelligence", desc: "Audience and trend insight via Nexus AI." },
    ],
    benefits: ["Creative-sector growth", "Cultural preservation", "Global reach", "Fair compensation"],
    users: ["Ministry of Culture", "Artists & Creators", "Institutions"],
    aiFeatures: ["Audience insight", "Discovery recommendations", "Trend forecasting"],
  },
];

export const CORE_SLUGS = ["coral-dpi", "nexus-ai"];

export function getPlatform(slug) {
  return PLATFORMS.find((p) => p.slug === slug);
}

export const ICONS = {
  Network, Brain, Sprout, HeartPulse, Wheat, CloudLightning, IdCard,
  Store, Activity, Palette, Landmark, GraduationCap, Plane, ShieldCheck,
  Building2, Banknote, HandHeart, Leaf,
};

// ---------------------------------------------------------------------------
// INDUSTRIES
// ---------------------------------------------------------------------------
export const INDUSTRIES = [
  { slug: "government", name: "Government", icon: "Landmark", platform: "coral-dpi",
    blurb: "Modernize public services on shared, sovereign infrastructure.",
    desc: "Caya helps governments digitize end-to-end — identity, payments, services, and intelligence — on a single interoperable foundation." },
  { slug: "healthcare", name: "Healthcare", icon: "HeartPulse", platform: "ava-healthos",
    blurb: "Connected, citizen-centric health systems.",
    desc: "From electronic records to public-health intelligence, we connect the entire health ecosystem." },
  { slug: "education", name: "Education", icon: "GraduationCap", platform: "sprout-os",
    blurb: "Inclusive, data-driven education delivery.",
    desc: "We modernize education from enrolment to credentials with connected learning and analytics." },
  { slug: "agriculture", name: "Agriculture", icon: "Wheat", platform: "harvest-os",
    blurb: "Resilient, productive, climate-smart agriculture.",
    desc: "We support farmers and ministries with registry, advisory, market access, and intelligence." },
  { slug: "tourism", name: "Tourism", icon: "Plane", platform: "islandpass",
    blurb: "Seamless visitor journeys that grow the economy.",
    desc: "We digitize the visitor journey and give the tourism sector shared intelligence." },
  { slug: "commerce", name: "Commerce", icon: "Store", platform: "commerceflow",
    blurb: "Inclusive digital commerce for every business.",
    desc: "We give MSMEs the storefronts, payments, and logistics to compete and grow." },
  { slug: "climate", name: "Climate", icon: "Leaf", platform: "climate-emergency",
    blurb: "Intelligence for climate resilience.",
    desc: "We unify climate data, forecasting, and risk modelling for a resilient region." },
  { slug: "emergency-management", name: "Emergency Management", icon: "CloudLightning", platform: "climate-emergency",
    blurb: "Coordinated, faster emergency response.",
    desc: "We connect agencies, alerting, and resources for effective disaster response." },
  { slug: "non-profit", name: "Non-profit", icon: "HandHeart", platform: "caya-pulse",
    blurb: "Digital tools for mission-driven organizations.",
    desc: "We help non-profits reach communities and measure impact on shared infrastructure." },
  { slug: "financial-services", name: "Financial Services", icon: "Banknote", platform: "commerceflow",
    blurb: "Inclusive, trusted financial rails.",
    desc: "We enable financial inclusion through identity, payments, and trusted data exchange." },
];

export function getIndustry(slug) {
  return INDUSTRIES.find((i) => i.slug === slug);
}

// ---------------------------------------------------------------------------
// GOVERNMENT BODIES
// ---------------------------------------------------------------------------
export const GOV_BODIES = [
  "Prime Minister's Office", "Cabinet", "Digital Transformation Units",
  "Ministry of Health", "Ministry of Education", "Agriculture",
  "Emergency Management", "Environment", "Finance", "Tourism",
  "Ports", "Customs", "National Security", "Local Government", "Public Enterprises",
];

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
export const NAV = [
  { label: "Home", to: "/" },
  {
    label: "Ecosystem", to: "/ecosystem",
    mega: PLATFORMS.map((p) => ({ label: p.full, to: `/platforms/${p.slug}`, desc: p.tagline, icon: p.icon, accent: p.accent })),
  },
  {
    label: "Solutions", to: "/government",
    mega: [
      { label: "Government Solutions", to: "/government", desc: "How Caya serves the public sector", icon: "Landmark", accent: "coral" },
      ...INDUSTRIES.slice(0, 7).map((i) => ({ label: i.name, to: `/industries/${i.slug}`, desc: i.blurb, icon: i.icon, accent: "nexus" })),
    ],
  },
  { label: "Industries", to: "/industries" },
  { label: "Insights", to: "/insights" },
  { label: "Company", to: "/about",
    mega: [
      { label: "About Caya", to: "/about", desc: "Mission, vision and story", icon: "Building2", accent: "nexus" },
      { label: "Partners", to: "/partners", desc: "Build the ecosystem with us", icon: "HandHeart", accent: "coral" },
      { label: "Careers", to: "/careers", desc: "Mission-driven work", icon: "Sprout", accent: "nexus" },
      { label: "Contact", to: "/contact", desc: "Talk to our team", icon: "Activity", accent: "coral" },
    ],
  },
];
