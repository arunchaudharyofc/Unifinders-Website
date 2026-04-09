/**
 * /api/admin/blog/[id]
 * ─────────────────────
 * GET    — single post detail
 * PUT    — full update
 * DELETE — soft delete
 */

import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import {
  ok, err, requireAuth, requireRole,
  parseBody, auditLog, withSecurityHeaders,
} from "@/lib/api-helpers";
import type { ContentStatus } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin"]);
  if (roleGuard) return roleGuard;

  const { id } = await params;
  try {
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post || post.deletedAt) return err("Post not found", 404);
    return withSecurityHeaders(ok(post));
  } catch (e) {
    console.error("[Admin Blog GET/:id]", e);
    return err("Failed to fetch post", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin"]);
  if (roleGuard) return roleGuard;

  const { id } = await params;
  const body = await parseBody<Record<string, unknown>>(req);
  if ("status" in body && !(body as object)) return body as Response;
  const b = body as Record<string, unknown>;

  try {
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing || existing.deletedAt) return err("Post not found", 404);

    const updated = await db.blogPost.update({
      where: { id },
      data: {
        ...(b.title ? { title: String(b.title).slice(0, 200) } : {}),
        ...(b.excerpt !== undefined ? { excerpt: b.excerpt ? String(b.excerpt).slice(0, 500) : null } : {}),
        ...(b.content ? { content: b.content as object } : {}),
        ...(b.coverImage !== undefined ? { coverImage: b.coverImage ? String(b.coverImage) : null } : {}),
        ...(b.category ? { category: String(b.category) } : {}),
        ...(b.tags ? { tags: Array.isArray(b.tags) ? (b.tags as string[]) : [] } : {}),
        ...(b.readTime ? { readTime: Number(b.readTime) } : {}),
        ...(b.status ? { status: b.status as ContentStatus } : {}),
        ...(b.status === "PUBLISHED" && !existing.publishedAt ? { publishedAt: new Date() } : {}),
        ...(b.authorName ? { authorName: String(b.authorName) } : {}),
        ...(b.authorRole !== undefined ? { authorRole: b.authorRole ? String(b.authorRole) : null } : {}),
      },
    });

    await auditLog({
      userId: ctx.userId, userRole: "admin",
      action: "UPDATE", resource: "blog_posts", resourceId: id,
      oldValue: { title: existing.title, status: existing.status },
      newValue: { title: updated.title, status: updated.status },
      req,
    });

    return withSecurityHeaders(ok(updated));
  } catch (e) {
    console.error("[Admin Blog PUT]", e);
    return err("Failed to update post", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  const roleGuard = requireRole(ctx, ["admin"]);
  if (roleGuard) return roleGuard;

  const { id } = await params;
  try {
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post || post.deletedAt) return err("Post not found", 404);

    await db.blogPost.update({ where: { id }, data: { deletedAt: new Date() } });

    await auditLog({
      userId: ctx.userId, userRole: "admin",
      action: "DELETE", resource: "blog_posts", resourceId: id, req,
    });

    return withSecurityHeaders(ok({ message: "Post deleted" }));
  } catch (e) {
    console.error("[Admin Blog DELETE]", e);
    return err("Failed to delete post", 500);
  }
}
