# 🧠 MASTER SESSION HANDOFF — Unifinders Web
> **Purpose:** Read ONLY this file at the start of every new session. Zero scanning needed. Budget your tokens on BUILDING, not reading.
> **Last Updated:** 2026-04-03 — Blog ✅ + Scholarships ✅ + QnA ✅ + Courses ✅ + Events ✅ + Login/Register ✅ + Appointment ✅

---

## ⚡ QUICK RESUME COMMAND
```
Read MASTER_SESSION.md → Jump to Section 4 (Next Sprint) → Start coding the first unchecked task.
```

---

## 1. PROJECT OVERVIEW (30s Brief)

| Field | Value |
|-------|-------|
| **Project** | Unifinders — EdTech Study Abroad Platform (Nepal → World) |
| **Stack** | Next.js 16 (App Router), TypeScript, Prisma v6.3, Supabase (PostgreSQL + Auth + Storage) |
| **Package Manager** | npm |
| **Root Path** | `/Users/dipendrachaudhary/Desktop/Unifinders - Website/unifinders-web/` |
| **Dev Command** | `npm run dev` (runs on localhost:3000) |
| **Build Status** | ✅ `npm run build` passes cleanly as of 2026-04-03 |
| **Figma Source** | `/Users/dipendrachaudhary/Desktop/Unifinders - Website/Study Abroad - Landing Page.pdf` |
| **Figma Assets** | All copied → `public/images/` (58 files, logos at `public/images/*.png`) |

---

## 2. ARCHITECTURE SNAPSHOT

```
unifinders-web/
│   ├── app/                        # Next.js App Router pages
│   ├── (main)/                     # Route group — Global Navbar + Footer layout ✅
│   │   ├── layout.tsx              # Navbar + children + Footer + BackToTop
│   │   ├── page.tsx                # Landing page — SERVER COMPONENT
│   │   ├── courses/page.tsx        # ✅ COMPLETE — 2-col course list, Intellectual Pursuits stats, trust bar, features
│   │   ├── courses/[slug]/page.tsx # ✅ COMPLETE — tabs (About/Format/Instructors/Resources/FAQs), hero, programs, 3-step enrollment modal
│   │   ├── study/page.tsx          # ✅ COMPLETE — country cards grid
│   │   ├── study/[country]/page.tsx # ✅ COMPLETE — full detail page
│   │   ├── events/page.tsx         # ✅ COMPLETE — blue hero, search, All/Upcoming/Past tabs, 3-col date-badge cards, pagination, CTA
│   │   ├── events/[slug]/page.tsx  # ✅ COMPLETE — title+share, hero, meta row, description, sponsors grid, FAQ, map, register modal
│   │   ├── appointment/page.tsx    # ✅ COMPLETE — dark blue hero, 2-col layout (form + counselor sidebar), time slot picker
│   │   ├── blog/page.tsx           # ✅ COMPLETE — search, filter modal, category tabs, 3-col grid, pagination, CTA
│   │   ├── blog/[slug]/page.tsx    # ✅ COMPLETE — full article, social share, author bio, feedback modal, related posts
│   │   ├── scholarships/page.tsx   # ✅ COMPLETE — search, filter modal, card grid with status badges, FAQ, CTA
│   │   ├── scholarships/[slug]/page.tsx # ✅ COMPLETE — detail view, summary table, coverage, eligibility, apply process
│   │   ├── appointment/page.tsx    # ✅ COMPLETE — multi-step booking form
│   │   ├── qna/page.tsx            # ✅ COMPLETE — 3-col layout, search, filter modal, ask modal, question cards, contributors sidebar
│   │   ├── qna/[slug]/page.tsx     # ✅ COMPLETE — question detail, answers, write answer form, related questions
│   │   └── qna/contributor/[id]/page.tsx # ✅ COMPLETE — contributor profile, follow/message, questions feed
│   ├── layout.tsx                  # Root layout (fonts, metadata only — NO navbar)
│   ├── auth/login/page.tsx         # Login UI shell
│   ├── dashboard/layout.tsx        # Dashboard-specific layout (separate)
│
├── components/
│   ├── landing/                # 13 landing page sections (ALL BUILT ✅)
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── HighlightsSection.tsx   # Tab pills: Student/University/Who We Are ✅
│   │   ├── GlobalStatsSection.tsx
│   │   ├── PartnerUniversitiesSection.tsx  # Country filter ✅
│   │   ├── ScholarshipSection.tsx
│   │   ├── VisaCalculatorSection.tsx       # Step-by-step ✅
│   │   ├── TestimonialsSection.tsx         # Dot nav ✅
│   │   ├── BlogSection.tsx                 # Accepts blogs prop from DAL ✅
│   │   ├── EventsSection.tsx               # Accepts events prop from DAL ✅
│   │   └── CtaBannerSection.tsx
│   ├── layout/
│   │   ├── Navbar.tsx          # Mobile hamburger ✅
│   │   └── Footer.tsx
│   └── ui/
│       └── BackToTop.tsx       # ✅
│
├── lib/
│   ├── constants/landing.ts    # ALL static data (fallback source of truth)
│   ├── constants/blogs.ts      # ✅ 13 blog posts, 6 authors, rich content sections
│   ├── constants/scholarships.ts # ✅ 9 scholarships, full eligibility/coverage/application steps
│   ├── constants/qna.ts        # ✅ 12 questions, 6 contributors, 4 sponsored links, filter metadata
│   ├── constants/destinations.ts # ✅ 10 study destinations
│   ├── dal.ts                  # Data Access Layer — queries DB, falls back to constants
│   ├── db.ts                   # Prisma singleton (v6.3.0)
│   └── dal_stubs.ts            # Unused stubs — delete eventually
│
├── prisma/
│   └── schema.prisma           # Full schema: Profile, Student, Counselor, University,
│                               # Application, Document, Fee, Task, Notification, AuditLog
│
├── public/images/              # 58 Figma-exported assets ready to use
│
└── .env.local                  # Has SUPABASE_URL + ANON_KEY. Missing DATABASE_URL!
```

