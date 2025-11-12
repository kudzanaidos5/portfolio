# 🌌 Kudzanai Dhospani – Portfolio

Modern, cinematic portfolio built with Next.js, packed with motion design, interactive lighting, and polished developer storytelling.

---

## ⚡️ Overview
- **First-visit preloader** introduces the experience with a bespoke animation before revealing the site.
- **Floating navigation** keeps section anchors within reach without blocking content.
- **Experiential hero** blends call-to-action, typewriter copy, and animated sparkles.
- **Spotlight storytelling** guides readers through About, Skills, Projects, Education, References, and Contact with a tracing beam effect.
- **Micro-interactions everywhere**: cursor glow, background beams, toast feedback, and responsive layout polish.

> ✨ Designed to showcase a creative technologist—feel free to fork and tailor it to your own story.

---

## 🧰 Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-151515?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-0A7EA4?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-0066CC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-1F1F1F?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 📁 Project Highlights
- **`app/page.tsx`** orchestrates layout, lazy-loaded cursor glow, and first-visit logic.
- **Hero, About, Skills, Projects, Education, References, Contact** components live in `components/`, each tuned for storytelling and readability.
- **UI effects** (`components/ui`) ship with background beams, tracing beams, floating navbar, and more.
- **Global styling** comes from Tailwind CSS plus custom fonts via Vercel’s Geist.
- **Emails & Forms** leverage `react-hook-form`, Zod validation, and toast notifications.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run locally (http://localhost:3000)
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

---

## 🧩 Customisation Guide
- Update personal details, timelines, and copy inside the components under `components/`.
- Replace avatar, project imagery, and the `public/favicon.ico` as needed.
- Tailor animations by tweaking motion props in the UI components.
- Update meta tags and Open Graph info in `app/layout.tsx`.

---

## ✅ Roadmap Ideas
- Light/dark theme toggle sync via `next-themes`.
- Blog or case studies using the App Router’s nested routes.
- CMS integration (Contentful / Sanity) for dynamic project content.
- Performance tuning with image optimization and route-level caching.

---

## 📬 Contact
Crafted by **Kudzanai Denzel Dhospani**  
[LinkedIn](https://www.linkedin.com/) • [GitHub](https://github.com/) • [Email](mailto:hello@example.com)

> Have feedback or want to collaborate? Open an issue or drop a message.

