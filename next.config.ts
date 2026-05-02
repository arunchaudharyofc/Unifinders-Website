import type { NextConfig } from "next";

// ──────────────────────────────────────────────────────────────────
//  Content-Security-Policy
//  NOTE: We intentionally set this here (not in vercel.json) so that
//  Vercel's edge does NOT inject its own nonce.  When a nonce is
//  present the browser silently ignores 'unsafe-inline', which breaks
//  Next.js hydration scripts and all interactive UI.
// ──────────────────────────────────────────────────────────────────
const CSP = [
  "default-src 'self'",
  // Next.js needs unsafe-eval for hot-reload chunks; unsafe-inline for
  // its inline bootstrap scripts.  Both are safe here because we own
  // the entire script surface.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // Allow images from anywhere (CDN, Unsplash, Supabase storage, etc.)
  "img-src 'self' blob: data: https: http:",
  // Supabase REST + realtime WebSocket, plus Vercel live feedback
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live wss://vercel.live https://www.google-analytics.com",
  // Google OAuth & Facebook OAuth open in same tab (no iframe needed)
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  // Allow form submissions only to same origin
  "form-action 'self' https://accounts.google.com https://www.facebook.com",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy",   value: CSP },
          { key: "X-Frame-Options",            value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "X-XSS-Protection",           value: "1; mode=block" },
        ],
      },
      {
        // Long-lived cache for immutable static assets
        source: "/(.*)\\.(js|css|woff2|woff|ttf|png|jpg|jpeg|svg|ico|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export default nextConfig;
