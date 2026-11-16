import Image from "next/image";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import type { Experience } from "@/content/profile";
import { renderRichText } from "@/lib/richText";

export function ExperienceCard({ experience }: { experience: Experience }) {
  const isCakeLogo = experience.markImage?.src.includes("cake") ?? false;
  const isMindxLogo = experience.markImage?.src.includes("mindx") ?? false;
  const isWideLogo = isCakeLogo || isMindxLogo;
  const roleMatch = experience.role.match(/^(.+?)(?:\s*\((.+?)\))?$/);
  const mainRole = roleMatch?.[1] ?? experience.role;
  const roleNote = roleMatch?.[2];

  return (
    <Reveal>
      <article
        className="glass spring-lift"
        style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 3vw, 36px)", display: "flex", flexDirection: "column", gap: 24 }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 20px", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", minWidth: 0 }}>
            <div
              style={{
                flex: "none",
                width: isWideLogo ? undefined : 60,
                minWidth: 60,
                height: 60,
                padding: isWideLogo ? "0 14px" : 6,
                boxSizing: "border-box",
                borderRadius: 18,
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 0 rgba(255,255,255,.9) inset, 0 8px 18px rgba(0,0,0,.14)",
              }}
            >
              {experience.markImage ? (
                <Image
                  src={experience.markImage.src}
                  alt={experience.markImage.alt}
                  width={experience.markImage.width}
                  height={experience.markImage.height}
                  loading="eager"
                  style={{ height: isWideLogo ? 22 : 40, width: "auto", maxWidth: isWideLogo ? 90 : 48, display: "block" }}
                />
              ) : (
                <span style={{ fontSize: 22, fontWeight: 700 }}>{experience.mark}</span>
              )}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ margin: 0, fontSize: "clamp(22px, 5vw, 28px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.025em" }}>
                {mainRole}
              </h3>
              <p style={{ margin: "4px 0 0", fontSize: 17, color: "var(--text-secondary)" }}>
                {experience.company}{roleNote ? ` · ${roleNote}` : ""}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
              {experience.period}
            </span>
            <span
              style={{
                background: "#1d1d1f",
                color: "#fff",
                borderRadius: 999,
                padding: "7px 14px",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {experience.title}
            </span>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: "clamp(17px, 3vw, 20px)", lineHeight: 1.5, color: "var(--text-secondary)" }}>
          {renderRichText(experience.summary)}
        </p>

        {experience.metrics.length > 0 && (
          <div className="work-metric-grid">
            {experience.metrics.map((metric) => (
              <div
                key={metric.label}
                className="glass spring-hover work-metric-tile"
                style={{
                  borderRadius: 28,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  overflow: "hidden",
                }}
              >
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--text-secondary)" }}>{metric.label}</p>
                <p style={{ margin: "8px 0 0", fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.04em" }}>
                  <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </p>
                {metric.description && (
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--text-secondary)" }}>{metric.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {experience.partners && experience.partners.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" as const, color: "var(--text-secondary)" }}>
              Partners &amp; platform integrations
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {experience.partners.map((partner) => (
                <span key={partner.name} className="chip">
                  {partner.logo && (
                    <Image
                      src={partner.logo.src}
                      alt={partner.showName ? "" : partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      loading="eager"
                      style={{ width: "auto", height: 20, maxWidth: 88, objectFit: "contain" }}
                    />
                  )}
                  {(!partner.logo || partner.showName) && partner.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {experience.highlights.map((item, i) => (
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

        {experience.links && experience.links.length > 0 && (
          <div className="glass" style={{ borderRadius: 24, overflow: "hidden" }}>
            {experience.links.map((link, i) => (
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
  );
}
