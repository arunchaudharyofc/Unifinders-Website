/**
 * /api/appointments
 * ─────────────────
 * POST — Public. Books a counseling appointment.
 *        Rate-limited: 5 requests / 15 min per IP.
 * GET  — Protected (admin/counselor). Returns all appointments.
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, rateLimit, parseBody, missingFields,
  requireAuth, requireRole, withSecurityHeaders,
} from "@/lib/api-helpers";

// ── POST /api/appointments ─────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limit: 30 bookings per 15 min per IP (anti-spam)
  const limited = rateLimit(req, 30, 15 * 60_000);
  if (limited) return limited;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;

  const bodyObj = body as Record<string, unknown>;
  const missing = missingFields(bodyObj, [
    "fullName", "email", "phone", "service", "preferredDate", "timeSlot",
  ]);
  if (missing) return err(missing, 422);

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(bodyObj.email))) {
    return err("Invalid email address", 422);
  }

  // Validate date — compare at day level to avoid timezone edge cases
  const preferredDate = new Date(String(bodyObj.preferredDate));
  if (isNaN(preferredDate.getTime())) {
    return err("Preferred date is not a valid date", 422);
  }
  // Allow today or any future date (compare by stripping time)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(23, 59, 59, 999);
  if (preferredDate < yesterday) {
    return err("Preferred date must be today or a future date", 422);
  }

  try {
    const appointment = await db.appointment.create({
      data: {
        fullName: String(bodyObj.fullName).trim().slice(0, 100),
        email: String(bodyObj.email).toLowerCase().trim(),
        phone: String(bodyObj.phone).trim().slice(0, 20),
        service: String(bodyObj.service).trim(),
        country: bodyObj.country ? String(bodyObj.country).trim() : null,
        preferredDate,
        timeSlot: String(bodyObj.timeSlot),
        message: bodyObj.message ? String(bodyObj.message).trim().slice(0, 1000) : null,
        userId: bodyObj.userId ? String(bodyObj.userId) : null,
      },
    });

    const res = ok({ id: appointment.id, status: appointment.status }, 201);

    // Fire-and-forget confirmation email via Resend (non-blocking)
    if (process.env.RESEND_API_KEY) {
      fetch(`${req.nextUrl.origin}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "appointment_confirmation",
          to: appointment.email,
          data: {
            fullName: appointment.fullName,
            service: appointment.service,
            preferredDate: appointment.preferredDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
            timeSlot: appointment.timeSlot,
            country: appointment.country || "Not specified",
          },
        }),
      }).catch(e => console.error("[Email send failed]", e));
    }

    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Appointment POST]", e);
    return err("Failed to create appointment. Please try again.", 500);
  }
}

// ── GET /api/appointments ──────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));

  try {
    const [appointments, total] = await Promise.all([
      db.appointment.findMany({
        where: status ? { status: status as never } : {},
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.appointment.count({ where: status ? { status: status as never } : {} }),
    ]);

    const res = ok({ appointments, total, page, limit });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Appointment GET]", e);
    return err("Failed to fetch appointments", 500);
  }
}
