/**
 * Next.js Middleware
 * ──────────────────
 * ⚠️  THIS FILE MUST BE NAMED middleware.ts — Next.js ignores any other name.
 *     (Previously named proxy.ts, which caused it to NEVER run, breaking all auth.)
 *
 * Runs on every request BEFORE the page renders.
 * 1. Refresh Supabase session (keep cookies fresh)
 * 2. Protect /dashboard, /onboarding, and /staff routes
 * 3. Set security headers (CSP WITHOUT nonce — see note below)
 *
 * ⚠️  WHY NO NONCE IN CSP:
 *  When both a nonce AND 'unsafe-inline' appear in script-src, the browser
 *  silently ignores 'unsafe-inline' (CSP Level 2+ spec).  This broke all
 *  Next.js hydration inline scripts in production, causing login, registration,
 *  and Navbar dropdowns to stop working completely.
 *
 *  The correct approach for Next.js is to use 'unsafe-inline' WITHOUT a nonce
 *  since we control the entire script surface.  If you need strict-CSP with
 *  nonces in the future, Next.js requires a custom nonce propagation setup
 *  (see: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy).
 */

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/** Course slug aliases: short → canonical */
const COURSE_ALIASES: Record<string, string> = {
  "/courses/ielts":  "/courses/ielts-preparation",
  "/courses/gmat":   "/courses/gmat-preparation",
  "/courses/gre":    "/courses/gre-preparation",
  "/courses/sat":    "/courses/sat-preparation",
  "/courses/toefl":  "/courses/toefl-preparation",
  "/courses/pte":    "/courses/pte-academic",
  "/courses/oet":    "/courses/oet-preparation",
  "/courses/det":    "/courses/duolingo-english-test",
};

/**
 * CSP without nonce so 'unsafe-inline' is honoured by the browser.
 * Headers are also set in next.config.ts for static routes — this middleware
 * overrides them for dynamic SSR routes where we need the full value.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' blob: data: https: http:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live wss://vercel.live https://www.google-analytics.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://accounts.google.com https://www.facebook.com",
  "upgrade-insecure-requests",
].join("; ");

export default async function middleware(request: NextRequest) {
  // 0. Course alias redirects
  const { pathname } = request.nextUrl;
  const courseTarget = COURSE_ALIASES[pathname];
  if (courseTarget) {
    return NextResponse.redirect(new URL(courseTarget, request.url));
  }

  // 1. Run Supabase session refresh + route protection
  const response = await updateSession(request);

  // 2. Security Headers (applied to ALL responses)
  //    ──────────────────────────────────────────────
  //    NOTE: No nonce is generated here. See file header for explanation.
  response.headers.set("Content-Security-Policy", CSP);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon-192.png|images/|fonts/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)",
  ],
};
