import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unifinders — Your Gateway to Global Education",
  description:
    "AI-powered study abroad platform connecting students with top universities, scholarships, and expert counselors worldwide. Trusted by 12,000+ students. Start your journey today.",
  keywords: [
    "study abroad",
    "international universities",
    "scholarships",
    "student counselling",
    "Australia education",
    "UK universities",
    "Canada study",
    "visa calculator",
    "EdTech Nepal",
    "Unifinders",
  ],
  authors: [{ name: "Unifinders Education Pvt. Ltd." }],
  creator: "Unifinders Education Pvt. Ltd.",
  publisher: "Unifinders Education Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myunifinders.com",
    siteName: "Unifinders",
    title: "Unifinders — Your Gateway to Global Education",
    description:
      "AI-powered study abroad platform connecting students with top universities, scholarships, and expert counselors worldwide.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Unifinders — Global Education Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unifinders — Your Gateway to Global Education",
    description:
      "AI-powered study abroad platform. Find your university, apply, and get your visa — all in one place.",
    site: "@unifinders",
    creator: "@unifinders",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://myunifinders.com"),
};

export const viewport: Viewport = {
  themeColor: "#0070F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-jakarta">{children}</body>
    </html>
  );
}

