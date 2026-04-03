// ─────────────────────────────────────────────────────────────
// QnA Data — Single source of truth
// Future: migrated to Supabase → admin can manage via CMS panel
// ─────────────────────────────────────────────────────────────

export type QnaContributor = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  studentsHelped: number;
  totalAnswers: number;
  followers: number;
  following: number;
  bio: string;
  country: string;
};

export type QnaAnswer = {
  id: string;
  contributorId: string;
  text: string;
  date: string;
  likes: number;
};

export type QnaQuestion = {
  id: string;
  slug: string;
  title: string;
  body: string;
  category: string;
  country: string;
  tags: string[];
  authorId: string;
  date: string;
  likes: number;
  comments: number;
  views: number;
  answers: QnaAnswer[];
  answersCount: number;
};

// ── Contributors ──────────────────────────────────────────────
export const QNA_CONTRIBUTORS: QnaContributor[] = [
  {
    id: "madelyn-torff",
    name: "Madelyn Torff",
    role: "Senior Counselor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    studentsHelped: 42751,
    totalAnswers: 2200,
    followers: 12400,
    following: 5200,
    bio: "Senior counselor at Unifinders with 8+ years of experience helping Nepali students secure admissions in top universities across Australia, UK, and Canada.",
    country: "Australia",
  },
  {
    id: "marley-vetrovs",
    name: "Marley Vetrovs",
    role: "Visa Specialist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    studentsHelped: 108723,
    totalAnswers: 1850,
    followers: 9800,
    following: 3200,
    bio: "Visa specialist with deep expertise in student visa for UK, Canada, and USA. Has helped over 5,000 students achieve 98% visa approval rate.",
    country: "UK",
  },
  {
    id: "hanna-press",
    name: "Hanna Press",
    role: "Education Consultant",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    studentsHelped: 80542,
    totalAnswers: 1340,
    followers: 7600,
    following: 2100,
    bio: "Education consultant specializing in scholarships and financial aid. Has secured over $2M in scholarships for students from South Asia.",
    country: "Canada",
  },
  {
    id: "tatiane-lipshutz",
    name: "Tatiane Lipshutz",
    role: "Admission Expert",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80",
    studentsHelped: 60713,
    totalAnswers: 980,
    followers: 5400,
    following: 1800,
    bio: "Admission expert with strong network at top 100 QS-ranked universities. Expert in SOP writing, LOR guidance, and interview preparation.",
    country: "USA",
  },
  {
    id: "marcus-mango",
    name: "Marcus Mango",
    role: "Student Mentor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80",
    studentsHelped: 38142,
    totalAnswers: 750,
    followers: 4100,
    following: 1400,
    bio: "Student mentor who went through the entire study abroad journey himself. Now helps peers navigate the complex process with practical, firsthand advice.",
    country: "New Zealand",
  },
  {
    id: "abram-carder",
    name: "Abram Carder",
    role: "Counselor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    studentsHelped: 29400,
    totalAnswers: 2200,
    followers: 12200,
    following: 5200,
    bio: "Experienced counselor helping students choose the right country and program for their career goals. Expert in Australian and New Zealand university pathways.",
    country: "Australia",
  },
];

