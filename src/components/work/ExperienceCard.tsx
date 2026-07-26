import { Reveal } from "@/components/ui/Reveal";
import { StatGrid } from "@/components/work/StatGrid";
import type { Experience } from "@/content/profile";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderWithLinks(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const [full, label, url] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push(text.slice(lastIndex, index));
    nodes.push(
      <a
        key={key++}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-1 underline decoration-foreground/30 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
      >
        {label}
        <svg
          width="10"
          height="10"
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
      </a>
    );
    lastIndex = index + full.length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="-mx-3 border-t border-foreground/10 px-6 py-16 transition-all duration-300 ease-out first:border-t-0 first:pt-10 hover:-translate-y-0.5 hover:bg-foreground/[0.03] sm:-mx-4 sm:px-8 lg:-mx-6 lg:px-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <Reveal>
          <p className="text-sm text-foreground/50">{experience.period}</p>
          <p className="mt-1 text-sm text-foreground/50">{experience.company}</p>
          <p className="mt-4 text-sm font-medium text-foreground/70">{experience.role}</p>
        </Reveal>

        <div className="max-w-3xl">
          <Reveal>
            <h3 className="font-black tracking-tight text-3xl sm:text-4xl">{experience.title}</h3>
            <p className="mt-4 text-lg text-foreground/70">{experience.summary}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-2">
              {experience.highlights.map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/70">
                  <span aria-hidden className="text-foreground/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{renderWithLinks(item)}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {experience.metrics.length > 0 && (
            <div className="mt-10">
              <StatGrid metrics={experience.metrics} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
