"use client";

import { useState } from "react";
import StaffSidebar from "@/components/staff/StaffSidebar";
import StaffHeader from "@/components/staff/StaffHeader";

export default function StaffLayoutClient({
  children,
  isAdmin,
  userName,
  userAvatar,
  userEmail,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
  userName: string;
  userAvatar: string | null;
  userEmail: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <StaffSidebar
        isAdmin={isAdmin}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col md:ml-64 overflow-hidden min-w-0">
        <StaffHeader
          userName={userName}
          userAvatar={userAvatar}
          userEmail={userEmail}
          onMenuToggle={() => setMobileOpen(!mobileOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
