import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth, requireRole } from "@/lib/api-helpers";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  if (requireRole(authResult.ctx, ["admin"])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { role } = await req.json();

    if (!["admin", "counselor", "staff", "student"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Attempt update on Profile
    const updated = await db.profile.updateMany({
      where: { userId: id },
      data: { role: role as any }
    });

    return NextResponse.json({ success: true, count: updated.count });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
