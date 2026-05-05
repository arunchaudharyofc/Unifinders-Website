/** Study fields catalog for Explore Programs grid */
export const STUDY_FIELDS = [
  { name: "Computer Science & IT", slug: "computer-science", iconUrl: "https://cdn-icons-png.flaticon.com/512/2721/2721304.png", description: "Software engineering, data science, cybersecurity, artificial intelligence, and information systems.", displayOrder: 1 },
  { name: "Engineering & Technology", slug: "engineering", iconUrl: "https://cdn-icons-png.flaticon.com/512/2942/2942243.png", description: "Mechanical, civil, electrical, chemical, and aerospace engineering programs.", displayOrder: 2 },
  { name: "Business & Management", slug: "business", iconUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png", description: "MBA, accounting, finance, marketing, supply chain, and entrepreneurship programs.", displayOrder: 3 },
  { name: "Hospitality & Tourism", slug: "hospitality", iconUrl: "https://cdn-icons-png.flaticon.com/512/3531/3531806.png", description: "Hotel management, tourism, event management, and culinary arts.", displayOrder: 4 },
  { name: "Health & Medical Sciences", slug: "health-sciences", iconUrl: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png", description: "Nursing, public health, biomedical science, pharmacy, and physiotherapy.", displayOrder: 5 },
  { name: "Science & Mathematics", slug: "science", iconUrl: "https://cdn-icons-png.flaticon.com/512/2942/2942909.png", description: "Physics, chemistry, biology, mathematics, and environmental science.", displayOrder: 6 },
  { name: "Arts & Humanities", slug: "arts-humanities", iconUrl: "https://cdn-icons-png.flaticon.com/512/3997/3997872.png", description: "Literature, philosophy, history, languages, and cultural studies.", displayOrder: 7 },
  { name: "Education & Teaching", slug: "education", iconUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png", description: "Teaching, educational leadership, curriculum design, and TESOL programs.", displayOrder: 8 },
];

/** Country guides with real data */
export const COUNTRY_GUIDES = [
  {
    country: "Australia", slug: "australia", flagEmoji: "🇦🇺",
    flagUrl: "https://flagcdn.com/w80/au.png",
    bannerImageUrl: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&auto=format&fit=crop",
    overview: "Australia is one of the most popular study abroad destinations, known for world-class universities, a multicultural society, and strong post-study work opportunities. With 7 of the world's top 100 universities, Australia offers quality education across all fields.",
    whyStudyHere: ["7 universities in global top 100", "Post-study work visa (2-4 years)", "High quality of life", "Multicultural & welcoming society", "Strong research opportunities", "Part-time work allowed during study (48hrs/fortnight)"],
    livingCost: { min: 21000, max: 30000, currency: "AUD", breakdown: { accommodation: "10,000–18,000 AUD/year", food: "4,000–6,000 AUD/year", transport: "2,000–4,000 AUD/year", other: "3,000–5,000 AUD/year" } },
    visaRequirements: { visaType: "Student Visa (Subclass 500)", processingTime: "4-6 weeks", requirements: ["Confirmation of Enrolment (CoE)", "Genuine Temporary Entrant (GTE) statement", "Financial capacity proof (~AUD 21,041/year)", "IELTS 6.0+ or equivalent", "Overseas Student Health Cover (OSHC)", "Valid passport"], cost: "AUD 710" },
    topCities: [{ name: "Melbourne", description: "Cultural capital with top universities" }, { name: "Sydney", description: "Iconic city with diverse opportunities" }, { name: "Brisbane", description: "Subtropical climate and growing tech hub" }, { name: "Perth", description: "Affordable living with mining industry" }],
    workRights: { duringStudy: "48 hours per fortnight during semester, unlimited during breaks", postStudy: "2-4 year Post-Study Work visa depending on qualification level", prRequirements: "Points-based skilled migration pathway available" },
    intakes: ["February", "July"],
    currency: "AUD", avgTuitionMin: 20000, avgTuitionMax: 50000, universityCount: 43, displayOrder: 1,
  },
  {
    country: "Canada", slug: "canada", flagEmoji: "🇨🇦",
    flagUrl: "https://flagcdn.com/w80/ca.png",
    bannerImageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&auto=format&fit=crop",
    overview: "Canada is the #1 destination for Nepali students, offering affordable education, clear pathways to permanent residency, and a safe multicultural environment. Canadian degrees are recognized worldwide.",
    whyStudyHere: ["Clear PR pathway after graduation", "Affordable tuition vs US/UK", "Safe and multicultural society", "High quality education system", "Post-Graduation Work Permit (PGWP)", "Co-op programs with industry"],
    livingCost: { min: 15000, max: 25000, currency: "CAD", breakdown: { accommodation: "8,000–15,000 CAD/year", food: "3,000–5,000 CAD/year", transport: "1,000–2,500 CAD/year", other: "2,000–4,000 CAD/year" } },
    visaRequirements: { visaType: "Study Permit", processingTime: "8-12 weeks", requirements: ["Letter of Acceptance from DLI", "Proof of funds (~CAD 20,635/year + tuition)", "IELTS 6.0+ or equivalent", "Statement of Purpose", "Medical examination", "Police clearance certificate"], cost: "CAD 150" },
    topCities: [{ name: "Toronto", description: "Financial hub with diverse population" }, { name: "Vancouver", description: "Beautiful city with tech industry" }, { name: "Montreal", description: "Bilingual city with low living costs" }, { name: "Ottawa", description: "Capital city with government opportunities" }],
    workRights: { duringStudy: "20 hours/week during semester, full-time during scheduled breaks", postStudy: "Post-Graduation Work Permit (PGWP) up to 3 years", prRequirements: "Canadian Experience Class, Provincial Nominee Programs" },
    intakes: ["September", "January", "May"],
    currency: "CAD", avgTuitionMin: 15000, avgTuitionMax: 55000, universityCount: 96, displayOrder: 2,
  },
  {
    country: "United States", slug: "united-states", flagEmoji: "🇺🇸",
    flagUrl: "https://flagcdn.com/w80/us.png",
    bannerImageUrl: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=1200&auto=format&fit=crop",
    overview: "The United States hosts the most international students in the world. With over 4,000 accredited institutions, the US offers unmatched diversity in programs, research, and career opportunities.",
    whyStudyHere: ["World's top-ranked universities", "OPT work authorization (1-3 years)", "Diverse program options", "Cutting-edge research facilities", "Networking and career opportunities", "Flexible education system"],
    livingCost: { min: 15000, max: 30000, currency: "USD", breakdown: { accommodation: "8,000–18,000 USD/year", food: "3,000–5,000 USD/year", transport: "1,000–3,000 USD/year", other: "2,000–5,000 USD/year" } },
    visaRequirements: { visaType: "F-1 Student Visa", processingTime: "3-5 weeks", requirements: ["I-20 from SEVP-certified school", "SEVIS fee payment ($350)", "Financial proof for 1 year", "TOEFL/IELTS scores", "Visa interview at US Embassy", "Valid passport"], cost: "USD 185" },
    topCities: [{ name: "Boston", description: "Academic hub with 50+ universities" }, { name: "New York", description: "Global city with endless opportunities" }, { name: "San Francisco", description: "Tech capital of the world" }, { name: "Los Angeles", description: "Entertainment and diverse culture" }],
    workRights: { duringStudy: "20 hours/week on-campus during semester", postStudy: "OPT: 12 months (36 months for STEM)", prRequirements: "H-1B sponsorship, EB-2/EB-3 green card paths" },
    intakes: ["August/September", "January"],
    currency: "USD", avgTuitionMin: 20000, avgTuitionMax: 60000, universityCount: 4000, displayOrder: 3,
  },
  {
    country: "United Kingdom", slug: "united-kingdom", flagEmoji: "🇬🇧",
    flagUrl: "https://flagcdn.com/w80/gb.png",
    bannerImageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop",
    overview: "The UK is home to some of the oldest and most prestigious universities in the world. With shorter degree durations and the Graduate Route visa, it offers excellent value for international students.",
    whyStudyHere: ["Shorter degree duration (1-year Masters)", "Graduate Route visa (2 years)", "World-renowned universities", "Rich cultural experience", "NHS healthcare access", "Strong alumni networks globally"],
    livingCost: { min: 12000, max: 18000, currency: "GBP", breakdown: { accommodation: "6,000–12,000 GBP/year", food: "2,000–3,500 GBP/year", transport: "1,000–2,000 GBP/year", other: "2,000–3,500 GBP/year" } },
    visaRequirements: { visaType: "Student Visa (Tier 4)", processingTime: "3-6 weeks", requirements: ["CAS from licensed sponsor", "Financial proof (£1,334/month London, £1,023 outside)", "IELTS for UKVI", "TB test certificate (from Nepal)", "Valid passport", "Academic transcripts"], cost: "GBP 490" },
    topCities: [{ name: "London", description: "Global city with top universities" }, { name: "Manchester", description: "Vibrant student city" }, { name: "Edinburgh", description: "Beautiful Scottish capital" }, { name: "Birmingham", description: "Second largest city, diverse" }],
    workRights: { duringStudy: "20 hours/week during term, full-time during vacation", postStudy: "Graduate Route visa: 2 years (3 for PhD)", prRequirements: "Skilled Worker visa sponsorship route" },
    intakes: ["September", "January"],
    currency: "GBP", avgTuitionMin: 15000, avgTuitionMax: 40000, universityCount: 160, displayOrder: 4,
  },
];

/** Help center articles */
export const HELP_ARTICLES = [
  { category: "getting-started", title: "How to Complete Your Profile", slug: "complete-profile", content: "Your profile is the foundation of your study abroad journey with Unifinders. A complete profile helps us recommend the best universities and programs for you.\n\n## Steps to Complete Your Profile\n\n1. **Personal Information**: Fill in your name, date of birth, nationality, and contact details.\n2. **Academic Background**: Add your education history, grades, and institution details.\n3. **English Test Scores**: Enter your IELTS, TOEFL, PTE, or other test scores.\n4. **Study Preferences**: Select your preferred countries, fields of study, and intake periods.\n5. **Documents**: Upload essential documents like passport, transcripts, and test score reports.\n\n## Why is a Complete Profile Important?\n\n- Get personalized university recommendations\n- Faster application processing\n- Better counselor matching\n- Access to relevant scholarship opportunities", tags: ["profile", "onboarding", "getting-started"], displayOrder: 1 },
  { category: "getting-started", title: "Understanding the Dashboard", slug: "understanding-dashboard", content: "Your dashboard is your command center for the entire study abroad process.\n\n## Dashboard Sections\n\n- **Profile Completion**: Shows your progress and what's missing\n- **Recommended Universities**: AI-powered suggestions based on your profile\n- **Applications**: Track all your university applications\n- **Quick Search**: Find universities and programs instantly\n\n## Tips\n\n- Check your dashboard daily for updates\n- Keep your profile updated for better recommendations\n- Use the search to explore new programs", tags: ["dashboard", "overview", "getting-started"], displayOrder: 2 },
  { category: "applications", title: "How to Apply to a University", slug: "how-to-apply", content: "Applying through Unifinders is simple and guided.\n\n## Application Process\n\n1. **Search & Shortlist**: Browse programs and bookmark ones you like\n2. **Check Requirements**: Review entry requirements (IELTS, GPA, etc.)\n3. **Prepare Documents**: Gather all required documents\n4. **Submit Application**: Click 'Apply Now' and fill in the application form\n5. **Track Progress**: Monitor your application status on the dashboard\n\n## Required Documents (Typical)\n\n- Valid Passport\n- Academic Transcripts\n- English Test Score Report\n- Statement of Purpose (SOP)\n- Letters of Recommendation (LOR)\n- CV/Resume\n- Financial Documents", tags: ["application", "apply", "process"], displayOrder: 1 },
  { category: "visa", title: "Student Visa Guide", slug: "student-visa-guide", content: "Getting your student visa is a crucial step. Here's what you need to know.\n\n## General Visa Process\n\n1. Receive your offer letter / CoE\n2. Gather visa documents\n3. Pay visa application fee\n4. Submit application (online or at VFS/Embassy)\n5. Attend biometrics appointment\n6. Wait for processing\n7. Receive visa decision\n\n## Country-Specific Requirements\n\nEach country has different visa requirements. Check our Country Guides for detailed information about:\n- Australia (Subclass 500)\n- Canada (Study Permit)\n- USA (F-1 Visa)\n- UK (Student Visa)\n\n## Tips for a Successful Application\n\n- Apply early (at least 3 months before intake)\n- Ensure financial documents are strong\n- Write a genuine Statement of Purpose\n- Prepare for the visa interview (US)", tags: ["visa", "immigration", "documents"], displayOrder: 1 },
  { category: "scholarships", title: "Finding Scholarships", slug: "finding-scholarships", content: "Scholarships can significantly reduce your study abroad costs.\n\n## Types of Scholarships\n\n- **Merit-based**: Based on academic performance\n- **Need-based**: Based on financial situation\n- **Country-specific**: For students from specific countries\n- **University scholarships**: Offered by individual universities\n- **Government scholarships**: Funded by governments\n\n## How to Search\n\n1. Use our Scholarship search feature\n2. Filter by country, field, and level\n3. Check eligibility criteria carefully\n4. Note deadlines and apply early\n\n## Popular Scholarships for Nepali Students\n\n- Australia Awards\n- Chevening Scholarships (UK)\n- Fulbright Program (USA)\n- MEXT Scholarship (Japan)\n- DAAD Scholarships (Germany)", tags: ["scholarships", "funding", "financial-aid"], displayOrder: 1 },
];
