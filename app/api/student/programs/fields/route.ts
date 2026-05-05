/**
 * GET /api/student/programs/fields
 * Study field catalog with program counts
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  try {
    const fields = await db.studyField.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    // Count programs per field
    const fieldsWithCounts = await Promise.all(
      fields.map(async (f) => {
        const programCount = await db.universityProgram.count({
          where: { field: { contains: f.slug.replace(/-/g, " "), mode: "insensitive" }, isActive: true },
        });
        // Also try matching by the field name
        const programCountByName = await db.universityProgram.count({
          where: { field: { contains: f.name.split(" ")[0], mode: "insensitive" }, isActive: true },
        });
        return { ...f, programCount: Math.max(programCount, programCountByName) };
      })
    );

    return withSecurityHeaders(ok(fieldsWithCounts));
  } catch (e) {
    return err("Failed to fetch study fields", 500);
  }
}
