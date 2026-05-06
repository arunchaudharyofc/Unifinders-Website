/**
 * POST /api/seed — Seeds DB with real university data
 * Only works with admin auth
 */
import { NextRequest } from "next/server";
import { ok, err, withSecurityHeaders } from "@/lib/api-helpers";

// This endpoint is disabled in production. Use npx tsx prisma/seed/index.ts instead.
export async function POST(req: NextRequest) {
  return err("Use CLI seed: npx tsx prisma/seed/index.ts", 403);
}
