# 🧠 MASTER SESSION HANDOFF — Unifinders Web
> **Purpose:** Read ONLY this file at the start of every new session. Zero scanning needed.
> **Last Updated:** 2026-04-09 — Sprint 3 (Auth + Appointment + Email) ✅

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
| **Email** | Resend (transactional — appointment confirmations, welcome emails) |
| **Package Manager** | npm |
| **Root Path** | `/Users/dipendrachaudhary/Desktop/Unifinders - Website/unifinders-web/` |
| **Dev Command** | `npm run dev` (runs on 0.0.0.0:3000 — accessible on network) |

---

## 2. ARCHITECTURE SNAPSHOT

```
unifinders-web/
├── app/
│   ├── (main)/          # All public pages with Navbar + Footer
│   │   ├── appointment/ ✅ FIXED — now POSTs to /api/appointments (was fake!)
│   │   ├── blog/        ✅ List + detail pages
│   │   ├── courses/     ✅ List + detail pages
│   │   ├── events/      ✅ List + detail pages
│   │   ├── scholarships/ ✅ List + detail pages
│   │   └── study/       ✅ Study destinations
│   │
│   ├── api/
│   │   ├── appointments/route.ts      ✅ Real DB save + Resend email confirmation
│   │   ├── email/send/route.ts        ✅ NEW — Resend email API (appointment + welcome)
│   │   ├── onboarding/route.ts        ✅ Rate limiting DISABLED for testing
│   │   ├── profile/route.ts           ✅ GET + PUT
│   │   ├── documents/route.ts         ✅ Supabase Storage signed URLs
│   │   ├── applications/route.ts      ✅ Full RBAC
│   │   └── admin/
│   │       ├── blog/route.ts          ✅ Admin CRUD
│   │       ├── events/route.ts        ✅ Admin CRUD
│   │       ├── scholarships/route.ts  ✅ Admin CRUD
│   │       ├── courses/route.ts       ✅ Admin CRUD
│   │       └── universities/route.ts  ✅ Admin CRUD
│   │
│   ├── auth/
│   │   ├── login/page.tsx             ✅ REWRITTEN — Google+FB OAuth at top, better errors
│   │   ├── register/page.tsx          ✅ REWRITTEN — Google+FB first, no OTP confusion
│   │   ├── forgot-password/page.tsx   ✅ NEW — Supabase resetPasswordForEmail
│   │   └── callback/                  ✅ OAuth callback handler
│   │
│   ├── dashboard/       ✅ Student dashboard pages (all read from DB with fallback)
│   └── onboarding/      ✅ 4-step onboarding wizard
│
├── proxy.ts              ✅ CSP + HSTS + X-Frame-Options (Next.js 16 convention)
│
├── lib/
│   ├── api-helpers.ts    ✅ Auth guard, RBAC, rate limiter (DISABLED), audit log, headers
│   ├── dal.ts            ✅ DB queries with fallback to constants
│   ├── db.ts             ✅ Prisma singleton
│   └── constants/        ✅ Full static data fallbacks (blogs, courses, events, etc.)
│
├── prisma/schema.prisma  ✅ Full schema synced to Supabase DB
└── create-test-users.js  ✅ Script to seed admin + student accounts
```

---

## 3. CURRENT STATUS — WHAT IS DONE ✅

| Category | Status | Notes |
|----------|--------|-------|
| **All Frontend Pages (42 routes)** | ✅ | All pages load, zero TS errors |
| **Appointment Booking → DB** | ✅ **FIXED** | Was fake setTimeout — now real API POST |
| **Appointment Confirmation Email** | ✅ | Resend integrated, fires automatically on booking |
| **Login Page** | ✅ **REWRITTEN** | Google+FB at top, clear error messages |
| **Register Page** | ✅ **REWRITTEN** | No OTP confusion, Google+FB first, email link flow |
| **Forgot Password Page** | ✅ **NEW** | Supabase resetPasswordForEmail |
| **Rate Limiting** | ⚠️ **DISABLED** | Removed for testing. Re-enable before prod |
| **Image src empty bug (EventsSection)** | ✅ **FIXED** | Safe fallback image applied |
| **Security Middleware (proxy.ts)** | ✅ | CSP, HSTS, headers on all routes |
| **All API Routes** | ✅ | All backend routes exist and are wired |
| **DB Schema** | ✅ | Fully synced via `prisma db push` |
| **Admin Panel CMS** | ✅ | All core CMS pages built (Events, Scholarships, Courses, Universities) |
| **Student Dashboard** | ✅ | Real appointments, profile edit, file upload widget built |

---

