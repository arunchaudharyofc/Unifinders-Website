// ─────────────────────────────────────────────────────────────────────────────
// EVENTS — Single Source of Truth
// Future: migrated to Supabase → admin can manage via CMS portal
// ─────────────────────────────────────────────────────────────────────────────

export type EventSponsor = { name: string; logo: string };
export type EventFAQ = { q: string; a: string };
export type EventTag = string;

export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string[];
  date: { day: string; month: string; year: string; full: string };
  time: string;
  location: string;
  locationMapUrl: string;
  locationAddress: string;
  heroImage: string;
  galleryImages: string[];
  status: "upcoming" | "past";
  category: string;
  tags: EventTag[];
  sponsors: EventSponsor[];
  faqs: EventFAQ[];
  attendees: number;
};

// ── University Sponsor Logos (text-based for reliability) ─────────────────────
const UNIV_SPONSORS: EventSponsor[] = [
  { name: "UNSW Sydney", logo: "UNSW" },
  { name: "Monash University", logo: "MONASH" },
  { name: "UTS Sydney", logo: "UTS" },
  { name: "University of Canberra", logo: "UC" },
  { name: "Flinders University", logo: "FLINDERS" },
  { name: "Harvard Extension", logo: "HARVARD" },
  { name: "QUT Brisbane", logo: "QUT" },
  { name: "Monash College", logo: "MONASH C." },
  { name: "Charles Darwin Uni", logo: "CDU" },
  { name: "RMIT University", logo: "RMIT" },
  { name: "University of Newcastle", logo: "UON" },
  { name: "Macquarie University", logo: "MQ" },
];

const COMMON_FAQS: EventFAQ[] = [
  { q: "What is Unifinders Scholarship?", a: "Unifinders partners with 120+ universities worldwide to offer scholarships ranging from partial tuition waivers to full rides. Our counselors assess your profile and match you with the best available funding." },
  { q: "How do I register for this event?", a: "Click the 'Register Now' button, fill in your basic details, and you're confirmed. A confirmation email with the venue map and joining instructions will be sent within 10 minutes." },
  { q: "Is there a registration fee?", a: "No. All Unifinders events are 100% free to attend. We believe access to education guidance should not have a price tag." },
  { q: "Can I bring a friend or family member?", a: "Absolutely! Education fairs are open to students, parents, and guardians. We encourage families to attend together to ask questions and explore options collectively." },
];

