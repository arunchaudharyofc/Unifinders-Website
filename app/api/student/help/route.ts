/**
 * GET /api/student/help
 * Help center articles - list or single article by slug
 */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth, withSecurityHeaders } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";

  if (slug) {
    const article = await db.helpArticle.findUnique({ where: { slug } });
    if (!article) return err("Article not found", 404);
    // Increment view count
    await db.helpArticle.update({ where: { slug }, data: { viewCount: { increment: 1 } } });
    return withSecurityHeaders(ok(article));
  }

  const where: any = { isPublished: true };
  if (category) where.category = category;
  if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { tags: { has: q } }];

  const articles = await db.helpArticle.findMany({
    where,
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
  });

  // Group by category
  const grouped = articles.reduce((acc: Record<string, any[]>, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});

  return withSecurityHeaders(ok({ articles, grouped }));
}
