/**
 * (main) Route Group Layout
 * -------------------------
 * All public marketing pages inherit this layout:
 * Navbar (fixed 72px) + page content + Footer
 *
 * Route groups (parentheses) don't affect URL structure.
 * Pages here: /, /courses, /events, /blog, /scholarships, /qna, /study, /appointment
 */
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
