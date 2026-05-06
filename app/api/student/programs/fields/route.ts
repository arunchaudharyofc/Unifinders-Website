/**
 * GET /api/student/programs/fields
 * Study field catalog with program counts
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const fields = await db.studyField.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  // Count programs per field
  const fieldsWithCounts = await Promise.all(
    fields.map(async (f) => {
      const count = await db.universityProgram.count({
        where: { field: { contains: f.name, mode: "insensitive" }, isActive: true },
      });
      return { ...f, programCount: count };
    })
  );

  const res = ok(fieldsWithCounts);
  return withSecurityHeaders(res);
}