// ── Questions ─────────────────────────────────────────────────
export const QNA_QUESTIONS: QnaQuestion[] = [
  {
    id: "q1",
    slug: "which-country-is-better-for-engineering-australia-vs-canada",
    title: "Which country is a better choice for engineering — Australia or Canada?",
    body: "Hello,\nAustralia is a popular destination for international students who wish to study engineering. Australia offers top-quality education across its top engineering colleges. The country provides various engineering courses, such as diplomas of engineering, bachelor of engineering, master of engineering, and PhD programs. Some of the top universities for engineering in Australia include UNSW, University of Melbourne, Monash, and ANU which are all ranked in the top 200 globally.",
    category: "Courses",
    country: "Australia",
    tags: ["Engineering", "Australia", "Canada", "Courses"],
    authorId: "madelyn-torff",
    date: "21 Jan, 2025",
    likes: 4565,
    comments: 434,
    views: 1321,
    answersCount: 3,
    answers: [
      {
        id: "a1-1",
        contributorId: "abram-carder",
        text: "Both Australia and Canada are excellent for engineering. Australia offers world-class universities like UNSW, University of Melbourne and Monash ranked top 200 globally. Post-study work rights (485 visa) allows you to stay 2–4 years. Canada offers co-op programs, strong immigration pathways via Express Entry, and universities like UBC, University of Toronto and Waterloo in the top 50 globally for engineering.",
        date: "22 Jan, 2025",
        likes: 234,
      },
    ],
  },
  {
    id: "q2",
    slug: "what-ielts-score-do-i-need-for-uk-universities",
    title: "What IELTS score do I need to study in top UK universities?",
    body: "Hello,\nI am planning to pursue a Master's degree in the UK and would like to know the minimum and recommended IELTS scores for top universities. I have heard different requirements for different universities and programs. Can someone please clarify the requirements for universities like Oxford, UCL, and other Russell Group universities? Also, is PTE accepted as an alternative?",
    category: "Study in UK",
    country: "UK",
    tags: ["IELTS", "UK", "Study in UK", "English Tests"],
    authorId: "madelyn-torff",
    date: "18 Jan, 2025",
    likes: 3210,
    comments: 287,
    views: 2150,
    answersCount: 5,
    answers: [
      {
        id: "a2-1",
        contributorId: "marley-vetrovs",
        text: "For UK universities: Most Russell Group universities require IELTS 6.5 overall with no band below 6.0 for undergraduate. For postgraduate, you typically need 7.0 overall. Oxford and Cambridge may require 7.5+. Yes, PTE is widely accepted as an alternative to IELTS in the UK.",
        date: "19 Jan, 2025",
        likes: 412,
      },
    ],
  },
  {
    id: "q3",
    slug: "how-to-apply-for-chevening-scholarship-from-nepal",
    title: "How to apply for Chevening Scholarship from Nepal? What is the process?",
    body: "Hello,\nI am a Nepali student interested in applying for the Chevening Scholarship for a Master's degree in the UK. I'd like to know the detailed application process, eligibility requirements, and tips for writing a strong application. The Chevening website mentions needing 2 years of work experience — does this need to be in a specific field?",
    category: "Study Abroad",
    country: "UK",
    tags: ["Chevening", "Scholarship", "UK", "Study Abroad"],
    authorId: "hanna-press",
    date: "15 Jan, 2025",
    likes: 5890,
    comments: 521,
    views: 4320,
    answersCount: 7,
    answers: [
      {
        id: "a3-1",
        contributorId: "hanna-press",
        text: "The Chevening application opens in August and closes in November. Key requirements: 2+ years of work experience (any field), bachelor's degree, Nepali citizenship, strong English (IELTS 6.5+), and 3 chosen UK universities. The essays are the most critical part — focus on leadership impact, networking, and your UK study plan.",
        date: "16 Jan, 2025",
        likes: 892,
      },
    ],
  },
  {
    id: "q4",
    slug: "canada-student-visa-requirements-nepal",
    title: "What documents are required for Canada student visa from Nepal?",
    body: "Hello,\nI have received an offer letter from a Canadian college for a diploma program. I am now preparing for my study permit application. Can someone guide me on the complete list of documents needed, financial proof requirements, and how long it typically takes from Nepal?",
    category: "Visa Processing",
    country: "Canada",
    tags: ["Canada", "Visa Processing", "Study Permit", "Documents"],
    authorId: "marley-vetrovs",
    date: "12 Jan, 2025",
    likes: 2890,
    comments: 198,
    views: 3100,
    answersCount: 4,
    answers: [
      {
        id: "a4-1",
        contributorId: "marley-vetrovs",
        text: "For Canada study permit from Nepal you need: Acceptance letter, passport, financial proof (minimum CAD $10,000 + first year tuition), IELTS/PTE scores, academic transcripts, SOP/explanation letter, police clearance, medical exam results, and photos. Processing time from Nepal is typically 8–12 weeks. Apply as soon as you get your offer letter.",
        date: "13 Jan, 2025",
        likes: 567,
      },
    ],
  },
  {
    id: "q5",
    slug: "australia-vs-new-zealand-for-nursing-study",
    title: "Australia vs New Zealand — which is better for Nursing studies from Nepal?",
    body: "Hello,\nI am interested in studying Nursing abroad and have narrowed down to Australia and New Zealand. Both countries seem to have good opportunities for nurses after graduation. I would like to know about program quality, tuition fees, post-study work rights, and immigration pathways for Nepali nursing graduates.",
    category: "Courses",
    country: "Australia",
    tags: ["Nursing", "Australia", "New Zealand", "Courses", "Immigration"],
    authorId: "madelyn-torff",
    date: "10 Jan, 2025",
    likes: 3456,
    comments: 312,
    views: 2870,
    answersCount: 6,
    answers: [
      {
        id: "a5-1",
        contributorId: "madelyn-torff",
        text: "For nursing, both are excellent — but for immigration Australia has stronger pathways. The Skilled Independent visa (subclass 189) lists nurses as a priority occupation. Tuition in Australia ranges AUD 25,000–40,000/year, NZ is slightly cheaper. Both offer post-study work if you have local nursing registration. Key: Get AHPRA (Australia) or NCNZ (NZ) registration.",
        date: "11 Jan, 2025",
        likes: 789,
      },
    ],
  },
  {
    id: "q6",
    slug: "student-loan-for-studying-abroad-nepal",
    title: "Can I get an education loan to study abroad from Nepal? Which banks offer it?",
    body: "Hello,\nI want to study in Australia but don't have full funds. I have heard banks in Nepal provide education loans for studying abroad. Can someone share details on which banks offer education loans, the maximum loan amount, interest rates, and the required collateral? Also, can the loan help with visa financial proof?",
    category: "Expenses",
    country: "Australia",
    tags: ["Nepal", "Education Loan", "Expenses", "Funding"],
    authorId: "tatiane-lipshutz",
    date: "8 Jan, 2025",
    likes: 4120,
    comments: 389,
    views: 5200,
    answersCount: 5,
    answers: [
      {
        id: "a6-1",
        contributorId: "tatiane-lipshutz",
        text: "Several Nepali banks offer education loans (shiksha rin): Nabil Bank, NIC Asia, Everest Bank, and Himalayan Bank. Loan amounts range from NPR 10–80 lakhs. Interest rates: 10–13% per annum. Collateral required above NPR 20 lakhs. For visa purposes, the loan sanction letter and bank balance (FD or savings) is accepted as financial proof.",
        date: "9 Jan, 2025",
        likes: 1023,
      },
    ],
  },
  {
    id: "q7",
    slug: "uk-graduate-visa-post-study-work-permit",
    title: "How does the UK Graduate Visa (post-study work permit) work for Nepali students?",
    body: "Hello,\nI am currently studying in the UK and will complete my Master's degree soon. I want to understand the Graduate Visa — how to apply, when to apply, what jobs I can do, and whether it leads to permanent residency. I'm particularly interested in whether I can switch to a Skilled Worker visa from the Graduate Visa.",
    category: "Jobs",
    country: "UK",
    tags: ["UK", "Graduate Visa", "Post Study Work", "Jobs", "Immigration"],
    authorId: "marley-vetrovs",
    date: "5 Jan, 2025",
    likes: 6780,
    comments: 543,
    views: 7890,
    answersCount: 8,
    answers: [
      {
        id: "a7-1",
        contributorId: "marley-vetrovs",
        text: "The UK Graduate Visa allows you to stay and work (any job, any employer) for 2 years after your degree (3 years for PhD). You can apply before your student visa expires and switch to a Skilled Worker Visa if you find a sponsored employer. It's a great stepping stone to UK permanent residency (ILR requires 5 years).",
        date: "6 Jan, 2025",
        likes: 2345,
      },
    ],
  },
  {
    id: "q8",
    slug: "cost-of-living-usa-for-nepali-students",
    title: "What is the realistic cost of living in the USA for a Nepali student?",
    body: "Hello,\nI am planning to pursue my Master's in Computer Science in the USA. I would like to know the monthly cost of living including accommodation, food, transport, and other expenses. I'm looking at universities in both expensive cities (New York, San Francisco) and more affordable areas (Texas, Ohio, Indiana). Any realistic breakdown would help.",
    category: "Expenses",
    country: "USA",
    tags: ["USA", "Expenses", "Cost of Living", "Student Life"],
    authorId: "abram-carder",
    date: "3 Jan, 2025",
    likes: 5430,
    comments: 467,
    views: 6780,
    answersCount: 9,
    answers: [
      {
        id: "a8-1",
        contributorId: "abram-carder",
        text: "In expensive cities (NYC, SF, LA): expect $2,500–3,500/month. Mid-tier cities (Boston, Chicago): $1,800–2,500/month. Affordable states (Texas, Ohio, Indiana): $1,200–1,800/month. Breakdown: Rent ($800–2,000), Food ($300–500), Transport ($100–150), Utilities ($100–150), Misc ($200–300). Most CS Master's programs offer TA/RA positions that partially cover tuition.",
        date: "4 Jan, 2025",
        likes: 1876,
      },
    ],
  },
  {
    id: "q9",
    slug: "insurance-requirements-international-students-australia",
    title: "Is health insurance mandatory for international students in Australia? What does OSHC cover?",
    body: "Hello,\nI have received my offer letter from an Australian university and noticed they require Overseas Student Health Cover (OSHC). I want to understand what OSHC covers, the cost, and whether I need to purchase additional insurance. Also, can I choose my own OSHC provider or must I use the university's recommended one?",
    category: "Insurance",
    country: "Australia",
    tags: ["Australia", "Insurance", "OSHC", "Health"],
    authorId: "hanna-press",
    date: "1 Jan, 2025",
    likes: 2340,
    comments: 178,
    views: 3120,
    answersCount: 4,
    answers: [
      {
        id: "a9-1",
        contributorId: "hanna-press",
        text: "OSHC is mandatory for all international students in Australia. It covers: GP/specialist consultations, hospital treatment, emergency ambulance, and select pharmaceuticals. Cost: approximately AUD 600–650/year for single. For families it can be AUD 2,000+. You CAN choose your own provider — Medibank, Bupa, CBHS, AHM, and NIB are all approved. You do NOT need to use the university's provider.",
        date: "2 Jan, 2025",
        likes: 567,
      },
    ],
  },
  {
    id: "q10",
    slug: "ireland-student-visa-requirements-process",
    title: "What is the process to get a student visa for Ireland from Nepal?",
    body: "Hello,\nI am interested in studying in Ireland — specifically for a business management program. I need detailed information about the Irish student visa process for Nepali citizens, processing time, financial requirements, and any specific conditions. I have an offer letter from a recognized institution.",
    category: "Visa Processing",
    country: "Ireland",
    tags: ["Ireland", "Visa Processing", "Study in Ireland", "Europe"],
    authorId: "tatiane-lipshutz",
    date: "28 Dec, 2024",
    likes: 1890,
    comments: 143,
    views: 2340,
    answersCount: 3,
    answers: [
      {
        id: "a10-1",
        contributorId: "tatiane-lipshutz",
        text: "Ireland student visa (Study Visa D) for Nepali citizens: required documents include offer letter, financial proof (€10,000+), language test, passport, and academic documents. Processing time: 8–10 weeks. You must apply through the Irish Immigration system (AVATS). Ireland allows 20 hours/week work during studies and 12 months post-study stay.",
        date: "29 Dec, 2024",
        likes: 423,
      },
    ],
  },
  {
    id: "q11",
    slug: "new-zealand-work-rights-for-students",
    title: "How many hours can international students work in New Zealand per week?",
    body: "Hello,\nI am planning to study a Bachelor's program in New Zealand. I want to work part-time while studying to support my living expenses. Can someone tell me the official work rights for international students in New Zealand, both during studies and during semester breaks? Also, does the type of institution matter?",
    category: "Jobs",
    country: "New Zealand",
    tags: ["New Zealand", "Jobs", "Work Rights", "Student Life"],
    authorId: "marcus-mango",
    date: "25 Dec, 2024",
    likes: 2100,
    comments: 167,
    views: 2890,
    answersCount: 4,
    answers: [
      {
        id: "a11-1",
        contributorId: "marcus-mango",
        text: "International students at New Zealand universities and polytechnics can work up to 20 hours/week during the academic semester. During scheduled breaks (summer, winter), you can work full time (unlimited hours). English language students usually cannot work. Post-study, you can apply for the Post Study Work Visa — 1 to 3 years depending on your qualification level.",
        date: "26 Dec, 2024",
        likes: 534,
      },
    ],
  },
  {
    id: "q12",
    slug: "pte-vs-ielts-which-is-easier-for-nepali-students",
    title: "PTE vs IELTS — which is easier for Nepali students to score high?",
    body: "Hello,\nI am preparing for an English proficiency test and can't decide between PTE Academic and IELTS Academic. Both seem to be accepted by universities in Australia, UK, and Canada. I've heard PTE is computer-based and results come faster but the format is different. Which is generally easier for Nepali students and which has a higher pass rate?",
    category: "Courses",
    country: "Nepal",
    tags: ["PTE", "IELTS", "English Test", "Exam Prep"],
    authorId: "madelyn-torff",
    date: "22 Dec, 2024",
    likes: 7890,
    comments: 698,
    views: 9340,
    answersCount: 12,
    answers: [
      {
        id: "a12-1",
        contributorId: "madelyn-torff",
        text: "From our experience with thousands of Nepali students: PTE generally yields higher scores for students strong in reading and listening. IELTS is better if you prefer human examiners for speaking. PTE results in 5 days vs IELTS 2–13 days. PTE speaking is AI-graded which can be more objective. For Australian PR, PTE scores are accepted directly without conversion. Our data shows Nepali students score about 5-10 points higher in PTE on average.",
        date: "23 Dec, 2024",
        likes: 2341,
      },
    ],
  },
];

