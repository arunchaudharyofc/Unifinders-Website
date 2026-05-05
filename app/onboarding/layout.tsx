/**
 * Onboarding Layout
 * -----------------
 * Wraps the onboarding wizard with the site-wide Navbar and Footer
 * for visual consistency with auth pages (login/register).
 */
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col bg-slate-100 pt-[72px]">
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          {children}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
