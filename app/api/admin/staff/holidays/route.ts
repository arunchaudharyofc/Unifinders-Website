/**
 * GET  /api/admin/staff/holidays       — List all holidays
 * POST /api/admin/staff/holidays       — Create a holiday (admin only)
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, rateLimit, parseBody } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin" && ctx.role !== "staff") return err("Access denied", 403);

  const url = new URL(req.url);
  const year = parseInt(url.searchParams.get("year") || String(new Date().getFullYear()));

  try {
    const holidays = await db.holiday.findMany({
      where: {
        date: {
          gte: new Date(year, 0, 1),
          lte: new Date(year, 11, 31),
        },
      },
      orderBy: { date: "asc" },
    });

    return ok(
      holidays.map((h) => ({
        id: h.id,
        name: h.name,
        date: h.date.toISOString(),
        type: h.type,
        description: h.description,
        isOptional: h.isOptional,
      }))
    );
  } catch (e) {
    console.error("Holiday list error:", e);
    return err("Failed to fetch holidays", 500);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 10, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body) return body as Response;
  const b = body as Record<string, unknown>;

  const name = (b.name as string)?.trim();
  const date = b.date as string;
  if (!name || !date) return err("name and date are required", 422);

  try {
    const holiday = await db.holiday.create({
      data: {
        name: name.slice(0, 100),
        date: new Date(date),
        type: (b.type as "PUBLIC" | "RELIGIOUS" | "COMPANY" | "RESTRICTED") || "PUBLIC",
        description: (b.description as string)?.trim()?.slice(0, 300) || null,
        isOptional: (b.isOptional as boolean) || false,
        createdById: ctx.userId,
      },
    });

    return ok({
      id: holiday.id,
      name: holiday.name,
      date: holiday.date.toISOString(),
      type: holiday.type,
    }, 201);
  } catch (e: unknown) {
    if (typeof e === "object" && e !== null && "code" in e && (e as { code: string }).code === "P2002") {
      return err("A holiday already exists on this date", 409);
    }
    console.error("Holiday create error:", e);
    return err("Failed to create holiday", 500);
  }
}
