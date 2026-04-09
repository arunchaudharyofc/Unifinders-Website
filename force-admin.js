import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function setAdmin() {
  const updated = await prisma.profile.updateMany({
    data: { role: 'admin' }
  });
  console.log(`Updated ${updated.count} users to ADMIN role.`);
}

setAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
