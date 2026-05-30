/**
 * GET  /api/student/bookmarks        — list bookmarks by type
 * POST /api/student/bookmarks        — add bookmark
 * DELETE /api/student/bookmarks      — remove bookmark (body: entityType, entityId)
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const type = new URL(req.url).searchParams.get("type") || "";
  const where: any = { userId: ctx.userId };
  if (type) where.entityType = type;

  const bookmarks = await db.bookmark.findMany({ where, orderBy: { createdAt: "desc" } });

  // Enrich with entity data
  const enriched = await Promise.all(
    bookmarks.map(async (bm) => {
      let entity: any = null;
      if (bm.entityType === "university") {
        entity = await db.university.findFirst({ where: { id: bm.entityId }, select: { id: true, name: true, country: true, city: true, ranking: true, coverImageUrl: true, logoUrl: true, type: true } });
      } else if (bm.entityType === "program") {
        entity = await db.universityProgram.findFirst({ where: { id: bm.entityId }, include: { university: { select: { id: true, name: true, country: true } } } });
      }
      return { ...bm, entity };
    })
  );

  return withSecurityHeaders(ok(enriched));
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const body = await parseBody<{ entityType: string; entityId: string }>(req);
  if (body instanceof Response) return body;
  const { entityType, entityId } = body as { entityType: string; entityId: string };

  if (!entityType || !entityId) return err("entityType and entityId are required", 422);

  try {
    const bookmark = await db.bookmark.create({ data: { userId: ctx.userId, entityType, entityId } });
    return withSecurityHeaders(ok(bookmark, 201));
  } catch {
    return err("Already bookmarked", 409);
  }
}

export async function DELETE(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const body = await parseBody<{ entityType: string; entityId: string }>(req);
  if (body instanceof Response) return body;
  const { entityType, entityId } = body as { entityType: string; entityId: string };

  await db.bookmark.deleteMany({ where: { userId: ctx.userId, entityType, entityId } });
  return withSecurityHeaders(ok({ deleted: true }));
}
