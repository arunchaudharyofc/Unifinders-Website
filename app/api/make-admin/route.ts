import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { db } from "@/lib/db";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const email = "admin@unifinders.com";
  const password = "AdminPassword@123!";

  try {
    const { data: { user }, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "Super Admin" },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        const existingUsers = await supabase.auth.admin.listUsers();
        const existingUser = existingUsers.data.users.find(u => u.email === email);
        if (existingUser) {
          await supabase.auth.admin.deleteUser(existingUser.id);
          const { data: newAttempt, error: newError } = await supabase.auth.admin.createUser({
            email, password, email_confirm: true, user_metadata: { full_name: "Super Admin" },
          });
          if (newError) throw newError;
          await seedPrisma(newAttempt.user!.id);
          return NextResponse.json({ success: true, message: "Admin recreated!", email, password });
        }
      }
      return NextResponse.json({ error: error.message });
    }

    await seedPrisma(user!.id);
    return NextResponse.json({ success: true, message: "Admin created!", email, password });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}

async function seedPrisma(userId: string) {
  await db.profile.upsert({
    where: { userId },
    update: { role: "admin" },
    create: { userId, role: "admin", fullName: "Super Admin" },
  });
}
