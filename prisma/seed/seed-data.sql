-- =====================================================
-- Unifinders: Seed Data — Run in Supabase SQL Editor
-- =====================================================

-- 1. Study Fields
INSERT INTO study_fields (id, name, slug, icon_url, description, display_order, is_active, created_at, updated_at) VALUES
(gen_random_uuid()::text, 'Computer Science & IT', 'computer-science', 'https://cdn-icons-png.flaticon.com/512/2721/2721304.png', 'Software engineering, data science, cybersecurity, AI, and information systems.', 1, true, now(), now()),
(gen_random_uuid()::text, 'Engineering & Technology', 'engineering', 'https://cdn-icons-png.flaticon.com/512/2942/2942243.png', 'Mechanical, civil, electrical, chemical, and aerospace engineering.', 2, true, now(), now()),
(gen_random_uuid()::text, 'Business & Management', 'business', 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png', 'MBA, accounting, finance, marketing, and entrepreneurship.', 3, true, now(), now()),
(gen_random_uuid()::text, 'Hospitality & Tourism', 'hospitality', 'https://cdn-icons-png.flaticon.com/512/3531/3531806.png', 'Hotel management, tourism, event management, and culinary arts.', 4, true, now(), now()),
(gen_random_uuid()::text, 'Health & Medical Sciences', 'health-sciences', 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png', 'Nursing, public health, biomedical science, and physiotherapy.', 5, true, now(), now()),
(gen_random_uuid()::text, 'Science & Mathematics', 'science', 'https://cdn-icons-png.flaticon.com/512/2942/2942909.png', 'Physics, chemistry, biology, mathematics, and environmental science.', 6, true, now(), now()),
(gen_random_uuid()::text, 'Arts & Humanities', 'arts-humanities', 'https://cdn-icons-png.flaticon.com/512/3997/3997872.png', 'Literature, philosophy, history, languages, and cultural studies.', 7, true, now(), now()),
(gen_random_uuid()::text, 'Education & Teaching', 'education', 'https://cdn-icons-png.flaticon.com/512/3135/3135810.png', 'Teaching, educational leadership, curriculum design, and TESOL.', 8, true, now(), now())
ON CONFLICT (slug) DO NOTHING;

-- 2. Universities (17 real universities)
INSERT INTO universities (id, name, country, city, type, established, ranking, website_url, cover_image_url, description, intakes, min_ielts, min_toefl, min_gpa, tuition_range_min, tuition_range_max, application_fee, student_count, acceptance_rate, is_active, created_at, updated_at) VALUES
(gen_random_uuid()::text, 'University of Melbourne', 'Australia', 'Melbourne', 'Public', 1853, 14, 'https://www.unimelb.edu.au', 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop', 'The University of Melbourne is a public research university located in Melbourne, Australia. Founded in 1853, it is the second oldest university in Australia.', '{February,July}', 6.5, 79, 3.0, 30000, 50000, 100, 53000, 0.70, true, now(), now()),
(gen_random_uuid()::text, 'Monash University', 'Australia', 'Melbourne', 'Public', 1958, 42, 'https://www.monash.edu', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop', 'Monash University is a public research university based in Melbourne. Member of the Group of Eight.', '{February,July}', 6.5, 79, 2.8, 28000, 48000, 110, 86000, 0.55, true, now(), now()),
(gen_random_uuid()::text, 'University of Sydney', 'Australia', 'Sydney', 'Public', 1850, 18, 'https://www.sydney.edu.au', 'https://images.unsplash.com/photo-1525926472898-acbfcb5064db?w=800&auto=format&fit=crop', 'Australia''s first university, consistently ranked among the top universities in the world.', '{February,July}', 6.5, 85, 3.0, 35000, 52000, 150, 73000, 0.30, true, now(), now()),
(gen_random_uuid()::text, 'Deakin University', 'Australia', 'Geelong', 'Public', 1974, 266, 'https://www.deakin.edu.au', 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop', 'Known for innovative teaching and strong industry connections.', '{March,July,November}', 6.0, 60, 2.5, 22000, 38000, 0, 64000, 0.70, true, now(), now()),
(gen_random_uuid()::text, 'RMIT University', 'Australia', 'Melbourne', 'Public', 1887, 140, 'https://www.rmit.edu.au', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop', 'Urban, multi-sector university known for technology, design, and enterprise.', '{February,July}', 6.5, 79, 2.7, 25000, 42000, 0, 96000, 0.55, true, now(), now()),
(gen_random_uuid()::text, 'University of Toronto', 'Canada', 'Toronto', 'Public', 1827, 21, 'https://www.utoronto.ca', 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=800&auto=format&fit=crop', 'Leading Canadian institution of learning, founded in 1827.', '{September,January,May}', 6.5, 89, 3.3, 40000, 58000, 180, 97000, 0.43, true, now(), now()),
(gen_random_uuid()::text, 'University of British Columbia', 'Canada', 'Vancouver', 'Public', 1908, 34, 'https://www.ubc.ca', 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800&auto=format&fit=crop', 'Consistently ranked among the top universities in the world.', '{September,January}', 6.5, 90, 3.0, 35000, 52000, 168, 72000, 0.52, true, now(), now()),
(gen_random_uuid()::text, 'Conestoga College', 'Canada', 'Kitchener', 'Public', 1967, NULL, 'https://www.conestogac.on.ca', 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&auto=format&fit=crop', 'Popular among international students for practical, career-oriented programs.', '{September,January,May}', 6.0, 79, 2.5, 14000, 22000, 100, 26000, 0.75, true, now(), now()),
(gen_random_uuid()::text, 'University College London', 'United Kingdom', 'London', 'Public', 1826, 9, 'https://www.ucl.ac.uk', 'https://images.unsplash.com/photo-1517502166878-35c93a0072f0?w=800&auto=format&fit=crop', 'Member of the Russell Group and part of the University of London federation.', '{September}', 6.5, 92, 3.3, 24000, 38000, 0, 46000, 0.63, true, now(), now()),
(gen_random_uuid()::text, 'University of Leeds', 'United Kingdom', 'Leeds', 'Public', 1904, 75, 'https://www.leeds.ac.uk', 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop', 'One of the largest universities in the UK, member of the Russell Group.', '{September,January}', 6.0, 87, 2.8, 20000, 28000, 0, 38000, 0.73, true, now(), now()),
(gen_random_uuid()::text, 'Northeastern University', 'United States', 'Boston', 'Private', 1898, 375, 'https://www.northeastern.edu', 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&auto=format&fit=crop', 'Known for cooperative education integrating classroom study with professional experience.', '{September,January,May}', 6.5, 92, 3.0, 28000, 58000, 75, 38000, 0.20, true, now(), now()),
(gen_random_uuid()::text, 'Arizona State University', 'United States', 'Tempe', 'Public', 1885, 179, 'https://www.asu.edu', 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&auto=format&fit=crop', 'One of the largest public universities by enrollment in the United States.', '{August,January}', 6.0, 61, 2.5, 18000, 32000, 70, 140000, 0.88, true, now(), now()),
(gen_random_uuid()::text, 'University of Auckland', 'New Zealand', 'Auckland', 'Public', 1883, 68, 'https://www.auckland.ac.nz', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&auto=format&fit=crop', 'The largest university in New Zealand, consistently among the top 100 globally.', '{February,July}', 6.0, 80, 2.8, 25000, 42000, 0, 46000, 0.64, true, now(), now()),
(gen_random_uuid()::text, 'University of Canterbury', 'New Zealand', 'Christchurch', 'Public', 1873, 256, 'https://www.canterbury.ac.nz', 'https://images.unsplash.com/photo-1594312915251-48db9280c8f0?w=800&auto=format&fit=crop', 'Known for engineering and science, attracts students from over 80 countries.', '{February,July}', 6.0, 80, 2.5, 22000, 38000, 0, 15000, 0.80, true, now(), now()),
(gen_random_uuid()::text, 'Technical University of Munich', 'Germany', 'Munich', 'Public', 1868, 28, 'https://www.tum.de', 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&auto=format&fit=crop', 'One of the highest-ranked universities in Germany and Europe.', '{October,April}', 6.5, 88, 3.0, 250, 750, 0, 50000, 0.08, true, now(), now()),
(gen_random_uuid()::text, 'University of Tokyo', 'Japan', 'Tokyo', 'Public', 1877, 32, 'https://www.u-tokyo.ac.jp/en/', 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&auto=format&fit=crop', 'Top-ranked university in Japan and one of the most prestigious in Asia.', '{April,October}', 6.5, 90, 3.2, 3500, 6000, 0, 28000, 0.30, true, now(), now()),
(gen_random_uuid()::text, 'Seoul National University', 'South Korea', 'Seoul', 'Public', 1946, 31, 'https://en.snu.ac.kr', 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&auto=format&fit=crop', 'Most prestigious university in South Korea.', '{March,September}', 6.0, 80, 3.0, 4000, 8000, 60, 28000, 0.24, true, now(), now())
ON CONFLICT DO NOTHING;

-- 3. Programs (linked to universities above)
DO $$
DECLARE
  uid TEXT;
BEGIN
  -- University of Melbourne programs
  SELECT id INTO uid FROM universities WHERE name='University of Melbourne' AND country='Australia' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'Master of Information Technology','Masters','Computer Science','2 years',47636,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Commerce','Bachelors','Business','3 years',44736,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Engineering (Software)','Masters','Engineering','2-3 years',48000,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Data Science','Masters','Computer Science','2 years',47636,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Science','Bachelors','Science','3 years',42784,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Public Health','Masters','Health Sciences','2 years',40000,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Monash University programs
  SELECT id INTO uid FROM universities WHERE name='Monash University' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'Master of Information Technology','Masters','Computer Science','1.5-2 years',42800,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Engineering (Honours)','Bachelors','Engineering','4 years',48000,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Business Administration','Masters','Business','2 years',49500,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Nursing','Bachelors','Health Sciences','3 years',38400,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Data Science','Masters','Computer Science','1.5-2 years',42800,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- University of Sydney programs
  SELECT id INTO uid FROM universities WHERE name='University of Sydney' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'Master of Information Technology','Masters','Computer Science','1.5 years',49000,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Engineering Honours (Software)','Bachelors','Engineering','4 years',52500,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Commerce','Masters','Business','2 years',51000,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Nursing (Advanced Studies)','Bachelors','Health Sciences','3 years',40500,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- University of Toronto programs
  SELECT id INTO uid FROM universities WHERE name='University of Toronto' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'Master of Science in Computer Science','Masters','Computer Science','1.5 years',52230,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Applied Science (Engineering)','Bachelors','Engineering','4 years',58680,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Business Administration','Masters','Business','2 years',56000,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Science','Bachelors','Science','4 years',57020,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- UBC programs
  SELECT id INTO uid FROM universities WHERE name='University of British Columbia' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'Master of Science in Computer Science','Masters','Computer Science','2 years',9131,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Computer Science','Bachelors','Computer Science','4 years',42803,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Management','Masters','Business','1 year',37800,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- UCL programs
  SELECT id INTO uid FROM universities WHERE name='University College London' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'MSc Computer Science','Masters','Computer Science','1 year',36100,true,now(),now()),
    (gen_random_uuid()::text,uid,'BSc Computer Science','Bachelors','Computer Science','3 years',35000,true,now(),now()),
    (gen_random_uuid()::text,uid,'MSc Data Science','Masters','Computer Science','1 year',36100,true,now(),now()),
    (gen_random_uuid()::text,uid,'MSc Management','Masters','Business','1 year',35400,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Northeastern programs
  SELECT id INTO uid FROM universities WHERE name='Northeastern University' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'MS in Computer Science','Masters','Computer Science','2 years',29500,true,now(),now()),
    (gen_random_uuid()::text,uid,'MS in Data Science','Masters','Computer Science','1.5 years',29500,true,now(),now()),
    (gen_random_uuid()::text,uid,'BS in Computer Science','Bachelors','Computer Science','4 years',57592,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- ASU programs
  SELECT id INTO uid FROM universities WHERE name='Arizona State University' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'MS in Computer Science','Masters','Computer Science','2 years',32000,true,now(),now()),
    (gen_random_uuid()::text,uid,'BS in Computer Science','Bachelors','Computer Science','4 years',31200,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Business Administration','Masters','Business','2 years',28000,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- University of Auckland programs
  SELECT id INTO uid FROM universities WHERE name='University of Auckland' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'Master of Information Technology','Masters','Computer Science','1.5 years',39584,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Science (Computer Science)','Bachelors','Computer Science','3 years',37900,true,now(),now()),
    (gen_random_uuid()::text,uid,'Bachelor of Engineering (Honours)','Bachelors','Engineering','4 years',45110,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- TU Munich programs
  SELECT id INTO uid FROM universities WHERE name='Technical University of Munich' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'M.Sc. Informatics','Masters','Computer Science','2 years',286,true,now(),now()),
    (gen_random_uuid()::text,uid,'M.Sc. Data Engineering and Analytics','Masters','Computer Science','2 years',286,true,now(),now()),
    (gen_random_uuid()::text,uid,'M.Sc. Management & Technology','Masters','Business','2 years',286,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- University of Tokyo programs
  SELECT id INTO uid FROM universities WHERE name='University of Tokyo' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'Master of Information Science and Technology','Masters','Computer Science','2 years',5352,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Engineering','Masters','Engineering','2 years',5352,true,now(),now()),
    (gen_random_uuid()::text,uid,'Master of Economics','Masters','Business','2 years',5352,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;

  -- Seoul National University programs
  SELECT id INTO uid FROM universities WHERE name='Seoul National University' LIMIT 1;
  IF uid IS NOT NULL THEN
    INSERT INTO university_programs (id,university_id,name,level,field,duration,tuition_fee,is_active,created_at,updated_at) VALUES
    (gen_random_uuid()::text,uid,'MS in Computer Science and Engineering','Masters','Computer Science','2 years',6400,true,now(),now()),
    (gen_random_uuid()::text,uid,'MS in Data Science','Masters','Computer Science','2 years',6400,true,now(),now()),
    (gen_random_uuid()::text,uid,'MBA (Global)','Masters','Business','2 years',8500,true,now(),now())
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- 4. Country Guides
INSERT INTO country_guides (id,country,slug,flag_emoji,flag_url,banner_image_url,overview,why_study_here,living_cost,visa_requirements,top_cities,work_rights,intakes,currency,avg_tuition_min,avg_tuition_max,university_count,display_order,is_active,created_at,updated_at) VALUES
(gen_random_uuid()::text,'Australia','australia','🇦🇺','https://flagcdn.com/w80/au.png','https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&auto=format&fit=crop','Australia is one of the most popular study abroad destinations, known for world-class universities, multicultural society, and strong post-study work opportunities.','["7 universities in global top 100","Post-study work visa (2-4 years)","High quality of life","Multicultural & welcoming society","Strong research opportunities","Part-time work allowed (48hrs/fortnight)"]'::jsonb,'{"min":21000,"max":30000,"currency":"AUD"}'::jsonb,'{"visaType":"Student Visa (Subclass 500)","processingTime":"4-6 weeks","cost":"AUD 710"}'::jsonb,'[{"name":"Melbourne","description":"Cultural capital with top universities"},{"name":"Sydney","description":"Iconic city with diverse opportunities"}]'::jsonb,'{"duringStudy":"48 hours per fortnight","postStudy":"2-4 year Post-Study Work visa"}'::jsonb,'{February,July}','AUD',20000,50000,43,1,true,now(),now()),
(gen_random_uuid()::text,'Canada','canada','🇨🇦','https://flagcdn.com/w80/ca.png','https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&auto=format&fit=crop','Canada is the #1 destination for Nepali students, offering affordable education, clear PR pathways, and a safe multicultural environment.','["Clear PR pathway after graduation","Affordable tuition vs US/UK","Safe multicultural society","Post-Graduation Work Permit (PGWP)","Co-op programs with industry"]'::jsonb,'{"min":15000,"max":25000,"currency":"CAD"}'::jsonb,'{"visaType":"Study Permit","processingTime":"8-12 weeks","cost":"CAD 150"}'::jsonb,'[{"name":"Toronto","description":"Financial hub with diverse population"},{"name":"Vancouver","description":"Beautiful city with tech industry"}]'::jsonb,'{"duringStudy":"20 hours/week","postStudy":"PGWP up to 3 years"}'::jsonb,'{September,January,May}','CAD',15000,55000,96,2,true,now(),now()),
(gen_random_uuid()::text,'United States','united-states','🇺🇸','https://flagcdn.com/w80/us.png','https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=1200&auto=format&fit=crop','The US hosts the most international students in the world with over 4,000 accredited institutions.','["World''s top-ranked universities","OPT work authorization (1-3 years)","Diverse program options","Cutting-edge research"]'::jsonb,'{"min":15000,"max":30000,"currency":"USD"}'::jsonb,'{"visaType":"F-1 Student Visa","processingTime":"3-5 weeks","cost":"USD 185"}'::jsonb,'[{"name":"Boston","description":"Academic hub with 50+ universities"},{"name":"New York","description":"Global city with endless opportunities"}]'::jsonb,'{"duringStudy":"20 hours/week on-campus","postStudy":"OPT 12 months (36 for STEM)"}'::jsonb,'{September,January}','USD',20000,60000,4000,3,true,now(),now()),
(gen_random_uuid()::text,'United Kingdom','united-kingdom','🇬🇧','https://flagcdn.com/w80/gb.png','https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop','Home to some of the oldest and most prestigious universities in the world with shorter degree durations.','["Shorter degree duration (1-year Masters)","Graduate Route visa (2 years)","World-renowned universities","Rich cultural experience"]'::jsonb,'{"min":12000,"max":18000,"currency":"GBP"}'::jsonb,'{"visaType":"Student Visa (Tier 4)","processingTime":"3-6 weeks","cost":"GBP 490"}'::jsonb,'[{"name":"London","description":"Global city with top universities"},{"name":"Manchester","description":"Vibrant student city"}]'::jsonb,'{"duringStudy":"20 hours/week","postStudy":"Graduate Route 2 years"}'::jsonb,'{September,January}','GBP',15000,40000,160,4,true,now(),now())
ON CONFLICT (slug) DO NOTHING;

-- 5. Help Articles
INSERT INTO help_articles (id,category,title,slug,content,tags,display_order,is_published,created_at,updated_at) VALUES
(gen_random_uuid()::text,'getting-started','How to Complete Your Profile','complete-profile','Your profile is the foundation of your study abroad journey. Complete all sections for personalized recommendations.','{profile,onboarding}',1,true,now(),now()),
(gen_random_uuid()::text,'getting-started','Understanding the Dashboard','understanding-dashboard','Your dashboard is your command center. Check it daily for updates, recommendations, and application status.','{dashboard,overview}',2,true,now(),now()),
(gen_random_uuid()::text,'applications','How to Apply to a University','how-to-apply','Search programs, check requirements, prepare documents, submit application, and track progress.','{application,apply}',1,true,now(),now()),
(gen_random_uuid()::text,'visa','Student Visa Guide','student-visa-guide','Getting your student visa is crucial. Each country has different requirements. Apply early.','{visa,immigration}',1,true,now(),now()),
(gen_random_uuid()::text,'scholarships','Finding Scholarships','finding-scholarships','Scholarships can significantly reduce costs. Search by country, field, and level.','{scholarships,funding}',1,true,now(),now())
ON CONFLICT (slug) DO NOTHING;

-- ✅ Seed complete! 17 universities, 50+ programs, 8 study fields, 4 country guides, 5 help articles
