# 🛡️ Shining On Safety (SOS) — Unified Digital Ecosystem & LMS Platform

> **Client:** Melanie Jaime & Executive Leadership — *Shining On Safety LLC*  
> **Industry:** OSHA Safety Compliance, Jobsite Risk Consulting & Construction Workforce Credentialing (29 CFR 1926)  
> **Lead Architect & Development Agency:** [Uanify](https://github.com/Uanify)  
> **Engineering Stack:** React 19 • TypeScript • Vite • Tailwind CSS v4 • Lucide Icons • Canvas Confetti  
> **Target Production Domain:** `shiningonsafety.us`

---

## 📑 Table of Contents
1. [Executive Summary & Core Problem](#-executive-summary--core-problem)
2. [Strategic Architecture Blueprint](#-strategic-architecture-blueprint)
3. [Component Directory & Implementation Map](#-component-directory--implementation-map)
4. [Investment Options & Scope Matrix](#-investment-options--scope-matrix)
5. [Client Live Feedback & Scope Adjustments Workflow](#-client-live-feedback--scope-adjustments-workflow)
6. [Developer Protections & Strict Scope Boundaries](#-developer-protections--strict-scope-boundaries)
7. [Local Development & Production Deployment](#-local-development--production-deployment)
8. [Code Reusability for Final Production Platform](#-code-reusability-for-final-production-platform)

---

## 🎯 Executive Summary & Core Problem

Currently, **Shining On Safety (SOS)** operates across **3 fragmented and disconnected web properties**:
1. **Marketing Landing:** `shiningonsafety.com` *(Legacy WordPress Divi)*
2. **Safety University LMS:** `university.shiningonsafety.us` *(Separate LMS subdomain with manual user sync)*
3. **PPE Equipment Store:** `square.site` *(External Square-hosted store, separate cart)*

### 🚀 The Unified Solution
Consolidate all 3 silos into a **single, modern, mobile-first ecosystem** under `shiningonsafety.us`:
* **1-Step Checkout:** Purchase OSHA training courses and physical PPE gear in a unified shopping cart.
* **Safety University LMS:** Automated video course delivery, modular quizzes with an 80% passing threshold, and automated grade calculations.
* **Instant Digital QR Credentials:** Jobsite superintendents can scan hardhat QR stickers in 2 seconds to verify worker compliance 24/7.
* **B2B Corporate Retainer Engine:** Self-serve workforce pricing calculator ($27k–$160k/yr) and active subcontractor compliance dashboards.
* **Self-Serve SuperAdmin CMS:** Full operational autonomy for SOS staff to modify tuition fees, courses, instructors, and equipment without writing code.

---

## 🏛️ Strategic Architecture Blueprint

```
sos-ecosystem/
│
├── 🌐 Public Landing Layer
│   ├── Hero (OSHA 29 CFR 1926 Engine & Video Lesson Previews)
│   ├── OSHA Compliance Lead Magnet (5-Question Risk Scorecard)
│   ├── Competitive Matrix (SOS Digital Platform vs Traditional Paper Agencies)
│   └── 1-Click Bilingual Switcher (EN / ES Full Parity)
│
├── 🎓 Academic LMS Campus (Safety University)
│   ├── Course Syllabus & HD Streaming Player
│   ├── Real-time Interactive Exam Simulator (80% passing grade requirement)
│   ├── Confetti Celebration & Digital PDF Certificate Unlock
│   └── Subcontractor Crew Compliance Roster
│
├── 🛒 E-Commerce & Checkout Engine
│   ├── Square Web Payments SDK Integration (256-Bit SSL Tokenization)
│   ├── Universal Cart (Courses + Physical PPE Safety Gear Bundles -15%)
│   └── Multi-gateway support (Apple Pay, Google Pay, Credit Cards)
│
├── 🏢 Enterprise B2B Retainers Portal
│   ├── Workforce Size Calculator (1–50+ Workers)
│   ├── Retainer Tiers: Silver ($48k/yr), Gold ($84k/yr), Platinum ($160k/yr)
│   └── Employer Compliance Tracker (OSHA 300A Logs Sync)
│
└── ⚙️ SuperAdmin Operations CMS
    ├── Course & Tuition Management
    ├── Team Directory Editor (Melanie Jaime, Sarah Jenkins, Carlos Mendez)
    ├── Orders, E-Commerce Fulfillment & Tracking
    └── Promo Codes & Volume Discount Rules
```

---

## 📁 Component Directory & Implementation Map

All code is structured into modular, decoupled TypeScript components ready for direct extraction into **Next.js, Remix, Laravel, or Node.js**:

| Component Path | Functionality & Key Responsibilities |
| :--- | :--- |
| `src/components/Navbar.tsx` | Responsive header with **Safety University LMS pill**, language toggle, SuperAdmin link, and cart counter. |
| `src/components/Hero.tsx` | High-impact technical hero with OSHA 29 CFR 1926 badges, brand royal blue palette, and lesson preview modal. |
| `src/components/CourseCatalog.tsx` | 6 OSHA accredited courses with expandable syllabus drawers, pricing, instructor bios, and enrollment forms. |
| `src/components/UniversityView.tsx` | Full LMS campus simulator: lesson syllabus, video player, active session tracker, 80% passing quiz, and QR certificate generation. |
| `src/components/GearStore.tsx` | E-commerce store for PPE safety equipment (harnesses, helmets, vests) with cross-sell discount logic (-15%). |
| `src/components/B2BCorporatePortal.tsx` | Interactive crew size slider, annual retainer quoting ($27k–$160k/yr), and live employer compliance dashboard. |
| `src/components/CompetitiveAdvantageSection.tsx` | Comparison table contrasting SOS tech advantages against traditional paper-based safety agencies. |
| `src/components/RiskAssessmentModal.tsx` | 5-question OSHA compliance quiz scoring jobsite vulnerability and routing leads to retainer plans. |
| `src/components/QRVerificationModal.tsx` | 24/7 public certificate scanner verifying student credentials, course standard, issue date, and instructor signature. |
| `src/components/SuperAdminCMSModal.tsx` | Self-serve administrative dashboard to edit prices, manage courses, team profiles, and orders without code. |
| `src/components/CheckoutDrawer.tsx` | Unified 1-step checkout combining digital courses and physical PPE gear with simulated Square tokenization. |
| `src/components/ProposalReferenceModal.tsx` | Executive proposal viewer with 3-tier investment matrix, 10-project roadmap, cost breakdown, and live email feedback engine. |
| `src/data/content.ts` | **Single Source of Truth:** Centralized data schema for courses, pricing, team members, and corporate tiers. |

---

## 💼 Investment Options & Scope Matrix

```
┌───────────────────────────┬─────────────────────────────┬─────────────────────────────┬─────────────────────────────┐
│ Scope Feature             │ Option 1: Full Ecosystem    │ Option 2: Core LMS & Store  │ Option 3: Essential Sprint  │
│                           │ ($18,500 USD) [Recommended] │ ($11,800 USD)               │ ($4,800 USD)                │
├───────────────────────────┼─────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ Domain Unification        │ 3-in-1 under single domain  │ 2-in-1 (LMS + Landing)      │ Standalone (Keep 3 sites)   │
│ In-App PPE Gear Store     │ ✓ Fully Integrated Cart     │ • External Square Link      │ • External Square Link      │
│ Safety University LMS     │ ✓ Full Video LMS + Auto-Quiz│ ✓ Full Video LMS + Auto-Quiz│ ✕ Not in this Sprint        │
│ B2B Retainers Portal      │ ✓ Quoter + Crew Dashboard   │ • Showcase Plans Only       │ ✕ Not in this Sprint        │
│ Digital QR Credentials    │ ✓ Dynamic 24/7 Cloud Engine │ ✓ PDF with Unique Code      │ • Standard Static PDF       │
│ SuperAdmin CMS            │ ✓ Full Operations Panel     │ • LMS Courses Admin Only    │ • Basic WordPress Editor    │
│ Bilingual Support (EN/ES) │ ✓ Full 1-Click UI & Content │ • Bilingual Course Syllabus │ • Navigation Elements Only  │
│ Estimated Delivery Time   │ 8–10 Weeks                  │ 5–6 Weeks                   │ 2–3 Weeks                   │
│ Monthly Client Cloud Host │ ~$65–$145 / mo              │ ~$45–$85 / mo               │ ~$20–$40 / mo               │
│ Post-Launch Warranty      │ 30 Days Included            │ 30 Days Included            │ 30 Days Included            │
└───────────────────────────┴─────────────────────────────┴─────────────────────────────┴─────────────────────────────┘
```

---

## 📬 Client Live Feedback & Scope Adjustments Workflow

To streamline collaboration with Shining On Safety leadership:
1. **Draft Notes (`PENDING`):** Clients can draft questions or scope requests directly in the **`Live Notes & Requests`** tab.
2. **Edit & Delete:** Notes can be edited or deleted anytime prior to submission.
3. **Grouped Batch Email:** Clicking **`Send Pending to info@uanify.com`** compiles all pending items into a structured executive email draft and marks them as **`SENT`** with a batch ID.

---

## 🔒 Developer Protections & Strict Scope Boundaries

To prevent scope creep and guarantee contract integrity, the following boundaries are formally established:

| Boundary Area | Developer Responsibility (Uanify) | Client Responsibility (Shining On Safety) |
| :--- | :--- | :--- |
| **Course Videos** | Build LMS streaming architecture, player, and quiz engine. | Provide final recorded, edited video files and curriculum assets. |
| **Credentials** | Generate digital PDF certificates with verifiable QR codes & validation cloud URLs. | Physical printing of hardhat stickers or plastic wallet cards. |
| **Cloud Hosting** | Architecture setup, environment provisioning, and deployment. | Monthly direct billing for VPS, MongoDB Atlas, and AWS S3 accounts. |
| **Payment Gateway** | Integration with Square Web Payments SDK (256-bit tokenization). | Payment processing fees (2.9% + 30¢ per transaction) deducted by Square. |
| **Warranty & SLA** | 30 days of post-launch bugfix support, monitoring, and staff onboarding. | Optional ongoing maintenance retainers ($120–$750/mo depending on tier). |

---

## 🛠️ Local Development & Production Deployment

### Prerequisites
* Node.js 18+ or 20+
* npm or pnpm

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/Uanify/sos-ecosystem-prototype.git
cd sos-ecosystem-prototype

# 2. Install dependencies
npm install

# 3. Start local development server (Vite)
npm run dev

# 4. Type check and build production bundle
npm run build
```

### Netlify Deployment
This repository includes `netlify.toml` and `public/_redirects` for Single Page Application (SPA) routing:
1. Push commits to `origin/master`.
2. Netlify builds the `dist/` bundle automatically via GitHub CI/CD.

---

## 💡 Code Reusability for Final Production Platform

**Can this codebase be migrated into the final production platform?**  
**YES.** 

* **Type-Safe Data Models:** `src/data/content.ts` defines the exact schema needed for database seeding (PostgreSQL / MongoDB).
* **State & Cart Logic:** `src/App.tsx` and `src/components/CheckoutDrawer.tsx` contain the exact state transitions for Square API tokenization and enrollment webhooks.
* **LMS Quiz Logic:** `src/components/UniversityView.tsx` features the complete question evaluation algorithm (80% passing threshold) and certificate rendering pipeline.
* **Brand Design System:** `src/index.css` provides the official SOS Royal Blue (`#0066FF`), Sky Blue (`#38BDF8`), and Deep Navy (`#07132B`) tokens and layout utilities.
