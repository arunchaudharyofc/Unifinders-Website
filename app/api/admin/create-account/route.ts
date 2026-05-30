/**
 * POST /api/admin/create-account
 * Creates a Supabase auth user + Profile + Staff or Student record.
 * Admin only. Uses service role key to bypass email verification.
 */
import { NextRequest } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { db } from "@/lib/db";
import { ok, err, requireAuth, parseBody } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;
  if (ctx.role !== "admin") return err("Admin access required", 403);

  const body = await parseBody<Record<string, unknown>>(req);
  if (body instanceof Response) return body;
  const b = body as Record<string, unknown>;

  const role = (b.role as string)?.toLowerCase();
  if (!["staff", "student"].includes(role)) return err("Role must be 'staff' or 'student'", 422);

  const email = (b.email as string)?.trim().toLowerCase();
  const fullName = (b.fullName as string)?.trim();
  const password = (b.password as string)?.trim();

  if (!email || !fullName || !password) return err("email, fullName, and password are required", 422);
  if (password.length < 8) return err("Password must be at least 8 characters", 422);

  // Use service role to create user without email confirmation
  const adminSupabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    // Create Supabase auth user
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (authError || !authData.user) {
      if (authError?.message?.includes("already registered")) {
        return err("A user with this email already exists", 409);
      }
      return err(authError?.message || "Failed to create auth user", 500);
    }

    const userId = authData.user.id;

    // Create Profile row
    await db.profile.create({
      data: {
        userId,
        role: role as "staff" | "student",
        fullName,
        phone: (b.phone as string)?.trim() || null,
        avatar: null,
      },
    });

    // Create role-specific record
    if (role === "staff") {
      await db.staff.create({
        data: {
          userId,
          department: (b.department as string)?.trim() || null,
          designation: (b.designation as string)?.trim() || null,
          joinDate: b.joinDate ? new Date(b.joinDate as string) : new Date(),
        },
      });
    } else {
      // student
      const nameParts = fullName.split(" ");
      await db.student.create({
        data: {
          userId,
          email,
          firstName: nameParts[0] || fullName,
          lastName: nameParts.slice(1).join(" ") || "",
          phone: (b.phone as string)?.trim() || null,
          city: (b.city as string)?.trim() || null,
          educationLevel: (b.educationLevel as string)?.trim() || null,
        },
      });
    }

    return ok({ userId, email, role, fullName }, 201);
  } catch (e: unknown) {
    console.error("Account creation error:", e);
    // Clean up auth user if DB failed
    const msg = e instanceof Error ? e.message : "Unknown error";
    return err(`Account creation failed: ${msg}`, 500);
  }
}
