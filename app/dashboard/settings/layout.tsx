import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SettingsTabs from "./Tabs";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="w-full">
      {/* Navigation Tabs */}
      <SettingsTabs />

      {children}
    </div>
  );
}
