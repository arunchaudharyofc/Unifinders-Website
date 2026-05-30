import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Phone, Mail, Edit2, Building2, Shield, User, Globe } from "lucide-react";
import AdminProfileClient from "./AdminProfileClient";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  let profile = null;
  try {
    profile = await db.profile.findUnique({
      where: { userId: user.id },
      select: { fullName: true, avatar: true, phone: true, role: true },
    });
  } catch { }

  const fullName = profile?.fullName || user.user_metadata?.full_name || "Super Admin";
  const email = user.email || "";
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  const role = profile?.role || "admin";

  return (
    <div className="flex flex-col lg:flex-row bg-[#F8FAFC] -mx-6 -my-6 md:-mx-8 md:-my-8" style={{ minHeight: "calc(100vh - 80px)" }}>

      {/* ── Left Panel ── */}
      <div className="shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#EAECF0] flex flex-col items-center pt-10 px-6 pb-8 w-full lg:w-[300px]">

        {/* Avatar */}
        <div className="relative mb-3">
          <div className="rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-[#0070F0] to-[#0055CC]" style={{ width: "120px", height: "120px" }}>
            {profile?.avatar ? (
              <img src={profile.avatar} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-4xl font-black">{initials}</span>
              </div>
            )}
          </div>
          <button className="absolute bottom-1 right-1 w-7 h-7 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm bg-[#0070F0] hover:bg-blue-600 transition">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <h2 className="text-lg font-black text-[#101828] mb-1 text-center">{fullName}</h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 mb-5 uppercase tracking-wider">
          {role === "admin" ? "Super Admin" : role}
        </span>

        {/* Info */}
        <div className="w-full space-y-3.5 mb-8">
          <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
            <Mail className="w-[18px] h-[18px] text-[#0070F0] shrink-0" /> {email}
          </div>
          {profile?.phone && (
            <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
              <Phone className="w-[18px] h-[18px] text-[#0070F0] shrink-0" /> {profile.phone}
            </div>
          )}
          <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
            <Building2 className="w-[18px] h-[18px] text-[#0070F0] shrink-0" /> Unifinders Education Pvt. Ltd.
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
            <Globe className="w-[18px] h-[18px] text-[#0070F0] shrink-0" /> Nepal
          </div>
        </div>

        {/* Admin Capabilities Badge */}
        <div className="w-full rounded-2xl p-5 text-white overflow-hidden bg-gradient-to-br from-[#0B1A2D] to-[#0d2a5a]">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-blue-300" />
            <h3 className="font-bold text-sm">Administrator Access</h3>
          </div>
          <ul className="space-y-1.5">
            {["Full system control", "User & role management", "Content publishing", "Analytics & reports", "Staff management"].map((cap) => (
              <li key={cap} className="flex items-center gap-2 text-[11px] text-blue-100 font-medium">
                <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right Content ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        <AdminProfileClient
          userId={user.id}
          fullName={fullName}
          email={email}
          phone={profile?.phone || ""}
          initials={initials}
        />
      </div>

    </div>
  );
}
