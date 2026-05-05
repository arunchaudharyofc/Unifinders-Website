"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { name: "Personal Details", path: "/dashboard/profile" },
  { name: "Academic Qualification", path: "/dashboard/profile/academic" },
  { name: "Tests & others", path: "/dashboard/profile/tests" },
  { name: "Study Plans", path: "/dashboard/profile/study-plans" },
  { name: "Documents", path: "/dashboard/profile/documents" },
  { name: "Additional Information", path: "/dashboard/profile/additional" },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <div className="px-4 sm:px-6 lg:px-8 border-b border-[#EAECF0] bg-white sticky top-0 z-10">
      <div className="flex items-center gap-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((tab) => {
          const isActive = tab.path === "/dashboard/profile" 
            ? pathname === "/dashboard/profile" 
            : pathname.startsWith(tab.path);
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`py-4 border-b-2 text-[14px] whitespace-nowrap transition-colors ${
                isActive 
                  ? 'border-[#0070F0] text-[#0070F0] font-semibold' 
                  : 'border-transparent text-[#475467] hover:text-[#101828] font-medium'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
