import { redirect } from "next/navigation";

// Slug alias map — short slugs redirect to full canonical slugs
const SLUG_ALIASES: Record<string, string> = {
  "ielts":  "ielts-preparation",
  "gmat":   "gmat-preparation",
  "gre":    "gre-preparation",
  "sat":    "sat-preparation",
  "toefl":  "toefl-preparation",
  "pte":    "pte-academic",
  "oet":    "oet-preparation",
  "det":    "duolingo-english-test",
};

export async function generateStaticParams() {
  return Object.keys(SLUG_ALIASES).map(slug => ({ slug }));
}

export default async function CourseAliasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = SLUG_ALIASES[slug];
  if (canonical) {
    redirect(`/courses/${canonical}`);
  }
  redirect("/courses");
}
