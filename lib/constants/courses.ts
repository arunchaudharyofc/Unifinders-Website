/**
 * Courses fallback constants — used when DB is empty.
 * Shape matches the full Course Prisma model + extended UI fields.
 */

export type CourseInstructor = {
  fullName: string;
  role: string;
  avatar?: string;
  bio?: string;
};

export type CourseSyllabusWeek = {
  week: number;
  topic: string;
  details?: string;
};

export type CourseProgram = {
  name: string;
  duration: string;
  price: string;
  format: string;
};

export type CourseResource = {
  title: string;
  type: string; // PDF, Video, Practice Test
  url?: string;
};

export type CourseFAQ = {
  q: string;
  a: string;
};

export type Course = {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  tagline?: string;
  category: string;
  description: string;
  overview?: string;
  longDescription?: string;
  duration: string;
  price?: number;
  priceNote?: string;
  currency: string;
  level?: string;
  format: string[];
  features?: string[];
  highlights?: string[];
  syllabus?: CourseSyllabusWeek[];
  instructors?: CourseInstructor[];
  programs?: CourseProgram[];
  resources?: CourseResource[];
  faqs?: CourseFAQ[];
  imageUrl?: string | null;
  heroImage?: string | null;
  icon?: string;
  accentColor?: string;
  rating: number;
  reviewCount: number;
  students?: number;
  enrollmentCount: number;
  isActive: boolean;
  isFeatured: boolean;
  isNew?: boolean;
};

