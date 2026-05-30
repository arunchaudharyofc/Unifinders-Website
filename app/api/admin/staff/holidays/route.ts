import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if (body instanceof Response) return body;
  const b = body as Record<string, unknown>;

  const name = b.name as string;
  const dateStr = b.date as string;
  const type = b.type as "PUBLIC" | "RELIGIOUS" | "COMPANY" | "RESTRICTED";
  const isOptional = !!b.isOptional;

  if (!name || !dateStr || !type) {
    return err("name, date, and type are required", 422);
  }

  try {
    const targetDate = new Date(dateStr);
    const dateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

    const holiday = await db.holiday.upsert({
      where: { date: dateOnly },
      create: {
        name,
        date: dateOnly,
        type,
        isOptional,
        createdById: ctx.userId
      },
      update: {
        name,
        type,
        isOptional
      }
    });

    return ok(holiday, 201);
  } catch (e) {
    console.error("Create holiday error:", e);
    return err("Failed to create holiday", 500);
  }
}
