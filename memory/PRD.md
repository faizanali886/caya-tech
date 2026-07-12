# Caya Technologies — Corporate Website & CMS

## Original Problem Statement
Enterprise-grade corporate website for Caya Technologies, a company building Digital Public Infrastructure (Coral DPI), an AI platform (Nexus AI), and sector operating systems for Caribbean governments, institutions, and enterprises. Premium, government-ready brand comparable to Microsoft Industry / Palantir / ServiceNow. Full site architecture: Home, About, Ecosystem, Platform pages, Government Solutions, Industries, Insights, Partners, Careers, Contact, plus a CMS, multiple lead-gen forms, analytics placeholders, SEO, security.

## User Choices
1. Real CMS backend (admin login, editable content, forms saved to DB)
2. JWT custom authentication
3. Flagship pages in full depth + reusable template for platform/industry pages
4. No live AI features (content only)
5. Analytics placeholders (no IDs yet)

## Architecture
- **Frontend**: React 19 + CRA/craco, Tailwind, shadcn/ui, framer-motion, react-router, TanStack Query, next-themes (light/dark). Data-driven pages via `src/data/site.js`.
- **Backend**: FastAPI, all routes `/api`-prefixed. MongoDB via motor.
- **Auth**: JWT (PyJWT) + bcrypt; token in login response → localStorage → `Authorization: Bearer`. Brute-force lockout (5 fails/15min). Idempotent admin seed.
- **Collections**: users, submissions, newsletter, articles, site_content, rate_events, login_attempts.

## Personas
- Government decision-makers requesting briefings/pilots
- Strategic partners & investors
- Job seekers / press
- Internal CMS admin (content editor)

## Implemented (2026-06)
- Public site: Home (hero, animated stats, sector marquee, interactive ecosystem map, featured platforms, CTA), About, Ecosystem (interactive SVG map, full catalogue), 10 Platform detail pages (reusable deep template), Government Solutions, Industries list + 10 detail pages, Insights (list/filter/search + detail), Partners, Careers, Contact (6 enquiry types + map), Legal (privacy/terms/security), 404.
- Global nav: sticky glass navbar, mega menu, mobile sheet, global search (cmdk), theme toggle, language selector (EN + future locales).
- Forms: government briefing, demo, consultation, partner, investor, media, career, general + newsletter — validation, honeypot, rate limiting, success states.
- CMS admin (/admin): JWT login, dashboard stats, enquiries inbox (read/delete/filter), Insights CRUD (draft/publish), subscribers list.
- SEO: meta/OG/canonical, JSON-LD org schema, per-page titles, Google Fonts (Outfit/Manrope/JetBrains Mono).
- Verified: deployment_agent PASS; testing_agent 100% backend (15/15) + frontend critical flows.

## Backlog
- P1: Wire GA4 / GTM / Microsoft Clarity IDs + cookie consent banner.
- P1: Media library / image upload for CMS (object storage) + rich-text editor for articles.
- P2: Multilingual (ES/FR) content, XML sitemap + robots.txt generation, redirect manager, role-based CMS permissions.
- P2: Real platform screenshots/case studies, partner logos.
- P2: CRM/marketing-automation integration for form submissions; JWT refresh flow.

## Next Tasks
- Add analytics IDs + cookie consent when client provides them.
- Consider CMS media uploads + WYSIWYG editor.
