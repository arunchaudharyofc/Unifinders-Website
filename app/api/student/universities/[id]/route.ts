/**
 * GET /api/student/universities/[id]
 * University detail with all programs
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { id } = await params;

  const university = await db.university.findFirst({
    where: { id, isActive: true, deletedAt: null },
    include: {
      programs: {
        where: { isActive: true },
        orderBy: [{ level: "asc" }, { name: "asc" }],
      },
    },
  });

  if (!university) return err("University not found", 404);

  const res = ok(university);
  return withSecurityHeaders(res);
}
