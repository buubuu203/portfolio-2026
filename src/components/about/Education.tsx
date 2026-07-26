import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { education, publication, honors } from "@/content/profile";

export function Education() {
  return (
    <Section className="border-t border-foreground/10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <Reveal>
          <h2 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">
            Where I
            <br />
            studied.
          </h2>
        </Reveal>

        <div className="max-w-2xl">
          <Reveal>
            <div className="flex flex-col gap-1 pb-6 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-lg font-medium">{education.degree}</p>
                <p className="text-foreground/60">{education.school}</p>
              </div>
              <p className="text-sm text-foreground/60">{education.period}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>GPA {education.gpa}</Badge>
              <Badge>{education.thesis}</Badge>
              <Badge>{education.ielts}</Badge>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <p className="text-sm uppercase tracking-widest text-foreground/50">Publication</p>
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 block w-fit"
              >
                <p className="inline-flex items-center gap-1.5 text-lg font-medium underline decoration-foreground/20 underline-offset-4 transition-colors group-hover:decoration-foreground">
                  {publication.title}
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
                </p>
                <p className="text-foreground/60">{publication.venue}</p>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10">
              <p className="text-sm uppercase tracking-widest text-foreground/50">Honors & Awards</p>
              <div className="mt-4 flex flex-col gap-5">
                {honors.map((honor) =>
                  honor.url ? (
                    <a
                      key={honor.title}
                      href={honor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-fit"
                    >
                      <p className="inline-flex items-center gap-1.5 text-lg font-medium underline decoration-foreground/20 underline-offset-4 transition-colors group-hover:decoration-foreground">
                        {honor.title}
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
                      </p>
                      <p className="text-foreground/60">{honor.org}</p>
                      <p className="text-sm text-foreground/60">
                        {honor.date}
                        {honor.detail ? ` · ${honor.detail}` : ""}
                      </p>
                    </a>
                  ) : (
                    <div key={honor.title}>
                      <p className="text-lg font-medium">{honor.title}</p>
                      <p className="text-foreground/60">{honor.org}</p>
                      <p className="text-sm text-foreground/60">
                        {honor.date}
                        {honor.detail ? ` · ${honor.detail}` : ""}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
