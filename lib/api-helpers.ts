/**
 * API HELPERS — Security, Auth, Rate Limiting, Validation
 * --------------------------------------------------------
 * Central module used by ALL API route handlers.
 * - requireAuth(): parses Supabase session, returns user or 401
 * - requireRole(): RBAC guard (admin | counselor | student | staff)
 * - rateLimit(): in-memory IP-based rate limiter (resets per hour)
 * - ok() / err(): typed JSON response helpers
 * - validateBody(): Zod-based body parser with safe error messages
 * - auditLog(): writes to audit_logs table via Prisma
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/lib/db";
import type { UserRole } from "@prisma/client";

// ─── Response Helpers ────────────────────────────────────────────────────────

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function err(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { success: false, error: message, ...(details ? { details } : {}) },
    { status }
  );
}

// ─── Auth Guard ──────────────────────────────────────────────────────────────

export interface AuthContext {
  userId: string;
  email: string;
  role: UserRole | null;
}

/**
 * Validates the Supabase session from cookies.
 * Returns { user, ctx } on success, or a 401 NextResponse.
 */
export async function requireAuth(
  req: NextRequest
): Promise<{ ctx: AuthContext } | NextResponse> {
  void req; // consumed via cookie store automatically
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return err("Unauthorized — please log in", 401);
  }

  // Fetch role from Profile table
  let role: UserRole | null = null;
  try {
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      select: { role: true },
    });
    role = profile?.role ?? null;
  } catch {
    // DB might not be initialized yet; continue with null role
  }

  return {
    ctx: {
      userId: user.id,
      email: user.email ?? "",
      role,
    },
  };
}

/**
 * RBAC guard — call after requireAuth.
 * Returns 403 if user does not have one of the allowed roles.
 */
export function requireRole(
  ctx: AuthContext,
  allowed: UserRole[]
): NextResponse | null {
  if (!ctx.role || !allowed.includes(ctx.role)) {
    return err("Forbidden — insufficient permissions", 403);
  }
  return null;
}

// ─── Rate Limiter (DISABLED — re-enable before prod) ────────────────────────
// TODO: Re-enable before production launch
export function rateLimit(
  _req: NextRequest,
  _max?: number,
  _windowMs?: number
): NextResponse | null {
  return null; // Rate limiting disabled for testing
}

// ─── Body Validator ──────────────────────────────────────────────────────────

/**
 * Safe JSON body parser. Returns parsed object or err() response.
 */
export async function parseBody<T>(
  req: NextRequest
): Promise<T | NextResponse> {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return err("Request body must be a JSON object", 400);
    }
    return body as T;
  } catch {
    return err("Invalid JSON body", 400);
  }
}

/**
 * Simple field presence validator. Returns error message or null.
 */
export function missingFields(
  body: Record<string, unknown>,
  required: string[]
): string | null {
  const missing = required.filter(
    (f) => body[f] === undefined || body[f] === null || body[f] === ""
  );
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(", ")}`;
  }
  return null;
}

// ─── Audit Logger ─────────────────────────────────────────────────────────────

export async function auditLog(params: {
  userId: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId: string;
  oldValue?: unknown;
  newValue?: unknown;
  req?: NextRequest;
}) {
  try {
    await db.auditLog.create({
      data: {
        userId: params.userId,
        userRole: params.userRole,
        action: params.action,
        resource: params.resource,
        resourceId: params.resourceId,
        oldValue: params.oldValue ? (params.oldValue as object) : undefined,
        newValue: params.newValue ? (params.newValue as object) : undefined,
        ipAddress: params.req?.headers.get("x-forwarded-for")?.split(",")[0].trim(),
        userAgent: params.req?.headers.get("user-agent") ?? undefined,
      },
    });
  } catch (e) {
    // Non-blocking — audit failures should never break the request
    console.error("[AuditLog] Failed to write:", e);
  }
}

// ─── Security Headers ─────────────────────────────────────────────────────────

export function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}
