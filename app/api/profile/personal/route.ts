/**
 * PUT /api/profile/personal
 * Updates the current user's personal info in Student + Profile tables.
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, ok, err, parseBody } from "@/lib/api-helpers";

export async function PUT(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const body = await parseBody<Record<string, unknown>>(req);
  if (body instanceof Response) return body;
  const b = body as Record<string, string | null>;

  try {
    // Update profile fullName
    const firstName = (b.firstName || "").trim();
    const lastName = (b.lastName || "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    if (fullName) {
      await db.profile.update({
        where: { userId: ctx.userId },
        data: { fullName, phone: b.phone?.trim() || null },
      });
    }

    // Update student record if exists
    const student = await db.student.findUnique({ where: { userId: ctx.userId } });
    if (student) {
      await db.student.update({
        where: { userId: ctx.userId },
        data: {
          firstName: firstName || student.firstName,
          lastName: lastName || student.lastName,
          phone: b.phone?.trim() || null,
          gender: b.gender?.trim() || null,
          dateOfBirth: b.dateOfBirth ? new Date(b.dateOfBirth) : null,
          nationality: b.nationality?.trim() || student.nationality,
          city: b.city?.trim() || null,
          address: b.address?.trim() || null,
        },
      });
    }

    return ok({ message: "Profile updated" });
  } catch (e) {
    console.error("Profile update error:", e);
    return err("Failed to update profile", 500);
  }
}
