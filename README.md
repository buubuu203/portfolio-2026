# Portfolio 2026

Personal portfolio site for Chau Ngoc Buu Dang — Associate Product Manager.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in EmailJS credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The contact form uses [EmailJS](https://www.emailjs.com/) to send messages client-side. Copy
`.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_RECEIVE`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTOREPLY`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

The `/fit-check` page uses the [Gemini API](https://aistudio.google.com/apikey) (free tier) server-side to compare
a pasted job description against `src/content/profile.ts`. Fill in:

- `GEMINI_API_KEY` — server-only, never exposed to the client

**Deploying:** all of the above must also be added to your host's environment variables (e.g. Vercel Project
Settings → Environment Variables) — `.env.local` is git-ignored and never reaches production on its own. Since
`NEXT_PUBLIC_*` vars are inlined at build time, adding or changing one requires a fresh deploy to take effect.

## Structure

- `src/app` — routes (About, Work, Blog, Fit Check, Contact)
- `src/app/api/fit-check` — route handler that calls Gemini and returns a structured fit analysis
- `src/components` — UI, layout, and section components
- `src/content/profile.ts` — all site copy and data (identity, experience, skills, honors)
- `src/lib/fitCheck.ts` — shared types, prompt, and response schema for the fit-check feature

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint
