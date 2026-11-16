import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ExperienceCard } from "@/components/work/ExperienceCard";
import { experience, projects } from "@/content/profile";
import { renderRichText } from "@/lib/richText";

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
  twitter: {
    card: "summary_large_image",
    title: "Work — Chau Ngoc Buu Dang",
    description:
      "Product experience across fintech and platform businesses: Cake by VPBank's CTicket Platform, KYC & Digital Onboarding, and Elite Fitness FTISU.",
  },
};

export default function WorkPage() {
  return (
    <>
      <Section>
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="squircle squircle-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="3" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
            </span>
            <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Work</span>
          </div>
          <h1
            className="mt-[14px] font-bold"
            style={{ fontSize: "clamp(40px, 10.5vw, 80px)", letterSpacing: "-0.035em", lineHeight: 1.03 }}
          >
            Work.
          </h1>
          <p className="mt-[14px] max-w-[760px] text-[var(--text-secondary)]" style={{ fontSize: "clamp(16px, 2.5vw, 24px)", lineHeight: 1.4 }}>
            From fintech product ownership at Cake by VPBank to teaching coding at MindX — shipping fast and moving the metrics that matter.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="flex flex-col gap-7">
          {experience.map((role) => (
            <ExperienceCard key={role.slug} experience={role} />
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="flex items-center gap-2.5">
            <span className="squircle squircle-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </span>
            <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Projects</span>
          </div>
          <h2
            className="mt-[14px] font-bold"
            style={{ fontSize: "clamp(32px, 8.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.07 }}
          >
            Projects.
          </h2>
        </Reveal>

        <div className="mt-7 flex flex-col gap-7">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <article
                className="glass spring-lift"
                style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 3vw, 36px)", display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 20px", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center", minWidth: 0 }}>
                    {project.markImage && (
                      <div
                        style={{
                          flex: "none",
                          width: 60,
                          minWidth: 60,
                          height: 60,
                          padding: 6,
                          boxSizing: "border-box",
                          borderRadius: 18,
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 1px 0 rgba(255,255,255,.9) inset, 0 8px 18px rgba(0,0,0,.14)",
                        }}
                      >
                        <Image
                          src={project.markImage.src}
                          alt={project.markImage.alt}
                          width={project.markImage.width}
                          height={project.markImage.height}
                          loading="eager"
                          style={{ height: 42, width: "auto", maxWidth: 48, display: "block" }}
                        />
                      </div>
                    )}
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ margin: 0, fontSize: "clamp(22px, 5vw, 28px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.025em" }}>
                        {project.title}
                      </h3>
                      <p style={{ margin: "4px 0 0", fontSize: 17, color: "var(--text-secondary)" }}>
                        {project.role}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(255,255,255,.3)",
                      border: "1px solid rgba(255,255,255,.6)",
                      borderRadius: 999,
                      padding: "7px 14px",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
                    {project.period}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, color: "var(--text-secondary)" }}>
                  {renderRichText(project.summary)}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {project.highlights.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div
                        style={{
                          flex: "none",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: i % 2 === 0
                            ? "linear-gradient(145deg,#7a7a82,#2c2c30)"
                            : "linear-gradient(145deg,#5c5c63,#1d1d1f)",
                          color: "#fff",
                          fontSize: 14,
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 1,
                        }}
                      >
                        {i + 1}
                      </div>
                      <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, letterSpacing: "-0.005em" }}>
                        {renderRichText(item)}
                      </p>
                    </div>
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <div className="glass" style={{ borderRadius: 24, overflow: "hidden" }}>
                    {project.links.map((link, i) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="settings-row spring-hover"
                        style={{ color: "#1d1d1f" }}
                      >
                        <span
                          className="squircle squircle-sm"
                          style={{
                            background: i % 2 === 0
                              ? "linear-gradient(145deg,#5c5c63,#1d1d1f)"
                              : "linear-gradient(145deg,#7a7a82,#2c2c30)",
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                        </span>
                        <span style={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" as const }}>
                          <span style={{ display: "block", fontSize: 17 }}>{link.label}</span>
                        </span>
                        <span style={{ fontSize: 20, color: "#55555c" }} aria-hidden="true">›</span>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
