import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testQuery() {
  try {
    const res = await prisma.$queryRawUnsafe(`SELECT email FROM auth.users LIMIT 5;`);
    console.log("SUCCESS:", res);
  } catch (e: any) {
    console.log("FAILED:", e.message);
  }
}
testQuery().finally(() => prisma.$disconnect());