## 4. NEXT SPRINT — REMAINING WORK

### 🔴 CRITICAL: Must do before production

#### A. Get correct Supabase Anon Key (JWT format)
```
Current key sb_publishable_Ca32V... may cause issues with @supabase/ssr.
Get the eyJ... JWT key from:
https://supabase.com/dashboard/project/umekgwwrsucnxxfvfqkw/settings/api
Update NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
```

#### B. Enable Google OAuth in Supabase
```
1. Go to: https://supabase.com/dashboard/project/umekgwwrsucnxxfvfqkw/auth/providers
2. Enable Google → add OAuth client ID + secret (from Google Cloud Console)
3. Set redirect URL in Google Cloud → your domain + /auth/callback
```

#### C. Set up Resend Email
```
1. Sign up at https://resend.com (free: 3,000 emails/month)
2. Add domain → verify DNS records (unifinders.com)
3. Create API key
4. Update .env.local:
   RESEND_API_KEY=re_xxxxxxxxxxxx
   RESEND_FROM_EMAIL=noreply@unifinders.com
```

#### D. Create Test Accounts in Supabase
```
1. Go to: https://supabase.com/dashboard/project/umekgwwrsucnxxfvfqkw/auth/users
2. Click "+ Add user" → "Create new user"
3. Create: student@test.com / Student@1234 (toggle Auto Confirm ON)
4. Create: admin@test.com / Admin@1234 (toggle Auto Confirm ON)
5. Run SQL to set admin role:
   UPDATE profiles SET role = 'admin' 
   WHERE user_id = (SELECT id FROM auth.users WHERE email = 'admin@test.com');
```

#### E. Re-enable Rate Limiting before Production
```typescript
// In lib/api-helpers.ts — replace the disabled rateLimit with the real implementation
// Rate limiting was disabled for testing on 2026-04-09
```

---

### ✅ Admin Panel CMS (Sprint 4 — COMPLETED)

| Page | Path | Status |
|------|------|--------|
| Blog CMS | `/dashboard/admin/blog` | ✅ Complete |
| Events CMS | `/dashboard/admin/events` | ✅ Complete |
| Scholarships CMS | `/dashboard/admin/scholarships` | ✅ Complete |
| Courses CMS | `/dashboard/admin/courses` | ✅ Complete |
| Universities CMS | `/dashboard/admin/universities` | ✅ Complete |
| Students List (Admin) | `/dashboard/admin/students` | ✅ Complete |
| Appointments Manager | `/dashboard/admin/appointments` | ✅ Complete |

---

### ✅ Student Dashboard Connections (Sprint 4 — COMPLETED)

| Feature | Status | Notes |
|---------|--------|-------|
| Document Upload UI | ✅ Complete | Direct upload to Supabase Storage via signed URLs |
| Real appointments list | ✅ Complete | Fetches real DB data + Cancel capability |
| Profile edit form | ✅ Complete | Form updates DB via `PUT /api/profile` |
| Notifications (real-time) | ❌ Pending | Supabase Realtime subscriptions (Sprint 5) |

---

### 🟡 Production Deployment (Sprint 5)

- [ ] Vercel env vars: `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`
- [ ] `prisma db push` on production DB
- [ ] ISR (Incremental Static Regeneration) on blog/events/scholarships pages
- [ ] SEO: meta tags, sitemap.xml, robots.txt
- [ ] Re-enable rate limiting

---

## 5. KEY DECISIONS & PATTERNS

| Decision | Pattern | Why |
|----------|---------|-----|
| API Security | `requireAuth()` + `requireRole()` in every route | No route can be called without auth |
| Rate Limiting | **DISABLED** for testing (in lib/api-helpers.ts) | Remove block for dev/QA |
| Data Strategy | DB → constants fallback in DAL | Site never blank even without DB data |
| File Upload | Supabase Storage signed URLs — client uploads directly | Avoids large payloads through Next.js |
| Soft Delete | `deletedAt: DateTime?` on all CMS models | Safe deletion, data recovery possible |
| Audit Trail | `auditLog()` called on all mutations | GDPR + security compliance |
| RBAC | `UserRole` enum: admin, counselor, staff, student | Typed, enforced at API level |
| Email | Resend via `/api/email/send` — fire-and-forget, non-blocking | Never blocks the main API response |

---

## 6. SECURITY ARCHITECTURE

```
Request → proxy.ts (CSP + security headers)
        → route handler
        → rateLimit() ⚠️ DISABLED — re-enable before prod
        → requireAuth() (validates Supabase session)
        → requireRole() (RBAC guard)
        → parseBody() + missingFields() (input validation)
        → DB write
        → Resend email (fire-and-forget, non-blocking)
        → auditLog() (async, non-blocking)
        → withSecurityHeaders(response)
```

