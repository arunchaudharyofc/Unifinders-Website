import { redirect } from "next/navigation";

// Redirect old route to the correct Staff Portal admin route
export default function OldStaffOverviewRedirect() {
  redirect("/staff/admin/staff");
}
