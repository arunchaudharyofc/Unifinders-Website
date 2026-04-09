/**
 * /api/admin/scholarships
 * ─────────────────────────
 * Admin-only CRUD for scholarships.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, missingFields, rateLimit,
  auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { ScholarshipStatus } from "@prisma/client";

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as ScholarshipStatus | null;
  const country = searchParams.get("country");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));

  try {
    const where = {
      deletedAt: null as null,
      ...(status ? { status } : {}),
      ...(country ? { country } : {}),
    };

    const [scholarships, total] = await Promise.all([
      db.scholarship.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.scholarship.count({ where }),
    ]);

    return withSecurityHeaders(ok({ scholarships, total, page, limit }));
  } catch (e) {
    console.error("[Admin Scholarships GET]", e);
    return err("Failed to fetch scholarships", 500);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 20, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin"]);
  if (roleGuard) return roleGuard;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  const missing = missingFields(b, ["title", "provider", "country", "level", "amount", "description"]);
  if (missing) return err(missing, 422);

  try {
    let slug = b.slug ? String(b.slug) : slugify(String(b.title));
    const existing = await db.scholarship.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const scholarship = await db.scholarship.create({
      data: {
        slug,
        title: String(b.title).trim().slice(0, 200),
        provider: String(b.provider).trim(),
        country: String(b.country).trim(),
        level: String(b.level).trim(),
        field: b.field ? String(b.field) : null,
        amount: String(b.amount).trim(),
        currency: b.currency ? String(b.currency) : "USD",
        deadline: b.deadline ? new Date(String(b.deadline)) : null,
        status: (b.status as ScholarshipStatus) ?? "OPEN",
        description: String(b.description).trim(),
        eligibility: Array.isArray(b.eligibility) ? (b.eligibility as object) : [],
        coverage: Array.isArray(b.coverage) ? (b.coverage as object) : [],
        applicationSteps: Array.isArray(b.applicationSteps) ? (b.applicationSteps as object) : [],
        tags: Array.isArray(b.tags) ? (b.tags as string[]) : [],
        officialLink: b.officialLink ? String(b.officialLink) : null,
        imageUrl: b.imageUrl ? String(b.imageUrl) : null,
        isFeatured: b.isFeatured === true,
        createdById: ctx.userId,
      },
    });

    await auditLog({
      userId: ctx.userId, userRole: "admin",
      action: "CREATE", resource: "scholarships", resourceId: scholarship.id,
      newValue: { title: scholarship.title }, req,
    });

    return withSecurityHeaders(ok(scholarship, 201));
  } catch (e) {
    console.error("[Admin Scholarships POST]", e);
    return err("Failed to create scholarship", 500);
  }
}
