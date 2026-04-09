/**
 * /api/admin/universities
 * ─────────────────────────
 * Admin CRUD for partner universities.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, missingFields, rateLimit,
  auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "30"));

  try {
    const where = {
      isActive: true,
      ...(country ? { country } : {}),
    };

    const [universities, total] = await Promise.all([
      db.university.findMany({
        where,
        orderBy: { ranking: "asc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          programs: { where: { isActive: true }, select: { id: true, name: true, level: true, field: true } },
        },
      }),
      db.university.count({ where }),
    ]);

    return withSecurityHeaders(ok({ universities, total, page, limit }));
  } catch (e) {
    console.error("[Admin Universities GET]", e);
    return err("Failed to fetch universities", 500);
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

  const missing = missingFields(b, ["name", "country"]);
  if (missing) return err(missing, 422);

  try {
    const university = await db.university.create({
      data: {
        name: String(b.name).trim().slice(0, 200),
        country: String(b.country).trim(),
        city: b.city ? String(b.city).trim() : null,
        logoUrl: b.logoUrl ? String(b.logoUrl) : null,
        websiteUrl: b.websiteUrl ? String(b.websiteUrl) : null,
        ranking: b.ranking ? Number(b.ranking) : null,
        type: b.type ? String(b.type) : null,
        description: b.description ? String(b.description).slice(0, 2000) : null,
        intakes: Array.isArray(b.intakes) ? (b.intakes as string[]) : [],
        applicationFee: b.applicationFee ? Number(b.applicationFee) : null,
        minIelts: b.minIelts ? Number(b.minIelts) : null,
        minToefl: b.minToefl ? Number(b.minToefl) : null,
        minGpa: b.minGpa ? Number(b.minGpa) : null,
        tuitionRangeMin: b.tuitionRangeMin ? Number(b.tuitionRangeMin) : null,
        tuitionRangeMax: b.tuitionRangeMax ? Number(b.tuitionRangeMax) : null,
      },
    });

    await auditLog({
      userId: ctx.userId, userRole: "admin",
      action: "CREATE", resource: "universities", resourceId: university.id,
      newValue: { name: university.name, country: university.country }, req,
    });

    return withSecurityHeaders(ok(university, 201));
  } catch (e) {
    console.error("[Admin Universities POST]", e);
    return err("Failed to create university", 500);
  }
}