export const EVENTS: Event[] = [
  // ── Upcoming Events ──────────────────────────────────────────────────────
  {
    id: "educate-world-conference",
    slug: "educate-world-conference",
    title: "Educate the World Conference",
    description: "Our app connects to all the resources you need to achieve your international education goals.",
    fullDescription: [
      "The Educate the World Conference is Unifinders' flagship annual event that brings together students, universities, scholarship bodies, and education experts under one roof.",
      "Whether you are a Grade 12 student exploring options, a bachelor's student planning your master's degree abroad, or a healthcare professional seeking OET or IELTS coaching — this conference has something for you.",
      "Our 2024 edition features 40+ university representatives from Australia, UK, Canada, USA, and New Zealand, offering on-the-spot conditional admission offers, scholarship waiver announcements, and document assessment by certified counselors.",
      "The event includes 6 keynote sessions on topics such as 'How to win a scholarship in 2025', 'Post-study work rights: Australia vs Canada vs UK', and 'Building a winning Statement of Purpose'.",
      "Walk in with your academic transcripts, English test scores, and passport — and walk out with a study abroad roadmap customized for you.",
    ],
    date: { day: "15", month: "Dec", year: "2024", full: "15 Dec, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjAiTiA4NcKwMTknMDUuNiJF!5e0!3m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=600&q=80",
    ],
    status: "upcoming",
    category: "Conference",
    tags: ["Study Abroad", "Conference", "Scholarships", "Australia"],
    sponsors: UNIV_SPONSORS,
    faqs: COMMON_FAQS,
    attendees: 850,
  },
  {
    id: "anatomical-trading-circuit",
    slug: "anatomical-trading-circuit",
    title: "Anatomical Trading of Circuit Connecting...",
    description: "Our app connects to all the most popular universities and colleges abroad.",
    fullDescription: [
      "A specialized seminar designed for students pursuing degrees in electrical engineering, biomedical engineering, and related STEM fields.",
      "Representatives from top engineering universities in Australia, Germany, and the Netherlands will be present to explain admission pathways, scholarship requirements, and research opportunities.",
      "Includes a live demonstration of circuit design and a panel discussion on 'The Future of Biomedical Engineering in Asia'.",
    ],
    date: { day: "20", month: "Aug", year: "2024", full: "20 Aug, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjAiTiA4NcKwMTknMDUuNiJF!5e0!3m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80"],
    status: "upcoming",
    category: "Seminar",
    tags: ["Engineering", "STEM", "Germany", "Netherlands"],
    sponsors: UNIV_SPONSORS.slice(0, 6),
    faqs: COMMON_FAQS,
    attendees: 320,
  },
  {
    id: "gwas-functional-validation",
    slug: "gwas-functional-validation",
    title: "GWAS Functional Validation",
    description: "Our app connects to all the most popular universities that offer popular courses.",
    fullDescription: [
      "A niche academic seminar for students interested in genomics, bioinformatics, and public health research programs.",
      "Representatives from universities offering Master's and PhD programs in genetic epidemiology and computational biology will conduct document reviews on the spot.",
    ],
    date: { day: "23", month: "Jul", year: "2024", full: "23 Jul, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=600&q=80"],
    status: "upcoming",
    category: "Academic Seminar",
    tags: ["Genomics", "Research", "PhD", "Public Health"],
    sponsors: UNIV_SPONSORS.slice(2, 8),
    faqs: COMMON_FAQS,
    attendees: 180,
  },
  {
    id: "mitochondrial-pathways-1",
    slug: "mitochondrial-pathways-1",
    title: "Mitochondrial Pathways",
    description: "Our app connects to all the resources you need to get the best education possible.",
    fullDescription: [
      "A focused session for pre-medical and biomedical students exploring graduate programs in cell biology, molecular medicine, and related fields in Australia and the UK.",
    ],
    date: { day: "25", month: "Jun", year: "2024", full: "25 Jun, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"],
    status: "upcoming",
    category: "Academic Seminar",
    tags: ["Medicine", "Biomedical", "UK", "Australia"],
    sponsors: UNIV_SPONSORS.slice(0, 4),
    faqs: COMMON_FAQS,
    attendees: 200,
  },
  {
    id: "inflammation-immune-regulation",
    slug: "inflammation-immune-regulation",
    title: "Inflammation & Immune Regulation",
    description: "Our app connects to all the most popular universities and colleges abroad.",
    fullDescription: [
      "A specialized seminar for students pursuing immunology, pharmacology, and medical research graduate programs.",
      "Leading university researchers from Australia and the UK will present on cutting-edge immunotherapy research and PhD funding opportunities.",
    ],
    date: { day: "30", month: "May", year: "2024", full: "30 May, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80"],
    status: "upcoming",
    category: "Research Seminar",
    tags: ["Immunology", "Research", "PhD", "Pharmacology"],
    sponsors: UNIV_SPONSORS.slice(1, 7),
    faqs: COMMON_FAQS,
    attendees: 150,
  },
  {
    id: "mitochondrial-pathways-2",
    slug: "mitochondrial-pathways-2",
    title: "Mitochondrial Pathways Advanced",
    description: "Our app connects to all the most popular universities that offer popular courses.",
    fullDescription: ["Advanced seminar covering mitochondrial dysfunction, metabolic diseases, and treatment pathways — for final year medical students and researchers."],
    date: { day: "05", month: "May", year: "2024", full: "05 May, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80"],
    status: "past",
    category: "Research Seminar",
    tags: ["Medicine", "Research", "Advanced", "Australia"],
    sponsors: UNIV_SPONSORS.slice(0, 6),
    faqs: COMMON_FAQS,
    attendees: 120,
  },

  // ── Past Events ───────────────────────────────────────────────────────────
  {
    id: "asap-collaborative-meeting",
    slug: "asap-collaborative-meeting",
    title: "ASAP Collaborative Meeting",
    description: "Our app connects to all the resources you need to get the best education possible.",
    fullDescription: ["An inter-institutional collaboration meeting bringing together admission officers, counselors, and students to discuss bilateral pathways and credit transfer programs."],
    date: { day: "08", month: "Apr", year: "2024", full: "08 Apr, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80"],
    status: "past",
    category: "Meeting",
    tags: ["Collaboration", "Admission", "Pathways"],
    sponsors: UNIV_SPONSORS.slice(2, 8),
    faqs: COMMON_FAQS,
    attendees: 95,
  },
  {
    id: "ipsc-models",
    slug: "ipsc-models",
    title: "IPSC Models",
    description: "Our app connects to all the most popular universities and colleges abroad.",
    fullDescription: ["A specialized academic seminar on induced pluripotent stem cell models for students pursuing biomedical research programs at Australian and UK universities."],
    date: { day: "12", month: "Mar", year: "2024", full: "12 Mar, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80"],
    status: "past",
    category: "Academic Seminar",
    tags: ["Stem Cell", "Research", "Biomedical", "PhD"],
    sponsors: UNIV_SPONSORS.slice(3, 9),
    faqs: COMMON_FAQS,
    attendees: 75,
  },
  {
    id: "anatomical-trading-circuit-2",
    slug: "anatomical-trading-circuit-2",
    title: "Anatomical Trading of Circuit Connecting...",
    description: "Our app connects to all the most popular universities and colleges abroad.",
    fullDescription: ["Second edition of the popular circuit connecting seminar, covering advanced topics in biomedical device design and regulatory pathways for international markets."],
    date: { day: "16", month: "Feb", year: "2024", full: "16 Feb, 2024" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    locationAddress: "Harmony Seminar Hall, Opposite to Vibrant, New Plaza, Putalisadak, Kathmandu, Nepal",
    locationMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3182!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2snp!4v1234567890",
    heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"],
    status: "past",
    category: "Seminar",
    tags: ["Engineering", "Devices", "Regulation", "Research"],
    sponsors: UNIV_SPONSORS.slice(0, 6),
    faqs: COMMON_FAQS,
    attendees: 110,
  },
];
