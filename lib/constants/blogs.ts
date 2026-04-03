export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogSection[];
  category: string;
  tags: string[];
  country?: string;
  author: BlogAuthor;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
};

export type BlogAuthor = {
  name: string;
  avatar: string;
  role: string;
  rating: number;
  badges: string[];
};

export type BlogSection = {
  type: "paragraph" | "heading" | "subheading" | "list" | "quote" | "image";
  content: string;
  items?: string[];
};

const AUTHORS: BlogAuthor[] = [
  { name: "Aspen Botoh",    avatar: "https://i.pravatar.cc/80?img=47", role: "Senior Counselor",     rating: 4.8, badges: ["Certified Counselor", "IELTS Instructor"] },
  { name: "Abram Carder",   avatar: "https://i.pravatar.cc/80?img=12", role: "Writer",               rating: 4.5, badges: ["Writer", "PIER Certified Counselor", "IELTS Instructor"] },
  { name: "Priya Sharma",   avatar: "https://i.pravatar.cc/80?img=48", role: "Education Consultant",  rating: 4.9, badges: ["Visa Expert", "Australia Specialist"] },
  { name: "Rajan Thapa",    avatar: "https://i.pravatar.cc/80?img=15", role: "Study Abroad Expert",   rating: 4.7, badges: ["Canada Specialist", "PR Consultant"] },
  { name: "Sunita Aryal",   avatar: "https://i.pravatar.cc/80?img=49", role: "Test Prep Coach",       rating: 4.6, badges: ["IELTS Coach", "PTE Expert"] },
  { name: "Dev Adhikari",   avatar: "https://i.pravatar.cc/80?img=17", role: "Country Specialist",    rating: 4.8, badges: ["UK Specialist", "Scholarship Expert"] },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "gre-test-prep-guide",
    slug: "gre-test-prep-guide",
    title: "Test Preparation for GRE: The Complete 2024 Guide",
    excerpt: "Lorem ipsum dolor sit amet consectetur. Justo mauris nibh vitae vestibulum quis. Et consectetur consequat at nisl malesuada diam.",
    category: "Exam Prep",
    tags: ["GRE", "Test Prep", "Study Abroad"],
    country: "USA",
    author: AUTHORS[0],
    date: "Dec 28, 2023",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    featured: true,
    content: [
      { type: "paragraph", content: "Preparing for the GRE (Graduate Record Examination) can feel overwhelming, but with the right strategy, you can achieve your target score and gain admission to top graduate programs in the USA, Canada, and beyond." },
      { type: "heading", content: "What is the GRE?" },
      { type: "paragraph", content: "The GRE is a standardized test required for admission to most graduate programs in North America. It measures verbal reasoning, quantitative reasoning, and analytical writing skills. The test is computer-adaptive and takes approximately 3 hours 45 minutes to complete." },
      { type: "subheading", content: "GRE Score Structure" },
      { type: "list", content: "", items: ["Verbal Reasoning: 130–170 points", "Quantitative Reasoning: 130–170 points", "Analytical Writing: 0–6 points (in 0.5 increments)", "Total: 260–340 points (verbal + quant)"] },
      { type: "heading", content: "Top 5 GRE Preparation Strategies" },
      { type: "paragraph", content: "A 90-day structured study plan is typically sufficient for most test-takers. Here is how to organize your preparation for maximum impact:" },
      { type: "list", content: "", items: ["Take a full-length diagnostic test in the first week to identify baseline score and weak areas.", "Dedicate 2–3 hours daily to focused practice, alternating between verbal and quant sections.", "Master the 3,500 most common GRE vocabulary words using flashcard apps like Magoosh or Anki.", "Practice Analytical Writing daily — aim for 1 essay per day for the first 4 weeks.", "Take 5–6 full practice tests in exam conditions in the final month."] },
      { type: "quote", content: "The GRE is not about memorization — it is about pattern recognition. Train yourself to see the patterns and your score will follow." },
      { type: "heading", content: "Best GRE Prep Resources for Nepali Students" },
      { type: "paragraph", content: "While many online resources exist, these are the most effective tools for Nepali students targeting a 320+ score:" },
      { type: "list", content: "", items: ["Official ETS GRE materials — always start here for authentic practice", "Magoosh GRE Prep — excellent video explanations and adaptive practice", "Princeton Review Cracking the GRE — comprehensive strategy guide", "Kaplan GRE Prep Plus — strong for quantitative reasoning", "Khan Academy — free supplementary math content for quant section"] },
    ],
  },
  {
    id: "top-10-engineering-australia",
    slug: "top-10-engineering-australia",
    title: "Top 10 Engineering Colleges in Australia",
    excerpt: "Australia is home to some of the world's finest engineering programs. Here is your definitive 2024 guide to the best engineering institutions with rankings, fees, and entry requirements.",
    category: "Country Guides",
    tags: ["Australia", "Engineering", "Universities"],
    country: "Australia",
    author: AUTHORS[2],
    date: "Dec 20, 2023",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    featured: true,
    content: [
      { type: "paragraph", content: "Australia consistently ranks among the top destinations for engineering education globally. With world-class facilities, strong industry partnerships, and a focus on innovation, Australian engineering degrees are highly sought after by international students." },
      { type: "heading", content: "University of Melbourne" },
      { type: "paragraph", content: "Ranked #33 globally (QS 2024), the University of Melbourne offers exceptional engineering programs through the Melbourne School of Engineering. The university's strong research culture and industry connections make it the top choice for engineering students." },
      { type: "list", content: "", items: ["Annual Tuition: AUD 42,000–48,000", "IELTS: 6.5 overall (6.0 in each band)", "Entry: ATAR 98+ / GPA 3.5+", "Specializations: Civil, Electrical, Mechanical, Software, Chemical"] },
      { type: "heading", content: "University of New South Wales (UNSW)" },
      { type: "paragraph", content: "UNSW Sydney is a global leader in engineering education, ranked #45 globally. Located in Sydney, UNSW has produced more engineers than any other Australian university. Its Faculty of Engineering is one of the largest and most distinguished in the Southern Hemisphere." },
      { type: "list", content: "", items: ["Annual Tuition: AUD 43,000–50,000", "IELTS: 6.5 overall", "Entry: Competitive admission based on academic record", "Notable: Strong ties with major mining and resources companies"] },
      { type: "quote", content: "UNSW's engineering graduates are among the highest-earning in Australia, with median starting salaries of AUD 72,000." },
      { type: "heading", content: "University of Melbourne" },
      { type: "paragraph", content: "The University of Melbourne is a globally recognized research institution that consistently excels in engineering and technology fields. Its engineering alumni include multiple Nobel laureates and technology company founders." },
      { type: "paragraph", content: "The university's strategic location in Melbourne — Australia's technology hub — gives students unparalleled access to internship opportunities at companies like Telstra, ANZ, and numerous tech startups in the city's growing ecosystem." },
    ],
  },
  {
    id: "canada-student-visa-guide",
    slug: "canada-student-visa-guide",
    title: "How to Get a Canadian Student Visa in 2024: Step-by-Step",
    excerpt: "The Canadian study permit process can be complex. This comprehensive guide walks you through every step, document, and timeline you need to know.",
    category: "Visa Processing",
    tags: ["Canada", "Visa", "Study Permit", "Immigration"],
    country: "Canada",
    author: AUTHORS[3],
    date: "Dec 15, 2023",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "Obtaining a Canadian Study Permit is a critical step for Nepali students wishing to pursue education in Canada. The process requires careful preparation, accurate documentation, and strategic timing. This guide covers everything you need to know." },
      { type: "heading", content: "Who Needs a Study Permit?" },
      { type: "paragraph", content: "All international students, including Nepali citizens, studying in Canada for more than 6 months require a Study Permit. This is different from a student visa — the Study Permit is the actual document that allows you to study in Canada." },
      { type: "heading", content: "Required Documents Checklist" },
      { type: "list", content: "", items: ["Valid passport (must be valid for the entire duration of studies)", "Acceptance letter from a Designated Learning Institution (DLI)", "Proof of financial support (minimum CAD 10,000 per year for living expenses + tuition)", "Statement of Purpose (Letter of Explanation)", "Academic transcripts and certificates", "English language test results (IELTS 6.0 or equivalent)", "Biometrics (fingerprints and photo) — CAD 85 fee", "Medical examination (if required based on your home country)", "Police clearance certificate"] },
      { type: "quote", content: "Strong financial documentation is the number one reason Canadian study permit applications succeed or fail. Ensure your bank statements show a consistent balance." },
      { type: "heading", content: "Processing Times & Fees" },
      { type: "paragraph", content: "Canadian Study Permit processing times vary by country and application volume. For Nepali applicants, typical processing is 8–12 weeks, though this can vary significantly during peak intake seasons (October-November for January intake, March-April for September intake)." },
    ],
  },
  {
    id: "ielts-vs-pte-which-better",
    slug: "ielts-vs-pte-which-better",
    title: "IELTS vs PTE: Which English Test is Better for You in 2024?",
    excerpt: "Choosing between IELTS and PTE Academic is one of the most impactful decisions in your study abroad journey. Here is a detailed comparison to help you decide.",
    category: "Exam Prep",
    tags: ["IELTS", "PTE", "Test Prep", "English"],
    author: AUTHORS[4],
    date: "Dec 10, 2023",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "Both IELTS and PTE Academic are globally recognized English proficiency tests accepted by universities, immigration authorities, and employers worldwide. However, they differ significantly in format, scoring, difficulty, and cost." },
      { type: "heading", content: "Key Differences at a Glance" },
      { type: "list", content: "", items: ["Format: IELTS has human examiners for speaking; PTE is 100% computer-scored", "Duration: IELTS takes 2 hours 45 min (plus separate speaking); PTE takes 2 hours", "Results: IELTS results in 3–5 days; PTE results in 1–5 business days", "Cost: Both cost approximately NPR 25,000–27,000 in Nepal", "Validity: Both valid for 2 years"] },
      { type: "quote", content: "PTE Academic is increasingly preferred by Nepali students due to its fully computer-based format and faster results — ideal for urgent visa applications." },
    ],
  },
  {
    id: "uk-graduate-route-visa",
    slug: "uk-graduate-route-visa",
    title: "UK Graduate Route Visa: 2 Years Work After Graduation",
    excerpt: "The UK Graduate Route visa allows international students to stay and work in the UK for 2 years after graduation. Here is everything you need to know.",
    category: "Visa Processing",
    tags: ["UK", "Graduate Visa", "Work Permit"],
    country: "UK",
    author: AUTHORS[5],
    date: "Dec 5, 2023",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "The UK Graduate Route visa (previously known as the Post-Study Work visa) is one of the most attractive benefits of studying in the United Kingdom. It allows international students who have successfully completed a UK degree to remain in the UK and work (or look for work) for up to 2 years." },
      { type: "heading", content: "Eligibility Requirements" },
      { type: "list", content: "", items: ["Must have successfully completed a degree at a UK Higher Education Provider", "Must have a valid Student visa (Tier 4) at time of application", "Must apply from within the UK before your student visa expires", "PhD graduates receive 3 years instead of 2"] },
    ],
  },
  {
    id: "scholarships-nepal-students-australia",
    slug: "scholarships-nepal-students-australia",
    title: "Top 15 Scholarships for Nepali Students in Australia 2024",
    excerpt: "Studying in Australia doesn't have to break the bank. These 15 real scholarships are available specifically for Nepali students seeking quality education Down Under.",
    category: "Scholarships",
    tags: ["Australia", "Scholarships", "Financial Aid"],
    country: "Australia",
    author: AUTHORS[0],
    date: "Nov 28, 2023",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1541309676497-0a04a2c30ff1?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "Australia offers an impressive array of scholarships for international students, including many specifically targeting students from South Asia including Nepal. These scholarships can cover everything from partial tuition to full cost-of-living support." },
      { type: "heading", content: "Australia Awards Scholarships" },
      { type: "paragraph", content: "The flagship Australian Government scholarship program for international students, Australia Awards offers long-term development scholarships for citizens of select countries including Nepal. These fully-funded scholarships cover tuition, return airfares, establishment allowance, and living costs." },
      { type: "list", content: "", items: ["Value: Fully funded (tuition + living expenses + flights)", "Duration: Full degree program (typically 1.5–4 years)", "Eligibility: Nepali citizens, 18+ years, outside Australia at time of application", "IELTS: 6.5 minimum", "Application Deadline: Typically April–June each year"] },
    ],
  },
  {
    id: "student-accommodation-uk",
    slug: "student-accommodation-uk",
    title: "Student Accommodation in the UK: Complete Housing Guide",
    excerpt: "Finding the right accommodation in the UK is crucial for your success as an international student. From university halls to private rentals, here is your complete guide.",
    category: "Student Life",
    tags: ["UK", "Accommodation", "Student Life"],
    country: "UK",
    author: AUTHORS[5],
    date: "Nov 20, 2023",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "Accommodation is often the biggest expense after tuition for international students in the UK. Understanding your options — from university halls to private house shares — will help you make a financially smart decision that also supports your academic success." },
      { type: "heading", content: "Types of Student Accommodation" },
      { type: "list", content: "", items: ["University Halls: Managed, all-inclusive, ideal for first year. Cost: £120–£250/week.", "Private Student Halls (Purpose-Built): Premium amenities, en-suite rooms. Cost: £180–£350/week.", "Private House Share: Most affordable for 2nd year+. Cost: £80–£150/week per person.", "Homestay: Live with a local family. Cost: £150–£200/week including meals."] },
    ],
  },
  {
    id: "cost-study-canada-2024",
    slug: "cost-study-canada-2024",
    title: "Complete Cost of Studying in Canada for Nepali Students 2024",
    excerpt: "From tuition fees to monthly expenses, this detailed breakdown gives you every cost you need to budget for your Canadian study adventure.",
    category: "Expenses",
    tags: ["Canada", "Expenses", "Budget", "Cost of Living"],
    country: "Canada",
    author: AUTHORS[3],
    date: "Nov 15, 2023",
    readTime: 11,
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9a7?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "Canada is often cited as a more affordable alternative to the USA and UK for international students. While this is partially true, costs have risen significantly in recent years, particularly in cities like Toronto and Vancouver. Here is the most accurate 2024 cost breakdown." },
      { type: "heading", content: "Annual Tuition Fees" },
      { type: "list", content: "", items: ["Undergraduate programs: CAD 20,000–35,000/year", "Postgraduate programs: CAD 15,000–30,000/year", "MBA programs: CAD 30,000–60,000/year", "Medical programs: CAD 25,000–40,000/year"] },
    ],
  },
  {
    id: "work-part-time-australia",
    slug: "work-part-time-australia",
    title: "Working Part-Time in Australia as an International Student",
    excerpt: "Australia allows international students to work 48 hours per fortnight during term time. Here is everything you need to know to legally work and maximize your earnings.",
    category: "Jobs",
    tags: ["Australia", "Work Rights", "Part-Time Jobs"],
    country: "Australia",
    author: AUTHORS[2],
    date: "Nov 10, 2023",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "One of Australia's biggest draws for international students is the right to work part-time during studies. The Australian government allows student visa holders to work up to 48 hours per fortnight during academic sessions and unlimited hours during semester breaks." },
      { type: "heading", content: "Most Popular Jobs for Nepali Students" },
      { type: "list", content: "", items: ["Cafe/Restaurant: AUD 15–22/hour (most common)", "Retail: AUD 16–20/hour", "Uber Eats/DoorDash delivery: AUD 18–25/hour", "Admin/Office work: AUD 20–28/hour", "Tutoring: AUD 25–50/hour"] },
    ],
  },
  {
    id: "ireland-tech-jobs-graduates",
    slug: "ireland-tech-jobs-graduates",
    title: "Tech Jobs in Ireland for International Graduates: 2024 Guide",
    excerpt: "Dublin is Europe's Silicon Valley. With Google, Apple, Meta, and Microsoft all headquartered here, Ireland offers unmatched tech career opportunities for international graduates.",
    category: "Jobs",
    tags: ["Ireland", "Tech Jobs", "Graduate Jobs"],
    country: "Ireland",
    author: AUTHORS[1],
    date: "Nov 5, 2023",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "Ireland has emerged as Europe's premier technology hub, hosting the European headquarters of virtually every major Silicon Valley company. For international graduates with the right skills, Ireland represents a golden opportunity to launch a global tech career." },
      { type: "heading", content: "Top Tech Companies Hiring in Dublin" },
      { type: "list", content: "", items: ["Google: 8,000+ employees, hiring across engineering, sales, and operations", "Meta (Facebook): European HQ, major software engineering hub", "Apple: European operations center with over 6,000 employees", "Microsoft: EMEA headquarters, major cloud and AI teams", "Amazon/AWS: Large engineering and operations presence", "LinkedIn: European headquarters with strong Nepali alumni community"] },
    ],
  },
  {
    id: "usa-f1-visa-interview-tips",
    slug: "usa-f1-visa-interview-tips",
    title: "USA F-1 Student Visa Interview: 25 Most Common Q&As",
    excerpt: "The US embassy interview is the most critical step in your F-1 visa application. Master these 25 most-asked questions to maximize your visa approval chances.",
    category: "Visa Processing",
    tags: ["USA", "F1 Visa", "Visa Interview"],
    country: "USA",
    author: AUTHORS[0],
    date: "Oct 28, 2023",
    readTime: 13,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "The US F-1 student visa interview at the American Embassy is often the most nerve-wracking part of the study abroad journey. However, with the right preparation, you can walk into the interview with confidence. Here are the 25 most frequently asked questions and how to answer them effectively." },
      { type: "heading", content: "Why Do You Want to Study in the USA?" },
      { type: "paragraph", content: "This is asked in virtually every interview. Your answer should demonstrate strong ties to your home country (showing intent to return), academic motivation, and why the US specifically offers what your home country cannot in your field." },
      { type: "quote", content: "The visa officer's primary concern is: 'Will this person return home after their studies?' Your answer must naturally address this without being asked." },
    ],
  },
  {
    id: "new-zealand-student-life",
    slug: "new-zealand-student-life",
    title: "Student Life in New Zealand: What No One Tells You",
    excerpt: "New Zealand offers a unique study abroad experience that combines world-class education with breathtaking natural beauty. Here is an honest look at what student life is really like.",
    category: "Student Life",
    tags: ["New Zealand", "Student Life", "Campus Life"],
    country: "New Zealand",
    author: AUTHORS[4],
    date: "Oct 20, 2023",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "New Zealand consistently ranks as one of the world's best places to live, and for international students, this translates into an exceptional quality of life during your studies. But beyond the stunning landscapes, what is student life actually like in the Land of the Long White Cloud?" },
      { type: "heading", content: "The Academic Experience" },
      { type: "paragraph", content: "New Zealand universities are known for their collaborative learning environment, small class sizes, and strong focus on practical application. Professors are generally accessible and the culture is egalitarian — students are encouraged to challenge ideas and engage in debate." },
    ],
  },
  {
    id: "study-europe-free-tuition",
    slug: "study-europe-free-tuition",
    title: "Study in Europe for Free: Which Countries Offer No Tuition?",
    excerpt: "Believe it or not, some of Europe's best universities charge zero tuition fees for international students. This guide reveals which countries and programs offer free education.",
    category: "Study Abroad",
    tags: ["Europe", "Free Tuition", "Germany", "Norway"],
    country: "Europe",
    author: AUTHORS[1],
    date: "Oct 15, 2023",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
    content: [
      { type: "paragraph", content: "One of Europe's best-kept secrets for international students is the availability of near-zero or completely free tuition at some of the continent's most prestigious universities. While English-speaking countries like the UK, USA, and Australia charge international students premium rates, several European countries have chosen a different path." },
      { type: "heading", content: "Germany: The Top Free Education Destination" },
      { type: "paragraph", content: "Germany is the #1 destination for students seeking free education. Public universities in Germany charge only a semester fee (€100–350) covering administrative costs and often including a public transport ticket — not tuition itself. Germany has over 380 English-taught degree programs." },
    ],
  },
];

export const BLOG_CATEGORIES = ["All", "Courses", "Visa Processing", "Study in UK", "Insurance", "Expenses", "Jobs", "Study Abroad"];

export const BLOG_FILTER_TAGS = ["All", "Courses", "Visa Processing", "Study in USA", "Study in UK", "Insurance", "Expenses", "Jobs", "Study Abroad", "Work Permit", "Scholarship"];

export const BLOG_COUNTRIES = [
  { name: "Australia", emoji: "🇦🇺" },
  { name: "Canada",    emoji: "🇨🇦" },
  { name: "USA",       emoji: "🇺🇸" },
  { name: "UK",        emoji: "🇬🇧" },
  { name: "New Zealand", emoji: "🇳🇿" },
  { name: "Ireland",   emoji: "🇮🇪" },
  { name: "India",     emoji: "🇮🇳" },
  { name: "Bangladesh", emoji: "🇧🇩" },
  { name: "Dubai",     emoji: "🇦🇪" },
  { name: "Europe",    emoji: "🇪🇺" },
];
