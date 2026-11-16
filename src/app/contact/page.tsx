import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { identity } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Chau Ngoc Buu Dang — open to product, BA, and technical APM roles across fintech, e-commerce, and platform businesses.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Chau Ngoc Buu Dang",
    description:
      "Get in touch with Chau Ngoc Buu Dang — open to product, BA, and technical APM roles across fintech, e-commerce, and platform businesses.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Chau Ngoc Buu Dang",
    description:
      "Get in touch with Chau Ngoc Buu Dang — open to product, BA, and technical APM roles across fintech, e-commerce, and platform businesses.",
  },
};

export default function ContactPage() {
  return (
    <Section id="contact">
      {/* ── Header: full-width above columns ── */}
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 flex-none items-center justify-center"
          style={{ borderRadius: 11, background: "linear-gradient(145deg,#7a7a82,#2c2c30)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Contact</span>
      </div>
      <h1
        className="mt-[14px] font-bold"
        style={{ fontSize: "clamp(44px, 10.5vw, 80px)", letterSpacing: "-0.035em", lineHeight: 1.03 }}
      >
        Let&apos;s talk.
      </h1>
      <p className="mt-[14px] max-w-[760px] text-[var(--text-secondary)]" style={{ fontSize: "clamp(16px, 2.5vw, 24px)", lineHeight: 1.4 }}>
        Open to product, BA and technical APM roles. Send a message, or reach me directly.
      </p>

      {/* ── Two-column row ── */}
      <div className="mt-9 flex flex-wrap gap-6" style={{ alignItems: "flex-start" }}>
        {/* LEFT: links card + location */}
        <div className="flex w-full flex-col gap-5 lg:w-auto lg:flex-1">
          <div className="glass overflow-hidden" style={{ borderRadius: "var(--radius-inner)" }}>
            <a href={`mailto:${identity.email}`} className="settings-row spring-hover text-[var(--text-primary)]">
              <span className="squircle squircle-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7l8 6 8-6" /></svg>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[17px] font-semibold">Email</span>
                <span className="block text-[13px] text-[var(--text-secondary)]" style={{ overflowWrap: "anywhere" }}>{identity.email}</span>
              </span>
              <span className="text-[20px] text-[var(--text-tertiary)]" aria-hidden>›</span>
            </a>
            <a href={`tel:${identity.phone.replace(/[^+\d]/g, "")}`} className="settings-row spring-hover text-[var(--text-primary)]">
              <span className="squircle squircle-sm" style={{ background: "linear-gradient(145deg,#5c5c63,#1d1d1f)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[17px] font-semibold">Phone</span>
                <span className="block text-[13px] text-[var(--text-secondary)]">{identity.phone}</span>
              </span>
              <span className="text-[20px] text-[var(--text-tertiary)]" aria-hidden>›</span>
            </a>
            <a href={identity.linkedin} target="_blank" rel="noreferrer" className="settings-row spring-hover text-[var(--text-primary)]">
              <span className="squircle squircle-sm">
                <span className="text-[13px] font-bold text-white">in</span>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[17px] font-semibold">LinkedIn</span>
                <span className="block text-[13px] text-[var(--text-secondary)]">linkedin.com/in/dangchau2003</span>
              </span>
              <span className="text-[20px] text-[var(--text-tertiary)]" aria-hidden>›</span>
            </a>
            <a href="/resume.pdf" download="ChauNgocBuuDang_APM_General.pdf" className="settings-row spring-hover text-[var(--text-primary)]">
              <span className="squircle squircle-sm" style={{ background: "linear-gradient(145deg,#5c5c63,#1d1d1f)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[17px] font-semibold">Download CV</span>
                <span className="block text-[13px] text-[var(--text-secondary)]">PDF · Associate Product Manager</span>
              </span>
              <span className="text-[20px] text-[var(--text-tertiary)]" aria-hidden>›</span>
            </a>
          </div>
          <p className="text-[15px] text-[var(--text-secondary)]" style={{ margin: 0 }}>
            Based in Ho Chi Minh City, Vietnam.
          </p>
        </div>

        {/* RIGHT: form card */}
        <div className="glass w-full lg:flex-1" style={{ borderRadius: 36, padding: 32, flex: "1 1 440px" }}>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