export const COURSES: Course[] = [
  {
    id: "ielts-preparation",
    slug: "ielts-preparation",
    name: "IELTS Preparation",
    shortName: "IELTS",
    tagline: "Score Band 7+ and unlock opportunities worldwide",
    category: "test-prep",
    description: "Comprehensive IELTS preparation covering all 4 bands: Listening, Reading, Writing, Speaking.",
    overview: "Our IELTS preparation course is designed to help students achieve Band 7+ scores with expert guidance, AI-powered mock tests, and personalized feedback.",
    duration: "3 months",
    price: 15000,
    priceNote: "Includes all study materials and mock tests",
    currency: "NPR",
    level: "Intermediate",
    format: ["Online", "Offline"],
    accentColor: "#0070F0",
    features: [
      "Daily mock tests", "One-on-one speaking sessions", "Band 7+ guarantee",
      "Recorded lectures", "Expert feedback on writing tasks", "Flexible batch timings",
    ],
    highlights: [
      "1,500+ students trained", "94% achieve Band 7+", "Expert faculty with 10+ years",
    ],
    syllabus: [
      { week: 1, topic: "Listening Foundation", details: "Audio strategies, note-taking, multiple choice techniques" },
      { week: 2, topic: "Reading Mastery", details: "Skimming, scanning, True/False/Not Given" },
      { week: 3, topic: "Writing Task 1", details: "Graphs, charts, maps, process diagrams" },
      { week: 4, topic: "Writing Task 2", details: "Essay types, coherence, vocabulary" },
      { week: 5, topic: "Speaking All Parts", details: "Part 1, 2, 3 strategies + fluency drills" },
      { week: 6, topic: "Full Mock Tests", details: "2 complete IELTS mocks with detailed feedback" },
    ],
    instructors: [
      { fullName: "Sunita Rai", role: "IELTS Expert — 12 years", bio: "Former British Council trainer with 1,000+ students scored Band 7+." },
      { fullName: "Rajan Sharma", role: "Writing & Speaking Coach", bio: "Specialist in IELTS essay scoring and speaking fluency improvement." },
    ],
    programs: [
      { name: "Weekend Batch", duration: "3 months", price: "NPR 15,000", format: "Offline" },
      { name: "Evening Batch", duration: "3 months", price: "NPR 15,000", format: "Offline" },
      { name: "Online Fast-Track", duration: "6 weeks", price: "NPR 10,000", format: "Online" },
    ],
    resources: [
      { title: "Cambridge IELTS 18 PDF", type: "PDF" },
      { title: "Writing Task 2 Templates", type: "PDF" },
      { title: "Listening Practice Set (x20)", type: "Practice Test" },
    ],
    faqs: [
      { q: "What is the minimum score required for Australia?", a: "Most Australian universities require IELTS Band 6.0-6.5 overall." },
      { q: "Can I take this course online?", a: "Yes! We offer fully online classes with live instructor interaction." },
      { q: "Is there a guarantee?", a: "If you don't improve by 0.5 bands, you can retake the course for free." },
    ],
    imageUrl: null,
    heroImage: null,
    icon: "🎯",
    rating: 4.8,
    reviewCount: 312,
    students: 1500,
    enrollmentCount: 1500,
    isActive: true,
    isFeatured: true,
    isNew: false,
  },
  {
    id: "pte-academic",
    slug: "pte-academic",
    name: "PTE Academic",
    shortName: "PTE",
    tagline: "AI-scored exam — fastest results for Australia & UK",
    category: "test-prep",
    description: "AI-scored PTE Academic preparation for Australia, UK & Canada visas.",
    overview: "PTE Academic is the world's leading computer-based English test. Our course uses AI-driven practice tools to maximize your score efficiently.",
    duration: "6 weeks",
    price: 12000,
    priceNote: "Includes 20 full-length mock tests",
    currency: "NPR",
    level: "Intermediate",
    format: ["Online", "Offline"],
    accentColor: "#7C3AED",
    features: [
      "AI-based practice platform", "20+ full-length mocks", "Score 65+ strategy",
      "Repeat sentence mastery", "Read aloud techniques", "Instant AI scoring",
    ],
    highlights: [
      "850+ students trained", "Avg score improvement of 12 points", "Results in 5 business days",
    ],
    syllabus: [
      { week: 1, topic: "Speaking Foundation", details: "Read Aloud, Repeat Sentence, Describe Image" },
      { week: 2, topic: "Writing Skills", details: "Summarize Written Text, Essay" },
      { week: 3, topic: "Reading Strategies", details: "FIB, Re-order Paragraphs, Multiple Choice" },
      { week: 4, topic: "Listening Skills", details: "Highlight Correct Summary, Fill in Blanks" },
      { week: 5, topic: "Mock Test Week", details: "5 full-length mocks with detailed review" },
      { week: 6, topic: "Final Preparation", details: "Weak area targeting, exam-day strategies" },
    ],
    instructors: [
      { fullName: "Priya Koirala", role: "PTE Specialist — 8 years", bio: "Certified PTE trainer with 850+ students successfully placed in Australian universities." },
    ],
    programs: [
      { name: "Intensive Batch", duration: "6 weeks", price: "NPR 12,000", format: "Offline" },
      { name: "Online Self-Paced", duration: "8 weeks", price: "NPR 8,000", format: "Online" },
    ],
    resources: [
      { title: "PTE Repeat Sentence Collection (500+)", type: "Practice Test" },
      { title: "Essay Templates Bank", type: "PDF" },
    ],
    faqs: [
      { q: "Is PTE accepted in Australia?", a: "Yes, PTE is accepted by all Australian universities and for Australian visas." },
      { q: "How quickly can I get results?", a: "PTE results are typically available within 5 business days." },
    ],
    imageUrl: null,
    heroImage: null,
    icon: "🤖",
    rating: 4.7,
    reviewCount: 198,
    students: 850,
    enrollmentCount: 850,
    isActive: true,
    isFeatured: true,
    isNew: false,
  },
  {
    id: "gmat-preparation",
    slug: "gmat-preparation",
    name: "GMAT Preparation",
    shortName: "GMAT",
    tagline: "Score 700+ and get into your dream MBA program",
    category: "test-prep",
    description: "MBA-focused GMAT prep with quantitative, verbal, and data insights training.",
    overview: "The GMAT is the gold standard for MBA admissions. Our 4-month program covers Quantitative, Verbal, Integrated Reasoning, and Data Insights sections.",
    duration: "4 months",
    price: 25000,
    priceNote: "Includes official GMAT prep materials",
    currency: "NPR",
    level: "Advanced",
    format: ["Online"],
    accentColor: "#DC2626",
    features: [
      "700+ score strategies", "CAT-adaptive practice", "Expert MBA counseling",
      "Focus4 technique for RC", "Custom study plans", "MBA application guidance",
    ],
    highlights: [
      "320+ students trained", "Avg score: 680", "Top B-school placements",
    ],
    syllabus: [
      { week: 1, topic: "Quant Foundation", details: "Arithmetic, Algebra, Geometry fundamentals" },
      { week: 4, topic: "Verbal Reasoning", details: "Critical Reasoning, Reading Comprehension" },
      { week: 8, topic: "Data Insights", details: "Data Sufficiency, Multi-Source Reasoning" },
      { week: 12, topic: "Full Mock Tests", details: "8 full-length adaptive mocks" },
    ],
    instructors: [
      { fullName: "Arun Mathema", role: "GMAT Expert / MBA Grad", bio: "HBS alum with GMAT 760. Has coached 320+ students into top 20 MBA programs." },
    ],
    programs: [
      { name: "Premium Online", duration: "4 months", price: "NPR 25,000", format: "Online" },
    ],
    resources: [
      { title: "Official GMAT Guide PDF", type: "PDF" },
      { title: "700-Level Problem Set", type: "Practice Test" },
    ],
    faqs: [
      { q: "What score do I need for Harvard MBA?", a: "The median GMAT at Harvard Business School is around 740." },
      { q: "How many attempts are allowed?", a: "You can take the GMAT up to 5 times per year, with a max of 8 total." },
    ],
    imageUrl: null,
    heroImage: null,
    icon: "📊",
    rating: 4.9,
    reviewCount: 87,
    students: 320,
    enrollmentCount: 320,
    isActive: true,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "sat-preparation",
    slug: "sat-preparation",
    name: "SAT Preparation",
    shortName: "SAT",
    tagline: "Score 1400+ for top US university admissions",
    category: "test-prep",
    description: "SAT prep for US undergraduate admissions covering Math, Reading, and Writing.",
    overview: "The SAT is required for undergraduate admissions at most US universities. Our course prepares you for the digital SAT with adaptive strategies.",
    duration: "3 months",
    price: 18000,
    priceNote: "Includes Khan Academy access",
    currency: "NPR",
    level: "Intermediate",
    format: ["Online", "Offline"],
    accentColor: "#059669",
    features: [
      "Khan Academy integration", "Full-length practice tests", "Essay writing workshop",
      "Math shortcut techniques", "1400+ target score",
    ],
    highlights: ["560+ students", "Avg score 1350", "Digital SAT ready"],
    syllabus: [
      { week: 1, topic: "Math Module 1 & 2", details: "Algebra, advanced math, problem solving" },
      { week: 4, topic: "Reading & Writing", details: "Evidence-based reading, grammar" },
      { week: 8, topic: "Full Digital Mocks", details: "4 complete digital SAT practice tests" },
    ],
    instructors: [
      { fullName: "Meera Shrestha", role: "SAT & US Admissions Specialist", bio: "Guides students through SAT prep and US college applications with an 85% acceptance rate." },
    ],
    programs: [
      { name: "Regular Batch", duration: "3 months", price: "NPR 18,000", format: "Offline" },
      { name: "Online", duration: "3 months", price: "NPR 14,000", format: "Online" },
    ],
    resources: [
      { title: "Official SAT Practice Tests (8)", type: "Practice Test" },
    ],
    faqs: [
      { q: "Is the SAT still required?", a: "Many US universities have gone test-optional, but top schools still consider strong SAT scores favorably." },
    ],
    imageUrl: null,
    heroImage: null,
    icon: "🏆",
    rating: 4.6,
    reviewCount: 143,
    students: 560,
    enrollmentCount: 560,
    isActive: true,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "toefl-preparation",
    slug: "toefl-preparation",
    name: "TOEFL iBT Preparation",
    shortName: "TOEFL",
    tagline: "Score 100+ for Canadian & US universities",
    category: "test-prep",
    description: "TOEFL iBT preparation for US & Canadian university admissions.",
    overview: "The TOEFL iBT is accepted by 12,000+ institutions globally. Our program focuses on integrated tasks, note-taking, and academic English.",
    duration: "2 months",
    price: 14000,
    priceNote: "All mock tests included",
    currency: "NPR",
    level: "Intermediate",
    format: ["Online"],
    accentColor: "#D97706",
    features: [
      "Note-taking strategies", "Integrated task mastery", "Score 100+ roadmap",
      "Speaking fluency drills", "Online proctored mocks",
    ],
    highlights: ["280+ students", "Score 100+ strategy", "Accepted worldwide"],
    syllabus: [
      { week: 1, topic: "Reading & Listening", details: "Academic vocabulary, lecture notes" },
      { week: 4, topic: "Speaking & Writing", details: "Integrated tasks, independent essays" },
      { week: 8, topic: "Mock Tests", details: "3 full TOEFL mocks with scoring" },
    ],
    instructors: [
      { fullName: "David Limbu", role: "TOEFL IBT Coach", bio: "Specialist in North American academic English with TOEFL 118 personal score." },
    ],
    programs: [
      { name: "Self-Paced Online", duration: "2 months", price: "NPR 14,000", format: "Online" },
    ],
    resources: [
      { title: "TOEFL Official Guide PDF", type: "PDF" },
    ],
    faqs: [
      { q: "TOEFL vs IELTS — which is better for Canada?", a: "Both are accepted. TOEFL is more common for US/Canada while IELTS for UK/Australia." },
    ],
    imageUrl: null,
    heroImage: null,
    icon: "🌐",
    rating: 4.5,
    reviewCount: 76,
    students: 280,
    enrollmentCount: 280,
    isActive: true,
    isFeatured: false,
    isNew: false,
  },
  {
    id: "duolingo-english-test",
    slug: "duolingo-english-test",
    name: "Duolingo English Test",
    shortName: "DET",
    tagline: "Affordable, fast, and accepted by 4000+ universities",
    category: "test-prep",
    description: "Fast-track Duolingo English Test prep — accepted by 4000+ universities worldwide.",
    overview: "The Duolingo English Test is the most affordable and convenient English proficiency test. Results in 48 hours and accepted by thousands of institutions.",
    duration: "3 weeks",
    price: 5000,
    priceNote: "Most affordable prep course",
    currency: "NPR",
    level: "Beginner",
    format: ["Online"],
    accentColor: "#16A34A",
    features: [
      "120+ score strategy", "Adaptive practice tests", "Quick preparation",
      "Video explanation library", "Score report guidance",
    ],
    highlights: ["920+ students", "Score 120+ targets", "Results in 48h"],
    syllabus: [
      { week: 1, topic: "Test Structure & Format", details: "All section types: literacy, conversation, comprehension, production" },
      { week: 2, topic: "Adaptive Practice", details: "AI-scored drills, read and complete, listen and type" },
      { week: 3, topic: "Full Mock Tests", details: "2 complete DET simulations with review" },
    ],
    instructors: [
      { fullName: "Nisha Sharma", role: "DET Specialist", bio: "Certified language instructor specializing in the Duolingo English Test preparation." },
    ],
    programs: [
      { name: "Crash Course", duration: "3 weeks", price: "NPR 5,000", format: "Online" },
    ],
    resources: [
      { title: "DET Sample Test Bank", type: "Practice Test" },
    ],
    faqs: [
      { q: "Is DET accepted for Australian student visa?", a: "Yes, DET is accepted for Australian student visas and many universities." },
      { q: "How long are scores valid?", a: "DET scores are valid for 2 years." },
    ],
    imageUrl: null,
    heroImage: null,
    icon: "🦉",
    rating: 4.7,
    reviewCount: 204,
    students: 920,
    enrollmentCount: 920,
    isActive: true,
    isFeatured: false,
    isNew: true,
  },
];

