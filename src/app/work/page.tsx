import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ExperienceCard } from "@/components/work/ExperienceCard";
import { experience } from "@/content/profile";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Product experience across fintech and platform businesses: Cake by VPBank's CTicket Platform, KYC & Digital Onboarding, and Elite Fitness FTISU.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work — Chau Ngoc Buu Dang",
    description:
      "Product experience across fintech and platform businesses: Cake by VPBank's CTicket Platform, KYC & Digital Onboarding, and Elite Fitness FTISU.",
    url: "/work",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <>
      <Section className="pt-16">
        <p className="text-sm uppercase tracking-widest text-foreground/60">Work</p>
        <h1 className="mt-4 font-black tracking-tight text-6xl leading-none sm:text-8xl">
          Experience.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-foreground/60 sm:text-xl">
          Two roles and a self-directed university project, one throughline: own the product,
          ship fast, and move the numbers that mattered.
        </p>
      </Section>

      <Section className="border-t border-foreground/10 pt-0">
        {experience.map((role) => (
          <ExperienceCard key={role.slug} experience={role} />
        ))}
      </Section>
    </>
  );
}