---

## 3. CURRENT STATUS — WHAT IS DONE ✅

| Category | Status | Notes |
|----------|--------|-------|
| Landing Page UI (all 13 sections) | ✅ **COMPLETE** | Pixel-close to Figma |
| Tab Interactivity (Highlights) | ✅ | Student / University / Who We Are filters work |
| Event Filter Tabs | ✅ | All / Upcoming / Past |
| Visa Calculator Steps | ✅ | Interactive step selector |
| Testimonial Dot Nav | ✅ | Auto-advance + click |
| Back to Top | ✅ | Scroll threshold trigger |
| Navbar (desktop + mobile) | ✅ | Hamburger menu, dropdown |
| Figma Assets | ✅ | All 58 images in `public/images/` |
| Prisma Schema | ✅ | Full schema written (v6.3.0 compatible) |
| Data Access Layer (DAL) | ✅ | `lib/dal.ts` with graceful fallbacks |
| Nav Page Stubs | ✅ | All routes return valid pages, no 404s |
| Build (prod) | ✅ | `npm run build` — Exit code 0 |
| JSON-LD Structured Data | ✅ | EducationalOrganization schema on homepage |
| Supabase Client | ✅ | Browser + Server clients in `lib/supabase/` |
| Prisma Client | ✅ | Generated from schema |
| **DATABASE_URL** | ✅ | Set in `.env.local`, DB tables live on Supabase |
| **Supabase Auth (Login)** | ✅ | Email + Google OAuth, `app/auth/login/page.tsx` |
| **Supabase Auth (Register)** | ✅ | `app/auth/register/page.tsx` with email verification |
| **OAuth Callback** | ✅ | `app/auth/callback/route.ts` |
| **Route Protection** | ✅ | `utils/supabase/middleware.ts` — /dashboard, /onboarding protected |
| **Dashboard Layout** | ✅ | Sidebar + header, `app/dashboard/layout.tsx` |
| **Dashboard Overview** | ✅ | Stats, profile %, applications, `app/dashboard/page.tsx` |
| **Onboarding Wizard** | ✅ | 4-step form, `app/onboarding/page.tsx` |
| **Onboarding API** | ✅ | `POST /api/onboarding` → upserts Student + Profile |
| **Events Page** | ✅ | `/events` — real data, upcoming/past sections |
| **Blog Listing Page** | ✅ | `/blog` — dark hero banner, search+filter modal, category tabs, 3-col grid, pagination, CTA |
| **Blog Detail Page** | ✅ | `/blog/[slug]` — article body, social share, author bio, star feedback modal, related posts carousel |
| **Blog Data** | ✅ | `lib/constants/blogs.ts` — 13 real articles, 6 authored experts, rich content |
| **Scholarships Listing** | ✅ | `/scholarships` — hero search, filter modal (country+tags), card grid with status badges, FAQ accordion, CTA |
| **Scholarship Detail** | ✅ | `/scholarships/[slug]` — summary table, coverage, eligibility, application steps, related carousel |
| **Scholarship Data** | ✅ | `lib/constants/scholarships.ts` — 9 real scholarships with full details |
| **Search Bar Fix** | ✅ | Removed browser blue focus bracket on all search inputs (CSS + `search-bar-input` class) |
| **Study Destinations** | ✅ | `/study` — 10 country cards |
| **Study Detail Pages** | ✅ | `/study/[country]` — 10 countries dynamic template |
| **Appointment Page** | ✅ | `/appointment` — full booking form with success state |
| **Courses Page** | ✅ | `/courses` — with category filter |
| **Course Detail Pages** | ✅ | `/courses/[slug]` — course detail pages |
| **QnA Page** | ✅ | `/qna` — FAQ accordion by category |
| **Dashboard Applications** | ✅ | `/dashboard/applications` — tracker with progress bar |
| **Dashboard Documents** | ✅ | `/dashboard/documents` — checklist of 10 required docs |
| **Dashboard Appointments** | ✅ | `/dashboard/appointments` — booking + office hours |
| **QnA Listing Page** | ✅ | `/qna` — 3-col layout (country sidebar + question feed + contributor/sponsored sidebar), filter modal, ask modal |
| **QnA Question Detail** | ✅ | `/qna/[slug]` — full question display, answers, write answer form, related questions |
| **QnA Contributor Profile** | ✅ | `/qna/contributor/[id]` — profile banner with stats, follow/message, questions by contributor |
| **QnA Data** | ✅ | `lib/constants/qna.ts` — 12 questions, 6 contributors, 4 sponsored ads |
| **Production Build (42 pages)** | ✅ | `npx tsc --noEmit` Exit code 0 — all routes compile cleanly |

