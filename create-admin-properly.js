import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const prisma = new PrismaClient();

async function seedAdmin() {
  const email = "admin@unifinders.com";
  const password = "AdminPassword@123!";

  console.log("Seeding real admin user using Service Key...");

  // 1. Create user in Supabase Auth (bypassing confirmations)
  const { data: { user }, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: "Super Admin" },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      console.log("User already exists, attempting to delete and recreate...");
      const existingUsers = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers.data.users.find(u => u.email === email);
      if (existingUser) {
        await supabase.auth.admin.deleteUser(existingUser.id);
        const { data: newAttempt, error: newError } = await supabase.auth.admin.createUser({
          email, password, email_confirm: true, user_metadata: { full_name: "Super Admin" },
        });
        if (newError) throw newError;
        console.log("Recreated user:", newAttempt.user?.id);
        await seedPrisma(newAttempt.user!.id, email);
        return;
      }
    } else {
      throw error;
    }
  } else {
    console.log("Created user:", user?.id);
    await seedPrisma(user!.id, email);
  }

  console.log("");
  console.log("=========================================");
  console.log("SUCCESS! ADMIN CREATED WITH REAL SUPABASE AUTH");
  console.log("Email: " + email);
  console.log("Password: " + password);
  console.log("=========================================");
}

async function seedPrisma(userId: string, email: string) {
  await prisma.profile.upsert({
    where: { userId },
    update: { role: "admin" },
    create: { userId, role: "admin", fullName: "Super Admin" },
  });
  console.log("Prisma Profile updated");
}

seedAdmin().catch(e => console.error("Error seeding:", e));
