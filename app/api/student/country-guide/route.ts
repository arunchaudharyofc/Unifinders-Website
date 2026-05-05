/**
 * GET /api/student/country-guide
 * List all country guides
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  try {
    const guides = await db.countryGuide.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });

    return withSecurityHeaders(ok(guides));
  } catch (e) {
    return err("Failed to fetch country guides", 500);
  }
}
