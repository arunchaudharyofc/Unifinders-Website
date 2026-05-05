/**
 * /api/student/bookmarks
 * GET  — list bookmarks (filter by entityType: university|program|scholarship)
 * POST — add a bookmark
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody, missingFields, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const url = new URL(req.url);
  const entityType = url.searchParams.get("type") || undefined;
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(url.searchParams.get("limit") || "12"));

  try {
    const where = {
      userId: ctx.userId,
      ...(entityType ? { entityType } : {}),
    };

    const [bookmarks, total] = await Promise.all([
      db.bookmark.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.bookmark.count({ where }),
    ]);

    // Hydrate bookmark entities
    const hydrated = await Promise.all(
      bookmarks.map(async (bm) => {
        let entity: Record<string, unknown> | null = null;
        if (bm.entityType === "university") {
          entity = await db.university.findUnique({
            where: { id: bm.entityId },
            select: {
              id: true, name: true, country: true, city: true, type: true,
              ranking: true, established: true, coverImageUrl: true, logoUrl: true,
              intakes: true, _count: { select: { programs: true } },
            },
          });
        } else if (bm.entityType === "program") {
          entity = await db.universityProgram.findUnique({
            where: { id: bm.entityId },
            include: {
              university: {
                select: { id: true, name: true, country: true, logoUrl: true, coverImageUrl: true, ranking: true },
              },
            },
          });
        } else if (bm.entityType === "scholarship") {
          entity = await db.scholarship.findUnique({
            where: { id: bm.entityId },
            select: {
              id: true, title: true, provider: true, country: true,
              level: true, amount: true, deadline: true, imageUrl: true,
            },
          });
        }
        return { ...bm, entity };
      })
    );

    return withSecurityHeaders(ok({
      data: hydrated,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    }));
  } catch (e) {
    return err("Failed to fetch bookmarks", 500);
  }
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body) return body as Response;
  const b = body as Record<string, unknown>;

  const missing = missingFields(b, ["entityType", "entityId"]);
  if (missing) return err(missing, 422);

  const entityType = String(b.entityType);
  const entityId = String(b.entityId);

  if (!["university", "program", "scholarship"].includes(entityType)) {
    return err("entityType must be university, program, or scholarship", 422);
  }

  try {
    const bookmark = await db.bookmark.upsert({
      where: {
        userId_entityType_entityId: { userId: ctx.userId, entityType, entityId },
      },
      create: { userId: ctx.userId, entityType, entityId },
      update: {},
    });

    return withSecurityHeaders(ok(bookmark, 201));
  } catch (e) {
    return err("Failed to create bookmark", 500);
  }
}
