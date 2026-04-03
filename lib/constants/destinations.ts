import { GraduationCap, Users, ThumbsUp, Briefcase, type LucideIcon } from "lucide-react";

export type Destination = {
  name: string; emoji: string; slug: string;
  heroImage: string;
  overview: string;
  whyCards: { icon: LucideIcon; title: string; desc: string }[];
  city: { name: string; tabs: string[]; description: string[]; image: string };
  intakeText: string[];
};

export const DESTINATIONS: Record<string, Destination> = {
  australia: {
    name: "Australia", emoji: "🇦🇺", slug: "australia",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9a7?auto=format&fit=crop&w=2000&q=80",
    overview: "Australia is a renowned destination for international students, with over 40 universities ranked among the world's best. The University of Melbourne, University of Sydney, the Australian National University, South Australia, Tasmania, Victoria and Western Australia are some of the leading universities. Australia welcomes around 800,000 international students annually.",
    whyCards: [
      { icon: Users, title: "Global Community", desc: "Join a diverse community of 800K+ international students in a safe, multicultural environment." },
      { icon: ThumbsUp, title: "Quality of Life", desc: "Australia consistently ranks among the world's top countries for quality of life and student satisfaction." },
      { icon: GraduationCap, title: "Student Satisfaction", desc: "High satisfaction rates with world-class teaching standards and innovative research opportunities." },
      { icon: Briefcase, title: "Employability", desc: "Strong graduate employment outcomes with post-study work rights up to 4 years via the 485 visa." }
    ],
    city: {
      name: "Melbourne", tabs: ["Melbourne", "Sydney", "Brisbane", "Perth", "Adelaide"],
      description: ["Cultural epicentre, paired with activities and a great place for students.", "Multicultural city and a significant part of the Australian economy. Great place for students to find employment."],
      image: "/images/melbourne-city.png"
    },
    intakeText: ["Cultural epicentre, paired with activities and a great place for students.", "Multicultural city and a significant part of the Australian economy. Great place for students to find employment."]
  },
  canada: {
    name: "Canada", emoji: "🇨🇦", slug: "canada",
    heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2000&q=80",
    overview: "Canada is a top study destination offering high-quality education, affordable tuition compared to the US and UK, and a clear pathway to Permanent Residency through the Post-Graduation Work Permit (PGWP). With over 100 universities and colleges, Canada welcomes over 800,000 international students each year.",
    whyCards: [
      { icon: GraduationCap, title: "Top Universities", desc: "Universities of Toronto, UBC, and McGill rank among the world's top 50 institutions." },
      { icon: Briefcase, title: "PGWP Work Rights", desc: "Work up to 3 years post-graduation with the Post-Graduation Work Permit." },
      { icon: ThumbsUp, title: "PR Pathway", desc: "Clear Express Entry pathway to Canadian Permanent Residency after graduation." },
      { icon: Users, title: "Multicultural Society", desc: "One of the world's most welcoming and diverse nations for international students." }
    ],
    city: {
      name: "Toronto", tabs: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
      description: ["Canada's largest city and a global hub for finance, technology, and culture.", "Home to the University of Toronto, one of the world's top research universities."],
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["Diverse programs across 100+ universities and colleges.", "Affordable tuition with excellent scholarship opportunities."]
  },
  usa: {
    name: "USA", emoji: "🇺🇸", slug: "usa",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=80",
    overview: "The United States hosts over 4,500 accredited institutions including MIT, Harvard, and Stanford. American degrees carry unparalleled global value with a strong research culture and powerful industry ties across every sector.",
    whyCards: [
      { icon: GraduationCap, title: "Prestige", desc: "Home to the majority of the world's top 100 QS-ranked universities." },
      { icon: Briefcase, title: "STEM OPT", desc: "STEM graduates can work up to 3 years in the US on OPT after graduation." },
      { icon: ThumbsUp, title: "Research Hub", desc: "Massive federal and private investment in cutting-edge research and innovation." },
      { icon: Users, title: "Networking", desc: "Access to the world's most powerful alumni and professional networks." }
    ],
    city: {
      name: "New York", tabs: ["New York", "Boston", "San Francisco", "Chicago", "Los Angeles"],
      description: ["Largest city in the US and a global center for finance, arts, and culture.", "Home to Columbia, NYU, and many world-renowned universities."],
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["Over 4,500 accredited universities to choose from.", "Strong OPT and STEM OPT work authorization after graduation."]
  },
  uk: {
    name: "United Kingdom", emoji: "🇬🇧", slug: "uk",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
    overview: "The UK is home to some of the world's most iconic universities including Oxford, Cambridge, and Imperial. One-year Master's programs and the Graduate Route visa make it highly attractive for Nepali students.",
    whyCards: [
      { icon: GraduationCap, title: "World Rankings", desc: "Oxford and Cambridge consistently rank in the global top 5 universities." },
      { icon: Briefcase, title: "Graduate Route Visa", desc: "2 years of post-study work rights for all graduates under the Graduate Route." },
      { icon: ThumbsUp, title: "1-Year Masters", desc: "Complete a Masters in just 1 year, saving time and tuition costs." },
      { icon: Users, title: "Cultural Hub", desc: "Study in the world's most culturally diverse and historically rich cities." }
    ],
    city: {
      name: "London", tabs: ["London", "Manchester", "Edinburgh", "Birmingham", "Bristol"],
      description: ["A global capital blending centuries of history with modern innovation.", "Home to UCL, Imperial, and LSE — three of the world's finest universities."],
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["1-year postgraduate programs save time and money.", "Graduate Route visa allows 2 years of work after graduation."]
  },
  "new-zealand": {
    name: "New Zealand", emoji: "🇳🇿", slug: "new-zealand",
    heroImage: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=2000&q=80",
    overview: "New Zealand offers world-class education in one of the safest and most naturally beautiful countries on Earth. The post-study work visa and quality of life make it increasingly popular among Nepali students.",
    whyCards: [
      { icon: ThumbsUp, title: "Safety First", desc: "Consistently ranked as one of the world's safest countries to live and study in." },
      { icon: Briefcase, title: "Work Rights", desc: "Up to 3 years of post-study work rights to gain valuable international experience." },
      { icon: GraduationCap, title: "Quality Education", desc: "Eight world-class universities with globally recognized qualifications." },
      { icon: Users, title: "Welcoming Culture", desc: "Friendly Kiwi culture with a strong Nepali student community already established." }
    ],
    city: {
      name: "Auckland", tabs: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin"],
      description: ["New Zealand's largest city, known as the City of Sails, surrounded by stunning natural beauty.", "Home to the University of Auckland, ranked in the global top 100."],
      image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["Globally recognized qualifications from 8 world-class universities.", "Post-study work visa for up to 3 years after graduation."]
  },
  ireland: {
    name: "Ireland", emoji: "🇮🇪", slug: "ireland",
    heroImage: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=2000&q=80",
    overview: "Ireland is the only English-speaking EU country, making it a strategic gateway to Europe. Dublin hosts European headquarters of Google, Apple, Meta, and Microsoft — creating unmatched graduate opportunities.",
    whyCards: [
      { icon: ThumbsUp, title: "EU Access", desc: "The only fully English-speaking country remaining in the European Union after Brexit." },
      { icon: Briefcase, title: "Tech Industry", desc: "European headquarters of Google, Apple, Meta and Microsoft are all in Dublin." },
      { icon: GraduationCap, title: "Research Excellence", desc: "Young, innovative universities with strong ties to industry and global rankings." },
      { icon: Users, title: "Stay-Back Visa", desc: "2-year graduate stay-back visa allowing substantial post-study work experience." }
    ],
    city: {
      name: "Dublin", tabs: ["Dublin", "Cork", "Galway", "Limerick", "Belfast"],
      description: ["A vibrant capital city with a legendary cultural scene and friendly locals.", "Tech hub of Europe — home to FAANG company European headquarters."],
      image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["Only English-speaking EU country — study and work across Europe.", "2-year stay-back visa with access to top global tech employers."]
  },
  india: {
    name: "India", emoji: "🇮🇳", slug: "india",
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=2000&q=80",
    overview: "India offers world-class education in technology, medicine, and management at a fraction of Western costs. With IITs, IIMs, and AIIMS, India's institutions are globally recognized for excellence.",
    whyCards: [
      { icon: GraduationCap, title: "IIT & IIM Legacy", desc: "IITs and IIMs are among the most competitive and respected institutions globally." },
      { icon: Briefcase, title: "Affordable Costs", desc: "World-class degrees at a significantly lower cost than Western countries." },
      { icon: ThumbsUp, title: "Tech Ecosystem", desc: "Study in the world's fastest-growing tech economy with massive job creation." },
      { icon: Users, title: "Cultural Familiarity", desc: "Close cultural ties and shorter travel distance make the transition easier for Nepali students." }
    ],
    city: {
      name: "Bangalore", tabs: ["Bangalore", "Delhi", "Mumbai", "Pune", "Chennai"],
      description: ["India's Silicon Valley — a thriving hub for technology and innovation.", "Affordable, dynamic city with a massive student population and vibrant culture."],
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["Globally recognized IIT, IIM, and AIIMS degrees.", "Affordable tuition with strong scholarship opportunities for Nepali students."]
  },
  bangladesh: {
    name: "Bangladesh", emoji: "🇧🇩", slug: "bangladesh",
    heroImage: "https://images.unsplash.com/photo-1587326887550-93a8c14d9b4b?auto=format&fit=crop&w=2000&q=80",
    overview: "Bangladesh is a rapidly rising destination for MBBS and engineering programs at highly affordable prices. Its proximity and cultural similarities with Nepal make it ideal for Nepali students.",
    whyCards: [
      { icon: GraduationCap, title: "MBBS Excellence", desc: "World-recognized MBBS programs at competitive fees with high success rates." },
      { icon: Briefcase, title: "Affordable Fees", desc: "Complete an MBBS degree for a fraction of the cost compared to Western countries." },
      { icon: ThumbsUp, title: "Close Proximity", desc: "Short travel distance from Nepal with no language barrier in major institutions." },
      { icon: Users, title: "Growing Economy", desc: "One of Asia's fastest-growing economies with expanding opportunities." }
    ],
    city: {
      name: "Dhaka", tabs: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"],
      description: ["The capital and largest city, home to the most prestigious medical colleges.", "A rapidly modernizing city with a rich cultural heritage and student-friendly infrastructure."],
      image: "https://images.unsplash.com/photo-1587326887550-93a8c14d9b4b?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["World-recognized MBBS programs with affordable tuition fees.", "Strong Nepali student community already established across top institutions."]
  },
  europe: {
    name: "Europe", emoji: "🇪🇺", slug: "europe",
    heroImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80",
    overview: "Mainland Europe offers exceptional education — often tuition-free in Germany — combined with the Schengen Area freedom to travel 27 countries on one visa. A truly world-class study experience.",
    whyCards: [
      { icon: Briefcase, title: "Schengen Access", desc: "One student visa gives you free movement across 27 European countries." },
      { icon: GraduationCap, title: "Top Institutions", desc: "ETH Zurich, Sorbonne, and TU Munich rank among the world's highest." },
      { icon: ThumbsUp, title: "Low/No Tuition", desc: "Germany and Norway offer nearly tuition-free education for international students." },
      { icon: Users, title: "Cultural Diversity", desc: "Immerse yourself in centuries of diverse European culture, languages, and history." }
    ],
    city: {
      name: "Berlin", tabs: ["Berlin", "Paris", "Amsterdam", "Munich", "Vienna"],
      description: ["Germany's vibrant capital — a global center for arts, technology, and innovation.", "Low cost of living combined with world-class universities and a thriving tech scene."],
      image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["Many top European universities charge minimal or zero tuition fees.", "Schengen visa grants freedom to travel across 27 countries during your studies."]
  },
  dubai: {
    name: "Dubai", emoji: "🇦🇪", slug: "dubai",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
    overview: "Dubai's tax-free economy and futuristic infrastructure attract international universities to open branch campuses. Earn a degree from a top UK, US, or Australian university right from Dubai.",
    whyCards: [
      { icon: GraduationCap, title: "Branch Campuses", desc: "Degrees from top UK, US, and Australian universities delivered right in Dubai." },
      { icon: Briefcase, title: "Tax-Free Jobs", desc: "Graduate into a rapidly growing, zero-income-tax job market with global employers." },
      { icon: ThumbsUp, title: "Strategic Location", desc: "Dubai sits at the crossroads of Europe, Asia and Africa — a global business hub." },
      { icon: Users, title: "Student Diversity", desc: "Over 200 nationalities create a uniquely cosmopolitan campus environment." }
    ],
    city: {
      name: "Dubai City", tabs: ["Dubai", "Abu Dhabi", "Sharjah"],
      description: ["A futuristic metropolis consistently ranked among the world's safest and most innovative cities.", "Home to branch campuses of University of Birmingham, Heriot-Watt, and Middlesex University."],
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
    },
    intakeText: ["Earn top UK/US/Australian degrees without leaving the Middle East.", "Tax-free salaries and unmatched career growth in a global business hub."]
  },
};
