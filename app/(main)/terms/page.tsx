import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service — Unifinders Education Pvt. Ltd.",
  description: "Read the Terms of Service for Unifinders Education platform — governing your use of our study abroad counseling services.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using the Unifinders platform (myunifinders.com) or any of our counseling services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services. These terms apply to all visitors, registered users, and anyone who accesses our platform.",
  },
  {
    title: "2. Description of Services",
    content: `Unifinders provides the following services:

- Study abroad counseling and university selection guidance
- Scholarship identification and application support
- IELTS, PTE, TOEFL, GMAT, GRE, SAT, and OET test preparation courses
- Visa documentation guidance and application support
- Statement of Purpose (SOP) and Letter of Recommendation (LOR) review
- Event organization including education fairs and university seminars
- Online platform for students to explore universities, scholarships, and courses

Our counseling services are free of charge. Course fees and premium service charges are disclosed prior to enrollment.`,
  },
  {
    title: "3. User Accounts",
    content: `When creating an account, you agree to:

- Provide accurate, current, and complete information
- Maintain the security of your password and account credentials
- Notify us immediately of unauthorized use of your account
- Not share your account credentials with any third party
- Be responsible for all activities that occur under your account

We reserve the right to terminate accounts that violate these terms or our community guidelines.`,
  },
  {
    title: "4. User Conduct",
    content: `You agree not to:

- Provide false or misleading information in your profile or applications
- Use our platform for any unlawful purpose
- Attempt to gain unauthorized access to our systems or other user accounts
- Post or transmit harmful, offensive, or inappropriate content
- Use our platform to spam, phish, or conduct fraudulent activities
- Violate the intellectual property rights of Unifinders or third parties
- Scrape, mine, or harvest data from our platform without written permission`,
  },
  {
    title: "5. Counseling Disclaimer",
    content: "Our counselors provide guidance based on their experience and available information. University admission decisions are made solely by the respective institutions. Visa approvals are at the discretion of immigration authorities. Unifinders does not guarantee admission, visa approval, or scholarship awards. We are not liable for outcomes of applications made with our guidance.",
  },
  {
    title: "6. Payment and Refunds",
    content: `For paid services (test preparation courses, premium counseling packages):

- Fees are disclosed clearly before purchase
- Course fees are non-refundable after the first class is attended
- Refund requests made before the first session are processed within 7 business days
- Promotional discounts cannot be combined unless explicitly stated
- All fees are in Nepali Rupees (NPR) unless stated otherwise`,
  },
  {
    title: "7. Intellectual Property",
    content: "All content on the Unifinders platform — including text, graphics, logos, course materials, and software — is the property of Unifinders Education Pvt. Ltd. and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission. Users retain ownership of their personal submissions (documents, essays) but grant Unifinders a license to use them for service delivery.",
  },
  {
    title: "8. Limitation of Liability",
    content: "To the maximum extent permitted by law, Unifinders shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our platform or services. Our total liability for any claim shall not exceed the amount you paid to us in the 3 months preceding the claim.",
  },
  {
    title: "9. Privacy",
    content: "Your use of our platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to our collection and use of personal data as described in the Privacy Policy.",
  },
  {
    title: "10. Changes to Terms",
    content: "We may update these Terms of Service from time to time. We will notify registered users of significant changes via email at least 14 days before they take effect. Continued use of our platform after changes constitutes acceptance of the updated terms.",
  },
  {
    title: "11. Governing Law",
    content: "These Terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.",
  },
  {
    title: "12. Contact",
    content: `For questions about these Terms:
    
Email: legal@myunifinders.com
Phone: +977 01-5901222
Address: New Plaza, Putalisadak, Kathmandu, Nepal`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        breadcrumb={[{ label: "Terms of Service" }]}
        title="Terms of"
        titleHighlight="Service"
        subtitle="Effective Date: January 1, 2024"
      />

      <div className="max-w-3xl mx-auto px-4 py-14 pb-20">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10">
          <p className="text-sm text-slate-700 leading-relaxed">
            Please read these Terms of Service carefully before using the Unifinders platform. These terms constitute a legally binding agreement between you and <strong>Unifinders Education Pvt. Ltd.</strong> (Company No. [Registration No.], registered in Nepal).
          </p>
        </div>
        <div className="space-y-10">
          {SECTIONS.map(s => (
            <div key={s.title} className="border-b border-slate-100 pb-10 last:border-0">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">{s.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex gap-4 flex-wrap">
          <Link href="/privacy" className="text-sm font-semibold text-[#1D4ED8] hover:underline">Privacy Policy →</Link>
          <Link href="/cookies" className="text-sm font-semibold text-[#1D4ED8] hover:underline">Cookie Policy →</Link>
        </div>
      </div>
    </div>
  );
}
