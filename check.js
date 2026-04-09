import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const profiles = await prisma.profile.findMany();
  console.log("ALL PROFILES IN DB:", profiles);
  const students = await prisma.student.findMany();
  console.log("ALL STUDENTS IN DB:", students);
  
  if (profiles.find(p => p.email === 'arunchaudhary6552@gmail.com')) {
    await prisma.profile.update({
      where: { email: 'arunchaudhary6552@gmail.com' },
      data: { role: 'admin' }
    });
    console.log("Updated Arun to Admin");
  }
}
check().catch(console.error).finally(() => prisma.$disconnect());
