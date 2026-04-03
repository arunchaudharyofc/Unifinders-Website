// ─────────────────────────────────────────────────────────────────────────────
// COURSES — Single Source of Truth
// Future: migrated to Supabase → admin can manage via CMS portal
// ─────────────────────────────────────────────────────────────────────────────

export type CourseInstructor = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  students: number;
  rating: number;
};

export type CourseFAQ = { q: string; a: string };
export type CourseResource = { title: string; type: "PDF" | "Video" | "Practice"; size?: string };
export type CourseProgram = { title: string; location: string; image: string; duration: string };

export type Course = {
  id: string;
  slug: string;
  name: string;          // short name e.g. "IELTS"
  fullName: string;      // full e.g. "International English Language Testing System"
  tagline: string;
  isNew: boolean;
  category: string;
  logo: string;          // text logo / emoji or image URL
  logoType: "text" | "image";
  accentColor: string;   // Tailwind class
  heroImage: string;
  duration: string;
  hoursPerWeek: string;
  testType: string;
  nextBatch: string;
  students: string;
  rating: number;
  price: string;
  priceNote: string;
  overview: string[];
  features: string[];
  syllabus: { week: string; topic: string }[];
  faqs: CourseFAQ[];
  resources: CourseResource[];
  programs: CourseProgram[];
  instructors: string[]; // ids into COURSE_INSTRUCTORS
  highlights: { icon: string; label: string; value: string }[];
};

// ── Instructors ───────────────────────────────────────────────────────────────
export const COURSE_INSTRUCTORS: CourseInstructor[] = [
  {
    id: "rajan-sharma",
    name: "Rajan Sharma",
    role: "IELTS / PTE Expert · 12 yrs exp",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    bio: "Former British Council examiner. Trained 5,000+ students with an average band increase of 1.5. Certified by IDP Australia.",
    students: 5200,
    rating: 4.9,
  },
  {
    id: "priya-koirala",
    name: "Priya Koirala",
    role: "GMAT / GRE Specialist · 9 yrs exp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    bio: "MBA from IIM Ahmedabad. Expert in Quant and Verbal reasoning. Students average 720+ on GMAT and 320+ on GRE.",
    students: 3800,
    rating: 4.8,
  },
  {
    id: "bikash-thapa",
    name: "Bikash Thapa",
    role: "TOEFL / SAT Coach · 7 yrs exp",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80",
    bio: "MS in Education from Boston University. Specialized in TOEFL iBT and SAT digital format. Expert in integrated writing strategies.",
    students: 2400,
    rating: 4.7,
  },
  {
    id: "sunita-rai",
    name: "Sunita Rai",
    role: "University Application Counselor · 10 yrs exp",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    bio: "Former admission officer at University of Exeter, UK. Guides students on SOP, LOR, and application strategy with 98% acceptance rate.",
    students: 6100,
    rating: 5.0,
  },
  {
    id: "anil-gurung",
    name: "Anil Gurung",
    role: "OET / Healthcare English Expert · 8 yrs exp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    bio: "Registered nurse with OET Grade B certification. Trains doctors, nurses and allied health professionals for UK and Australia registration.",
    students: 1900,
    rating: 4.8,
  },
];

