/**
 * ============================================================================
 * POST /api/log-error — Production Error Log Sink
 * ============================================================================
 *
 * Receives client-side error payloads and logs them using the server-side
 * logger so they appear in Vercel's function logs.
 *
 * Access logs at: Vercel Dashboard → Project → Logs tab
 * Filter by:      [CLIENT ERROR] or [UNHANDLED REJECTION]
 *
 * Rate limited to prevent abuse: max 30 errors per IP per minute.
 * ============================================================================
 */
import { NextResponse } from "next/server";
import { createModuleLogger } from "@/lib/logger";

const log = createModuleLogger("ClientError");

// Simple in-memory rate limiter (resets on cold start, good enough for logging)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_MINUTE = 30;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= MAX_PER_MINUTE) return true;
  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const body = await request.json();
    const { type, timestamp, message, source, line, col, stack, url, userAgent } = body;

    // Log to Vercel's function output (visible in Dashboard → Logs)
    log.error(`[${type}] ${message}`, {
      timestamp,
      url,
      source,
      line,
      col,
      stack,
      userAgent: userAgent?.slice(0, 120), // Truncate UA to avoid noise
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    log.error("Failed to parse error log payload", err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
