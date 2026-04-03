# 🎨 FIGMA DESIGN REFERENCE — Unifinders Study Abroad Platform
> **Purpose:** Single reference doc for all UI decisions. Read this INSTEAD of scanning the Figma PDF.
> **Last Updated:** 2026-04-03
> **Source:** `Study Abroad - Landing Page.pdf` + `public/images/` (58 Figma exports)

---

## 🎨 DESIGN TOKENS

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#0070F0` | CTAs, links, highlights, icons |
| Primary Blue Dark | `#0058C0` | Hover states |
| Primary Red | `#E53E3E` / `#FF3D00` | "Globally" text highlight in hero |
| Background | `#F0F4FF` / `#EFF4FF` | Light blue page background |
| White | `#FFFFFF` | Cards, navbar, sections |
| Text Dark | `#0A0A0A` / `#1A1A2E` | Headings |
| Text Medium | `#4A5568` | Body text |
| Text Light | `#718096` | Captions, metadata |
| Border | `#E2E8F0` | Card borders |
| Yellow Underline | `#F6C90E` | Underline decoration on "fingertips" |

### Typography
| Element | Font | Weight | Size |
|---------|------|--------|------|
| Hero H1 | Plus Jakarta Sans | 800 | 56–72px |
| Section H2 | Plus Jakarta Sans | 700 | 36–48px |
| Card Title | Plus Jakarta Sans | 600 | 18–22px |
| Body | Inter | 400 | 14–16px |
| Caption/Meta | Inter | 400 | 12–13px |
| Nav Links | Inter | 500 | 14px |
| Button | Inter | 600 | 13–14px |

### Spacing & Layout
- Max content width: `1280px`
- Navbar height: `72px` (fixed)
- Section padding: `80–100px` vertical
- Card border radius: `16px` (cards), `12px` (buttons), `24px` (big cards)
- Shadow: `0 4px 24px rgba(0,112,240,0.08)` for cards

---

## 🧭 NAVBAR DESIGN

**Reference Image:** `/public/images/Nav Bar.png`

### Layout (left → center → right)
```
[Logo + "Browse by country" button] ... [Our Courses ▾ | Scholarships | Blog | QnA | Events] ... [Book an Appointment | Login]
```

### Navbar Specs
- Height: 72px, fixed top, z-50
- Background: White with bottom border `#E2E8F0`
- On scroll: glassmorphism `bg-white/90 backdrop-blur-xl`
- Logo: `unifinders` in brand font with red "i" dot and "Education Pvt. Ltd." subtitle

### "Browse by Country" Button
- Border: `1px solid #0070F0`, rounded `12px`
- Globe icon in blue, text "Browse by country", chevron
- Dropdown reveals 7 country links with flags

### Nav Links (center)
- Links: **Our Courses** (with dropdown ▾) | **Scholarships** | **Blog** | **QnA** | **Events**
- Font: Inter 500 14px, color `#374151`
- Active/hover: `#0070F0`, animated underline

### CTA Buttons (right)
- "Book an Appointment": outlined, `border-[#0070F0]`, text blue, rounded `8px`
- "Login": filled `bg-[#0070F0]` text white, with user icon, rounded `8px`

### Our Courses Dropdown (8 items in 2×4 grid)
- IELTS, GRE, SAT, PTE, TOEFL, OET, GMAT
- Each has test logo icon + label
- "View All →" link at top right

---

## 🦸 HERO SECTION

**Reference:** `/public/images/Hero Title.png`, `/public/images/BG Image.png`

### Layout
- Full-width, min-height `calc(100vh - 72px)`  
- Background: Light blue gradient `#EFF4FF` with diagonal lines pattern
- Left: Content (tagline + headline + checkpoints + search bar + trust badges)
- Right: Hero student image with floating flag badges + stats card

### Content
- Tagline: "STUDY ABROAD" (blue uppercase, letter-spacing)
- H1: "Explore **Globally**" (red) + line break + "at your fingertips" (with yellow underline on "fingertips")
- Checkpoints: ✓ "Top global colleges across the globe" + ✓ "Best counselling across 140+ universities worldwide"
- Search bar: "Course or University" + "Location" + "Search" (blue button)
- Trust badge: 4 avatar images + "10k" dot + "Trusted by our clients"
- Right stat card: 🏛 "120+ Universities Worldwide" (white card, bottom right)

