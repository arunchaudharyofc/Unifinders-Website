/**
 * ============================================================================
 * STUDY ABROAD LANDING PAGE
 * ============================================================================
 *
 * Main entry point for the Unifinders Study Abroad landing page.
 * Assembles all section components in order from the Figma design.
 *
 * Section Order (matching Figma top → bottom):
 *   1. Navbar              → Fixed top nav with glassmorphism
 *   2. HeroSection         → "Explore Globally" + search + hero image
 *   3. ServicesSection      → 3 differentiated service cards
 *   4. HighlightsSection    → "Connecting Universities with Students" + 3 feature blocks
 *   5. GlobalStatsSection   → Stats + world map
 *   6. PartnerUniversities  → University logo grid with country filters
 *   7. ScholarshipSection   → Blue scholarship banner with student photos
 *   8. VisaCalculatorSection→ Step-wise visa guide
 *   9. TestimonialsSection  → Auto-advancing "What our Clients Say"
 *   10. BlogSection         → "Read Our Blogs"
 *   11. EventsSection       → "Our Events" with functional filter tabs
 *   12. CtaBannerSection    → "Studying Abroad?" CTA with fallback
 *   13. Footer              → Full enterprise footer
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @updated     2026-04-01  — BackToTop, JSON-LD, updated section comments
 * ============================================================================
 */
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import HighlightsSection from "@/components/landing/HighlightsSection";
import GlobalStatsSection from "@/components/landing/GlobalStatsSection";
import PartnerUniversitiesSection from "@/components/landing/PartnerUniversitiesSection";
import ScholarshipSection from "@/components/landing/ScholarshipSection";
import VisaCalculatorSection from "@/components/landing/VisaCalculatorSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BlogSection from "@/components/landing/BlogSection";
import EventsSection from "@/components/landing/EventsSection";
import CtaBannerSection from "@/components/landing/CtaBannerSection";

/** JSON-LD Structured Data — Organization schema for Google Knowledge Graph */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Unifinders",
  url: "https://unifinders.com",
  logo: "https://unifinders.com/images/logo.png",
  sameAs: [
    "https://www.facebook.com/unifindersGlobal",
    "https://www.instagram.com/unifinders_",
    "https://www.linkedin.com/company/unifinders",
  ],
  description:
    "Nepal's premier EdTech platform providing expert counselling, scholarship matching, and visa support for students aspiring to study abroad at 120+ partner universities worldwide.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Putalisadak",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+977-1-4444455",
    contactType: "customer service",
    availableLanguage: ["en", "ne"],
  },
};

import { getEvents, getUniversities, getBlogPosts } from "@/lib/dal";

export default async function Home() {
  const events = await getEvents();
  const universities = await getUniversities();
  const blogs = await getBlogPosts();
  
  return (
    <div className="bg-white selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />
      <div className="flex-1 w-full relative z-20 bg-white">
        <ServicesSection />
        <HighlightsSection />
        <GlobalStatsSection />
        <PartnerUniversitiesSection universities={universities} />
        <ScholarshipSection />
        <VisaCalculatorSection />
        <TestimonialsSection />
        <BlogSection blogs={blogs} />
        <EventsSection events={events} />
        <CtaBannerSection />
      </div>
    </div>
  );
}