---

## 4. NEXT SPRINT — UNCHECKED TASKS (2–3 Days)

### 🟡 REMAINING WORK (Next Sprint: Events Full Build, Courses Revamp)

#### STEP 1 — Events Module Full Build (2–3 hrs)
```
- lib/constants/events.ts: Create rich event data (10+ events with full details)
- app/(main)/events/page.tsx: Redesign matching Figma — hero, search, filter modal, event cards grid
- app/(main)/events/[slug]/page.tsx: Event detail page with registration CTA
```

#### STEP 2 — Courses Module Full Build (2–3 hrs)
```
- lib/constants/courses.ts: Rich course data
- app/(main)/courses/page.tsx: Full Figma redesign
- app/(main)/courses/[slug]/page.tsx: Course detail revamp
```

#### STEP 3 — Future: Admin CMS Panel (migrate all hardcoded data to DB)
```
⚠️ ARCHITECTURE PLAN:
All data lives in lib/constants/*.ts (hardcoded now, DB later)
Migration path: Supabase tables → lib/dal.ts queries → Admin CMS CRUD
Admin can manage: blogs, scholarships, courses, events, qna questions
DB tables needed: blogs, blog_authors, scholarships, qna_questions, qna_answers, contributors, events, courses
Admin routes: /dashboard/admin/* with full CRUD UI
```

#### STEP 4 — Google OAuth (user action required)
```
1. Go to console.cloud.google.com → Create OAuth credentials
2. Add redirect: https://umekgwwrsucnxxfvfqkw.supabase.co/auth/v1/callback
3. Paste Client ID + Secret in Supabase → Auth → Providers → Google
```

---

## 5. KEY DECISIONS & PATTERNS (Don't repeat research)

