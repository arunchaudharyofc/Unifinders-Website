/**
 * Quick script to update an existing user's role to "staff" for testing.
 * Usage: npx tsx prisma/seed/staff-setup.ts <email>
 *
 * This finds the profile by the Supabase user email and sets role = "staff".
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.log("Usage: npx tsx prisma/seed/staff-setup.ts <email>");
    console.log("\nThis will set the user's role to 'staff' so they can access the Staff Portal.");
    process.exit(1);
  }

  // Find the student by email to get userId
  const student = await db.student.findUnique({
    where: { email },
    select: { userId: true },
  });

  if (!student) {
    console.error(`No student found with email: ${email}`);
    console.log("Make sure the user has completed onboarding first.");
    process.exit(1);
  }

  // Update profile role to staff
  const profile = await db.profile.update({
    where: { userId: student.userId },
    data: { role: "staff" },
  });

  console.log(`✅ Updated profile for ${email}:`);
  console.log(`   userId: ${profile.userId}`);
  console.log(`   role: ${profile.role}`);
  console.log(`   fullName: ${profile.fullName}`);

  // Ensure Staff record exists
  const existing = await db.staff.findUnique({ where: { userId: student.userId } });
  if (!existing) {
    await db.staff.create({
      data: {
        userId: student.userId,
        department: "General",
      },
    });
    console.log("   ✅ Created staff record");
  } else {
    console.log("   ✅ Staff record already exists");
  }

  console.log("\n🎉 Done! Log out and log back in with this email to access the Staff Portal.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
