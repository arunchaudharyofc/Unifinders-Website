import { redirect } from "next/navigation";

/**
 * /student — redirects to the Student Dashboard.
 * If the user is not logged in, the middleware will send them to /auth/login
 * first, and after login they'll land on /dashboard.
 */
export default function StudentPage() {
  redirect("/dashboard");
}
