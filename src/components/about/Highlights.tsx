import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { identity } from "@/content/profile";

export function Highlights() {
  return (
    <Section id="impact">
      <div className="flex flex-col gap-9">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="squircle squircle-md">
              <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden>
                <path d="M4 19V9M10 19V5M16 19v-7M21 19H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Impact</span>
          </div>
          <h2
            className="mt-[14px] font-bold"
            style={{ fontSize: "clamp(32px, 8.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.07 }}
          >
            What I&apos;ve shipped.
          </h2>
          <p className="mt-[14px] max-w-[760px] text-[var(--text-secondary)]" style={{ fontSize: "clamp(16px, 2.5vw, 22px)", lineHeight: 1.4 }}>
            Sole Product Owner of a <strong>7-engineer</strong> Agile squad with <strong>no BA layer</strong> — owning the product from discovery to launch.
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-[6px] text-[13px] font-semibold tracking-[.02em] text-[var(--text-secondary)]"
            style={{ background: "rgba(255,255,255,.18)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            Jan 2025 – Dec 2025 · CTicket Platform
          </span>
        </Reveal>

        {/* Top 3 metric cards */}
        <RevealGroup className="impact-grid">
          <RevealItem>
            <div className="glass spring-hover flex h-full w-full flex-col gap-6" style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 3vw, 28px)" }}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px]" style={{ background: "linear-gradient(145deg,#7a7a82,#2c2c30)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 18l6-6 4 4 6-8" /></svg>
                </div>
                <span className="text-[16px] font-semibold text-[var(--text-secondary)]">GMV</span>
              </div>
              <div>
                <p className="font-bold tabular-nums" style={{ margin: 0, fontSize: "clamp(40px, 6vw, 68px)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  <AnimatedCounter value={238} />
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 600, color: "var(--accent)" }}>bn VND GMV</p>
                <p style={{ margin: "2px 0 0", fontSize: 15, color: "var(--text-secondary)" }}><strong>159%</strong> of annual target</p>
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="glass spring-hover flex h-full w-full flex-col gap-6" style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 3vw, 28px)" }}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px]" style={{ background: "linear-gradient(145deg,#5c5c63,#1d1d1f)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="8" /><path d="M12 8v8M9.5 10.5c0-1 1-1.5 2.5-1.5s2.5.6 2.5 1.6-1 1.4-2.5 1.8-2.5.8-2.5 1.8 1 1.5 2.5 1.5 2.5-.5 2.5-1.5" /></svg>
                </div>
                <span className="text-[16px] font-semibold text-[var(--text-secondary)]">Revenue</span>
              </div>
              <div>
                <p className="font-bold tabular-nums" style={{ margin: 0, fontSize: "clamp(40px, 6vw, 68px)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  <AnimatedCounter value={8} suffix="+" />
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 600, color: "var(--accent)" }}>bn VND revenue</p>
                <p style={{ margin: "2px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>CTicket platform</p>
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="glass spring-hover flex h-full w-full flex-col gap-6" style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 3vw, 28px)" }}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px]" style={{ background: "linear-gradient(145deg,#7a7a82,#2c2c30)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9" cy="9" r="3.2" /><path d="M3.5 19c.6-3 3-4.5 5.5-4.5s4.9 1.5 5.5 4.5" /><circle cx="17" cy="10" r="2.4" /><path d="M16.5 14.6c2.2 0 3.7 1.2 4.2 3.4" /></svg>
                </div>
                <span className="text-[16px] font-semibold text-[var(--text-secondary)]">Accounts</span>
              </div>
              <div>
                <p className="font-bold tabular-nums" style={{ margin: 0, fontSize: "clamp(40px, 6vw, 68px)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  ~<AnimatedCounter value={99} suffix="k" />
                </p>
                <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 600, color: "var(--accent)" }}>accounts</p>
                <p style={{ margin: "2px 0 0", fontSize: 15, color: "var(--text-secondary)" }}>across 96 events</p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>

        {/* Stat strip card */}
        <Reveal delay={0.15}>
          <div className="glass spring-lift flex flex-wrap gap-8" style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 4vw, 36px)", gap: "clamp(16px, 2vw, 24px) 28px" }}>
            <StatItem label="GMV vs target" number={159} suffix="%" note={<>of the annual GMV target, <strong>+59%</strong> over</>} showBar />
            <StatItem label="Features shipped" number={30} suffix="+" note="zero critical post-release incidents" />
            <StatItem label="Events" number={96} note="live on the platform" />
            <StatItem label="Partners" number={52} note="onboarded and supported" />
          </div>
        </Reveal>

        {/* 2026 highlights */}
        <Reveal delay={0.2}>
          <span
            className="mb-[-4px] inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-[6px] text-[13px] font-semibold tracking-[.02em] text-[var(--text-secondary)]"
            style={{ background: "rgba(255,255,255,.18)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            2026 highlights · CTicket Platform
          </span>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="glass spring-lift flex flex-wrap gap-8" style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 4vw, 36px)", gap: "clamp(16px, 2vw, 24px) 28px" }}>
            <StatItem label="Peak queue" number={126} suffix="K" note={<>concurrent in queue · <a href="https://cticket.vn/event/bigbang2026worldtourinhanoi-tickets" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 underline decoration-[var(--text-tertiary)] underline-offset-2 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]">BigBang World Tour<svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden><path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a></>} />
            <StatItem label="Peak traffic" number={2.16} suffix=" M/min" note="requests · BigBang World Tour Vietnam leg" />
            <StatItem label="Check-in" number={97.5} suffix="%" note="of 81,534 tickets across two nights" />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="/work"
            className="spring-hover inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-[13px] text-[17px] font-semibold text-white"
            style={{ boxShadow: "0 10px 24px rgba(0,0,0,.25)" }}
          >
            See full work history ›
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

function StatItem({ label, number, suffix = "", note, showBar }: {
  label: string;
  number: number;
  suffix?: string;
  note: React.ReactNode;
  showBar?: boolean;
}) {
  return (
    <div style={{ flex: "1 1 200px", minWidth: 0 }} className="flex flex-col gap-1.5">
      <p className="text-[14px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: 0 }}>{label}</p>
      <p className="font-bold tabular-nums" style={{ margin: 0, fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
        <AnimatedCounter value={number} suffix={suffix} />
      </p>
      <p className="text-[15px] leading-[1.4] text-[var(--text-secondary)]" style={{ margin: 0 }}>{note}</p>
      {showBar && (
        <div className="relative mt-3.5 pb-5">
          <span className="bar" style={{ height: 10, margin: 0 }}><i style={{ "--w": "100%" } as React.CSSProperties} /></span>
          <span className="absolute top-[-5px] h-5 w-0.5 rounded-sm bg-[var(--accent)]" style={{ left: "62.9%" }} />
          <span className="absolute text-[12px] font-semibold text-[var(--text-secondary)]" style={{ left: "62.9%", top: 18, transform: "translateX(-50%)" }}>Target</span>
          <span className="absolute right-0 text-[12px] font-semibold text-[var(--text-secondary)]" style={{ top: 18 }}>159%</span>
        </div>
      )}
    </div>
  );
}
