import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { experience, identity } from "@/content/profile";

export function Highlights() {
  const current = experience[0];
  const stats = current.metrics.slice(0, 3);

  return (
    <Section className="border-t border-foreground/10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <Reveal>
          <h2 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">
            What I&apos;ve
            <br />
            shipped.
          </h2>
        </Reveal>

        <div className="max-w-2xl">
          <Reveal>
            <p className="text-lg text-foreground/70">
              As {identity.heroEyebrow} at {current.company}, I&apos;m {current.summary.charAt(0).toLowerCase()}
              {current.summary.slice(1)}
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {stats.map((metric) => (
              <RevealItem key={metric.label}>
                <p className="font-black tracking-tight text-3xl sm:text-4xl">
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix ? ` ${metric.suffix}` : ""}
                  />
                </p>
                <p className="mt-2 text-sm text-foreground/60">{metric.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <Link
              href="/work"
              className="group mt-10 inline-flex items-center gap-1.5 text-lg font-medium underline decoration-foreground/20 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              See full work history
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              >
                <path
                  d="M3 9L9 3M9 3H4M9 3V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
