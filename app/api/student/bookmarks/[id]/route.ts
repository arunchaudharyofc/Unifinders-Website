/**
 * DELETE /api/student/bookmarks/[id]
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  const { id } = await params;

  try {
    const bookmark = await db.bookmark.findUnique({ where: { id } });
    if (!bookmark || bookmark.userId !== ctx.userId) {
      return err("Bookmark not found", 404);
    }

    await db.bookmark.delete({ where: { id } });
    return withSecurityHeaders(ok({ message: "Bookmark removed" }));
  } catch (e) {
    return err("Failed to remove bookmark", 500);
  }
}