// ─── Enrollment Modal Helpers ─────────────────────────────────────────────────

export type CourseInstructorDetail = {
  id: string;
  name: string;
  fullName: string;
  role: string;
  avatar: string;
  bio: string;
  students: number;
  rating: number;
};

export const COURSE_INSTRUCTORS: CourseInstructorDetail[] = [
  {
    id: "sunita-rai",
    name: "Sunita Rai",
    fullName: "Sunita Rai",
    role: "IELTS Expert — 12 years",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    bio: "Former British Council trainer with 1,000+ students scored Band 7+.",
    students: 1000,
    rating: 4.9,
  },
  {
    id: "rajan-sharma",
    name: "Rajan Sharma",
    fullName: "Rajan Sharma",
    role: "Writing & Speaking Coach",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    bio: "Specialist in IELTS essay scoring and speaking fluency improvement.",
    students: 800,
    rating: 4.8,
  },
  {
    id: "priya-koirala",
    name: "Priya Koirala",
    fullName: "Priya Koirala",
    role: "PTE Specialist — 8 years",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=100&q=80",
    bio: "Certified PTE trainer with 850+ students successfully placed in Australian universities.",
    students: 850,
    rating: 4.7,
  },
  {
    id: "arun-mathema",
    name: "Arun Mathema",
    fullName: "Arun Mathema",
    role: "GMAT Expert / MBA Grad",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    bio: "HBS alum with GMAT 760. Has coached 320+ students into top 20 MBA programs.",
    students: 320,
    rating: 4.9,
  },
  {
    id: "meera-shrestha",
    name: "Meera Shrestha",
    fullName: "Meera Shrestha",
    role: "SAT & US Admissions Specialist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    bio: "Guides students through SAT prep and US college applications with an 85% acceptance rate.",
    students: 560,
    rating: 4.6,
  },
  {
    id: "david-limbu",
    name: "David Limbu",
    fullName: "David Limbu",
    role: "TOEFL IBT Coach",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80",
    bio: "Specialist in North American academic English with TOEFL 118 personal score.",
    students: 280,
    rating: 4.5,
  },
  {
    id: "nisha-sharma",
    name: "Nisha Sharma",
    fullName: "Nisha Sharma",
    role: "DET Specialist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    bio: "Certified language instructor specializing in the Duolingo English Test preparation.",
    students: 920,
    rating: 4.7,
  },
];

export const ENROLL_TIME_SLOTS: Record<"Morning" | "Evening" | "Night", string[]> = {
  Morning: ["6:00 AM – 8:00 AM", "8:00 AM – 10:00 AM", "10:00 AM – 12:00 PM"],
  Evening: ["4:00 PM – 6:00 PM", "6:00 PM – 8:00 PM"],
  Night:   ["8:00 PM – 10:00 PM", "10:00 PM – 12:00 AM"],
};

export const INTERESTED_COUNTRIES: string[] = [
  "Australia", "United Kingdom", "Canada", "United States",
  "New Zealand", "Germany", "Netherlands", "Japan", "South Korea", "Other",
];
