/**
 * POST /api/seed/dev — Dev-only seed stub
 * Use: npx tsx prisma/seed/index.ts instead.
 */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Use CLI seed: npx tsx prisma/seed/index.ts" }, { status: 403 });
}
