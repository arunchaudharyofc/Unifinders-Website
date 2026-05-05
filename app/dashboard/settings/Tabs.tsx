"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[#EAECF0] mb-8 flex items-center gap-8" style={{ borderColor: '#EAECF0' }}>
      <Link 
        href="/dashboard/settings" 
        className={`pb-4 border-b-2 font-semibold text-[15px] whitespace-nowrap transition-colors ${pathname === '/dashboard/settings' ? 'border-[#0070F0] text-[#0070F0]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
      >
        Password
      </Link>
      <Link 
        href="/dashboard/settings/notifications" 
        className={`pb-4 border-b-2 font-semibold text-[15px] whitespace-nowrap transition-colors ${pathname === '/dashboard/settings/notifications' ? 'border-[#0070F0] text-[#0070F0]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
      >
        Notification Settings
      </Link>
      <Link 
        href="/dashboard/settings/backup" 
        className={`pb-4 border-b-2 font-semibold text-[15px] whitespace-nowrap transition-colors ${pathname === '/dashboard/settings/backup' ? 'border-[#0070F0] text-[#0070F0]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
      >
        Backup & Others
      </Link>
    </div>
  );
}