export const QNA_CATEGORIES = [
  "All",
  "Courses",
  "Visa Processing",
  "Study in UK",
  "Insurance",
  "Expenses",
  "Jobs",
  "Study Abroad",
];

export const QNA_COUNTRIES = [
  { name: "Australia", emoji: "🇦🇺" },
  { name: "Canada",    emoji: "🇨🇦" },
  { name: "USA",       emoji: "🇺🇸" },
  { name: "UK",        emoji: "🇬🇧" },
  { name: "New Zealand", emoji: "🇳🇿" },
  { name: "Ireland",   emoji: "🇮🇪" },
  { name: "India",     emoji: "🇮🇳" },
  { name: "Bangladesh", emoji: "🇧🇩" },
  { name: "Dubai",     emoji: "🇦🇪" },
];

export const QNA_FILTER_TAGS = [
  "All", "Courses", "Visa Processing", "Study in USA",
  "Study in UK", "Insurance", "Expenses", "Jobs", "Study Abroad", "Work Permit", "Scholarship",
];

export const QNA_SPONSORED = [
  {
    id: "s1",
    title: "OMGT BA LLB Admissions 2023",
    subtitle: "Approved by BCI",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "s2",
    title: "OMGT BA LLB Admissions 2023",
    subtitle: "Approved by BCI",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "s3",
    title: "OMGT BA LLB Admissions 2023",
    subtitle: "Approved by BCI",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "s4",
    title: "OMGT BA LLB Admissions 2023",
    subtitle: "Approved by BCI",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=300&q=80",
  },
];
