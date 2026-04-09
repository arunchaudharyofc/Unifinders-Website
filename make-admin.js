import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkUsers() {
  const profiles = await prisma.profile.findMany();
  console.log("Current Profiles:", profiles);

  // If there are profiles, we can make the first one an admin
  if (profiles.length > 0) {
    const updated = await prisma.profile.update({
      where: { id: profiles[0].id },
      data: { role: 'admin' }
    });
    console.log("Upgraded user to ADMIN:", updated.fullName, updated.userId);
  } else {
    console.log("NO USERS FOUND. Please register an account on the website first.");
  }
}

checkUsers().catch(console.error).finally(() => prisma.$disconnect());
