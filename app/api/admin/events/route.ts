/**
 * /api/admin/events
 * ─────────────────
 * Admin-only CRUD for events.
 * GET  — list events
 * POST — create event
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, missingFields, rateLimit,
  auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { EventStatus } from "@prisma/client";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as EventStatus | null;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));

  try {
    const where = {
      deletedAt: null as null,
      ...(status ? { status } : {}),
    };

    const [events, total] = await Promise.all([
      db.event.findMany({
        where,
        orderBy: { startDate: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.event.count({ where }),
    ]);

    return withSecurityHeaders(ok({ events, total, page, limit }));
  } catch (e) {
    console.error("[Admin Events GET]", e);
    return err("Failed to fetch events", 500);
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

  const missing = missingFields(b, ["title", "description", "location", "startDate"]);
  if (missing) return err(missing, 422);

  const startDate = new Date(String(b.startDate));
  if (isNaN(startDate.getTime())) return err("Invalid startDate", 422);

  try {
    let slug = b.slug ? String(b.slug) : slugify(String(b.title));
    const existing = await db.event.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const event = await db.event.create({
      data: {
        slug,
        title: String(b.title).trim().slice(0, 200),
        description: String(b.description).trim(),
        longDescription: b.longDescription ? String(b.longDescription) : null,
        coverImage: b.coverImage ? String(b.coverImage) : null,
        heroImage: b.heroImage ? String(b.heroImage) : null,
        location: String(b.location).trim(),
        venueDetails: b.venueDetails ? String(b.venueDetails) : null,
        eventType: b.eventType ? String(b.eventType) : "seminar",
        startDate,
        endDate: b.endDate ? new Date(String(b.endDate)) : null,
        registrationDeadline: b.registrationDeadline ? new Date(String(b.registrationDeadline)) : null,
        maxAttendees: b.maxAttendees ? Number(b.maxAttendees) : null,
        isFree: b.isFree !== false,
        price: b.price ? Number(b.price) : null,
        status: (b.status as EventStatus) ?? "UPCOMING",
        tags: Array.isArray(b.tags) ? (b.tags as string[]) : [],
        speakers: b.speakers ? (b.speakers as object) : undefined,
        sponsors: b.sponsors ? (b.sponsors as object) : undefined,
        faqs: b.faqs ? (b.faqs as object) : undefined,
        registrationLink: b.registrationLink ? String(b.registrationLink) : null,
        isVirtual: b.isVirtual === true,
        meetingLink: b.meetingLink ? String(b.meetingLink) : null,
        createdById: ctx.userId,
      },
    });

    await auditLog({
      userId: ctx.userId, userRole: "admin",
      action: "CREATE", resource: "events", resourceId: event.id,
      newValue: { title: event.title, slug: event.slug }, req,
    });

    return withSecurityHeaders(ok(event, 201));
  } catch (e) {
    console.error("[Admin Events POST]", e);
    return err("Failed to create event", 500);
  }
}