---

## 7. ENV VARS — COMPLETE LIST

```bash
# .env.local — current state (annotated)

# ── Supabase ─────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://umekgwwrsucnxxfvfqkw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Ca32V-9tM0RFwueZzBIEjA_BSDs9a5-
# ⚠️ NOTE: Get JWT format (eyJ...) from Supabase Settings > API if auth fails
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...jwt_format_key...

SUPABASE_SERVICE_ROLE_KEY=    # 🔴 MISSING — needed for admin user management
                               # Get from Supabase Settings > API > service_role

# ── Database ──────────────────────────────────────────────
DATABASE_URL=postgresql://postgres:...@db...supabase.co:5432/postgres   # ✅ set
DIRECT_URL=postgresql://postgres:...@db...supabase.co:5432/postgres     # ✅ set

# ── Resend Email ──────────────────────────────────────────
RESEND_API_KEY=re_your_api_key_here      # 🔴 Pending domain verification
RESEND_FROM_EMAIL=noreply@unifinders.com # 🔴 Pending domain verification

# ── For Production (Vercel) ───────────────────────────────
# All of the above + NEXT_PUBLIC_SITE_URL=https://unifinders.com
```

---

## 8. API REFERENCE (Quick Look-Up)

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/appointments` | POST | Public | Book appointment → auto emails Resend confirmation |
| `/api/appointments` | GET | admin/counselor | List all appointments |
| `/api/appointments/[id]` | PATCH | admin/counselor | Confirm/cancel |
| `/api/email/send` | POST | Internal | Send transactional email via Resend |
| `/api/profile` | GET/PUT | Any auth | Get/update own profile |
| `/api/documents` | GET/POST | Any auth/student | Manage docs + signed URLs |
| `/api/documents/[id]` | GET/PATCH/DELETE | Auth | Doc detail + review + soft delete |
| `/api/applications` | GET/POST | RBAC | Applications CRUD |
| `/api/applications/[id]` | GET/PATCH | RBAC | Application detail + status |
| `/api/onboarding` | POST | student | Submit onboarding form |
| `/api/admin/blog` | GET/POST | admin | Blog CRUD |
| `/api/admin/events` | GET/POST | admin | Events CRUD |
| `/api/admin/scholarships` | GET/POST | admin | Scholarships CRUD |
| `/api/admin/courses` | GET/POST | admin | Courses CRUD |
| `/api/admin/universities` | GET/POST | admin | Universities CRUD |

---

## 9. KNOWN ISSUES & WORKAROUNDS

| Issue | Status | Workaround |
|-------|--------|------------|
| Supabase email rate limit (3 emails/hour free tier) | ⚠️ Active | Use Google OAuth to login instead |
| Rate limiting disabled | ⚠️ Dev only | Re-enable in `lib/api-helpers.ts` before prod |
| Document upload is checklist only | ❌ Pending | Students see checklist; upload widget not built yet |
| Admin CMS create/edit forms | ❌ Pending | Use Supabase Table Editor as workaround |
| SUPABASE_SERVICE_ROLE_KEY missing | ❌ Pending | Cannot create users programmatically |

---

## 10. SUPABASE SETUP CHECKLIST

- [x] DATABASE_URL + DIRECT_URL set in `.env.local`
- [x] `prisma db push` — schema synced to DB
- [x] Storage bucket "documents" created
- [ ] **SUPABASE_SERVICE_ROLE_KEY** — get from Supabase Settings > API
- [ ] **Google OAuth** — enable in Auth > Providers
- [ ] **Facebook OAuth** — enable in Auth > Providers
- [ ] **Auth Redirect URLs** — add your Vercel domain
- [ ] **Email rate limits** — upgrade Supabase plan or configure SMTP (Resend)
- [ ] **Create admin test user** — via Supabase dashboard → set role to 'admin'

---

## 11. TOKEN-SAVING RULES FOR AI

1. **Do NOT scan the entire codebase.** Read this file first.
2. **All API security** is in `lib/api-helpers.ts` — import from there.
3. **All data access** goes through `lib/dal.ts` — never query DB directly in pages.
4. **Rate limiting is DISABLED** — re-enable in `lib/api-helpers.ts` before prod.
5. **Email is via Resend** at `/api/email/send` — call it fire-and-forget.
6. **Admin panel CMS forms** are the top Sprint 4 priority.
7. **Auth pages were fully rewritten** — registration and login are now clean.
