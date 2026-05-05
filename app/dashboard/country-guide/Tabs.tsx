"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CountryGuideTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Overview", path: "/dashboard/country-guide" },
    { name: "Sample Documents", path: "/dashboard/country-guide/sample-documents" },
    { name: "Accommodations", path: "/dashboard/country-guide/accommodations" },
    { name: "Jobs", path: "/dashboard/country-guide/jobs" },
    { name: "Additional Informations", path: "/dashboard/country-guide/additional" }
  ];

  return (
    <div className="flex items-center justify-center gap-8 border-b bg-white px-8 overflow-x-auto" style={{ borderColor: '#EAECF0' }}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.name}
            href={tab.path}
            className={`py-4 font-semibold text-[14px] whitespace-nowrap transition-colors border-b-2 ${
              isActive 
                ? 'border-[#0070F0] text-[#0070F0]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
