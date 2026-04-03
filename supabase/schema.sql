-- ==========================================
-- UNIFINDERS – SUPABASE DATABASE SCHEMA
-- Run this in the Supabase SQL Editor
-- ==========================================

-- 1. Countries
CREATE TABLE IF NOT EXISTS public.countries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  flag_emoji TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  intro TEXT,
  facts JSONB DEFAULT '[]',
  why_study JSONB DEFAULT '[]',
  requirements JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Courses
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon_url TEXT,
  description TEXT,
  features JSONB DEFAULT '[]',
  duration TEXT,
  students_trained TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Appointments
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  image_url TEXT,
  registration_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- ROW LEVEL SECURITY
-- ==========================================
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public read for content tables
CREATE POLICY "public_read_countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "public_read_courses"   ON public.courses   FOR SELECT USING (true);
CREATE POLICY "public_read_events"    ON public.events    FOR SELECT USING (true);

-- Appointments: anyone can INSERT, only authenticated can read
CREATE POLICY "public_insert_appointments" ON public.appointments FOR INSERT WITH CHECK (true);

-- ==========================================
-- SEED DATA
-- ==========================================

INSERT INTO public.countries (name, flag_emoji, slug, intro, facts, why_study, requirements) VALUES
('Australia','🇦🇺','australia','Australia is home to world-class universities, vibrant multicultural cities, and post-study work opportunities that make it a top destination for international students.','[{"label":"Universities","value":"43+"},{"label":"Intl. Students","value":"750,000+"},{"label":"Student Visa","value":"Subclass 500"},{"label":"Work Rights","value":"48 hrs/fortnight"}]','["World-ranked universities (Group of Eight)","Post-study work visa (2-4 years)","High quality of life","Multicultural and welcoming environment","Strong industry connections"]','["Valid passport","IELTS/PTE/TOEFL score","Academic transcripts","Statement of Purpose","Financial proof (GTE)","Health insurance (OSHC)"]'),
('USA','🇺🇸','usa','The United States hosts the largest number of international students worldwide, with Ivy League universities and cutting-edge research facilities.','[{"label":"Universities","value":"4,000+"},{"label":"Intl. Students","value":"1M+"},{"label":"Student Visa","value":"F-1 Visa"},{"label":"OPT Work","value":"12-36 months"}]','["Globally top-ranked universities","Flexible curriculum system","OPT and STEM OPT work permits","Research and innovation hub","Diverse campus culture"]','["Valid passport","GRE/GMAT/SAT scores","TOEFL/IELTS score","Transcripts and GPA","Statement of Purpose","Bank statements"]'),
('United Kingdom','🇬🇧','uk','The UK offers some of the oldest and most prestigious universities in the world, with shorter program durations and excellent graduate employment rates.','[{"label":"Universities","value":"160+"},{"label":"Intl. Students","value":"600,000+"},{"label":"Student Visa","value":"Tier 4"},{"label":"Graduate Route","value":"2 years"}]','["1-year Master''s programs","Graduate Route visa (2 years)","Russell Group universities","Rich cultural heritage","Gateway to Europe"]','["Valid passport","IELTS Academic score","Academic transcripts","Personal Statement","Reference letters","Financial documents"]'),
('Canada','🇨🇦','canada','Canada is known for its affordable education, welcoming immigration policies, and direct pathway from student visa to permanent residency.','[{"label":"Universities","value":"100+"},{"label":"Intl. Students","value":"800,000+"},{"label":"Study Permit","value":"Required"},{"label":"PGWP","value":"Up to 3 years"}]','["Affordable tuition fees","Post-graduation work permit (PGWP)","Pathway to permanent residency","Safe and multicultural society","Co-op programs available"]','["Valid passport","IELTS/PTE score","Acceptance letter (LOA)","Study permit application","Proof of funds","Medical examination"]'),
('New Zealand','🇳🇿','new-zealand','New Zealand offers world-class education in a safe, beautiful environment with excellent work rights for international students.','[{"label":"Universities","value":"8"},{"label":"Intl. Students","value":"50,000+"},{"label":"Student Visa","value":"Required"},{"label":"Work Rights","value":"20 hrs/week"}]','["All 8 universities globally ranked","Practical-based learning","Post-study work visa (1-3 years)","Safe and peaceful environment","Beautiful natural landscapes"]','["Valid passport","IELTS score","Academic transcripts","Financial guarantee","Health & character certificates","Student visa application"]'),
('Ireland','🇮🇪','ireland','Ireland has emerged as a top study destination with its strong tech industry, English-speaking environment, and innovative universities.','[{"label":"Universities","value":"34+"},{"label":"Intl. Students","value":"35,000+"},{"label":"Student Visa","value":"Stamp 2"},{"label":"Stay Back","value":"1-2 years"}]','["European tech hub (Google, Meta, Apple)","English-speaking country","Stay-back option after graduation","Friendly and welcoming culture","Strong pharmaceutical industry"]','["Valid passport","IELTS score","Offer letter","Proof of fees payment","Medical insurance","Financial evidence"]'),
('India','🇮🇳','india','India offers affordable, high-quality education with globally recognized universities, especially for engineering, medicine, and business programs.','[{"label":"Universities","value":"1,000+"},{"label":"Intl. Students","value":"50,000+"},{"label":"Student Visa","value":"Required"},{"label":"Tuition","value":"Very affordable"}]','["IITs and IIMs globally recognized","Very affordable education","Rich cultural experience","Growing startup ecosystem","English-medium instruction"]','["Valid passport","Academic transcripts","Admission letter","Student visa application","Financial documents","Health certificate"]');

