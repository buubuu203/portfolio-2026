import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ExperienceCard } from "@/components/work/ExperienceCard";
import { experience } from "@/content/profile";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <>
      <Section className="pt-16">
        <p className="text-sm uppercase tracking-widest text-foreground/50">Work</p>
        <h1 className="mt-4 font-black tracking-tight text-6xl leading-none sm:text-8xl">
          Experience.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-foreground/60 sm:text-xl">
          Three roles, one throughline: own the product, ship fast, and move the numbers that
          mattered.
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
