import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { identity } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Section className="pt-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-widest text-foreground/60">Contact</p>
          <h1 className="mt-4 font-black tracking-tight text-6xl leading-none sm:text-7xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-8 max-w-sm text-lg text-foreground/60">
            Open to product, BA, and technical APM roles. Send a message, or reach me directly.
          </p>

          <div className="mt-10 flex flex-col gap-3 text-foreground/70">
            <a href={`mailto:${identity.email}`} className="flex w-fit items-center gap-2.5 hover:text-accent">
              <Icon name="Email" className="h-4 w-4" />
              {identity.email}
            </a>
            <a
              href={`tel:${identity.phone.replace(/[^+\d]/g, "")}`}
              className="flex w-fit items-center gap-2.5 hover:text-accent"
            >
              <Icon name="Phone" className="h-4 w-4" />
              {identity.phone}
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-2.5 hover:text-accent"
            >
              <Icon name="LinkedIn" className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
