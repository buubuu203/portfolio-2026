import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { identity } from "@/content/profile";
import { Highlights } from "@/components/about/Highlights";
import { ProfilePhoto } from "@/components/about/ProfilePhoto";
import { Narrative } from "@/components/about/Narrative";
import { Education } from "@/components/about/Education";
import { Skills } from "@/components/about/Skills";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_640px]">
          <div>
            <p className="text-sm uppercase tracking-widest text-foreground/60">
              {identity.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl font-black tracking-tight text-6xl leading-none sm:text-8xl">
              {identity.heroHeadline}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-foreground/60 sm:text-xl">
              {identity.heroSubhead}
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-foreground/60">
              <span>{identity.name}</span>
              <span aria-hidden>·</span>
              <span>{identity.location}</span>
            </div>
          </div>

          <ProfilePhoto src="/images/profile.png" alt={identity.name} />
        </div>
      </Section>

      <Highlights />
      <Narrative />
      <Education />
      <Skills />
    </>
  );
}
