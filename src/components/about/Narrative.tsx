import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { narrative } from "@/content/profile";

export function Narrative() {
  return (
    <Section className="border-t border-foreground/10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <Reveal>
          <h2 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">
            How I
            <br />
            got here.
          </h2>
        </Reveal>
        <div className="max-w-2xl space-y-6">
          {narrative.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg text-foreground/70">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
