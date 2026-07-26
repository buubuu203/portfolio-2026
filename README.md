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

## Structure

- `src/app` — routes (About, Work, Blog, Contact)
- `src/components` — UI, layout, and section components
- `src/content/profile.ts` — all site copy and data (identity, experience, skills, honors)

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — lint
