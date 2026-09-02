# Shining On Safety (SOS) — Unified Digital Ecosystem & LMS Prototype

**Client:** Melanie Jaime & Executive Leadership — *Shining On Safety LLC*  
**Industry:** OSHA Safety Compliance, Jobsite Risk Consulting & Construction Workforce Credentialing (29 CFR 1926)  
**Architecture & Development by:** [Uanify](https://github.com/Uanify)  
**Stack:** React 19 + TypeScript + Vite + Tailwind CSS (v4) + Lucide Icons + Canvas Confetti  

---

## 📌 Executive Overview & Purpose of this Repository

This repository contains the **production-ready architecture prototype and master specification** for the full digital transformation of **Shining On Safety (SOS)**.

Currently, SOS operates across **3 fragmented web properties**:
1. Marketing Landing (`shiningonsafety.com` / WordPress Divi)
2. Safety University LMS (`university.shiningonsafety.us` / LMS Subdomain)
3. Physical PPE Equipment Store (`square.site` / External Square Store)

### 🎯 Strategic Objective:
Unify all three properties into a **singular, high-performance, mobile-first ecosystem** under `shiningonsafety.us`, automating course sales, student grading, QR-credential generation, corporate B2B retainers ($27k–$160k/yr), and self-serve business management via SuperAdmin CMS.

---

## 🏗️ Architecture & Component Blueprint (For Future Implementation / AI Continuation)

This codebase is structured with clean, decoupled modular React components that can be **directly extracted and migrated** into Next.js, Remix, Astro, or a production Node/Laravel/Django backend:

```
sos-prototype/
├── src/
│   ├── components/
│   │   ├── TierSwitcherBanner.tsx        # Executive top banner toggling Option 1 ($18.5k), Option 2 ($11.8k), Option 3 ($4.8k)
│   │   ├── Navbar.tsx                    # Responsive navigation with prominent Safety University LMS portal link & language toggle
│   │   ├── Hero.tsx                      # Construction-grade Hero with OSHA 29 CFR 1926 badges & video preview trigger
│   │   ├── CourseCatalog.tsx             # 6 OSHA accredited courses with syllabus drawers, tuition data & 1-step enrollment modal
│   │   ├── UniversityView.tsx            # Complete Academic LMS Campus simulator (Video Player, Lesson Progress, 80% Final Exam, Crew Sync)
│   │   ├── GearStore.tsx                 # Square E-Commerce PPE equipment catalog with bundle promotions (-15% discount)
│   │   ├── B2BCorporatePortal.tsx        # Interactive Workforce Slider (1-50+ workers), Retainer Quoting ($27k-$160k), Crew Dashboard
│   │   ├── CompetitiveAdvantageSection.tsx # GC Comparison Matrix vs Traditional Paper-Based Staffing Agencies
│   │   ├── RiskAssessmentModal.tsx       # 5-Question OSHA Compliance Lead Magnet Scorecard with instant grading
│   │   ├── QRVerificationModal.tsx       # 24/7 Digital QR Certificate Authenticity Validator (Public Superintendent Scanner)
│   │   ├── SuperAdminCMSModal.tsx        # Full Business CMS (Manage Courses, Tuitions, SOS Team Profiles, Orders, Coupons)
│   │   ├── CheckoutDrawer.tsx            # Universal 1-Step Mobile Checkout (Unified courses + physical gear cart with Square simulation)
│   │   ├── ProposalReferenceModal.tsx    # Strategic Proposal Document (Executive comparison, 10 projects roadmap, Live Client Notes)
│   │   ├── VideoLessonModal.tsx          # HD Video player modal for sample lesson previews
│   │   ├── SafeImage.tsx                 # Resilient image fallback wrapper for construction assets
│   │   └── Footer.tsx                    # Corporate footer with OSHA compliance disclaimers & Square 256-bit encryption badges
│   ├── data/
│   │   └── content.ts                    # Single Source of Truth: Courses, Pricing, Modules, SOS Team Directory, Corporate Tiers
│   ├── App.tsx                           # Master orchestration layer, state management, modal controllers & cart persistence
│   ├── main.tsx                          # Vite entry point
│   └── index.css                         # Brand design tokens: SOS Royal Blue (#0066FF), Sky Blue (#38BDF8), Deep Navy (#07132B)
├── public/
│   ├── _redirects                        # Netlify Single Page Application (SPA) routing rule
│   ├── logo.png                          # Official authentic Shining On Safety logo
│   └── (demo media assets)
└── netlify.toml                          # Production build and deployment configuration
```

---

## 💼 Scope Options & Investment Hierarchy

| Scope Feature | Option 1: Full Ecosystem ($18,500) | Option 2: Core LMS & Store ($11,800) | Option 3: Essential Sprint ($4,800) |
| :--- | :---: | :---: | :---: |
| **Domain Unification** | **3-in-1** (Landing + Store + LMS under `shiningonsafety.us`) | **2-in-1** (LMS + Marketing unified; Store external) | Standalone optimization (Keep 3 separated sites) |
| **E-Commerce PPE Store** | Fully Integrated In-App Cart & Checkout | External Square Store Link | External Square Store Link |
| **B2B Corporate Retainers** | Interactive Quoter + Live Crew OSHA 300A Dashboard | Corporate Plans Showcase (Manual quote inquiry) | ✕ Not in this Sprint |
| **Safety University LMS** | Streaming Player, Progress Tracker, 80% Auto-Exam | Streaming Player, 80% Auto-Exam | ✕ Not in this Sprint |
| **QR Credential Engine** | Dynamic QR Code + 24/7 Cloud Verification URL | Verified PDF Certificate with Unique ID | Standard Digital Certificate PDF |
| **SuperAdmin CMS** | Full CMS (Team, Prices, Courses, Coupons, Retainers) | LMS Admin (Courses, Tuition, Enrollment Logs) | Standard WordPress Editor |
| **Bilingual Toggle (EN/ES)** | Full 1-Click UI & Content Parity | Bilingual Course Syllabus | Bilingual Navigation Elements |
| **Delivery Timeline** | **8–10 Weeks** | **5–6 Weeks** | **2–3 Weeks** |
| **Client Monthly Hosting** | ~$65–$145/mo (VPS + Atlas Cloud DB + S3/CDN) | ~$45–$85/mo (VPS + Cloud DB) | ~$20–$40/mo (Standard VPS) |
| **Post-Launch Warranty** | **30 Days** (Bugfix, monitoring & onboarding) | **30 Days** | **30 Days** |

---

## 🔒 Scope Boundaries & Developer Protections (Crucial Context)

When implementing the production version, adhere to these strictly defined boundaries:

1. **Course Video Production:** SOS provides all final edited video files. Uanify implements the cloud streaming architecture and LMS player — **filming and production are excluded**.
2. **Physical Printing & Shipping:** The software delivers **100% digital generation** (Dynamic QR codes, tamper-proof PDF certificates, 24/7 cloud verification URLs). Physical hardhat sticker printing or plastic wallet card shipping are handled externally by SOS operations.
3. **Cloud Hosting & Gateway Fees:** Server hosting (VPS, AWS S3, MongoDB Atlas) and Square processing fees (2.9% + 30¢) are billed directly to SOS client accounts.
4. **256-Bit Encrypted Payments:** Tokenized natively via **Square Web Payments SDK**; no raw credit card data is ever stored on the application database (Zero PCI burden).

---

## 🛠️ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Compile production bundle (Type check + Vite build)
npm run build
```

---

## 🚀 Deployment

### Option A: Netlify (Pre-configured)
This repository contains `netlify.toml` and `public/_redirects`:
1. Push to GitHub (`main` branch).
2. Connect to [Netlify](https://app.netlify.com/).
3. Netlify automatically runs `npm run build` with publish directory `dist`.

### Option B: Vercel / Cloudflare Pages / Node Server
Run `npm run build` and serve the static `dist/` folder with SPA fallback to `index.html`.

---

## 💡 Production Implementation Reusability Note

> **Can this prototype code be reused for the real production website?**  
> **YES.** The entire data schema in `src/data/content.ts`, the state management flows in `App.tsx`, the responsive design tokens in `src/index.css`, the LMS quiz engine in `src/components/UniversityView.tsx`, and the SuperAdmin data interfaces in `src/components/SuperAdminCMSModal.tsx` were engineered as **clean, type-safe TypeScript modules**. They can be ported directly into the final production repository with backend API integrations (e.g., PostgreSQL/MongoDB, Square Web Payments SDK, AWS S3 / CloudFront, and SendGrid/Postmark).
