# 🚀 Unifinders Web — Production Deployment Guide

Complete step-by-step instructions to deploy **unifinders-web** to Vercel production environment.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Step 1: Verify Local Build](#step-1-verify-local-build)
4. [Step 2: Commit & Push Code](#step-2-commit--push-code)
5. [Step 3: Connect to Vercel](#step-3-connect-to-vercel)
6. [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
7. [Step 5: Deploy to Production](#step-5-deploy-to-production)
8. [Step 6: Post-Deployment Verification](#step-6-post-deployment-verification)
9. [Troubleshooting](#troubleshooting)
10. [Quick Reference](#quick-reference)

---

## Prerequisites

- **Node.js v20+** and `npm` installed locally
- **Git** configured with push access to `arunchaudharyofc/Unifinders-Website`
- **Vercel account** (free or premium) at https://vercel.com
- **GitHub account** with access to the repository
- All required **secrets and credentials** (listed in step 4)

---

## Pre-Deployment Checklist

Before you begin, verify the following from `MASTER_SESSION.md`:

- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY** is in JWT format (starts with `eyJ...`), NOT the short publishable key
- [ ] **SUPABASE_SERVICE_ROLE_KEY** is obtained from Supabase Dashboard > Settings > API
- [ ] **RESEND_API_KEY** is generated from https://resend.com
- [ ] **Resend sending domain** is verified (add DNS records if required)
- [ ] **Rate limiting is re-enabled** in `lib/api-helpers.ts` (comment out the disable for production)
- [ ] **Database URL and DIRECT_URL** are correct and accessible from Vercel's IP range
- [ ] **Google OAuth credentials** are configured in Supabase (redirect URIs updated for your Vercel domain)

---

## Step 1: Verify Local Build

Ensure the app builds successfully before pushing to production.

```bash
cd /Users/dipendrachaudhary/Desktop/Unifinders\ -\ Website/unifinders-web

# Install dependencies
npm install

# Build for production
npm run build

# If successful, you'll see:
# ✓ Compiled successfully
# ✓ Created optimized production build
```

**If build fails:**
- Check for TypeScript errors: `npm run lint`
- Fix any issues and commit before proceeding

---

## Step 2: Commit & Push Code

Push code from `DEV` branch to `main` (production branch).

```bash
# Fetch latest remote branches
git fetch origin --prune

# Switch to DEV and ensure it's up-to-date
git checkout DEV
git pull origin DEV

# Create main branch (if it doesn't exist) from DEV
if git rev-parse --verify main >/dev/null 2>&1; then
  git checkout main
  git pull origin main
  git merge --no-ff DEV -m "chore: promote DEV -> main for production"
else
  git checkout -b main DEV
fi

# Push main to remote
git push -u origin main

# Create a PR on GitHub (optional but recommended)
gh pr create --title "Deploy: Promote DEV to main (Production)" \
  --body "This PR promotes all development changes to main for production deployment." \
  --base main --head DEV
```

**Expected output:**
```
Switched to branch 'main'
[main abc123] chore: promote DEV -> main for production
 X files changed, Y insertions(+), Z deletions(-)
...
To github.com:arunchaudharyofc/Unifinders-Website.git
 * [new branch]          main -> main
```

---

## Step 3: Connect to Vercel

### Option A: Import via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Find and select **`arunchaudharyofc/Unifinders-Website`**
4. Configure project settings:
   - **Project Name:** `unifinders-web` or your preferred name
   - **Root Directory:** `unifinders-web/`
   - **Framework:** Auto-detected as **Next.js**
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)
5. Click **Deploy** (you'll add environment variables in the next step)

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login   # Sign in with your GitHub account

cd unifinders-web
vercel link    # Link to an existing Vercel project or create new
vercel deploy --prod  # Deploy to production
```

---

## Step 4: Configure Environment Variables

### Required Environment Variables for Production

| Variable | Value | Where to Get |
|----------|-------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | Supabase > Settings > Database |
| `DIRECT_URL` | Same as DATABASE_URL | Supabase > Settings > Database |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://umekgwwrsucnxxfvfqkw.supabase.co` | Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | JWT format key (eyJ...) | Supabase > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | Supabase > Settings > API |
| `RESEND_API_KEY` | re_xxxxxxxxxxxx | Resend Dashboard > API Keys |
| `RESEND_FROM_EMAIL` | noreply@unifinders.com | Your verified domain |
| `NEXT_PUBLIC_SITE_URL` | https://unifinders.com | Your production domain |

### Add Env Vars via Vercel Dashboard

1. Go to your Vercel project > **Settings** > **Environment Variables**
2. For each variable above, click **Add New**
3. Enter the key and value
4. Set **Environment** to `Production` (or `Production, Preview, Development` as needed)
5. Click **Save**

### (Alternative) Add via Vercel CLI

```bash
# Install Vercel CLI globally (if not already done)
npm i -g vercel
vercel link

# Add each variable
vercel env add DATABASE_URL --environment production
vercel env add DIRECT_URL --environment production
vercel env add NEXT_PUBLIC_SUPABASE_URL --environment production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY --environment production
vercel env add SUPABASE_SERVICE_ROLE_KEY --environment production
vercel env add RESEND_API_KEY --environment production
vercel env add RESEND_FROM_EMAIL --environment production
vercel env add NEXT_PUBLIC_SITE_URL --environment production
```

You'll be prompted to enter each value interactively.

---

## Step 5: Deploy to Production

### Option A: Automatic Deployment (Recommended)

Once the Vercel project is connected to GitHub, every push to `main` automatically deploys:

```bash
git push origin main
```

Vercel will:
1. Detect the push
2. Run the build command
3. Deploy to production
4. Show real-time build logs in the Vercel dashboard

### Option B: Manual Deployment

```bash
# Deploy to production immediately
vercel --prod
```

**Expected output:**
```
Vercel CLI 34.x.x
Production Deployment
...
✓ Built [2.3s]
✓ Assets optimized [1.2s]
✓ Deployed to production [0.8s]

✓ Production: https://unifinders-production.vercel.app (git: main)
```

---

## Step 6: Post-Deployment Verification

### Health Checks

Run these tests immediately after deployment:

```bash
# 1. Check site loads
curl -I https://unifinders.com

# 2. Test authentication (Google OAuth)
# Visit: https://unifinders.com/auth/login
# Verify: Google login button appears and redirects work

# 3. Test booking endpoint
curl -X POST https://unifinders.com/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","phone":"+977123","service":"Counseling"}'

# 4. Check database connectivity
# Visit: https://unifinders.com/dashboard
# Log in to verify profile data loads
```

### Vercel Dashboard Verification

1. Go to https://vercel.com/arunchaudharyofc/unifinders-web
2. Check **Recent Deployments** — should show "✓ Production" with a green checkmark
3. Click on the deployment to see build logs (confirm no errors)
4. Click **Visit** to open the live site

### Feature Smoke Tests

- [ ] **Homepage** loads with all sections
- [ ] **Courses page** displays course listings
- [ ] **Events page** shows upcoming events
- [ ] **Login/Register** pages load correctly
- [ ] **Appointment booking** works (test POST to `/api/appointments`)
- [ ] **Dashboard** loads for authenticated users
- [ ] **Admin panel** accessible to admin users
- [ ] **Emails** are sent via Resend (check Resend dashboard for delivery logs)

---

## Troubleshooting

### Build Fails with TypeScript Errors

```bash
# Fix lint errors locally first
npm run lint
npm run build

# Commit and push the fix
git add .
git commit -m "fix: resolve build errors"
git push origin main
```

### "Cannot find module @prisma/client"

The build needs Prisma dependencies:

```bash
# In Vercel, make sure prisma is in devDependencies
npm install --save-dev prisma

# Re-push the code
git push origin main
```

### Supabase Auth Fails (401 Unauthorized)

**Issue:** NEXT_PUBLIC_SUPABASE_ANON_KEY is in the wrong format

**Solution:**
1. Go to Supabase > Project Settings > API
2. Copy the **anon** key (should start with `eyJ...` — JWT format, not `sb_publishable_...`)
3. Update Vercel environment variable:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY eyJ... --environment production
   ```
4. Redeploy via Vercel dashboard

### Email Not Sending (Resend)

**Issue:** `RESEND_API_KEY` is invalid or domain not verified

**Solution:**
1. Go to https://resend.com/domains
2. Verify your sending domain (unifinders.com) has proper DNS records
3. Confirm API key is valid in Resend dashboard
4. Check Vercel env var matches exactly (no extra spaces)
5. Redeploy and test via dashboard

### Database Connection Timeout

**Issue:** Vercel can't reach Supabase from deployment

**Solution:**
1. Whitelist Vercel's IP addresses in Supabase:
   - Go to Supabase > Project Settings > Database > IP Whitelist
   - Add `0.0.0.0/0` to allow all (less secure) OR request Vercel's IP ranges
2. Confirm `DATABASE_URL` and `DIRECT_URL` are correct
3. Test connection:
   ```bash
   npm run build   # This validates DB connection during build
   ```

### Preview Deployment Fails But Production Doesn't

This usually means environment variables are only set for `Production` environment.

**Solution:**
1. In Vercel Settings > Environment Variables
2. For variables that should be available in preview, change environment to:
   - `Preview, Production` (for most variables)
   - `Production` only (for sensitive secrets like SUPABASE_SERVICE_ROLE_KEY)

---

## Quick Reference

### Deployment URLs

- **Production:** https://unifinders.com (after custom domain setup)
- **Vercel Preview:** https://unifinders-web.vercel.app
- **Vercel Dashboard:** https://vercel.com/arunchaudharyofc/unifinders-web

### Important Files

- `next.config.ts` — Next.js build configuration
- `vercel.json` — Vercel deployment settings (headers, redirects, regions)
- `.env.production` — Production environment variables (in Vercel dashboard, not in repo)
- `prisma/schema.prisma` — Database schema

### Emergency Rollback

If production is broken, rollback to the previous version:

1. Go to Vercel Dashboard > Deployments
2. Find the previous working deployment
3. Click **...** > **Promote to Production**

### Useful Commands

```bash
# Check all environment variables in Vercel
vercel env list

# View production logs
vercel logs --prod

# List all deployments
vercel list

# Trigger a manual redeploy
vercel deploy --prod

# Test build locally before pushing
npm run build && npm start
```

---

## Support

For issues during deployment:

- **Vercel Docs:** https://vercel.com/docs/deployments/overview
- **Supabase Docs:** https://supabase.com/docs
- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs

Good luck! 🎉

-- End
