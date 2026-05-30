import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { ok, err, requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req);
  if ("status" in authResult) return authResult;
  const { ctx } = authResult;

  if (ctx.role !== "admin") return err("Admin access required", 403);

  try {
    const profiles = await db.profile.findMany({
      where: {
        role: { in: ["staff", "admin"] }
      },
      include: {
        staff: true
      },
      orderBy: { fullName: "asc" }
    });

    return ok(
      profiles.map((p) => {
        const email = p.fullName.toLowerCase().includes("staff") 
          ? "staff@unifinders.com" 
          : `${p.fullName.toLowerCase().replace(/\s+/g, ".")}@unifinders.com`;
          
        return {
          id: p.id,
          fullName: p.fullName,
          avatar: p.avatar,
          role: p.role,
          email,
          department: p.staff?.department || (p.role === "admin" ? "Management" : "Academic"),
          designation: p.staff?.designation || (p.role === "admin" ? "Founder & Director" : "Counselor"),
          joinDate: p.staff?.joinDate?.toISOString() || p.createdAt.toISOString()
        };
      })
    );
  } catch (e) {
    console.error("List staff error:", e);
    return err("Failed to list staff directory", 500);
  }
}