INSERT INTO public.courses (title, full_name, slug, icon_url, description, features, duration, students_trained) VALUES
('IELTS Preparation','International English Language Testing System','ielts','/images/ielts.png','IELTS is the world''s most popular English language proficiency test for higher education and global migration. Our comprehensive preparation covers all four modules.','["Full-length mock tests","Band 7+ strategies","One-on-one speaking practice","Writing task feedback","Flexible batch timings","Expert British Council trainers"]','6-8 weeks','2,500+'),
('GRE Preparation','Graduate Record Examination','gre','/images/gre.png','The GRE is required for admission to most graduate programs in the US, Canada, and other countries.','["Adaptive test practice","Vocabulary building","Quantitative shortcuts","AWA essay templates","Practice with real ETS material","Score prediction analysis"]','8-10 weeks','1,200+'),
('SAT Preparation','Scholastic Assessment Test','sat','/images/sat.png','The SAT is a standardized test for college admissions in the United States.','["Section-wise deep dives","Math formula sheets","Reading comprehension strategies","Practice tests with analysis","Score improvement guarantee","College application guidance"]','6-8 weeks','800+'),
('PTE Preparation','Pearson Test of English','pte','/images/pte.png','PTE Academic is a computer-based English language test trusted by universities, colleges, and governments around the world.','["Computer-based mock tests","AI scoring feedback","Pronunciation coaching","Read Aloud mastery","Summarize Written Text tips","Score card analysis"]','4-6 weeks','1,800+'),
('TOEFL Preparation','Test of English as a Foreign Language','toefl','/images/toefl.png','TOEFL iBT is accepted by more than 11,500 universities in over 160 countries.','["iBT simulation tests","Integrated task strategies","Note-taking techniques","Speaking response templates","Reading speed training","Listening comprehension drills"]','6-8 weeks','1,500+'),
('OET Preparation','Occupational English Test','oet','/images/oet.png','OET is designed specifically for healthcare professionals who wish to study or practice in English-speaking countries.','["Healthcare-specific content","Roleplay speaking practice","Referral letter writing","Case note analysis","Profession-specific vocabulary","12 healthcare profession tracks"]','6-8 weeks','600+'),
('GMAT Preparation','Graduate Management Admission Test','gmat','/images/gmat.png','The GMAT is the most widely used exam for MBA and business school admissions.','["Data sufficiency shortcuts","Critical reasoning methods","Sentence correction rules","Integrated reasoning drills","700+ score strategies","B-school application support"]','8-12 weeks','900+');
