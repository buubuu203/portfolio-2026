import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CvPreview } from "@/components/about/CvPreview";

export function CvSection() {
  return (
    <Section id="cv">
      <Reveal>
        <div className="flex items-center gap-2.5">
          <span className="squircle squircle-md">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path d="M6 3h9l4 4v14H6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 3v5h5M9 13h7M9 17h5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">
            Résumé
          </span>
        </div>
        <h2
          className="mt-[14px] font-bold"
          style={{ fontSize: "clamp(32px, 8.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.07 }}
        >
          The one-page CV.
        </h2>
        <p className="mt-[14px] max-w-[760px] text-[var(--text-secondary)]" style={{ fontSize: "clamp(16px, 2.5vw, 22px)", lineHeight: 1.4 }}>
          Everything above on a single page — preview it here, or download the PDF.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="glass spring-hover mt-9 flex flex-wrap items-center gap-6"
          style={{ borderRadius: "var(--radius-card)", padding: "clamp(22px, 4vw, 36px)" }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            className="spring-hover block overflow-hidden"
            style={{
              flex: "0 1 340px",
              minWidth: 0,
              borderRadius: 14,
              background: "#fff",
              boxShadow: "0 2px 0 rgba(255,255,255,.9) inset, 0 24px 50px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.06)",
            }}
            aria-label="Open CV preview in a new tab"
          >
            <CvPreview />
          </a>

          <div style={{ flex: "1 1 280px", minWidth: 0 }} className="flex flex-col gap-[22px]">
            <p className="text-[15px] text-[var(--text-secondary)]" style={{ margin: 0 }}>
              PDF · 1 page · Associate Product Manager · English
            </p>

            <ul className="flex flex-col gap-3 text-[18px] leading-[1.4]" style={{ margin: 0, padding: 0, listStyle: "none" }}>
              <li><strong>238 bn VND</strong> GMV — 159% of annual target</li>
              <li><strong>8 bn+ VND</strong> revenue · <strong>~99k</strong> accounts</li>
              <li><strong>30+ features</strong>, 96 events, 52 partners</li>
              <li><strong>100+ user stories</strong> across 8 sprint releases</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download="ChauNgocBuuDang_APM_General.pdf"
                className="spring-hover inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-[13px] text-[17px] font-semibold text-white"
                style={{ boxShadow: "0 10px 24px rgba(0,0,0,.25)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden>
                  <path d="M12 4v11M7 11l5 5 5-5M5 20h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="glass spring-hover inline-flex items-center gap-1.5 rounded-full px-6 py-[13px] text-[17px] font-semibold text-[var(--text-primary)]"
              >
                Open full size ›
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
