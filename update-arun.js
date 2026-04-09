import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.profile.findMany();
  console.log("Found Profiles:", users.map(u => ({ email: u.email, role: u.role })));
  
  const targetEmail = "arunchaudhary6552@gmail.com";
  
  if (users.find(u => u.email === targetEmail)) {
    await prisma.profile.update({
      where: { email: targetEmail },
      data: { role: 'admin' }
    });
    console.log(`Successfully forced ${targetEmail} strictly to Admin via Prisma.`);
  } else {
    console.log("Could not find", targetEmail, "in DB");
  }
}

main().finally(() => prisma.$disconnect());
