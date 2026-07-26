import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { skills } from "@/content/profile";

const groups: { label: string; items: string[] }[] = [
  { label: "Methods", items: skills.methods },
  { label: "Tools", items: skills.tools },
  { label: "Languages", items: skills.languages },
];

export function Skills() {
  return (
    <Section className="border-t border-foreground/10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <Reveal>
          <h2 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">
            What I
            <br />
            work with.
          </h2>
        </Reveal>

        <div className="max-w-2xl space-y-10">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="text-sm uppercase tracking-widest text-foreground/50">{group.label}</p>
              <RevealGroup className="mt-4 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <RevealItem key={item}>
                    <Badge className={group.label === "Tools" ? "gap-1.5" : undefined}>
                      {group.label === "Tools" && <Icon name={item} className="text-foreground/60" />}
                      {item}
                    </Badge>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
