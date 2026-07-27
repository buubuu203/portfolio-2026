import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
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
};

export default function FitCheckPage() {
  return (
    <Section className="pt-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-foreground/60">AI Fit Check</p>
        <h1 className="mt-4 font-black tracking-tight text-5xl leading-none sm:text-6xl">
          Is this role a fit?
        </h1>
        <p className="mt-8 text-lg text-foreground/60">
          Paste a job description below. An AI model reads it against my actual experience and gives you a
          straight answer — including where it doesn&apos;t line up.
        </p>

        <div className="mt-12">
          <FitCheckForm />
        </div>
      </div>
    </Section>
  );
}
