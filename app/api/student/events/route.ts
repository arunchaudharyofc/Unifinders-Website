/**
 * GET /api/student/events
 * Browse events with upcoming/past filter
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "upcoming";
  const q = url.searchParams.get("q") || "";
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(url.searchParams.get("limit") || "12"));

  try {
    const now = new Date();
    const where: Record<string, unknown> = { deletedAt: null };

    if (status === "upcoming") {
      where.startDate = { gte: now };
    } else {
      where.startDate = { lt: now };
    }

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
      ];
    }

    const [events, total] = await Promise.all([
      db.event.findMany({
        where: where as any,
        orderBy: status === "upcoming" ? { startDate: "asc" } : { startDate: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.event.count({ where: where as any }),
    ]);

    return withSecurityHeaders(ok({
      data: events,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  } catch (e) {
    return err("Failed to fetch events", 500);
  }
}
