# Shining On Safety (SOS) — Unified Digital Ecosystem Interactive Prototype

**Client:** Melanie Jaime & Executive Team — Shining On Safety  
**Project:** Unified 3-in-1 Platform Modernization (Marketing Landing + E-Commerce Gear Store + Safety University LMS)  
**Developed by:** [Uanify](https://github.com/Uanify)  

---

## 🚀 Live Prototype Features

* **Executive 3-Tier Mode Switcher:** Instant visual comparison of **Option 1 ($18.5k Recommended)**, **Option 2 ($11.8k Core)**, and **Option 3 ($4.8k Sprint)**.
* **OSHA Jobsite Risk Scorecard (Lead Magnet):** Live 5-question interactive compliance quiz with dynamic risk scoring and lead routing.
* **Certified Course Catalog ($180–$349):** Expandable syllabus drawers, verified instructor profiles, and video lesson previews.
* **1-Step Mobile Optimized Checkout:** Seamless checkout simulation with Square tokenization and PPE gear cross-sell bundling (-15%).
* **Safety Equipment E-Commerce Store:** Full-body harnesses, helmets, vests, and shock-absorbing lanyards.
* **B2B Corporate Retainer Portal ($27k–$160k):** Interactive workforce size calculator, ROI estimator, and live Company Admin Dashboard with employee compliance gauges (30/60/90 days).
* **Tamper-Proof QR Certificate Verification:** Simulated instant certificate lookup and verification.
* **SuperAdmin CMS Live Demo:** Interactive price and course editor giving Melanie 100% operational self-management.
* **Real-time Bilingual Toggle:** English / Spanish interface.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Netlify Deployment

This project is pre-configured with `netlify.toml` and `public/_redirects` for automatic Single Page App (SPA) routing on Netlify.

### Option A: Via GitHub Continuous Deployment (Recommended)
1. Push this repository to GitHub: `https://github.com/Uanify/sos-ecosystem-prototype`
2. Connect the repository in your [Netlify Dashboard](https://app.netlify.com/).
3. Netlify will auto-detect settings (`npm run build`, `dist` directory) and deploy instantly.

### Option B: Via Netlify CLI
```bash
npx netlify deploy --prod --dir=dist
```
