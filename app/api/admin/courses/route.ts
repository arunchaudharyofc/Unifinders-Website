/**
 * /api/admin/courses
 * ──────────────────
 * Admin-only CRUD for courses.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, missingFields, rateLimit,
  auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const isActive = searchParams.get("isActive");

  try {
    const courses = await db.course.findMany({
      where: {
        deletedAt: null,
        ...(category ? { category } : {}),
        ...(isActive !== null ? { isActive: isActive === "true" } : {}),
      },
      orderBy: [{ isFeatured: "desc" }, { enrollmentCount: "desc" }],
    });

    return withSecurityHeaders(ok(courses));
  } catch (e) {
    console.error("[Admin Courses GET]", e);
    return err("Failed to fetch courses", 500);
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

  const missing = missingFields(b, ["name", "category", "description", "duration"]);
  if (missing) return err(missing, 422);

  try {
    let slug = b.slug ? String(b.slug) : slugify(String(b.name));
    const existing = await db.course.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const course = await db.course.create({
      data: {
        slug,
        name: String(b.name).trim().slice(0, 100),
        shortName: b.shortName ? String(b.shortName) : null,
        category: String(b.category).trim(),
        description: String(b.description).trim(),
        longDescription: b.longDescription ? String(b.longDescription) : null,
        duration: String(b.duration).trim(),
        price: b.price ? Number(b.price) : null,
        currency: b.currency ? String(b.currency) : "NPR",
        level: b.level ? String(b.level) : null,
        format: Array.isArray(b.format) ? (b.format as string[]) : [],
        features: b.features ? (b.features as object) : undefined,
        syllabus: b.syllabus ? (b.syllabus as object) : undefined,
        instructors: b.instructors ? (b.instructors as object) : undefined,
        faqs: b.faqs ? (b.faqs as object) : undefined,
        imageUrl: b.imageUrl ? String(b.imageUrl) : null,
        icon: b.icon ? String(b.icon) : null,
        isFeatured: b.isFeatured === true,
        createdById: ctx.userId,
      },
    });

    await auditLog({
      userId: ctx.userId, userRole: "admin",
      action: "CREATE", resource: "courses", resourceId: course.id,
      newValue: { name: course.name, slug: course.slug }, req,
    });

    return withSecurityHeaders(ok(course, 201));
  } catch (e) {
    console.error("[Admin Courses POST]", e);
    return err("Failed to create course", 500);
  }
}
