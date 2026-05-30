import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProfilePersonalClient from "./PersonalClient";

export default async function ProfilePersonalDetailsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  let studentData = null;
  try {
    studentData = await db.student.findUnique({
      where: { userId: user.id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
        nationality: true,
        city: true,
        district: true,
        address: true,
      },
    });
  } catch {
    // DB unavailable
  }

  const profileData = await db.profile.findUnique({
    where: { userId: user.id },
    select: { fullName: true, phone: true },
  }).catch(() => null);

  return (
    <ProfilePersonalClient
      userId={user.id}
      email={user.email || ""}
      fullName={profileData?.fullName || user.user_metadata?.full_name || ""}
      firstName={studentData?.firstName || ""}
      lastName={studentData?.lastName || ""}
      phone={studentData?.phone || profileData?.phone || ""}
      gender={studentData?.gender || ""}
      dateOfBirth={studentData?.dateOfBirth?.toISOString().split("T")[0] || ""}
      nationality={studentData?.nationality || "Nepal"}
      city={studentData?.city || ""}
      address={studentData?.address || ""}
    />
  );
}
