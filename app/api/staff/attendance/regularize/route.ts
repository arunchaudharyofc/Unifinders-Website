import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "staff" && ctx.role !== "admin") return err("Access denied", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if (body instanceof Response) return body;
  const b = body as Record<string, unknown>;

  const dateStr = b.date as string;
  const checkInStr = b.checkIn as string;
  const checkOutStr = b.checkOut as string;
  const reason = b.reason as string;

  if (!dateStr || !checkInStr || !checkOutStr || !reason) {
    return err("date, checkIn, checkOut, and reason are required", 422);
  }

  try {
    const targetDate = new Date(dateStr);
    const dateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

    const notePayload = JSON.stringify({
      type: "REGULARIZATION",
      checkIn: checkInStr,
      checkOut: checkOutStr,
      reason: reason.trim()
    });

    const record = await db.attendance.upsert({
      where: {
        staffUserId_date: {
          staffUserId: ctx.userId,
          date: dateOnly
        }
      },
      create: {
        staffUserId: ctx.userId,
        date: dateOnly,
        status: "ABSENT",
        notes: `PENDING_REGULARIZATION:${notePayload}`
      },
      update: {
        notes: `PENDING_REGULARIZATION:${notePayload}`
      }
    });

    return ok({
      id: record.id,
      date: record.date.toISOString(),
      notes: record.notes
    });
  } catch (e) {
    console.error("Regularization request error:", e);
    return err("Failed to submit regularization request", 500);
  }
}
