import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FitCheckForm } from "@/components/fit-check/FitCheckForm";
import { identity } from "@/content/profile";

export const metadata: Metadata = {
  title: "Fit Check",
  description: `Paste a job description and get an AI-generated read on how it lines up with ${identity.name}'s experience.`,
  alternates: {
    canonical: "/fit-check",
  },
  openGraph: {
    title: "Fit Check — Chau Ngoc Buu Dang",
    description: `Paste a job description and get an AI-generated read on how it lines up with ${identity.name}'s experience.`,
    url: "/fit-check",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit Check — Chau Ngoc Buu Dang",
    description: `Paste a job description and get an AI-generated read on how it lines up with ${identity.name}'s experience.`,
  },
};

export default function FitCheckPage() {
  return (
    <Section className="pt-6 sm:pt-10">
      <Reveal>
        <div className="flex items-center gap-2.5">
          <span className="squircle squircle-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M8 12.5l2.7 2.7L16 9.5" /></svg>
          </span>
          <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">AI Fit Check</span>
        </div>
        <h1
          className="mt-3 font-bold sm:mt-4"
          style={{ fontSize: "clamp(32px, 8.5vw, 80px)", letterSpacing: "-0.035em", lineHeight: 1.03 }}
        >
          Is this role a fit?
        </h1>
        <p className="mt-6 max-w-[760px] text-[var(--text-secondary)] sm:mt-8" style={{ fontSize: "clamp(16px, 2.5vw, 24px)", lineHeight: 1.4 }}>
          Paste a job description. An AI model reads it against my real experience and answers straight — including where it does not line up.
        </p>
      </Reveal>

      <div className="mt-8 sm:mt-10">
        <FitCheckForm />
      </div>
    </Section>
  );
}
