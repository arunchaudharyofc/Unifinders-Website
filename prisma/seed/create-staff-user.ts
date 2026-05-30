/**
 * Create a test staff user in Supabase Auth + DB.
 * Usage: npx tsx prisma/seed/create-staff-user.ts
 */
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const db = new PrismaClient();

const TEST_EMAIL = "staff@unifinders.com";
const TEST_PASSWORD = "Staff@123";
const TEST_NAME = "Staff Test User";

async function main() {
  console.log("Creating test staff user...\n");

  // 1. Create Supabase Auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    email_confirm: true, // auto-confirm
    user_metadata: { full_name: TEST_NAME },
  });

  if (authError) {
    if (authError.message.includes("already been registered")) {
      console.log("Auth user already exists, fetching...");
      const { data: listData } = await supabase.auth.admin.listUsers();
      const existing = listData?.users?.find((u) => u.email === TEST_EMAIL);
      if (existing) {
        // Reset password
        await supabase.auth.admin.updateUserById(existing.id, { password: TEST_PASSWORD });
        console.log(`   Reset password for existing user: ${existing.id}`);
        await setupDBRecords(existing.id);
      }
    } else {
      console.error("Auth error:", authError.message);
      process.exit(1);
    }
  } else if (authData.user) {
    console.log(`✅ Auth user created: ${authData.user.id}`);
    await setupDBRecords(authData.user.id);
  }

  console.log("\n" + "=".repeat(50));
  console.log("🎉 STAFF TEST ACCOUNT READY!");
  console.log("=".repeat(50));
  console.log(`   Email:    ${TEST_EMAIL}`);
  console.log(`   Password: ${TEST_PASSWORD}`);
  console.log("=".repeat(50));
  console.log("\nLogin at: http://localhost:3000/auth/login");
  console.log("You will be redirected to: /staff");
}

async function setupDBRecords(userId: string) {
  // 2. Create/update Profile with role=staff
  await db.profile.upsert({
    where: { userId },
    create: {
      userId,
      role: "staff",
      fullName: TEST_NAME,
    },
    update: {
      role: "staff",
      fullName: TEST_NAME,
    },
  });
  console.log("✅ Profile created (role=staff)");

  // 3. Create Staff record
  const existing = await db.staff.findUnique({ where: { userId } });
  if (!existing) {
    await db.staff.create({
      data: {
        userId,
        department: "Engineering",
        designation: "Software Developer",
        employeeId: "UF-STAFF-001",
      },
    });
    console.log("✅ Staff record created");
  } else {
    console.log("✅ Staff record already exists");
  }
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
