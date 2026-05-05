/**
 * GET /api/student/help — list help articles by category
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const url = new URL(req.url);
  const category = url.searchParams.get("category") || undefined;
  const q = url.searchParams.get("q") || "";

  try {
    const where: Record<string, unknown> = { isPublished: true };
    if (category) where.category = category;
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
        { tags: { has: q.toLowerCase() } },
      ];
    }

    const articles = await db.helpArticle.findMany({
      where: where as any,
      orderBy: { displayOrder: "asc" },
      select: { id: true, category: true, title: true, slug: true, tags: true, viewCount: true },
    });

    // Group by category
    const grouped: Record<string, typeof articles> = {};
    articles.forEach(a => {
      if (!grouped[a.category]) grouped[a.category] = [];
      grouped[a.category].push(a);
    });

    return withSecurityHeaders(ok(category ? articles : grouped));
  } catch (e) {
    return err("Failed to fetch help articles", 500);
  }
}
