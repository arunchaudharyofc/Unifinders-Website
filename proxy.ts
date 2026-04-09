/**
 * Next.js Proxy (formerly Middleware)
 * ──────────────────
 * Runs on every request BEFORE the page renders.
 * 1. Refresh Supabase session (keep cookies fresh)
 * 2. Protect /dashboard and /onboarding
 * 3. Set Content-Security-Policy + security headers
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

export default async function proxy(request: NextRequest) {
  // 0. Course alias redirects
  const { pathname } = request.nextUrl;
  const courseTarget = COURSE_ALIASES[pathname];
  if (courseTarget) {
    return NextResponse.redirect(new URL(courseTarget, request.url));
  }

  // 1. Run Supabase session refresh + route protection
  const response = await updateSession(request);

  // 2. Security Headers (applied to ALL responses)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' 'nonce-${nonce}' https://vercel.live`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' blob: data: https: http:`,
    `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live`,
    `frame-src 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
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
    "/((?!_next/static|_next/image|favicon.ico|images/|fonts/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)",
  ],
};
