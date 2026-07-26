import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Metric } from "@/content/profile";

export function StatGrid({ metrics }: { metrics: Metric[] }) {
  const targetMetric = metrics.find((m) => m.targetPercent);
  const secondaryMetrics = metrics.filter((m) => m !== targetMetric);

  return (
    <div>
      {targetMetric && (
        <RevealGroup className="mb-10">
          <RevealItem>
            <p className="font-black tracking-tight text-5xl sm:text-6xl">
              <AnimatedCounter
                value={targetMetric.value}
                prefix={targetMetric.prefix}
                suffix={targetMetric.suffix ? ` ${targetMetric.suffix}` : ""}
              />
            </p>
            <p className="mt-2 text-sm text-foreground/60">{targetMetric.label}</p>
            <div className="mt-6 max-w-sm">
              <ProgressBar
                percent={targetMetric.targetPercent!}
                label={`${targetMetric.label} vs. annual target`}
              />
            </div>
          </RevealItem>
        </RevealGroup>
      )}

      {secondaryMetrics.length > 0 && (
        <RevealGroup
          className={`grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 ${
            targetMetric ? "border-t border-foreground/10 pt-8" : ""
          }`}
        >
          {secondaryMetrics.map((metric) => (
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
      )}
    </div>
  );
}