### Floating Flag Badges
- 🇺🇸 USA (top left), 🇳🇿 NZ (top right), 🇬🇧 UK (bottom left), 🇨🇦 Canada (bottom right)
- Each on white rounded card

---

## 📦 SERVICES SECTION (3 Cards)

**Reference:** `/public/images/Live Classes.png`

- 3 cards in a row, overlapping the bottom of hero
- Cards: White background, border, shadow
- Each card: Icon (colored) + Title "Live Classes" + Description
- Cards appear to slide up from below hero

---

## ✨ HIGHLIGHTS SECTION

**Reference:** `/public/images/Connecting Universities with students.png`

### Tab Bar
- 3 pill tabs: **Student** | **University** | **Who we are**
- Active tab: blue background, white text
- Inactive: white/ghost

### Content Blocks (under each tab)
- Alternating left/right image layout
- Each block: Section label + colored icon + H2 + description + CTA button
- Images from `public/images/counselling-ui.png`, `public/images/admission-ui.png`

---

## 🌍 GLOBAL STATS SECTION

**Reference:** `/public/images/Connecting School, Universities, and Students worldwide.png`

- World map background (dotted)
- 5 stats in a row: "100+ Recruitment Partners" | "1K+ Courses" | "120+ Universities Worldwide" | "12K+ Students" | "130+ Countries"
- Each stat: large bold number + label below
- Blue section with white text OR light background with colored stats

---

## 🏫 PARTNER UNIVERSITIES

**Reference:** `/public/images/Our Partner Universities.png`

- Section title: "Our Partner Universities"
- Country flag filter pills: 🇨🇦 Canada | 🇦🇺 Australia | 🇬🇧 UK | 🇺🇸 USA | 🇮🇳 India
- University logo grid: white rounded cards, logo centered
- Hover: slight elevation shadow

---

## 🎓 SCHOLARSHIP SECTION

**Reference:** `/public/images/scholarship.png`

- Blue gradient background (`#0070F0` to `#003DB3`)
- Left: Stats + headline "Get Scholarships worth 7,00,00,000*" + description + CTA
- Right: 4 student cards in 2×2 grid with name, country, star rating
- Student cards have coloured backgrounds (yellow, sky, green, orange)

---

## 📊 VISA CALCULATOR SECTION

**Reference:** `/public/images/Visa Calculator.png`, `/public/images/Frame 2218.png`

- Title: "Visa Calculator"
- 4 step pills: "Get your Score" | "Shortlist & Apply" | "Submit & Get Accepted" | "Start your Journey"
- Active step: filled blue pill
- Right: Gauge/progress visualization
- Step content: step number + title + description

---

## 💬 TESTIMONIALS

**Reference:** `/public/images/What our Clients Say.png`

- Section: "What our Clients Say"
- Large quote card with student photo, name, country, star rating, quote text
- Navigation: dot indicators bottom center
- Auto-advance every 4 seconds

---

## 📝 BLOG SECTION

**Reference:** `/public/images/Read Our Blogs.png`

- Section title: "Read Our Blogs"
- 3-column card grid
- Each card: Image (landscape) + date/author + title + excerpt + "Read More →"
- "View All" CTA at bottom

---

## 📅 EVENTS SECTION

**Reference:** `/public/images/Our Events.png`

- Section: "Our Events"
- Filter tabs: **All** | **Upcoming** | **Past**
- Event cards: Image + date badge (day/month overlay) + title + location + time + "Register Free" button
- Upcoming: blue accent, Past: muted grey

---

## 🚀 CTA BANNER SECTION

**Reference:** `/public/images/Frame 2033.png`

- Blue gradient background
- Left: "Are you interested in **Studying Abroad?**" + description + "Get Started" white button
- Right: Student illustration + "20k Happy Clients" + star rating

---