| Decision | Pattern | Why |
|----------|---------|-----|
| Data fetching | Server Components → DAL → constants fallback | Never blank page, CMS-ready |
| Auth | Supabase Auth (built-in, not custom JWT) | Fastest production-safe path |
| DB access | Prisma v6.3.0 (NOT v7) | v7 broke URL config syntax |
| Styling | Pure Tailwind (pre-existing globals.css) | Consistent with existing codebase |
| Images | Next.js `<Image>` for all local assets | LCP performance |
| State | `useState` in client components, Server Components for data fetching | Next.js App Router pattern |
| Types | Avoid `any` — use `unknown` or define interfaces | Strict TS |

---

## 6. KNOWN ISSUES (Track & FIX Before Launch)

| # | Issue | File | Fix |
|---|-------|------|-----|
| 1 | `<img>` tags in PartnerUniversitiesSection | `PartnerUniversitiesSection.tsx:78,97` | Replace with `<Image>` from next/image |
| 2 | `lib/dal_stubs.ts` unused file | `lib/dal_stubs.ts` | Delete this file |
| 3 | `DATABASE_URL` missing from `.env.local` | `.env.local` | Add from Supabase dashboard |
| 4 | Auth login page has no real auth logic | `app/auth/login/page.tsx` | Wire Supabase signIn |
| 5 | All inner pages are placeholder ("Under Construction") | `app/*/page.tsx` | Build real UI per Figma |

---

## 7. ENV VARS REQUIRED

```bash
# .env.local — current state
NEXT_PUBLIC_SUPABASE_URL=https://umekgwwrsucnxxfvfqkw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Ca32V-9tM0RFwueZzBIEjA_BSDs9a5-

# MISSING — get from Supabase Dashboard > Settings > Database
DATABASE_URL=           # Pooler URL (Transaction mode, port 6543)
DIRECT_URL=             # Direct URL (port 5432)
NEXTAUTH_SECRET=        # Only needed if using NextAuth (we're using Supabase Auth directly)
```

---

## 8. FIGMA → PAGES MAPPING

Pages to build (in priority order for 2–3 day sprint):

| Page | Route | Figma Section | Status |
|------|-------|---------------|--------|
| Landing | `/` | Full landing page | ✅ Done |
| Login | `/auth/login` | Login form | 🚧 Needs real auth |
| Register | `/auth/register` | Sign-up form | ❌ Not built |
| Student Onboarding | `/onboarding` | Profile wizard | ❌ Not built |
| Student Dashboard | `/dashboard` | Overview panel | ❌ Not built |
| Courses List | `/courses` | Courses grid | ❌ Placeholder |
| Course Detail | `/courses/[slug]` | Individual course | ❌ Placeholder |
| Scholarships | `/scholarships` | Scholarship cards | ❌ Placeholder |
| Events | `/events` | Event list | ❌ Placeholder |
| Blog | `/blog` | Blog grid | ❌ Placeholder |
| Study Destinations | `/study` | Country cards | ❌ Placeholder |
| Book Appointment | `/appointment` | Calendar/form | ❌ Placeholder |

---

## 9. DOCS REFERENCE (Scan ONLY if needed)

| Doc | What's In It |
|-----|-------------|
| `docs/05_DATABASE_SCHEMA.md` | Full Prisma models in detail |
| `docs/11_SPRINT_ROADMAP.md` | Week-by-week delivery plan |
| `docs/16_FIGMA_ASSET_SUMMARY.md` | All image paths mapped |
| `docs/00_INDEX.md` | Index of all 16 docs |
| `unifinders-web/prisma/schema.prisma` | Source of truth for DB |
| `unifinders-web/lib/constants/landing.ts` | All static data |

---

## 10. TOKEN-SAVING RULES FOR AI

1. **Do NOT scan the entire codebase.** Read this file first, use targeted `view_file` only when editing.
2. **Build feature by feature.** Complete one file top-to-bottom before moving to next.
3. **Run `npm run build` after every major change.** Exit code 0 = green light to continue.
4. **Update this file's Section 3 checklist + Section 6 issues** at end of each session.
5. **Priority order:** Auth → DB Push → Onboarding → Dashboard → Remaining Pages → Performance.