// ── Courses ──────────────────────────────────────────────────────────────────
export const COURSES: Course[] = [
  // ── IELTS ──────────────────────────────────────────────────────
  {
    id: "ielts",
    slug: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    tagline: "The world's most popular English language test for study, work and migration.",
    isNew: true,
    category: "English Proficiency",
    logo: "IELTS",
    logoType: "text",
    accentColor: "#C8102E",
    heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    duration: "Approx 12 weeks",
    hoursPerWeek: "3hrs per week",
    testType: "English Proficiency Test",
    nextBatch: "April 15, 2025",
    students: "3,100+",
    rating: 4.9,
    price: "NPR 18,000",
    priceNote: "Includes all study materials and 2 full mock tests",
    overview: [
      "IELTS (International English Language Testing System) is the world's most popular high-stakes English language proficiency test for higher education and global migration. Over 3.5 million tests are taken each year.",
      "The IELTS Academic test is for people applying for higher education or professional registration in an English-speaking environment. Results reflect your ability to use academic language.",
      "Our 12-week intensive course covers all four skills — Listening, Reading, Writing and Speaking — with proven strategies tested by thousands of Nepali students who have cleared IELTS with Band 7+.",
      "Why take IELTS?\nIELTS is accepted by over 11,000 organizations in 140 countries, including universities, employers, immigration authorities and professional bodies across Australia, UK, Canada, and New Zealand.",
      "What is the exam format?\nListening: 30 minutes (4 sections, 40 questions)\nReading: 60 minutes (3 passages, 40 questions)\nWriting: 60 minutes (Task 1 + Task 2)\nSpeaking: 11–14 minutes (3 parts, face-to-face with examiner)",
      "What is a good IELTS score?\nBand 6.0–6.5: Required by most undergraduate programs\nBand 6.5–7.0: Required by most postgraduate programs\nBand 7.0+: Required by competitive courses at Russell Group / Group of Eight universities",
    ],
    features: [
      "Certified IELTS trainers with 10+ years experience",
      "Weekly full mock tests with detailed scoring",
      "Band 7+ score guarantee (or free retake coaching)",
      "Flexible morning, evening & weekend batches",
      "WhatsApp doubt support 7 days/week",
      "Official IDP/British Council study materials",
      "Writing task 1 & 2 individual feedback",
      "Speaking practice with native-accent recordings",
    ],
    syllabus: [
      { week: "Week 1–2", topic: "Listening Skills — Note completion, Map labelling, MCQ strategies" },
      { week: "Week 3–4", topic: "Reading Skills — Skimming, Scanning, True/False/Not Given, Matching headings" },
      { week: "Week 5–6", topic: "Writing Task 1 — Academic charts, process diagrams, maps, and letter writing" },
      { week: "Week 7–8", topic: "Writing Task 2 — Opinion, Discussion, Problem-Solution, Advantage-Disadvantage essays" },
      { week: "Week 9–10", topic: "Speaking Parts 1, 2 & 3 — Fluency, vocabulary, pronunciation drills" },
      { week: "Week 11–12", topic: "Full Mock Tests — 2 complete timed exams with score analysis and improvement plan" },
    ],
    faqs: [
      { q: "How long is the IELTS score valid?", a: "IELTS scores are valid for 2 years from the test date. After 2 years, you will need to retake the test." },
      { q: "How often can I take IELTS?", a: "You can take IELTS as many times as you like. There is no limit or waiting period between attempts." },
      { q: "What is the difference between IELTS Academic and General Training?", a: "IELTS Academic is for university admissions and professional registration. IELTS General Training is for migration and non-academic training. Most universities require IELTS Academic." },
      { q: "What score do I need for Australia PR?", a: "Australia's Skilled Independent Visa (subclass 189) requires IELTS 6.0 or above with minimum 6.0 in each band skill (Listening, Reading, Writing, Speaking)." },
      { q: "Can I prepare for IELTS online?", a: "Yes. Our online batches are fully live and interactive — not pre-recorded. You get the same quality as physical classes with the convenience of attending from home." },
      { q: "What is the difference between IELTS and PTE?", a: "IELTS is human-marked (speaking and writing assessed by examiners). PTE is 100% computer-based and AI-marked with results in 5 days. Both are accepted by Australian universities and UK Home Office." },
    ],
    resources: [
      { title: "IELTS Academic Practice Test — Reading", type: "PDF", size: "2.4 MB" },
      { title: "IELTS Writing Task 2 — 50 Essay Templates", type: "PDF", size: "1.8 MB" },
      { title: "IELTS Speaking Part 2 — 100 Topic Cue Cards", type: "PDF", size: "3.1 MB" },
      { title: "IELTS Listening — Audio Practice Sets 1–10", type: "Practice" },
      { title: "IELTS Band Descriptors Explained", type: "Video" },
    ],
    programs: [
      { title: "Morning Batch — Kathmandu", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80", duration: "Mon–Fri, 6:00–9:00 AM" },
      { title: "Evening Batch — Kathmandu", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80", duration: "Mon–Fri, 5:00–8:00 PM" },
      { title: "Weekend Batch — Online", location: "Google Meet / Zoom", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&q=80", duration: "Sat–Sun, 8:00 AM–12:00 PM" },
      { title: "Intensive Crash Course", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=400&q=80", duration: "4 weeks, Mon–Sat, 3hrs/day" },
    ],
    instructors: ["rajan-sharma", "priya-koirala"],
    highlights: [
      { icon: "📅", label: "Duration", value: "Approx 12 weeks" },
      { icon: "⏰", label: "Hours/Week", value: "3hrs per week" },
      { icon: "📝", label: "Test Type", value: "English Proficiency Test" },
      { icon: "🎯", label: "Target Band", value: "7.0+" },
    ],
  },

  // ── PTE ────────────────────────────────────────────────────────
  {
    id: "pte",
    slug: "pte",
    name: "PTE",
    fullName: "Pearson Test of English",
    tagline: "AI-evaluated, fastest results in just 5 business days.",
    isNew: true,
    category: "English Proficiency",
    logo: "PTE",
    logoType: "text",
    accentColor: "#00549F",
    heroImage: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80",
    duration: "Approx 8 weeks",
    hoursPerWeek: "3hrs per week",
    testType: "English Proficiency Test",
    nextBatch: "April 20, 2025",
    students: "1,800+",
    rating: 4.7,
    price: "NPR 14,000",
    priceNote: "Includes AI practice platform access and 2 mock tests",
    overview: [
      "PTE Academic (Pearson Test of English Academic) is a computer-based English language test. Unlike IELTS, it is 100% AI-marked — removing human bias from the evaluation.",
      "PTE gives results in as little as 5 business days and is accepted by thousands of universities including all UK universities, all Australian universities, and most Canadian institutions.",
      "Our 8-week PTE course uses the same AI-powered scoring engine as the actual test, giving you real-time feedback on your performance.",
      "What is the exam format?\nSpeaking & Writing: 54–67 minutes\nReading: 29–30 minutes\nListening: 30–43 minutes\nTotal test time: 2 hours (no break)",
    ],
    features: [
      "AI practice platform — same engine as real test",
      "79+ score guarantee (or free retake session)",
      "Results within 5 business days",
      "Mock tests every 2 weeks",
      "Speaking fluency and pronunciation drills",
      "PTE-specific templates for essay and summary",
      "Flexible online and physical batches",
      "Life membership to practice portal",
    ],
    syllabus: [
      { week: "Week 1", topic: "Speaking — Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture" },
      { week: "Week 2", topic: "Writing — Summarize Written Text, Write Essay" },
      { week: "Week 3", topic: "Reading — MCQ, Re-order Paragraphs, Fill in the Blanks" },
      { week: "Week 4", topic: "Listening — Summarize Spoken Text, MCQ, Fill in Blanks, Write from Dictation" },
      { week: "Week 5–6", topic: "Integration Skills — Enabling skills (grammar, vocabulary, spelling, fluency)" },
      { week: "Week 7–8", topic: "Full Timed Mock Tests with AI Score Analysis and Improvement Plan" },
    ],
    faqs: [
      { q: "How is PTE different from IELTS?", a: "PTE is fully computer-based and AI-marked. Results come in 5 days. IELTS has a human examiner for speaking. PTE is generally easier for people who type fast and are comfortable with technology." },
      { q: "What PTE score do I need for Australia PR?", a: "For Australia's Skilled Migration, you need PTE 65+ (equal to IELTS 7.0). Most Australian universities accept PTE 58+ for admission." },
      { q: "Is PTE harder than IELTS?", a: "Neither is harder — they test the same skills differently. PTE's Read Aloud and Repeat Sentence are unique. From our data, Nepali students often score 5–10 points higher in PTE compared to IELTS." },
      { q: "Can I retake PTE immediately?", a: "Yes. There is no mandatory waiting period between PTE attempts. You can book and take PTE back-to-back if needed." },
    ],
    resources: [
      { title: "PTE Score Guide — Understanding Your Results", type: "PDF", size: "1.2 MB" },
      { title: "PTE Speaking Templates — Read Aloud & Describe Image", type: "PDF", size: "2.1 MB" },
      { title: "PTE Writing — 30 Essay Templates", type: "PDF", size: "1.5 MB" },
      { title: "PTE Listening — Dictation Practice Sets", type: "Practice" },
    ],
    programs: [
      { title: "Morning Batch — Kathmandu", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80", duration: "Mon–Fri, 6:00–9:00 AM" },
      { title: "Online Live Batch", location: "Google Meet / Zoom", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&q=80", duration: "Flexible, 3hrs/session" },
    ],
    instructors: ["rajan-sharma"],
    highlights: [
      { icon: "📅", label: "Duration", value: "Approx 8 weeks" },
      { icon: "⏰", label: "Hours/Week", value: "3hrs per week" },
      { icon: "📝", label: "Test Type", value: "English Proficiency Test" },
      { icon: "🎯", label: "Target Score", value: "79+" },
    ],
  },

  // ── TOEFL ──────────────────────────────────────────────────────
  {
    id: "toefl",
    slug: "toefl",
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    tagline: "The preferred English test for over 11,500 US and Canadian institutions.",
    isNew: false,
    category: "English Proficiency",
    logo: "TOEFL",
    logoType: "text",
    accentColor: "#004C8C",
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    duration: "Approx 10 weeks",
    hoursPerWeek: "3hrs per week",
    testType: "English Proficiency Test",
    nextBatch: "May 1, 2025",
    students: "900+",
    rating: 4.8,
    price: "NPR 16,000",
    priceNote: "Includes official ETS materials and 1 full mock test",
    overview: [
      "TOEFL iBT (Test of English as a Foreign Language — Internet-Based Test) is the gold standard for English proficiency testing in the United States and Canada.",
      "Over 11,500 universities and institutions accept TOEFL results, making it the most widely recognized test for US university admissions.",
      "Our 10-week TOEFL course uses official ETS (Educational Testing Service) materials and focuses on the specific format of TOEFL iBT — including the unique Integrated Writing task.",
    ],
    features: [
      "ETS official study materials",
      "100+ target score strategy",
      "Integrated writing task coaching",
      "Speaking task templates (6 task types)",
      "Academic vocabulary building",
      "Weekly progress tracking",
      "Test booking assistance",
      "Post-test score analysis",
    ],
    syllabus: [
      { week: "Week 1–2", topic: "Reading — Inference, vocabulary in context, rhetorical purpose" },
      { week: "Week 3–4", topic: "Listening — Lectures, conversations, connecting content" },
      { week: "Week 5–6", topic: "Speaking — Independent (Task 1) and Integrated (Tasks 2–4)" },
      { week: "Week 7–8", topic: "Writing — Integrated Task (reading+listening synthesis) and Academic Discussion" },
      { week: "Week 9–10", topic: "Full Timed TOEFL Mock Tests + Score Analysis + Improvement Roadmap" },
    ],
    faqs: [
      { q: "What is the TOEFL total score range?", a: "TOEFL iBT is scored on a scale of 0–120. Most universities require 80–100 for undergraduate and 90–105 for graduate programs." },
      { q: "How long are TOEFL scores valid?", a: "TOEFL scores are valid for 2 years from the test date." },
      { q: "Is TOEFL accepted in UK and Australia?", a: "Yes, most UK and Australian universities accept TOEFL. However, IELTS is more commonly used. We recommend TOEFL for students targeting US and Canada specifically." },
    ],
    resources: [
      { title: "TOEFL iBT Official Integration Guide", type: "PDF", size: "3.2 MB" },
      { title: "TOEFL Speaking — Template Scripts for All 4 Tasks", type: "PDF", size: "1.9 MB" },
      { title: "TOEFL Academic Vocabulary — Top 500 Words", type: "PDF", size: "1.1 MB" },
    ],
    programs: [
      { title: "Morning Batch — Kathmandu", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80", duration: "Mon–Fri, 6:00–9:00 AM" },
      { title: "Weekend Online Batch", location: "Google Meet / Zoom", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&q=80", duration: "Sat–Sun, 9:00 AM–12:00 PM" },
    ],
    instructors: ["bikash-thapa"],
    highlights: [
      { icon: "📅", label: "Duration", value: "Approx 10 weeks" },
      { icon: "⏰", label: "Hours/Week", value: "3hrs per week" },
      { icon: "📝", label: "Test Type", value: "English Proficiency Test" },
      { icon: "🎯", label: "Target Score", value: "100+" },
    ],
  },

  // ── GMAT ───────────────────────────────────────────────────────
  {
    id: "gmat",
    slug: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test",
    tagline: "Required for MBA and business school admissions at top institutions worldwide.",
    isNew: false,
    category: "Business & Management",
    logo: "GMAT",
    logoType: "text",
    accentColor: "#1C1C1C",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    duration: "Approx 14 weeks",
    hoursPerWeek: "4hrs per week",
    testType: "Business Aptitude Test",
    nextBatch: "May 10, 2025",
    students: "400+",
    rating: 4.8,
    price: "NPR 25,000",
    priceNote: "Includes GMAC official pack and 3 full mock tests",
    overview: [
      "GMAT (Graduate Management Admission Test) is the world's leading business school assessment, accepted by 7,700+ programs at 2,400+ schools in 110 countries.",
      "The GMAT Focus Edition (2024) has 3 sections: Quantitative Reasoning, Verbal Reasoning, and Data Insights — each scored 60–90, with a total score range of 205–805.",
      "Our 14-week GMAT course gives you a structured study plan, adaptive practice, and expert coaching to reach 700+ (top 11th percentile globally).",
    ],
    features: [
      "700+ target score strategy",
      "GMAC official adaptive practice materials",
      "Data Insights section (new in GMAT Focus)",
      "Quant strategies for problem solving",
      "Critical reasoning and reading comprehension",
      "Sentence correction deep dives",
      "Personalized study plan by diagnostic test",
      "3 full timed mock tests with analysis",
    ],
    syllabus: [
      { week: "Week 1–3", topic: "Quantitative Reasoning — Arithmetic, Algebra, Geometry, Word Problems" },
      { week: "Week 4–6", topic: "Verbal Reasoning — Critical Reasoning, Reading Comprehension, Sentence Correction" },
      { week: "Week 7–9", topic: "Data Insights — Data Sufficiency, Multi-Source Reasoning, Graphics Interpretation" },
      { week: "Week 10–11", topic: "Strategy + Timing — Adaptive test strategy, pacing, guess elimination" },
      { week: "Week 12–14", topic: "Full Timed Mock Tests (3 full exams) + Percentile Analysis + Improvement Plan" },
    ],
    faqs: [
      { q: "What is a good GMAT score for top MBA programs?", a: "Top MBA programs (Harvard, Stanford, Wharton) have median GMAT scores of 720–740. Most competitive programs accept 680+. Our students average 715+ after completing the full program." },
      { q: "How is the GMAT Focus different from old GMAT?", a: "GMAT Focus Edition (2024) removed AWA (essay), added Data Insights section, and allows question review and answer changes. Total questions reduced from 80 to 64. Duration: 2 hours 15 minutes." },
      { q: "How many times can I take the GMAT?", a: "You can take the GMAT up to 5 times per year and 8 times lifetime. There must be a 16-day gap between attempts." },
    ],
    resources: [
      { title: "GMAT Focus Official Guide — Chapter 1-5", type: "PDF", size: "4.1 MB" },
      { title: "GMAT Data Insights — Formula Sheet", type: "PDF", size: "0.9 MB" },
      { title: "GMAT Quant — 200 Practice Problems with Solutions", type: "PDF", size: "3.5 MB" },
    ],
    programs: [
      { title: "Evening Batch — Kathmandu", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80", duration: "Mon/Wed/Fri, 6:00–10:00 PM" },
      { title: "Online Intensive Batch", location: "Google Meet / Zoom", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&q=80", duration: "Daily, 4hrs/session" },
    ],
    instructors: ["priya-koirala"],
    highlights: [
      { icon: "📅", label: "Duration", value: "Approx 14 weeks" },
      { icon: "⏰", label: "Hours/Week", value: "4hrs per week" },
      { icon: "📝", label: "Test Type", value: "Business Aptitude Test" },
      { icon: "🎯", label: "Target Score", value: "700+" },
    ],
  },

  // ── GRE ────────────────────────────────────────────────────────
  {
    id: "gre",
    slug: "gre",
    name: "GRE",
    fullName: "Graduate Record Examination",
    tagline: "Required for Master's and PhD programs at leading universities globally.",
    isNew: false,
    category: "Graduate Admissions",
    logo: "GRE",
    logoType: "text",
    accentColor: "#007AB8",
    heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    duration: "Approx 12 weeks",
    hoursPerWeek: "4hrs per week",
    testType: "Graduate Aptitude Test",
    nextBatch: "April 28, 2025",
    students: "600+",
    rating: 4.9,
    price: "NPR 22,000",
    priceNote: "Includes ETS PowerPrep Plus and 2 mock tests",
    overview: [
      "GRE (Graduate Record Examination) is required for admission to most Master's and doctoral programs in the US, Canada, UK, and Australia.",
      "The GRE General Test has 3 sections: Verbal Reasoning (130–170), Quantitative Reasoning (130–170), and Analytical Writing (0–6). Total 2 hours 45 minutes.",
      "Our 12-week GRE course is designed to take you from your baseline score to 320+ through structured quant mastery, verbal strategy, and AWA template writing.",
    ],
    features: [
      "320+ target score (Verbal + Quant)",
      "ETS PowerPrep Plus practice access",
      "Quant section: Algebra, Geometry, Statistics",
      "Verbal: Text Completion, Sentence Equivalence, RC",
      "AWA: Issue and Argument essay coaching",
      "5,000-word GRE vocabulary program",
      "Adaptive test-taking strategies",
      "2 full timed mock tests with percentile ranking",
    ],
    syllabus: [
      { week: "Week 1–3", topic: "Quantitative Reasoning — Arithmetic, Algebra, Geometry, Data Analysis" },
      { week: "Week 4–6", topic: "Verbal Reasoning — Text Completion, Sentence Equivalence, RC strategies" },
      { week: "Week 7–8", topic: "Analytical Writing — Issue Task and Argument Task essay templates" },
      { week: "Week 9–10", topic: "Vocabulary Building — Top 1,500 GRE words with spaced repetition" },
      { week: "Week 11–12", topic: "Full Timed Mock Tests + Score Analysis + Target School Matching" },
    ],
    faqs: [
      { q: "What GRE score do I need for top MS programs?", a: "Top MS programs in CS (MIT, Stanford, CMU) prefer 165+ in Quant (94th+ percentile). For humanities PhD programs, 160+ in Verbal is expected. Our students average 322 overall." },
      { q: "Is the GRE required for all grad schools?", a: "Many US universities made GRE optional post-COVID, but top schools like MIT, Stanford, and Caltech still prefer/require it. For funded PhD positions, a strong GRE gives you a competitive edge." },
      { q: "How long are GRE scores valid?", a: "GRE scores are valid for 5 years from the test date. This is longer than GMAT (5 years) and IELTS (2 years)." },
    ],
    resources: [
      { title: "GRE Quantitative Reasoning — Formula Reference Sheet", type: "PDF", size: "1.3 MB" },
      { title: "GRE Vocabulary — 1,500 Essential Words with Mnemonics", type: "PDF", size: "2.8 MB" },
      { title: "GRE AWA Templates — 20 Issue + 20 Argument Essays", type: "PDF", size: "2.2 MB" },
    ],
    programs: [
      { title: "Morning Crash Course", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80", duration: "Mon–Sat, 6:00–10:00 AM" },
      { title: "Online Batch", location: "Google Meet / Zoom", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&q=80", duration: "Tue/Thu/Sat, 4hrs/session" },
    ],
    instructors: ["priya-koirala", "bikash-thapa"],
    highlights: [
      { icon: "📅", label: "Duration", value: "Approx 12 weeks" },
      { icon: "⏰", label: "Hours/Week", value: "4hrs per week" },
      { icon: "📝", label: "Test Type", value: "Graduate Aptitude Test" },
      { icon: "🎯", label: "Target Score", value: "320+" },
    ],
  },

  // ── SAT ────────────────────────────────────────────────────────
  {
    id: "sat",
    slug: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    tagline: "The standard test for US undergraduate college admissions.",
    isNew: true,
    category: "Undergraduate Admissions",
    logo: "SAT",
    logoType: "text",
    accentColor: "#009CDE",
    heroImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
    duration: "Approx 10 weeks",
    hoursPerWeek: "3hrs per week",
    testType: "College Admissions Test",
    nextBatch: "May 5, 2025",
    students: "500+",
    rating: 4.7,
    price: "NPR 16,000",
    priceNote: "Includes College Board official materials and 1 full mock test",
    overview: [
      "SAT (Scholastic Assessment Test) is the College Board's standardized test used for US undergraduate admissions. The Digital SAT (2024) is now computer-adaptive with 2 sections.",
      "SAT Digital score range: 400–1600 (Evidence-Based Reading & Writing: 200–800 + Math: 200–800). Test duration: 2 hours 14 minutes.",
      "Our 10-week course prepares you for the Digital SAT format with College Board-aligned practice and proven strategies for achieving 1400+.",
    ],
    features: [
      "Digital SAT (2024 format) preparation",
      "1400+ target score strategy",
      "College Board official Bluebook practice app",
      "Evidence-Based Reading and Writing mastery",
      "Math module 1 & 2 strategies",
      "College shortlisting based on SAT scores",
      "SAT fee waiver assistance (if eligible)",
      "Mock test with College Board percentile ranking",
    ],
    syllabus: [
      { week: "Week 1–3", topic: "Math — Algebra, Advanced Math, Problem Solving and Data Analysis" },
      { week: "Week 4–5", topic: "Math — Geometry, Trigonometry, Calculator strategy" },
      { week: "Week 6–8", topic: "Reading — Craft and Structure, Information and Ideas, Standard English Conventions" },
      { week: "Week 9", topic: "Full Module Practice — Adaptive difficulty simulation" },
      { week: "Week 10", topic: "Full Timed Digital Mock Test + Score Report Analysis" },
    ],
    faqs: [
      { q: "What is a good SAT score for top US universities?", a: "Ivy League schools (Harvard, Yale, Princeton) admit students with SAT 1500–1580. State schools typically accept 1100–1300. Our students average 1420 after the full course." },
      { q: "What changed in the Digital SAT?", a: "Digital SAT is shorter (2h 14min vs 3h 15min), adaptive (Module 2 adjusts based on Module 1 performance), uses the Bluebook app, and gives scores within days instead of weeks." },
      { q: "Is the SAT required for international students?", a: "Yes, most US colleges require SAT or ACT from international students. Some schools became test-optional post-COVID but competitive schools still prefer test scores from strong applicants." },
    ],
    resources: [
      { title: "SAT Digital — Official Practice Test 1 (Bluebook)", type: "PDF", size: "2.9 MB" },
      { title: "SAT Math — 300 Practice Problems with Solutions", type: "PDF", size: "3.4 MB" },
      { title: "SAT Reading — Passage Analysis Techniques", type: "PDF", size: "1.6 MB" },
    ],
    programs: [
      { title: "Afternoon Batch — Kathmandu", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80", duration: "Mon–Fri, 2:00–5:00 PM" },
      { title: "Online Weekend Batch", location: "Google Meet / Zoom", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&q=80", duration: "Sat–Sun, 10:00 AM–1:00 PM" },
    ],
    instructors: ["bikash-thapa"],
    highlights: [
      { icon: "📅", label: "Duration", value: "Approx 10 weeks" },
      { icon: "⏰", label: "Hours/Week", value: "3hrs per week" },
      { icon: "📝", label: "Test Type", value: "College Admissions Test" },
      { icon: "🎯", label: "Target Score", value: "1400+" },
    ],
  },

  // ── OET ────────────────────────────────────────────────────────
  {
    id: "oet",
    slug: "oet",
    name: "OET",
    fullName: "Occupational English Test",
    tagline: "The English test for healthcare professionals seeking registration abroad.",
    isNew: true,
    category: "Healthcare English",
    logo: "OET",
    logoType: "text",
    accentColor: "#1E5C3A",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    duration: "Approx 8 weeks",
    hoursPerWeek: "3hrs per week",
    testType: "Healthcare English Test",
    nextBatch: "May 15, 2025",
    students: "350+",
    rating: 4.8,
    price: "NPR 18,000",
    priceNote: "Includes healthcare-specific materials and 1 full mock test",
    overview: [
      "OET (Occupational English Test) is a healthcare-specific English language test accepted for registration and immigration purposes in UK, Australia, New Zealand, Ireland, and Singapore.",
      "OET is designed for 12 healthcare professions including Medicine, Nursing, Dentistry, Pharmacy, Physiotherapy and more. The test uses real healthcare scenarios.",
      "Our 8-week OET course is taught by a registered nurse with OET Grade B certification, focused on clinical communication, patient interactions, and healthcare documentation.",
    ],
    features: [
      "Healthcare-specific speaking scenarios",
      "Clinical letter writing coaching",
      "Patient-centered communication skills",
      "OET Grade B guarantee strategy",
      "All 12 healthcare professions covered",
      "AHPRA / NMC registration guidance",
      "UK NHS and Australian hospital vocabulary",
      "Weekly role-play speaking practice",
    ],
    syllabus: [
      { week: "Week 1–2", topic: "Listening — Healthcare-specific consultations, ward scenarios, note-taking" },
      { week: "Week 3–4", topic: "Reading — Understanding medical texts, patient records, clinical guidelines" },
      { week: "Week 5–6", topic: "Writing — Referral letters, discharge summaries, healthcare documentation" },
      { week: "Week 7–8", topic: "Speaking — Role plays: Patient consultation, history taking, discharge planning" },
    ],
    faqs: [
      { q: "Which healthcare professions can take OET?", a: "OET is available for 12 professions: Dentistry, Dietetics, Medicine, Nursing, Occupational Therapy, Optometry, Pharmacy, Physiotherapy, Podiatry, Radiography, Speech Pathology, and Veterinary Science." },
      { q: "What OET grade do I need for UK NMC registration?", a: "For UK Nursing and Midwifery Council (NMC) registration, you need OET Grade B (350+) in all 4 sub-tests (Listening, Reading, Writing, Speaking)." },
      { q: "Is OET easier than IELTS for nurses?", a: "OET uses healthcare-specific scenarios so it's more relevant for nurses and doctors. However, it's not necessarily 'easier' — the clinical writing requirements are rigorous. Most healthcare professionals find OET more comfortable than IELTS." },
    ],
    resources: [
      { title: "OET Nursing — 15 Sample Referral Letters with Answers", type: "PDF", size: "2.3 MB" },
      { title: "OET Speaking Role Play Cards — 50 Scenarios", type: "PDF", size: "1.7 MB" },
      { title: "OET Healthcare Vocabulary — 500 Clinical Terms", type: "PDF", size: "1.1 MB" },
    ],
    programs: [
      { title: "Morning Batch — Kathmandu", location: "New Plaza Center, Putalisadak", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80", duration: "Mon–Fri, 7:00–10:00 AM" },
      { title: "Online Healthcare Batch", location: "Google Meet / Zoom", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=400&q=80", duration: "Tue/Thu/Sat, 3hrs/session" },
    ],
    instructors: ["anil-gurung"],
    highlights: [
      { icon: "📅", label: "Duration", value: "Approx 8 weeks" },
      { icon: "⏰", label: "Hours/Week", value: "3hrs per week" },
      { icon: "📝", label: "Test Type", value: "Healthcare English Test" },
      { icon: "🎯", label: "Target Grade", value: "Grade B" },
    ],
  },
];

// ── Enrollment Options ────────────────────────────────────────────────────────
export const ENROLL_TIME_SLOTS = {
  Morning: ["6:00 - 7:00 am", "7:00 - 8:00 am", "8:00 - 9:00 am", "9:00 - 10:00 am", "10:00 - 11:00 am", "11:00 - 12:00 pm"],
  Evening: ["3:00 - 4:00 pm", "4:00 - 5:00 pm", "5:00 - 6:00 pm", "6:00 - 7:00 pm", "7:00 - 8:00 pm"],
  Night:   ["8:00 - 9:00 pm", "9:00 - 10:00 pm"],
};

export const INTERESTED_COUNTRIES = [
  "Australia", "Canada", "United Kingdom", "United States", "New Zealand",
  "Ireland", "Germany", "Netherlands", "Singapore", "UAE / Dubai",
  "Other",
];

export type CourseSlug = "ielts" | "pte" | "toefl" | "gmat" | "gre" | "sat" | "oet";
