/**
 * /api/admin/blog
 * ─────────────────
 * All routes require admin role.
 * GET    — list all posts (with pagination + filters)
 * POST   — create new blog post
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, missingFields, rateLimit,
  auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { ContentStatus } from "@prisma/client";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin"]);
  if (roleGuard) return roleGuard;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as ContentStatus | null;
  const category = searchParams.get("category");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));

  try {
    const where = {
      deletedAt: null as null,
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
    };

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, slug: true, title: true, excerpt: true, category: true,
          tags: true, status: true, publishedAt: true, viewCount: true,
          authorName: true, readTime: true, createdAt: true,
        },
      }),
      db.blogPost.count({ where }),
    ]);

    const res = ok({ posts, total, page, limit });
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Admin Blog GET]", e);
    return err("Failed to fetch blog posts", 500);
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, 20, 60_000);
  if (limited) return limited;

  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin"]);
  if (roleGuard) return roleGuard;

  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  const missing = missingFields(b, ["title", "content", "category", "authorName"]);
  if (missing) return err(missing, 422);

  try {
    let slug = b.slug ? String(b.slug) : slugify(String(b.title));
    // Ensure slug uniqueness
    const existing = await db.blogPost.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const post = await db.blogPost.create({
      data: {
        slug,
        title: String(b.title).trim().slice(0, 200),
        excerpt: b.excerpt ? String(b.excerpt).slice(0, 500) : null,
        content: b.content as object,
        coverImage: b.coverImage ? String(b.coverImage) : null,
        authorName: String(b.authorName).trim(),
        authorAvatar: b.authorAvatar ? String(b.authorAvatar) : null,
        authorRole: b.authorRole ? String(b.authorRole) : null,
        category: String(b.category).trim(),
        tags: Array.isArray(b.tags) ? (b.tags as string[]) : [],
        readTime: b.readTime ? Number(b.readTime) : null,
        status: (b.status as ContentStatus) ?? "DRAFT",
        publishedAt: b.status === "PUBLISHED" ? new Date() : null,
        createdById: ctx.userId,
      },
    });

    await auditLog({
      userId: ctx.userId, userRole: ctx.role ?? "admin",
      action: "CREATE", resource: "blog_posts", resourceId: post.id,
      newValue: { title: post.title, slug: post.slug }, req,
    });

    const res = ok(post, 201);
    return withSecurityHeaders(res);
  } catch (e) {
    console.error("[Admin Blog POST]", e);
    return err("Failed to create blog post", 500);
  }
}
