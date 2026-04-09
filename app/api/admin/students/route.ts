/**
 * /api/admin/students
 * ───────────────────
 * GET — list all students (admin/counselor only)
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, requireRole, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleCheck = requireRole(ctx, ["admin", "counselor"]);
  if (roleCheck) return roleCheck;

  try {
    const students = await db.student.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        preferredCountries: true,
        preferredLevel: true,
        profileStatus: true,
        createdAt: true,
        profile: { select: { role: true } }
      },
    });

    const formatted = students.map(s => ({
      ...s,
      role: s.profile?.role || "student"
    }));

    const res = ok({ students: formatted, total: formatted.length });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Admin Students GET]", e);
    return err("Failed to fetch students", 500);
  }
}
