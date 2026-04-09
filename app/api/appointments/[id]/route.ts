/**
 * /api/appointments/[id]
 * ──────────────────────
 * PATCH — admin/counselor: confirm, cancel, add notes
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin", "counselor"]);
  if (roleGuard) return roleGuard;

  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const bodyObj = body as Record<string, unknown>;

  try {
    const existing = await db.appointment.findUnique({ where: { id } });
    if (!existing) return err("Appointment not found", 404);

    const updated = await db.appointment.update({
      where: { id },
      data: {
        ...(bodyObj.status ? { status: bodyObj.status as never } : {}),
        ...(bodyObj.counselorId ? { counselorId: String(bodyObj.counselorId) } : {}),
        ...(bodyObj.notes ? { notes: String(bodyObj.notes).slice(0, 2000) } : {}),
        ...(bodyObj.meetingLink ? { meetingLink: String(bodyObj.meetingLink) } : {}),
        ...(bodyObj.status === "CONFIRMED" ? { confirmedAt: new Date() } : {}),
        ...(bodyObj.status === "CANCELLED"
          ? {
              cancelledAt: new Date(),
              cancelReason: bodyObj.cancelReason
                ? String(bodyObj.cancelReason).slice(0, 500)
                : null,
            }
          : {}),
      },
    });

    await auditLog({
      userId: ctx.userId,
      userRole: ctx.role ?? "unknown",
      action: "UPDATE",
      resource: "appointments",
      resourceId: id,
      oldValue: existing,
      newValue: updated,
      req,
    });

    const res = ok(updated);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Appointment PATCH]", e);
    return err("Failed to update appointment", 500);
  }
}
