import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Narrative() {
  return (
    <Section id="journey">
      <Reveal>
        <div className="flex items-center gap-2.5">
          <span className="squircle squircle-md">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <circle cx="6" cy="18" r="2" stroke="white" strokeWidth="2" />
              <circle cx="18" cy="6" r="2" stroke="white" strokeWidth="2" />
              <path d="M6 16c0-5 12-3 12-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Journey</span>
        </div>
        <h2
          className="mt-[14px] font-bold"
          style={{ fontSize: "clamp(32px, 8.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.07 }}
        >
          How I got here.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9 flex flex-col" style={{ gap: 20 }}>
          <div
            className="inline-flex items-center justify-center"
            style={{
              minWidth: 56,
              height: 56,
              padding: "0 14px",
              boxSizing: "border-box",
              borderRadius: 17,
              background: "#fff",
              boxShadow: "0 1px 0 rgba(255,255,255,.9) inset, 0 8px 18px rgba(0,0,0,.12)",
              alignSelf: "flex-start",
            }}
          >
            <Image
              src="/images/cake-logo.png"
              alt="Cake logo"
              width={2291}
              height={610}
              className="block h-5 w-auto"
              loading="eager"
            />
          </div>
          <div className="glass spring-lift flex flex-col" style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 4vw, 36px)" }}>
          {/* Step 1: The start */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="mt-1.5 h-4 w-4 rounded-full bg-[#b4b4bb]" />
              <div className="w-0.5 flex-1" style={{ background: "linear-gradient(#b4b4bb, var(--accent))", minHeight: 60 }} />
            </div>
            <div className="pb-9">
              <p className="text-[13px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: "0 0 6px" }}>The start</p>
              <p className="max-w-2xl" style={{ margin: 0, fontSize: "clamp(16px, 2.5vw, 22px)", lineHeight: 1.4, letterSpacing: "-0.005em" }}>
                I started as a <strong>Product Owner Intern</strong> on the <strong>KYC &amp; Digital Onboarding</strong> team (Jun 2024 – Feb 2025).
              </p>
            </div>
          </div>

          {/* Step 2: The step up */}
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="mt-1.5 h-4 w-4 rounded-full bg-[var(--accent)]" style={{ boxShadow: "0 0 0 6px rgba(0,0,0,.14)" }} />
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: "0 0 6px" }}>The step up</p>
              <p className="max-w-2xl" style={{ margin: 0, fontSize: "clamp(16px, 2.5vw, 22px)", lineHeight: 1.4, letterSpacing: "-0.005em" }}>
                Promoted to <strong>Associate Technical Product Manager</strong> (Mar 2025), I took over the <strong>CTicket Platform</strong> as sole PO.
              </p>
            </div>
          </div>
        </div>
        </div>
      </Reveal>
    </Section>
  );
}
