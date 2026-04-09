# Vercel Deployment Plan — Unifinders Web

This plan outlines the steps and configuration required to deploy the Unifinders platform to Vercel.

## 1. Project Configuration
- **Frameowork Preset:** Next.js
- **Root Directory:** `unifinders-web/`
- **Build Command:** `npm run build`
- **Install Command:** `npm install`
- **Output Directory:** `.next`

## 2. Environment Variables (Required)
The following secrets must be added in the Vercel Project Settings > Environment Variables:

| Variable | Source | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard | Frontend Auth/API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard | Public API Access |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard | Admin/API bypass (Secure) |
| `DATABASE_URL` | Supabase Settings | Prisma Connection String |
| `DIRECT_URL` | Supabase Settings | Prisma Direct Migration URL |
| `RESEND_API_KEY` | Resend Dashboard | Email transactional support |

## 3. Database Sync (Prisma)
Before the first build, ensure the Prisma schema matches the remote database:
1. Run `npx prisma db push` locally to sync the latest schema changes to the PROD database.
2. Verify the `UserRole` enum in Supabase matches the `prisma/schema.prisma` definitions.

## 4. Deployment Pipeline
- **Production:** Automated deployments from the `main` branch.
- **Preview:** Automated deployments from the `DEV` and `UAT` branches.

## 5. Post-Deployment Checklist
- [ ] Verify SSL is active on the custom domain.
- [ ] Test Google OAuth login flow (ensure Vercel URL is added to Supabase Authorized Redirects).
- [ ] Confirm no 404s on the landing page sections (Hero student image, etc).
- [ ] Verify that the `admin` role escalation patch is effective in the PROD environment.
