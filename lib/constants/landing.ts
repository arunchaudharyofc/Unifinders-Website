/**
 * ============================================================================
 * LANDING PAGE CONTENT DATA
 * ============================================================================
 *
 * All textual content, stats, and configuration for the Study Abroad
 * landing page live here. This makes the page fully dynamic:
 *   - A future developer can swap content without touching components.
 *   - When CMS is integrated, this file becomes the fallback/default data.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @modified    2026-03-31
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
export const COUNTRY_LINKS = [
  { label: "Study in Australia",    href: "/study/australia",    flag: "🇦🇺" },
  { label: "Study in USA",          href: "/study/usa",          flag: "🇺🇸" },
  { label: "Study in UK",           href: "/study/uk",           flag: "🇬🇧" },
  { label: "Study in Canada",       href: "/study/canada",       flag: "🇨🇦" },
  { label: "Study in New Zealand",  href: "/study/new-zealand",  flag: "🇳🇿" },
  { label: "Study in Ireland",      href: "/study/ireland",      flag: "🇮🇪" },
  { label: "Study in India",        href: "/study/india",        flag: "🇮🇳", id: "india" },
] as const;

export const MEGA_MENU_DATA: Record<string, {
  name: string;
  href: string;
  flag: string;
  sections: {
    why: { title: string; links: { label: string; href: string }[] };
    live: { title: string; links: { label: string; href: string }[] };
    work: { title: string; links: { label: string; href: string }[] };
    study: { title: string; links: { label: string; href: string }[] };
  };
  sidebar: {
    title: string;
    stats: { label: string; value: string; subLabel?: string }[];
    image: string;
  };
}> = {
  "australia": {
    name: "Australia",
    href: "/study/australia",
    flag: "🇦🇺",
    sections: {
      why: {
        title: "Why Australia?",
        links: [
          { label: "About Australia", href: "/study/australia#about" },
          { label: "Top Cities", href: "/study/australia#cities" },
          { label: "Visa Info", href: "/study/australia#visa" },
          { label: "Compare with other Country", href: "/study/australia#compare" },
          { label: "Reasons to study in Australia", href: "/study/australia#reasons" },
        ],
      },
      live: {
        title: "Live in Australia",
        links: [
          { label: "Permanent Residence PR", href: "/study/australia#pr" },
          { label: "Accordination", href: "/study/australia#accommodation" },
          { label: "Education & Living Costs", href: "/study/australia#costs" },
          { label: "Daily Life in Australia", href: "/study/australia#life" },
          { label: "Plan your arrival", href: "/study/australia#arrival" },
          { label: "Insurance", href: "/study/australia#insurance" },
          { label: "Visa Compliance", href: "/study/australia#compliance" },
          { label: "People & Culture", href: "/study/australia#culture" },
          { label: "Banking in Australia", href: "/study/australia#banking" },
          { label: "Transport in Australia", href: "/study/australia#transport" },
          { label: "Nepalese students in Australia", href: "/study/australia#nepalese" },
        ],
      },
      work: {
        title: "Work in Australia",
        links: [
          { label: "Jobs in Australia", href: "/study/australia#jobs" },
          { label: "Work while your study", href: "/study/australia#work-study" },
          { label: "Employabilities Resources", href: "/study/australia#resources" },
          { label: "Tax and superannuation", href: "/study/australia#tax" },
          { label: "Volunteer and industry experiences", href: "/study/australia#volunteer" },
          { label: "know your rights", href: "/study/australia#rights" },
          { label: "know your rights", href: "/study/australia#rights2" },
          { label: "study australia industry experiences program", href: "/study/australia#experiences" },
          { label: "Getting a job", href: "/study/australia#getting-job" },
          { label: "Internship in Australia", href: "/study/australia#internship" },
        ],
      },
      study: {
        title: "Study in Australia",
        links: [
          { label: "Australian Education", href: "/study/australia#education" },
          { label: "University & Higher Education", href: "/study/australia#university" },
          { label: "Vocational Education", href: "/study/australia#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/australia#governing" },
          { label: "Cost of studying", href: "/study/australia#cost" },
          { label: "Post Study Work visa", href: "/study/australia#psww" },
          { label: "Student Visa Requirements", href: "/study/australia#visa-req" },
          { label: "International Student in Australia", href: "/study/australia#international" },
          { label: "A guide to study in Australia", href: "/study/australia#guide" },
          { label: "Study in australia from Nepal", href: "/study/australia#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "9124", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.7 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "54.75 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "canada": {
    name: "Canada",
    href: "/study/canada",
    flag: "🇨🇦",
    sections: {
      why: {
        title: "Why Canada?",
        links: [
          { label: "About Canada", href: "/study/canada#about" },
          { label: "Top Cities", href: "/study/canada#cities" },
          { label: "Visa Info", href: "/study/canada#visa" },
          { label: "Compare with other Country", href: "/study/canada#compare" },
          { label: "Reasons to study in Canada", href: "/study/canada#reasons" },
        ],
      },
      live: {
        title: "Live in Canada",
        links: [
          { label: "Permanent Residence PR", href: "/study/canada#pr" },
          { label: "Accordination", href: "/study/canada#accommodation" },
          { label: "Education & Living Costs", href: "/study/canada#costs" },
          { label: "Daily Life in Canada", href: "/study/canada#life" },
          { label: "Plan your arrival", href: "/study/canada#arrival" },
          { label: "Insurance", href: "/study/canada#insurance" },
          { label: "Visa Compliance", href: "/study/canada#compliance" },
          { label: "People & Culture", href: "/study/canada#culture" },
          { label: "Banking in Canada", href: "/study/canada#banking" },
          { label: "Transport in Canada", href: "/study/canada#transport" },
          { label: "Nepalese students in Canada", href: "/study/canada#nepalese" },
        ],
      },
      work: {
        title: "Work in Canada",
        links: [
          { label: "Jobs in Canada", href: "/study/canada#jobs" },
          { label: "Work while your study", href: "/study/canada#work-study" },
          { label: "Employabilities Resources", href: "/study/canada#resources" },
          { label: "Tax and superannuation", href: "/study/canada#tax" },
          { label: "Volunteer and industry experiences", href: "/study/canada#volunteer" },
          { label: "know your rights", href: "/study/canada#rights" },
          { label: "know your rights", href: "/study/canada#rights2" },
          { label: "study canada industry experiences program", href: "/study/canada#experiences" },
          { label: "Getting a job", href: "/study/canada#getting-job" },
          { label: "Internship in Canada", href: "/study/canada#internship" },
        ],
      },
      study: {
        title: "Study in Canada",
        links: [
          { label: "Canadian Education", href: "/study/canada#education" },
          { label: "University & Higher Education", href: "/study/canada#university" },
          { label: "Vocational Education", href: "/study/canada#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/canada#governing" },
          { label: "Cost of studying", href: "/study/canada#cost" },
          { label: "Post Study Work visa", href: "/study/canada#psww" },
          { label: "Student Visa Requirements", href: "/study/canada#visa-req" },
          { label: "International Student in Canada", href: "/study/canada#international" },
          { label: "A guide to study in Canada", href: "/study/canada#guide" },
          { label: "Study in canada from Nepal", href: "/study/canada#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "8500", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.5 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "45.20 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "usa": {
    name: "USA",
    href: "/study/usa",
    flag: "🇺🇸",
    sections: {
      why: {
        title: "Why USA?",
        links: [
          { label: "About USA", href: "/study/usa#about" },
          { label: "Top Cities", href: "/study/usa#cities" },
          { label: "Visa Info", href: "/study/usa#visa" },
          { label: "Compare with other Country", href: "/study/usa#compare" },
          { label: "Reasons to study in USA", href: "/study/usa#reasons" },
        ],
      },
      live: {
        title: "Live in USA",
        links: [
          { label: "Permanent Residence PR", href: "/study/usa#pr" },
          { label: "Accordination", href: "/study/usa#accommodation" },
          { label: "Education & Living Costs", href: "/study/usa#costs" },
          { label: "Daily Life in USA", href: "/study/usa#life" },
          { label: "Plan your arrival", href: "/study/usa#arrival" },
          { label: "Insurance", href: "/study/usa#insurance" },
          { label: "Visa Compliance", href: "/study/usa#compliance" },
          { label: "People & Culture", href: "/study/usa#culture" },
          { label: "Banking in USA", href: "/study/usa#banking" },
          { label: "Transport in USA", href: "/study/usa#transport" },
          { label: "Nepalese students in USA", href: "/study/usa#nepalese" },
        ],
      },
      work: {
        title: "Work in USA",
        links: [
          { label: "Jobs in USA", href: "/study/usa#jobs" },
          { label: "Work while your study", href: "/study/usa#work-study" },
          { label: "Employabilities Resources", href: "/study/usa#resources" },
          { label: "Tax and superannuation", href: "/study/usa#tax" },
          { label: "Volunteer and industry experiences", href: "/study/usa#volunteer" },
          { label: "know your rights", href: "/study/usa#rights" },
          { label: "know your rights", href: "/study/usa#rights2" },
          { label: "study usa industry experiences program", href: "/study/usa#experiences" },
          { label: "Getting a job", href: "/study/usa#getting-job" },
          { label: "Internship in USA", href: "/study/usa#internship" },
        ],
      },
      study: {
        title: "Study in USA",
        links: [
          { label: "American Education", href: "/study/usa#education" },
          { label: "University & Higher Education", href: "/study/usa#university" },
          { label: "Vocational Education", href: "/study/usa#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/usa#governing" },
          { label: "Cost of studying", href: "/study/usa#cost" },
          { label: "Post Study Work visa", href: "/study/usa#psww" },
          { label: "Student Visa Requirements", href: "/study/usa#visa-req" },
          { label: "International Student in USA", href: "/study/usa#international" },
          { label: "A guide to study in USA", href: "/study/usa#guide" },
          { label: "Study in usa from Nepal", href: "/study/usa#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "12000", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "2.1 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "60.00 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "uk": {
    name: "UK",
    href: "/study/uk",
    flag: "🇬🇧",
    sections: {
      why: {
        title: "Why UK?",
        links: [
          { label: "About UK", href: "/study/uk#about" },
          { label: "Top Cities", href: "/study/uk#cities" },
          { label: "Visa Info", href: "/study/uk#visa" },
          { label: "Compare with other Country", href: "/study/uk#compare" },
          { label: "Reasons to study in UK", href: "/study/uk#reasons" },
        ],
      },
      live: {
        title: "Live in UK",
        links: [
          { label: "Permanent Residence PR", href: "/study/uk#pr" },
          { label: "Accordination", href: "/study/uk#accommodation" },
          { label: "Education & Living Costs", href: "/study/uk#costs" },
          { label: "Daily Life in UK", href: "/study/uk#life" },
          { label: "Plan your arrival", href: "/study/uk#arrival" },
          { label: "Insurance", href: "/study/uk#insurance" },
          { label: "Visa Compliance", href: "/study/uk#compliance" },
          { label: "People & Culture", href: "/study/uk#culture" },
          { label: "Banking in UK", href: "/study/uk#banking" },
          { label: "Transport in UK", href: "/study/uk#transport" },
          { label: "Nepalese students in UK", href: "/study/uk#nepalese" },
        ],
      },
      work: {
        title: "Work in UK",
        links: [
          { label: "Jobs in UK", href: "/study/uk#jobs" },
          { label: "Work while your study", href: "/study/uk#work-study" },
          { label: "Employabilities Resources", href: "/study/uk#resources" },
          { label: "Tax and superannuation", href: "/study/uk#tax" },
          { label: "Volunteer and industry experiences", href: "/study/uk#volunteer" },
          { label: "know your rights", href: "/study/uk#rights" },
          { label: "know your rights", href: "/study/uk#rights2" },
          { label: "study uk industry experiences program", href: "/study/uk#experiences" },
          { label: "Getting a job", href: "/study/uk#getting-job" },
          { label: "Internship in UK", href: "/study/uk#internship" },
        ],
      },
      study: {
        title: "Study in UK",
        links: [
          { label: "UK Education", href: "/study/uk#education" },
          { label: "University & Higher Education", href: "/study/uk#university" },
          { label: "Vocational Education", href: "/study/uk#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/uk#governing" },
          { label: "Cost of studying", href: "/study/uk#cost" },
          { label: "Post Study Work visa", href: "/study/uk#psww" },
          { label: "Student Visa Requirements", href: "/study/uk#visa-req" },
          { label: "International Student in UK", href: "/study/uk#international" },
          { label: "A guide to study in UK", href: "/study/uk#guide" },
          { label: "Study in uk from Nepal", href: "/study/uk#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "9800", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.8 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "50.10 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "nz": {
    name: "New Zealand",
    href: "/study/new-zealand",
    flag: "🇳🇿",
    sections: {
      why: {
        title: "Why New Zealand?",
        links: [
          { label: "About New Zealand", href: "/study/new-zealand#about" },
          { label: "Top Cities", href: "/study/new-zealand#cities" },
          { label: "Visa Info", href: "/study/new-zealand#visa" },
          { label: "Compare with other Country", href: "/study/new-zealand#compare" },
          { label: "Reasons to study in New Zealand", href: "/study/new-zealand#reasons" },
        ],
      },
      live: {
        title: "Live in New Zealand",
        links: [
          { label: "Permanent Residence PR", href: "/study/new-zealand#pr" },
          { label: "Accordination", href: "/study/new-zealand#accommodation" },
          { label: "Education & Living Costs", href: "/study/new-zealand#costs" },
          { label: "Daily Life in New Zealand", href: "/study/new-zealand#life" },
          { label: "Plan your arrival", href: "/study/new-zealand#arrival" },
          { label: "Insurance", href: "/study/new-zealand#insurance" },
          { label: "Visa Compliance", href: "/study/new-zealand#compliance" },
          { label: "People & Culture", href: "/study/new-zealand#culture" },
          { label: "Banking in New Zealand", href: "/study/new-zealand#banking" },
          { label: "Transport in New Zealand", href: "/study/new-zealand#transport" },
          { label: "Nepalese students in New Zealand", href: "/study/new-zealand#nepalese" },
        ],
      },
      work: {
        title: "Work in New Zealand",
        links: [
          { label: "Jobs in New Zealand", href: "/study/new-zealand#jobs" },
          { label: "Work while your study", href: "/study/new-zealand#work-study" },
          { label: "Employabilities Resources", href: "/study/new-zealand#resources" },
          { label: "Tax and superannuation", href: "/study/new-zealand#tax" },
          { label: "Volunteer and industry experiences", href: "/study/new-zealand#volunteer" },
          { label: "know your rights", href: "/study/new-zealand#rights" },
          { label: "know your rights", href: "/study/new-zealand#rights2" },
          { label: "study new zealand industry experiences program", href: "/study/new-zealand#experiences" },
          { label: "Getting a job", href: "/study/new-zealand#getting-job" },
          { label: "Internship in New Zealand", href: "/study/new-zealand#internship" },
        ],
      },
      study: {
        title: "Study in New Zealand",
        links: [
          { label: "New Zealand Education", href: "/study/new-zealand#education" },
          { label: "University & Higher Education", href: "/study/new-zealand#university" },
          { label: "Vocational Education", href: "/study/new-zealand#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/new-zealand#governing" },
          { label: "Cost of studying", href: "/study/new-zealand#cost" },
          { label: "Post Study Work visa", href: "/study/new-zealand#psww" },
          { label: "Student Visa Requirements", href: "/study/new-zealand#visa-req" },
          { label: "International Student in New Zealand", href: "/study/new-zealand#international" },
          { label: "A guide to study in New Zealand", href: "/study/new-zealand#guide" },
          { label: "Study in new zealand from Nepal", href: "/study/new-zealand#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "4500", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.2 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "35.50 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "ireland": {
    name: "Ireland",
    href: "/study/ireland",
    flag: "🇮🇪",
    sections: {
      why: {
        title: "Why Ireland?",
        links: [
          { label: "About Ireland", href: "/study/ireland#about" },
          { label: "Top Cities", href: "/study/ireland#cities" },
          { label: "Visa Info", href: "/study/ireland#visa" },
          { label: "Compare with other Country", href: "/study/ireland#compare" },
          { label: "Reasons to study in Ireland", href: "/study/ireland#reasons" },
        ],
      },
      live: {
        title: "Live in Ireland",
        links: [
          { label: "Permanent Residence PR", href: "/study/ireland#pr" },
          { label: "Accordination", href: "/study/ireland#accommodation" },
          { label: "Education & Living Costs", href: "/study/ireland#costs" },
          { label: "Daily Life in Ireland", href: "/study/ireland#life" },
          { label: "Plan your arrival", href: "/study/ireland#arrival" },
          { label: "Insurance", href: "/study/ireland#insurance" },
          { label: "Visa Compliance", href: "/study/ireland#compliance" },
          { label: "People & Culture", href: "/study/ireland#culture" },
          { label: "Banking in Ireland", href: "/study/ireland#banking" },
          { label: "Transport in Ireland", href: "/study/ireland#transport" },
          { label: "Nepalese students in Ireland", href: "/study/ireland#nepalese" },
        ],
      },
      work: {
        title: "Work in Ireland",
        links: [
          { label: "Jobs in Ireland", href: "/study/ireland#jobs" },
          { label: "Work while your study", href: "/study/ireland#work-study" },
          { label: "Employabilities Resources", href: "/study/ireland#resources" },
          { label: "Tax and superannuation", href: "/study/ireland#tax" },
          { label: "Volunteer and industry experiences", href: "/study/ireland#volunteer" },
          { label: "know your rights", href: "/study/ireland#rights" },
          { label: "know your rights", href: "/study/ireland#rights2" },
          { label: "study ireland industry experiences program", href: "/study/ireland#experiences" },
          { label: "Getting a job", href: "/study/ireland#getting-job" },
          { label: "Internship in Ireland", href: "/study/ireland#internship" },
        ],
      },
      study: {
        title: "Study in Ireland",
        links: [
          { label: "Irish Education", href: "/study/ireland#education" },
          { label: "University & Higher Education", href: "/study/ireland#university" },
          { label: "Vocational Education", href: "/study/ireland#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/ireland#governing" },
          { label: "Cost of studying", href: "/study/ireland#cost" },
          { label: "Post Study Work visa", href: "/study/ireland#psww" },
          { label: "Student Visa Requirements", href: "/study/ireland#visa-req" },
          { label: "International Student in Ireland", href: "/study/ireland#international" },
          { label: "A guide to study in Ireland", href: "/study/ireland#guide" },
          { label: "Study in ireland from Nepal", href: "/study/ireland#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "5200", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.4 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "40.00 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "india": {
    name: "India",
    href: "/study/india",
    flag: "🇮🇳",
    sections: {
      why: {
        title: "Why India?",
        links: [
          { label: "About India", href: "/study/india#about" },
          { label: "Top Cities", href: "/study/india#cities" },
          { label: "Visa Info", href: "/study/india#visa" },
          { label: "Compare with other Country", href: "/study/india#compare" },
          { label: "Reasons to study in India", href: "/study/india#reasons" },
        ],
      },
      live: {
        title: "Live in India",
        links: [
          { label: "Permanent Residence PR", href: "/study/india#pr" },
          { label: "Accordination", href: "/study/india#accommodation" },
          { label: "Education & Living Costs", href: "/study/india#costs" },
          { label: "Daily Life in India", href: "/study/india#life" },
          { label: "Plan your arrival", href: "/study/india#arrival" },
          { label: "Insurance", href: "/study/india#insurance" },
          { label: "Visa Compliance", href: "/study/india#compliance" },
          { label: "People & Culture", href: "/study/india#culture" },
          { label: "Banking in India", href: "/study/india#banking" },
          { label: "Transport in India", href: "/study/india#transport" },
          { label: "Nepalese students in India", href: "/study/india#nepalese" },
        ],
      },
      work: {
        title: "Work in India",
        links: [
          { label: "Jobs in India", href: "/study/india#jobs" },
          { label: "Work while your study", href: "/study/india#work-study" },
          { label: "Employabilities Resources", href: "/study/india#resources" },
          { label: "Tax and superannuation", href: "/study/india#tax" },
          { label: "Volunteer and industry experiences", href: "/study/india#volunteer" },
          { label: "know your rights", href: "/study/india#rights" },
          { label: "know your rights", href: "/study/india#rights2" },
          { label: "study india industry experiences program", href: "/study/india#experiences" },
          { label: "Getting a job", href: "/study/india#getting-job" },
          { label: "Internship in India", href: "/study/india#internship" },
        ],
      },
      study: {
        title: "Study in India",
        links: [
          { label: "Indian Education", href: "/study/india#education" },
          { label: "University & Higher Education", href: "/study/india#university" },
          { label: "Vocational Education", href: "/study/india#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/india#governing" },
          { label: "Cost of studying", href: "/study/india#cost" },
          { label: "Post Study Work visa", href: "/study/india#psww" },
          { label: "Student Visa Requirements", href: "/study/india#visa-req" },
          { label: "International Student in India", href: "/study/india#international" },
          { label: "A guide to study in India", href: "/study/india#guide" },
          { label: "Study in india from Nepal", href: "/study/india#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "150000", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.0 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "25.00 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "bangladesh": {
    name: "Bangladesh",
    href: "/study/bangladesh",
    flag: "🇧🇩",
    sections: {
      why: {
        title: "Why Bangladesh?",
        links: [
          { label: "About Bangladesh", href: "/study/bangladesh#about" },
          { label: "Top Cities", href: "/study/bangladesh#cities" },
          { label: "Visa Info", href: "/study/bangladesh#visa" },
          { label: "Compare with other Country", href: "/study/bangladesh#compare" },
          { label: "Reasons to study in Bangladesh", href: "/study/bangladesh#reasons" },
        ],
      },
      live: {
        title: "Live in Bangladesh",
        links: [
          { label: "Permanent Residence PR", href: "/study/bangladesh#pr" },
          { label: "Accordination", href: "/study/bangladesh#accommodation" },
          { label: "Education & Living Costs", href: "/study/bangladesh#costs" },
          { label: "Daily Life in Bangladesh", href: "/study/bangladesh#life" },
          { label: "Plan your arrival", href: "/study/bangladesh#arrival" },
          { label: "Insurance", href: "/study/bangladesh#insurance" },
          { label: "Visa Compliance", href: "/study/bangladesh#compliance" },
          { label: "People & Culture", href: "/study/bangladesh#culture" },
          { label: "Banking in Bangladesh", href: "/study/bangladesh#banking" },
          { label: "Transport in Bangladesh", href: "/study/bangladesh#transport" },
          { label: "Nepalese students in Bangladesh", href: "/study/bangladesh#nepalese" },
        ],
      },
      work: {
        title: "Work in Bangladesh",
        links: [
          { label: "Jobs in Bangladesh", href: "/study/bangladesh#jobs" },
          { label: "Work while your study", href: "/study/bangladesh#work-study" },
          { label: "Employabilities Resources", href: "/study/bangladesh#resources" },
          { label: "Tax and superannuation", href: "/study/bangladesh#tax" },
          { label: "Volunteer and industry experiences", href: "/study/bangladesh#volunteer" },
          { label: "know your rights", href: "/study/bangladesh#rights" },
          { label: "know your rights", href: "/study/bangladesh#rights2" },
          { label: "study bangladesh industry experiences program", href: "/study/bangladesh#experiences" },
          { label: "Getting a job", href: "/study/bangladesh#getting-job" },
          { label: "Internship in Bangladesh", href: "/study/bangladesh#internship" },
        ],
      },
      study: {
        title: "Study in Bangladesh",
        links: [
          { label: "Bangladeshi Education", href: "/study/bangladesh#education" },
          { label: "University & Higher Education", href: "/study/bangladesh#university" },
          { label: "Vocational Education", href: "/study/bangladesh#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/bangladesh#governing" },
          { label: "Cost of studying", href: "/study/bangladesh#cost" },
          { label: "Post Study Work visa", href: "/study/bangladesh#psww" },
          { label: "Student Visa Requirements", href: "/study/bangladesh#visa-req" },
          { label: "International Student in Bangladesh", href: "/study/bangladesh#international" },
          { label: "A guide to study in Bangladesh", href: "/study/bangladesh#guide" },
          { label: "Study in bangladesh from Nepal", href: "/study/bangladesh#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "7200", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "0.8 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "15.00 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "europe": {
    name: "Europe",
    href: "/study/europe",
    flag: "🇪🇺",
    sections: {
      why: {
        title: "Why Europe?",
        links: [
          { label: "About Europe", href: "/study/europe#about" },
          { label: "Top Cities", href: "/study/europe#cities" },
          { label: "Visa Info", href: "/study/europe#visa" },
          { label: "Compare with other Country", href: "/study/europe#compare" },
          { label: "Reasons to study in Europe", href: "/study/europe#reasons" },
        ],
      },
      live: {
        title: "Live in Europe",
        links: [
          { label: "Permanent Residence PR", href: "/study/europe#pr" },
          { label: "Accordination", href: "/study/europe#accommodation" },
          { label: "Education & Living Costs", href: "/study/europe#costs" },
          { label: "Daily Life in Europe", href: "/study/europe#life" },
          { label: "Plan your arrival", href: "/study/europe#arrival" },
          { label: "Insurance", href: "/study/europe#insurance" },
          { label: "Visa Compliance", href: "/study/europe#compliance" },
          { label: "People & Culture", href: "/study/europe#culture" },
          { label: "Banking in Europe", href: "/study/europe#banking" },
          { label: "Transport in Europe", href: "/study/europe#transport" },
          { label: "Nepalese students in Europe", href: "/study/europe#nepalese" },
        ],
      },
      work: {
        title: "Work in Europe",
        links: [
          { label: "Jobs in Europe", href: "/study/europe#jobs" },
          { label: "Work while your study", href: "/study/europe#work-study" },
          { label: "Employabilities Resources", href: "/study/europe#resources" },
          { label: "Tax and superannuation", href: "/study/europe#tax" },
          { label: "Volunteer and industry experiences", href: "/study/europe#volunteer" },
          { label: "know your rights", href: "/study/europe#rights" },
          { label: "know your rights", href: "/study/europe#rights2" },
          { label: "study europe industry experiences program", href: "/study/europe#experiences" },
          { label: "Getting a job", href: "/study/europe#getting-job" },
          { label: "Internship in Europe", href: "/study/europe#internship" },
        ],
      },
      study: {
        title: "Study in Europe",
        links: [
          { label: "European Education", href: "/study/europe#education" },
          { label: "University & Higher Education", href: "/study/europe#university" },
          { label: "Vocational Education", href: "/study/europe#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/europe#governing" },
          { label: "Cost of studying", href: "/study/europe#cost" },
          { label: "Post Study Work visa", href: "/study/europe#psww" },
          { label: "Student Visa Requirements", href: "/study/europe#visa-req" },
          { label: "International Student in Europe", href: "/study/europe#international" },
          { label: "A guide to study in Europe", href: "/study/europe#guide" },
          { label: "Study in europe from Nepal", href: "/study/europe#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "45000", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.9 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "55.00 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  },
  "dubai": {
    name: "Dubai",
    href: "/study/dubai",
    flag: "🇦🇪",
    sections: {
      why: {
        title: "Why Dubai?",
        links: [
          { label: "About Dubai", href: "/study/dubai#about" },
          { label: "Top Cities", href: "/study/dubai#cities" },
          { label: "Visa Info", href: "/study/dubai#visa" },
          { label: "Compare with other Country", href: "/study/dubai#compare" },
          { label: "Reasons to study in Dubai", href: "/study/dubai#reasons" },
        ],
      },
      live: {
        title: "Live in Dubai",
        links: [
          { label: "Permanent Residence PR", href: "/study/dubai#pr" },
          { label: "Accordination", href: "/study/dubai#accommodation" },
          { label: "Education & Living Costs", href: "/study/dubai#costs" },
          { label: "Daily Life in Dubai", href: "/study/dubai#life" },
          { label: "Plan your arrival", href: "/study/dubai#arrival" },
          { label: "Insurance", href: "/study/dubai#insurance" },
          { label: "Visa Compliance", href: "/study/dubai#compliance" },
          { label: "People & Culture", href: "/study/dubai#culture" },
          { label: "Banking in Dubai", href: "/study/dubai#banking" },
          { label: "Transport in Dubai", href: "/study/dubai#transport" },
          { label: "Nepalese students in Dubai", href: "/study/dubai#nepalese" },
        ],
      },
      work: {
        title: "Work in Dubai",
        links: [
          { label: "Jobs in Dubai", href: "/study/dubai#jobs" },
          { label: "Work while your study", href: "/study/dubai#work-study" },
          { label: "Employabilities Resources", href: "/study/dubai#resources" },
          { label: "Tax and superannuation", href: "/study/dubai#tax" },
          { label: "Volunteer and industry experiences", href: "/study/dubai#volunteer" },
          { label: "know your rights", href: "/study/dubai#rights" },
          { label: "know your rights", href: "/study/dubai#rights2" },
          { label: "study dubai industry experiences program", href: "/study/dubai#experiences" },
          { label: "Getting a job", href: "/study/dubai#getting-job" },
          { label: "Internship in Dubai", href: "/study/dubai#internship" },
        ],
      },
      study: {
        title: "Study in Dubai",
        links: [
          { label: "Emirati Education", href: "/study/dubai#education" },
          { label: "University & Higher Education", href: "/study/dubai#university" },
          { label: "Vocational Education", href: "/study/dubai#vocational" },
          { label: "Scholarships", href: "/scholarships" },
          { label: "Governinging Bodies", href: "/study/dubai#governing" },
          { label: "Cost of studying", href: "/study/dubai#cost" },
          { label: "Post Study Work visa", href: "/study/dubai#psww" },
          { label: "Student Visa Requirements", href: "/study/dubai#visa-req" },
          { label: "International Student in Dubai", href: "/study/dubai#international" },
          { label: "A guide to study in Dubai", href: "/study/dubai#guide" },
          { label: "Study in dubai from Nepal", href: "/study/dubai#nepal" },
        ],
      },
    },
    sidebar: {
      title: "University with Best Placements",
      stats: [
        { value: "8500", label: "PLACEMENTS", subLabel: "Offered in Batch 2023-24" },
        { value: "1.6 CR", label: "INTERNATIONAL", subLabel: "Highest Package Offered" },
        { value: "48.00 LPA", label: "NATIONAL", subLabel: "Highest Package Offered" },
      ],
      image: "/images/Actor.png",
    },
  }
};

export const COURSE_DROPDOWN = [
  { label: "IELTS Preparation",  href: "/courses/ielts-preparation",       icon: "/images/ielts.png"  },
  { label: "GRE Preparation",    href: "/courses/gre-preparation",         icon: "/images/gre.png"   },
  { label: "SAT Preparation",    href: "/courses/sat-preparation",         icon: "/images/sat.png"   },
  { label: "PTE Preparation",    href: "/courses/pte-academic",            icon: "/images/pte.png"   },
  { label: "TOEFL Preparation",  href: "/courses/toefl-preparation",       icon: "/images/toefl.png" },
  { label: "OET Preparation",    href: "/courses/oet-preparation",         icon: "/images/oet.png"   },
  { label: "GMAT Preparation",   href: "/courses/gmat-preparation",        icon: "/images/gmat.png"  },
] as const;

export const NAV_LINKS = [
  { label: "Our Courses",   href: "/courses",       hasDropdown: true },
  { label: "Scholarships",  href: "/scholarships",  hasDropdown: false },
  { label: "Blog",          href: "/blog",          hasDropdown: false },
  { label: "QnA",           href: "/qna",           hasDropdown: false },
  { label: "Events",        href: "/events",        hasDropdown: false },
] as const;

// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
export const HERO_CONTENT = {
  tagline: "STUDY ABROAD",
  headlinePart1: "Explore",
  headlineHighlight: "Globally",
  headlinePart2: "at your fingertips",
  checkpoints: [
    "Top global colleges across the globe",
    "Best counselling across 140+ universities worldwide",
  ],
  searchPlaceholders: {
    course: "Course or University",
    location: "Location",
  },
  trustBadge: {
    count: "10k",
    label: "Trusted by our Students",
  },
  statCard: {
    value: "120+",
    label: "Universities Worldwide",
  },
} as const;

// Country flag badges floating around the hero image
export const HERO_FLAG_BADGES = [
  { country: "USA",       code: "us", position: "top-8 left-4"        },
  { country: "Australia", code: "au", position: "top-16 right-4"      },
  { country: "UK",        code: "gb", position: "bottom-28 left-0"    },
  { country: "Canada",    code: "ca", position: "bottom-36 right-0"   },
] as const;

// ---------------------------------------------------------------------------
// SERVICES CARDS (overlapping hero → services transition)
// ---------------------------------------------------------------------------
export const SERVICE_CARDS = [
  {
    id: "live-classes-1",
    title: "Live Classes",
    description:
      "We empower students with a platform to unlock their potential and connect them to opportunities around the world.",
  },
  {
    id: "live-classes-2",
    title: "Live Classes",
    description:
      "We empower students with a platform to unlock their potential and connect them to opportunities around the world.",
  },
  {
    id: "live-classes-3",
    title: "Live Classes",
    description:
      "We empower students with a platform to unlock their potential and connect them to opportunities around the world.",
  },
] as const;

// ---------------------------------------------------------------------------
// FEATURES / HIGHLIGHTS (3 rows of alternating layout)
// ---------------------------------------------------------------------------
export const FEATURE_TABS = [
  { id: "student",    label: "Student",      icon: "Users"        },
  { id: "university", label: "University",   icon: "GraduationCap"},
  { id: "who-we-are", label: "Who we are",   icon: "Users2"       },
] as const;

export const FEATURE_BLOCKS = [
  // --- Student Tab Blocks ---
  {
    id: "counselling",
    tabId: "student",
    icon: "MessageSquare",
    title: "Get Personalized",
    titleHighlight: "Counselling",
    titleSuffix: " from our experts",
    description:
      "Our experts assist you with country guide, course & university selection and admission with hustle free visa processing.",
    cta: { text: "Book an Appointment", href: "/appointment" },
    imagePosition: "left" as const,
    image: "/images/counselling-ui.png",
  },
  {
    id: "explore-courses",
    tabId: "student",
    icon: "Landmark",
    title: "Explore your",
    titleHighlight: "Course and Universities",
    titleSuffix: " globally with us",
    description:
      "At unifinders, search and compare courses & universities where you get best fit into.",
    cta: { text: "Explore destination and courses", href: "/courses" },
    imagePosition: "right" as const,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "admission-visa",
    tabId: "student",
    icon: "Globe",
    title: "Keep a track of your",
    titleHighlight: "Admission & Visa",
    titleSuffix: "",
    description:
      "The easiest way to apply and get enrolled at international universities. Get in real-time and stay updated regarding your progress.",
    cta: { text: "Go to Student Dashboard", href: "/dashboard" },
    imagePosition: "left" as const,
    image: "/images/admission-ui.png",
  },
  // --- University Tab Blocks ---
  {
    id: "university-partner",
    tabId: "university",
    icon: "Users2",
    title: "Become a",
    titleHighlight: "Global Partner",
    titleSuffix: "",
    description:
      "Expand your university's reach. Connect with high-quality international students vetted through our rigorous pre-screening process.",
    cta: { text: "Partner with us", href: "/institution" },
    imagePosition: "left" as const,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "university-dashboard",
    tabId: "university",
    icon: "Landmark",
    title: "Manage Applications",
    titleHighlight: "in one place",
    titleSuffix: "",
    description:
      "Our dedicated institution dashboard lets you review, approve, and track student applications securely and seamlessly.",
    cta: { text: "View Features", href: "/institution" },
    imagePosition: "right" as const,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
  },
  // --- Who We Are Tab Blocks ---
  {
    id: "about-mission",
    tabId: "who-we-are",
    icon: "Globe",
    title: "Our",
    titleHighlight: "Global Mission",
    titleSuffix: "",
    description:
      "We believe education has no borders. Our mission is to democratize access to global education for students from all backgrounds.",
    cta: { text: "Read our Story", href: "/about" },
    imagePosition: "left" as const,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200",
  }
] as const;

// ---------------------------------------------------------------------------
// GLOBAL STATS (with world map)
// ---------------------------------------------------------------------------
export const GLOBAL_STATS = [
  { value: "100+", label: "Recruitment Partners" },
  { value: "1K+",  label: "Courses"              },
  { value: "120+", label: "Universities Worldwide"},
  { value: "12K+", label: "Students"              },
  { value: "130+", label: "Countries"             },
] as const;

// ---------------------------------------------------------------------------
// PARTNER UNIVERSITIES
// ---------------------------------------------------------------------------
export const PARTNER_COUNTRY_FLAGS = [
  { country: "Canada",      code: "ca" },
  { country: "Australia",   code: "au" },
  { country: "UK",          code: "gb" },
  { country: "USA",         code: "us" },
  { country: "India",       code: "in" },
] as const;

export const PARTNER_UNIVERSITIES = [
  // Australia (7)
  { name: "UNSW Sydney",               logo: "https://logo.clearbit.com/unsw.edu.au",         country: "au" },
  { name: "Monash University",          logo: "https://logo.clearbit.com/monash.edu",           country: "au" },
  { name: "UTS",                        logo: "https://logo.clearbit.com/uts.edu.au",            country: "au" },
  { name: "University of Canberra",     logo: "https://logo.clearbit.com/canberra.edu.au",       country: "au" },
  { name: "University of Adelaide",     logo: "https://logo.clearbit.com/adelaide.edu.au",       country: "au" },
  { name: "Macquarie University",       logo: "https://logo.clearbit.com/mq.edu.au",             country: "au" },
  { name: "QUT",                        logo: "https://logo.clearbit.com/qut.edu.au",             country: "au" },
  // UK (2)
  { name: "University of Strathclyde",  logo: "https://logo.clearbit.com/strath.ac.uk",          country: "gb" },
  { name: "Richmond American Univ",     logo: "https://logo.clearbit.com/richmond.ac.uk",         country: "gb" },
  // Canada (2)
  { name: "Nipissing University",        logo: "https://logo.clearbit.com/nipissingu.ca",          country: "ca" },
  { name: "University Canada West",      logo: "https://logo.clearbit.com/myucw.ca",               country: "ca" },
  // New Zealand (1)
  { name: "Victoria Univ of Wellington", logo: "https://logo.clearbit.com/wgtn.ac.nz",            country: "nz" },
  // USA (2)
  { name: "University of Arizona",       logo: "https://logo.clearbit.com/arizona.edu",            country: "us" },
  { name: "Northeastern University",     logo: "https://logo.clearbit.com/northeastern.edu",       country: "us" },
  // India (1)
  { name: "Amity University",            logo: "https://logo.clearbit.com/amity.edu",              country: "in" },
] as const;

// ---------------------------------------------------------------------------
// SCHOLARSHIPS
// ---------------------------------------------------------------------------
export const SCHOLARSHIP_CONTENT = {
  tagline: "UNIFINDERS SCHOLARSHIPS",
  headline: "Get Scholarships worth 7,00,00,000*",
  description:
    "The easiest way to apply and get enrolled at international universities. Get in realtime and stay updated regarding your progress.",
  cta: { text: "Explore Scholarship Programs", href: "/scholarships" },
  students: [
    {
      name: "Kierra Schleifer", country: "Australia", rating: 4.8, bgColor: "bg-yellow-300",
      image: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Terry Mango",      country: "Australia", rating: 4.8, bgColor: "bg-sky-200",
      image: "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Jaylon Baptista",  country: "Australia", rating: 4.8, bgColor: "bg-green-300",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Alena Bator",      country: "Australia", rating: 4.8, bgColor: "bg-orange-400",
      image: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?auto=format&fit=crop&q=80&w=400",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// VISA CALCULATOR
// ---------------------------------------------------------------------------
export const VISA_STEPS = [
  {
    id: "get-score",
    label: "Get your Score",
    title: "01. Get your Score",
    description:
      "Based on your academic history and interests, our AI recommends courses and universities that fit your interests.",
  },
  {
    id: "shortlist",
    label: "Shortlist & Apply",
    title: "02. Shortlist & Apply",
    description:
      "Shortlist universities based on your score and apply directly through our platform.",
  },
  {
    id: "submit",
    label: "Submit & Get Accepted",
    title: "03. Submit & Get Accepted",
    description:
      "Submit your application and documentation. Track your acceptance status in real-time.",
  },
  {
    id: "journey",
    label: "Start your Journey",
    title: "04. Start your Journey",
    description:
      "Get your visa processed and begin your study abroad journey with full support.",
  },
] as const;

// ---------------------------------------------------------------------------
// TESTIMONIALS
// ---------------------------------------------------------------------------
export const TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Sita Maharjan",
    country: "Nepal → Australia",
    quote:
      "Unifinders completely transformed my study abroad journey. I was overwhelmed by the paperwork and visa requirements for Australia, but their counselors walked me through every step. I got into Monash University with a partial scholarship — something I never thought possible!",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "testimonial-2",
    name: "Rajesh Hamal",
    country: "Nepal",
    quote:
      "Unifinders helped me navigate the entire application process seamlessly. From choosing the right university to visa processing, every step was guided by their expert counselors.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "testimonial-3",
    name: "Sarah Johnson",
    country: "Australia",
    quote:
      "The personalized counselling at Unifinders made all the difference. They understood my goals and helped me find the perfect program at a top Australian university.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
  },
] as const;

// ---------------------------------------------------------------------------
// BLOG POSTS (placeholder — will come from CMS/DB later)
// ---------------------------------------------------------------------------
export const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "Top 10 Countries to Study Abroad in 2024",
    excerpt: "Choosing where to study abroad is one of the most important decisions of your life. We break down the top destinations by quality, affordability, and career outcomes...",
    date: "Mar 15, 2024",
    author: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "blog-2",
    title: "IELTS vs PTE: Which English Test is Right for You?",
    excerpt: "Confused between IELTS and PTE Academic? Our in-depth comparison covers test format, scoring, university acceptance rates, and how to choose based on your profile...",
    date: "Feb 28, 2024",
    author: "Rahul Thapa",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "blog-3",
    title: "Complete Guide to Australian Student Visa (Subclass 500)",
    excerpt: "Planning to study in Australia? Everything you need to know about the Student Visa Subclass 500 — eligibility, documents, GTE requirement, and processing timeline...",
    date: "Jan 10, 2024",
    author: "Sita Devi",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
  },
] as const;

// ---------------------------------------------------------------------------
// EVENTS
// ---------------------------------------------------------------------------
export const EVENTS = [
  {
    id: "event-1",
    title: "Study in Australia Education Fair",
    description: "Meet top Australian university reps and get on-the-spot admission guidance from our expert counselors.",
    date: { day: "20", month: "Apr" },
    time: "10:00 to 4:00",
    location: "Hotel Annapurna, Kathmandu",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600",
    status: "upcoming" as const,
  },
  {
    id: "event-2",
    title: "IELTS Preparation Masterclass",
    description: "A full-day intensive workshop with certified IELTS trainers. Master all four modules with expert tips and mock tests.",
    date: { day: "25", month: "Apr" },
    time: "9:00 to 1:00",
    location: "Unifinders Office, Putalisadak",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600",
    status: "upcoming" as const,
  },
  {
    id: "event-3",
    title: "Study Abroad Orientation Program",
    description: "Everything you need before departure — culture shock, banking, accommodation abroad, and student life tips.",
    date: { day: "15", month: "Dec" },
    time: "12:00 to 3:00",
    location: "Harmony Seminar Hall",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600",
    status: "past" as const,
  },
] as const;

// ---------------------------------------------------------------------------
// CTA BANNER
// ---------------------------------------------------------------------------
export const CTA_BANNER = {
  headline: "Are you interested in",
  highlightedText: "Studying Abroad?",
  description: "We'll help you find the perfect program, apply and start planning your adventure!",
  cta: { text: "Get Started", href: "/register" },
  stats: { value: "20k", label: "Happy Clients", rating: "4.0 of 15k" },
} as const;

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------
export const FOOTER_DATA = {
  tagline: "Get end-to-end support with our experts",
  contact: {
    location: "New Plaza, Putalisadak, Opposite to Vibrant, Kathmandu, Nepal",
    phone: "Call/Whatsapp: 980-1132288",
    tel: "Tel No: 01-5901332 | 01-5901334",
    email: "info@myunifinders.com",
  },
  socialLinks: [
    { platform: "Facebook",  href: "https://www.facebook.com/myunifinder/",       icon: "Facebook"  },
    { platform: "Instagram", href: "https://www.instagram.com/myunifinder",         icon: "Instagram" },
    { platform: "LinkedIn",  href: "https://np.linkedin.com/company/myunifinder",  icon: "Linkedin"  },
    { platform: "TikTok",    href: "https://www.tiktok.com/@myunifinders",          icon: "TikTok"    },
  ],
  columns: [
    {
      title: "About Unifinders",
      links: [
        { label: "About Us",       href: "/about"    },
        { label: "Success Stories", href: "/stories"  },
        { label: "Student",        href: "/student"  },
        { label: "Recruiter",      href: "/recruiter"},
        { label: "Institution",    href: "/institution" },
      ],
    },
    {
      title: "Study Abroad",
      links: [
        { label: "Study in Australia",    href: "/study/australia"    },
        { label: "Study in USA",          href: "/study/usa"          },
        { label: "Study in UK",           href: "/study/uk"           },
        { label: "Study in Canada",       href: "/study/canada"       },
        { label: "Study in New Zealand",  href: "/study/new-zealand"  },
        { label: "Study in Ireland",      href: "/study/ireland"      },
        { label: "Study in India",        href: "/study/india"        },
      ],
    },
    {
      title: "Features",
      links: [
        { label: "Careers",         href: "/careers"  },
        { label: "Blog",            href: "/blog"     },
        { label: "News and Events", href: "/events"   },
        { label: "In Media",        href: "/media"    },
        { label: "QnA",             href: "/qna"      },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Services", href: "/terms"  },
        { label: "Privacy Policy",    href: "/privacy" },
        { label: "Cookie Policy",     href: "/cookies" },
      ],
    },
  ],
  contributor: {
    headline: "Become a Contributor",
    description: "Let's work together to help students make life's most important decisions",
    cta: { text: "Start your Journey", href: "/register" },
  },
  copyright: "Copyright ©2024, Unifinders Education Pvt. Ltd. All Rights Reserved.",
} as const;
