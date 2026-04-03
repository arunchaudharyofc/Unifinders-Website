# Unifinders Landing Page — TODO & Development Tracker 🚀

> **Created:** March 31, 2026
> **Last Updated:** March 31, 2026
> **Status:** Active Development (Sprint 1)

---

## Code Quality Standards (Non-Negotiable)

All code in this project MUST follow these standards. These exist so a **single future maintainer with 10+ years of experience** can immediately understand, debug, and extend the codebase:

- [ ] ✅ Every component file starts with a **JSDoc header** explaining purpose, data source, and maintainer info
- [ ] ✅ All content data lives in `lib/constants/landing.ts` — never hardcoded in components
- [ ] ✅ Use `"use client"` only when React hooks are needed (useState, useEffect)
- [ ] ✅ All interactive elements have unique `id` and `aria-*` attributes for accessibility
- [ ] ✅ Images use `loading="lazy"` except above-the-fold hero (uses `loading="eager"`)
- [ ] ✅ All buttons/links have `aria-label` for screen readers
- [ ] ✅ TypeScript `as const` assertions for immutable data arrays
- [ ] ✅ Consistent file naming: PascalCase for components, camelCase for utils
- [ ] ✅ Descriptive comments above non-obvious logic blocks
- [ ] ✅ No `any` types — strict TypeScript everywhere

---

## Section Implementation Status

| # | Section | Component File | Status | Notes |
|---|---------|---------------|--------|-------|
| 1 | Navbar | `components/layout/Navbar.tsx` | ✅ Done | Mobile hamburger menu included |
| 2 | Hero | `components/landing/HeroSection.tsx` | ✅ Done | Wavy BG, search bar, floating flags |
| 3 | Services | `components/landing/ServicesSection.tsx` | ✅ Done | 3 cards overlapping hero |
| 4 | Feature Highlights | `components/landing/HighlightsSection.tsx` | ✅ Done | 3 blocks + tab pills |
| 5 | Global Stats | `components/landing/GlobalStatsSection.tsx` | ✅ Done | World map + counters |
| 6 | Partner Universities | `components/landing/PartnerUniversitiesSection.tsx` | ✅ Done | Logo grid + country filter |
| 7 | Scholarships | `components/landing/ScholarshipSection.tsx` | ✅ Done | Blue section + student cards |
| 8 | Visa Calculator | `components/landing/VisaCalculatorSection.tsx` | ✅ Done | Interactive step selector |
| 9 | Testimonials | `components/landing/TestimonialsSection.tsx` | ✅ Done | Quote card + dot navigation |
| 10 | Blogs | `components/landing/BlogSection.tsx` | ✅ Done | 3-col card grid |
| 11 | Events | `components/landing/EventsSection.tsx` | ✅ Done | Filter tabs + date badges |
| 12 | CTA Banner | `components/landing/CtaBannerSection.tsx` | ✅ Done | "Studying Abroad?" section |
| 13 | Footer | `components/layout/Footer.tsx` | ✅ Done | Full enterprise footer |

---

## Outstanding Tasks

### 🎨 Priority 1: Figma Asset Export
- [x] Export hero student image from Figma → save as `public/images/hero-student.png`
- [x] Export video call graphic → `public/images/counselling-graphic.png`
- [x] Export course explorer graphic → `public/images/course-graphic.png`
- [x] Export admission tracker graphic → `public/images/admission-graphic.png`
- [x] Export university logos → `public/universities/*.png`
- [x] Export scholarship student photos → `public/images/scholars/*.png`
- [x] Update all `src="https://..."` to local paths after export

### 🔗 Priority 2: Connect Interactivity
- [x] Search bar → bind to React `useState` + route to `/search?q=...`
- [x] Login button → route to `/auth/login`
- [x] Book Appointment → connect to Calendly or lead capture modal
- [x] Tab pills (Student/University/Who we are) → show/hide relevant feature blocks
- [x] Event filter tabs (All/Upcoming/Past) → filter events by status
- [x] Visa Calculator steps → show corresponding step details
- [x] Testimonial dots → already working ✅
- [x] "Back to Top" button → already working ✅

### 📱 Priority 3: Mobile Polish
- [x] Test on 375px (iPhone SE) viewport
- [x] Test on 768px (iPad) viewport
- [x] Verify hamburger menu opens/closes smoothly
- [x] Ensure floating elements don't overflow on small screens

### ⚡ Priority 4: Performance
- [ ] Add `next/image` for optimized image loading (once local assets exist)
- [ ] Implement `Suspense` boundaries for heavy sections
- [ ] Add font preloading in `app/layout.tsx`
- [ ] Run Lighthouse audit and fix any score < 90

### 🗄️ Priority 5: CMS Integration
- [ ] Replace `lib/constants/landing.ts` with Supabase queries
- [x] Create `blog_posts`, `events`, `testimonials`, `universities` tables
- [ ] Build admin panel for content management
- [ ] Set up ISR (Incremental Static Regeneration) for blog/event pages

### 🔒 Priority 6: Security & SEO
- [ ] Add proper meta tags in `app/layout.tsx`
- [ ] Add OpenGraph tags for social sharing
- [ ] Add structured data (JSON-LD) for courses and events
- [ ] Implement rate limiting on API routes
- [ ] Set up CSP headers

---

## Data Architecture

All landing page content currently lives in a single constants file:

```
lib/constants/landing.ts
```

This file exports typed, immutable data arrays for every section:
- `NAV_LINKS` — navigation items
- `HERO_CONTENT` — hero text, search placeholders, trust badge
- `SERVICE_CARDS` — 3 service cards
- `FEATURE_BLOCKS` — 3 feature highlight blocks
- `GLOBAL_STATS` — stat counters
- `PARTNER_UNIVERSITIES` — university names and logos
- `SCHOLARSHIP_CONTENT` — scholarship section data
- `VISA_STEPS` — visa calculator steps
- `TESTIMONIALS` — client testimonials
- `BLOG_POSTS` — blog post previews
- `EVENTS` — event listings
- `CTA_BANNER` — CTA section content
- `FOOTER_DATA` — footer links, contact info, social links

When CMS is integrated, this file becomes the **fallback/default data**.

---

*This TODO is a living document. Update it as tasks are completed.*
