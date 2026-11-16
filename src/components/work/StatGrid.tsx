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
        <RevealGroup className="mb-8 sm:mb-10">
          <RevealItem>
            <p
              className="font-bold tabular-nums tracking-tight"
              style={{ fontSize: "clamp(40px, 5.5vw, 60px)", letterSpacing: "-0.03em", lineHeight: 1 }}
            >
              <AnimatedCounter
                value={targetMetric.value}
                prefix={targetMetric.prefix}
                suffix={targetMetric.suffix ? ` ${targetMetric.suffix}` : ""}
              />
            </p>
            <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">{targetMetric.label}</p>
            <div className="mt-5 max-w-sm sm:mt-6">
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
          className={`grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 ${
            targetMetric ? "border-t border-[var(--text-tertiary)]/10 pt-6 sm:pt-8" : ""
          }`}
        >
          {secondaryMetrics.map((metric) => (
            <RevealItem key={metric.label}>
              <p
                className="font-bold tabular-nums tracking-tight"
                style={{ fontSize: "clamp(28px, 4vw, 36px)", letterSpacing: "-0.03em", lineHeight: 1 }}
              >
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix ? ` ${metric.suffix}` : ""}
                />
              </p>
              <p className="mt-2 text-[13px] text-[var(--text-tertiary)]">{metric.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