## 🗂️ FOOTER

**Reference:** `/public/images/Footer.png`

- Dark background (`#0A0F1E` or navy)
- Top row: Logo + tagline + social icons
- 4 columns: About Unifinders | Study Abroad | Features | Legal
- Bottom: Copyright
- "Become a Contributor" CTA section
- Contact: Address + Phone + Email

---

## 📄 INNER PAGES — Design Patterns

> All inner pages share the same global Navbar + Footer.

### Page Header Pattern (for all inner pages)
```
[Breadcrumb: Home > Page Name]
[H1: Page Title with blue highlight]  
[Subtitle text]
```
- Background: `#F0F4FF` light blue for the header zone
- Transition to white/slate-50 for content area

### Filter Pills (used on Courses, Blog, Scholarships, Events)
- All, [Option1], [Option2]...
- Active: `bg-[#0070F0] text-white`
- Inactive: `bg-white border border-[#E2E8F0] text-slate-600 hover:border-[#0070F0]`

### Card Grid
- 3-column on desktop, 2-col tablet, 1-col mobile
- Cards: white, `rounded-2xl`, `shadow-sm hover:shadow-lg`
- Hover: slight scale up + shadow

---

## 🗺️ PAGE MAP

| Page | Route | Key Sections | Assets Used |
|------|-------|--------------|-------------|
| Landing | `/` | 13 sections (see above) | All hero images |
| Courses | `/courses` | Filter pills + Course cards grid | IELTS, GRE, PTE, TOEFL, SAT, OET, GMAT logos |
| Scholarships | `/scholarships` | Country filter + Scholarship cards | Flag emojis |
| Events | `/events` | Filter tabs + Event cards | events-section.png ref |
| Blog | `/blog` | Category filter + Blog card grid | Blog images |
| QnA | `/qna` | FAQ accordion by category | None |
| Study Destinations | `/study` | Country cards grid | Flag emojis |
| Study Detail | `/study/[country]` | Hero + Overview + Universities + CTA | Country images |
| Book Appointment | `/appointment` | Form (name, email, date, message) | None |
| Login | `/auth/login` | Email + Google OAuth form | Logo |
| Register | `/auth/register` | Sign-up form | Logo |
| Dashboard | `/dashboard` | Sidebar + stats overview | None |

---

## ⚡ IMPLEMENTATION RULES

1. **Always use `#0070F0`** — Never use generic `blue-500`. Always use the exact brand blue.
2. **Font hierarchy**: `Plus_Jakarta_Sans` for headings (`font-jakarta`), `Inter` for body (`font-inter`)
3. **Images**: Always use `<Image />` from `next/image` for local assets
4. **Navbar is global** — Rendered in `app/layout.tsx` wrapper, NOT per-page
5. **Footer is global** — Same as navbar
6. **Inner pages start with `pt-[72px]`** — Exactly the navbar height to avoid content hiding under fixed nav
7. **Cards**: Always use `rounded-2xl`, `border border-slate-100`, `shadow-sm hover:shadow-lg`
8. **Buttons**: Primary = `bg-[#0070F0] text-white rounded-lg px-5 py-2.5`, Outlined = `border border-[#0070F0] text-[#0070F0] rounded-lg`
9. **Section padding**: `py-20` (80px) standard, `py-16` (64px) for compact sections
10. **Color scheme for inner pages**: Use `bg-[#EFF4FF]` for hero area, `bg-white` for content

---

## 🐛 DESIGN BUGS FOUND (to fix)

| # | Bug | Fix |
|---|-----|-----|
| 1 | Navbar missing on all inner pages | Move Navbar to root layout |
| 2 | Footer missing on all inner pages | Move Footer to root layout |
| 3 | "Back to Home" breadcrumb on all inner pages | Replace with proper breadcrumb nav |
| 4 | Dashboard layout wraps in its own layout | Keep dashboard-specific layout, exclude global footer |
| 5 | Auth pages (login/register) have no nav context | Show minimal navbar on auth pages |
| 6 | `<img>` used in PartnerUniversitiesSection | Replace with `<Image>` |
