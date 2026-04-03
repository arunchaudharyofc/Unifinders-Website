import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Unifinders Education Pvt. Ltd.",
  description: "Read Unifinders' Privacy Policy to understand how we collect, use, and protect your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We collect the following categories of personal information when you use our platform:

**Personal Identification:** Full name, email address, phone number, date of birth, nationality, and passport details provided during registration or counseling sessions.

**Academic Information:** Educational qualifications, transcripts, English language test scores (IELTS, PTE, TOEFL, GMAT, GRE), and university application documents.

**Usage Data:** IP address, browser type, device information, pages visited, time spent on the platform, and referring URLs collected automatically via cookies and analytics tools.

**Communication Data:** Emails, chat messages, appointment booking records, and feedback submitted through our forms.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your personal information for the following purposes:

- To provide personalized study abroad counseling and university matching services
- To process your appointment bookings and course enrollments
- To send you relevant scholarship opportunities, event invitations, and educational resources
- To improve our platform features and user experience through analytics
- To comply with legal obligations including visa documentation requirements
- To communicate important updates about your applications and service status`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell your personal data to third parties. We may share your information in the following circumstances:

**Partner Universities:** With your explicit consent, we share your academic profile with partner universities to facilitate admission inquiries.

**Service Providers:** With trusted third-party vendors (e.g., email platforms, cloud storage) who process data on our behalf under strict data processing agreements.

**Legal Requirements:** With government authorities, embassies, or visa offices when required by law or to comply with legal obligations.

**Business Transfers:** In the event of a merger, acquisition, or sale of company assets, with appropriate notice to affected users.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures to protect your personal data:

- All data is transmitted using SSL/TLS encryption (HTTPS)
- Passwords are hashed using bcrypt with salting
- Database access is restricted to authorized personnel only
- Regular security audits and penetration testing
- Two-factor authentication available for user accounts
- Data backups encrypted and stored in geographically separate locations

Despite these measures, no method of electronic transmission is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.`,
  },
  {
    title: "5. Cookies",
    content: `We use cookies and similar tracking technologies to enhance your experience:

**Essential Cookies:** Required for the platform to function correctly (authentication, session management).

**Analytics Cookies:** Help us understand how users interact with our platform (e.g., Google Analytics).

**Marketing Cookies:** Used to deliver relevant advertisements on third-party platforms.

You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality. See our Cookie Policy for full details.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the following rights regarding your personal data:

- **Access:** Request a copy of all personal data we hold about you
- **Correction:** Update or correct inaccurate personal information
- **Deletion:** Request deletion of your account and associated data ("right to be forgotten")
- **Portability:** Receive your data in a machine-readable format
- **Opt-out:** Unsubscribe from marketing communications at any time
- **Restriction:** Request we limit how we process your data

To exercise any of these rights, contact us at privacy@myunifinders.com. We will respond within 30 days.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal data for as long as necessary to provide our services and comply with legal obligations:

- Active account data: Retained for the duration of your account
- Counseling session records: 5 years after your last session
- Financial transaction records: 7 years as required by Nepal tax law
- Marketing opt-out records: Indefinitely to honor your preferences
- Anonymized analytics data: Retained indefinitely for platform improvement

You may request early deletion of your data subject to legal retention requirements.`,
  },
  {
    title: "8. Contact Us",
    content: `For questions, concerns, or requests related to this Privacy Policy:

**Email:** privacy@myunifinders.com
**Phone:** +977 01-5901222
**Address:** New Plaza, Putalisadak, Opposite to Vibrant, Kathmandu, Nepal
**Office Hours:** Monday–Friday, 9:00 AM – 6:00 PM NPT

We take privacy concerns seriously and commit to responding within 2 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] pt-28 pb-14 px-4 text-center">
        <nav className="text-xs text-blue-300 mb-4 flex items-center justify-center gap-1.5">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" /><span className="text-blue-100">Privacy Policy</span>
        </nav>
        <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
        <p className="text-blue-200 text-sm">Last updated: January 1, 2024</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 pb-20">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
          <p className="text-sm text-slate-700 leading-relaxed">
            At <strong>Unifinders Education Pvt. Ltd.</strong>, we are committed to protecting your personal information and being transparent about how we use it. This Privacy Policy explains our practices regarding the collection, use, and protection of your data when you use our platform at <strong>myunifinders.com</strong>.
          </p>
        </div>

        <div className="space-y-10">
          {SECTIONS.map(section => (
            <div key={section.title} className="border-b border-slate-100 pb-10 last:border-0">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4">{section.title}</h2>
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4 flex-wrap">
          <Link href="/terms" className="text-sm font-semibold text-[#1D4ED8] hover:underline">Terms of Service →</Link>
          <Link href="/cookies" className="text-sm font-semibold text-[#1D4ED8] hover:underline">Cookie Policy →</Link>
        </div>
      </div>
    </div>
  );
}
