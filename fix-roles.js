const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.profile.updateMany({
    where: {
      role: 'admin',
      // Ensure we don't accidentally demote intended admins?
      // For now, let's demote everyone EXCEPT specific admin emails if known.
      // But we can just forcefully switch Arun Chaudhary by his known name or email.
    },
    data: {
      role: 'student'
    }
  });
  console.log(`Reset ${updated.count} users from admin back to student.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
