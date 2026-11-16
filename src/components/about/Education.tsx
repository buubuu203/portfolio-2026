import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { education, publication, honors } from "@/content/profile";

export function Education() {
  return (
    <Section id="education">
      <Reveal>
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center gap-2.5">
            <span className="squircle squircle-md">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                <path d="M2 9l10-5 10 5-10 5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Education</span>
          </div>
          <h2
            className="font-bold"
            style={{ margin: 0, fontSize: "clamp(32px, 8.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.07 }}
          >
            Where I studied.
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="inline-flex flex-none items-center justify-center"
              style={{
                width: 60,
                minWidth: 60,
                height: 60,
                padding: 6,
                boxSizing: "border-box",
                borderRadius: 17,
                background: "#fff",
                boxShadow: "0 1px 0 rgba(255,255,255,.9) inset, 0 8px 18px rgba(0,0,0,.12)",
              }}
            >
              <Image
                src="/images/uit-logo.png"
                alt="UIT logo"
                width={697}
                height={620}
                className="block h-[42px] w-auto"
                loading="eager"
              />
            </div>
            <p className="flex-1 text-[var(--text-secondary)]" style={{ margin: 0, fontSize: "clamp(16px, 2.5vw, 22px)", lineHeight: 1.4, minWidth: "min(300px, 100%)" }}>
              <strong>{education.degree}</strong> — University of Information Technology (VNU-HCM), 2021 – Jun 2025.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9 flex flex-wrap gap-6">
          {/* Academics */}
          <div className="flex flex-1 flex-col gap-2.5" style={{ flexBasis: 380, minWidth: 0 }}>
            <p className="ml-[18px] text-[13px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: "0 0 0 18px" }}>Academics</p>
            <div className="glass overflow-hidden" style={{ borderRadius: "var(--radius-inner)" }}>
              <Row
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V9M10 19V5M16 19v-7M21 19H3" /></svg>}
                gradient="dark"
                label="GPA"
                value="8.83/10"
                bar={88.3}
              />
              <Row
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h5" /></svg>}
                gradient="light"
                label="Senior thesis"
                value="9.7/10"
                bar={97}
              />
              <Row
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>}
                gradient="dark"
                label="IELTS"
                value="6.5/9"
                bar={72.2}
              />
              <Row
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></svg>}
                gradient="light"
                label="Top Valedictorian · E-Commerce, Sep 2021"
                value="29.9"
                bar={99.7}
              />
            </div>
          </div>

          {/* Recognition */}
          <div className="flex flex-1 flex-col gap-2.5" style={{ flexBasis: 380, minWidth: 0 }}>
            <p className="ml-[18px] text-[13px] font-semibold uppercase tracking-[.05em] text-[var(--text-secondary)]" style={{ margin: "0 0 0 18px" }}>Recognition</p>
            <div className="glass overflow-hidden" style={{ borderRadius: "var(--radius-inner)" }}>
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="settings-row spring-hover text-[var(--text-primary)]"
              >
                <span className="squircle squircle-sm" style={{ background: "linear-gradient(145deg,#5c5c63,#1d1d1f)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M9 9h6M9 13h6" /></svg>
                </span>
                <span className="flex-1">
                  <span className="block text-[13px] text-[var(--text-secondary)]">Publication</span>
                  <span className="block text-[17px]">{publication.title} · {publication.venue}</span>
                </span>
                <span className="text-[20px] text-[var(--text-tertiary)]" aria-hidden>›</span>
              </a>
              <a
                href={honors[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="settings-row spring-hover text-[var(--text-primary)]"
              >
                <span className="squircle squircle-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 13v4M8 20h8" /></svg>
                </span>
                <span className="flex-1">
                  <span className="block text-[13px] text-[var(--text-secondary)]">Honors &amp; Awards</span>
                  <span className="block text-[17px]"><strong>First place</strong>, AISC2023</span>
                </span>
                <span className="text-[20px] text-[var(--text-tertiary)]" aria-hidden>›</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Row({ icon, gradient, label, value, bar }: {
  icon: React.ReactNode;
  gradient: "dark" | "light";
  label: string;
  value: string;
  bar?: number;
}) {
  const bg = gradient === "dark"
    ? "linear-gradient(145deg,#5c5c63,#1d1d1f)"
    : "linear-gradient(145deg,#7a7a82,#2c2c30)";

  return (
    <div className="settings-row">
      <span className="squircle squircle-sm" style={{ background: bg }}>
        {icon}
      </span>
      <span className="flex-1" style={{ minWidth: 0 }}>
        <span className="block text-[17px]">{label}</span>
        {bar != null && (
          <span className="bar"><i style={{ "--w": `${bar}%` } as React.CSSProperties} /></span>
        )}
      </span>
      <span className="tabular-nums text-[17px] text-[var(--text-secondary)]">{value}</span>
    </div>
  );
}
