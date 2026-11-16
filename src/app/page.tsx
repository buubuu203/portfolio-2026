import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { identity } from "@/content/profile";
import { Highlights } from "@/components/about/Highlights";
import { ProfilePhoto } from "@/components/about/ProfilePhoto";
import { Narrative } from "@/components/about/Narrative";
import { Education } from "@/components/about/Education";
import { Skills } from "@/components/about/Skills";
import { Hobbies } from "@/components/about/Hobbies";
import { CvSection } from "@/components/about/CvSection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function AboutPage() {
  return (
    <>
      <Section id="about">
        <div className="flex flex-col items-center text-center">
          <div className="chip rise rise-delay-1">
            <span className="squircle squircle-sm text-[10px] font-bold">DC</span>
            <span className="font-medium">{identity.name}</span>
          </div>

          <div className="mt-6">
            <ProfilePhoto src="/images/profile.png" alt={identity.name} />
          </div>

          <div className="mt-5 rise rise-delay-2">
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
                <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {identity.location}
            </span>
          </div>

          <h1
            className="mt-6 max-w-[14ch] font-bold rise rise-delay-3"
            style={{
              fontSize: "clamp(40px, 10.5vw, 92px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.03,
            }}
          >
            {identity.heroHeadline}
          </h1>

          <p
            className="mt-5 max-w-[720px] font-medium text-[var(--text-secondary)] rise rise-delay-4"
            style={{ fontSize: "clamp(18px, 3vw, 26px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            {identity.heroSubhead}
          </p>

          <p
            className="mt-4 max-w-[760px] text-[var(--text-secondary)] rise rise-delay-4"
            style={{ fontSize: "clamp(16px, 2.2vw, 19px)", lineHeight: 1.5 }}
          >
            Associate Product Manager with <strong>2 years at Cake by VPBank</strong>, sole-owning a platform to <strong>159% of GMV target</strong>. Open to <strong>product, BA, and technical PM</strong> roles across fintech, e-commerce, and platform businesses.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rise rise-delay-5">
            <a
              href="/resume.pdf"
              download="ChauNgocBuuDang_APM_General.pdf"
              className="spring-hover inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-[13px] text-[17px] font-semibold text-white"
              style={{ boxShadow: "0 10px 24px rgba(0,0,0,.25)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </a>
            <a
              href="/work"
              className="glass spring-hover inline-flex items-center gap-1.5 rounded-full px-6 py-[13px] text-[17px] font-semibold text-[var(--text-primary)]"
            >
              View work ›
            </a>
          </div>

        </div>
      </Section>

      <Highlights />
      <Narrative />
      <Education />
      <Skills />
      <Hobbies />
      <CvSection />
    </>
  );
}
