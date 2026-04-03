# Unifinders Website — Developer Documentation

Welcome to the Unifinders web platform repository! This document serves as a comprehensive guide for developers (new and existing) to understand the architecture, run the project locally, debug issues, and contribute effectively.

---

## 🛠 Technology Stack

This project is built using a modern, scalable web stack:
- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Auth & Database:** [Supabase](https://supabase.com/)
- **ORM:** [Prisma](https://www.prisma.io/) (Planned mapping for backend migrations)
- **Language:** TypeScript (Strict typing enforced)

---

## 🚀 Getting Started & Running Locally

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18.17 or higher recommended)
- **npm** (comes with Node.js)
- **Git**

### 2. Clone the Repository & Checkout DEV Branch
Always fetch the latest code and work on the `DEV` branch.
```bash
git clone https://github.com/arunchaudharyofc/Unifinders-Website.git
cd Unifinders-Website/unifinders-web
git checkout DEV
git pull origin DEV
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Variables
Create a `.env.local` file in the root of your project (`unifinders-web/`). 
*(Note: Never commit this file to GitHub!)*
```env
# Example .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```
*Ask the Lead Developer or DevOps for the active DEV Supabase keys.*

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The page will auto-reload when you save code changes.

---

## 📁 Directory Structure & Architecture

To navigate the codebase quickly, understand the routing structure:

```text
├── app/                  # Next.js App Router (All Pages & API Routes)
│   ├── (main)/           # Public Marketing Pages (inherits Navbar & Footer)
│   │   ├── about/        # About Us page
│   │   ├── events/       # Events listing and /[slug] detail pages
│   │   ├── courses/      # Courses listing and /[slug] detail pages
│   │   ├── study/        # Destination listing and /[country] detail pages
│   │   ├── blog/         # Blogs listing and /[slug] detail pages
│   │   ├── scholarships/ # Scholarships listing and /[slug] detail pages
│   │   └── page.tsx      # Main Landing Page (Home)
│   ├── auth/             # Login & Register System
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration & OTP page
│   │   └── layout.tsx    # Auth wrapper (centers forms, adds Navbar/Footer)
│   ├── dashboard/        # Student/Counselor Dashboard (Protected)
│   └── api/              # Backend Endpoints
├── components/           # Reusable UI Components
│   ├── landing/          # Sections for the Home landing page (Hero, Stats, etc)
│   ├── layout/           # Shared UI Layouts (Navbar, Footer)
│   └── ui/               # Standard UI pieces (Buttons, Inputs, Modals)
├── lib/                  # Utilities and Constants
│   ├── constants/        # Current local mock data (events.ts, courses.ts, etc.) - To be mapped to DB
│   └── supabase/         # Authentication and DB Clients
└── public/               # Static assets (Images, SVGs, etc.)
```

> **Key Concept:** Currently, module data (like Events, Blogs, Courses) is stored inside `lib/constants/*.ts`. In the next phase, these will be fetched directly from Supabase/Prisma. UI components map over these constants to render pixel-perfect grid cards.

---

## 🐞 How to Debug

### Visual Issues
- Check if your tailwind colors are matching the Figma file.
- Check browser console for hydration errors (usually due to nested `<p>` or `<div>` tags).

### Auth & Logic
- Inspect the **Network** tab in Browser DevTools. 
- Look for `/api/onboarding` or `supabase/auth` requests to see the actual payloads.

---

## 🏗 Coding Standards & Git Flow

- **Branching Strategy:** Work exclusively on `DEV`. Merges to `main` are for production releases only.
- **Commit Messages:** Use conventional commits: `feat:`, `fix:`, `docs:`, `ui:`.
- **Naming:** Components in PascalCase, utility functions in camelCase.

Stay synced with the lead developer for specific task prioritization!
