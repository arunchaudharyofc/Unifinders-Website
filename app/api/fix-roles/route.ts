import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get the real admin
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;

    const realAdmins = users.filter(u => u.email === "admin@unifinders.com").map(u => u.id);

    // Demote everyone who is NOT the real admin
    const result = await db.profile.updateMany({
      where: {
        role: "admin",
        userId: {
          notIn: realAdmins
        }
      },
      data: {
        role: "student"
      }
    });

    return NextResponse.json({ success: true, demotedCount: result.count });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
