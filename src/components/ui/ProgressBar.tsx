"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProgressBar({
  percent,
  label,
  className,
}: {
  percent: number;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const isOverTarget = percent > 100;
  const scale = Math.max(percent, 100);
  const fillWidth = (percent / scale) * 100;
  const targetMarkerPosition = isOverTarget ? (100 / scale) * 100 : null;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-[var(--text-tertiary)]">{label}</span>
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-[var(--text-primary)]">{percent}%</span>
            {isOverTarget && (
              <span className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--accent)]">
                +{percent - 100}% over target
              </span>
            )}
          </span>
        </div>
      )}

      {targetMarkerPosition !== null && (
        <div className="relative h-4" aria-hidden>
          <div
            className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${targetMarkerPosition}%` }}
          >
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Target
            </span>
            <span className="mt-0.5 h-1.5 w-px bg-[var(--text-tertiary)]" />
          </div>
        </div>
      )}

      <div className="relative h-[6px] w-full overflow-hidden rounded-[3px] bg-[rgba(29,29,31,.14)]">
        <motion.div
          className="h-full rounded-[3px] bg-gradient-to-r from-[#5c5c63] to-[#1d1d1f]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? fillWidth / 100 : 0 }}
          style={{ transformOrigin: "left" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
          }
        />
        {isOverTarget && (
          <motion.div
            className="absolute inset-y-0 right-0 w-6 bg-gradient-to-r from-transparent to-[var(--accent)]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? [0.4, 0.9, 0.4] : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }
            }
          />
        )}
        {targetMarkerPosition !== null && (
          <div
            aria-hidden
            className="absolute top-0 h-full w-px bg-white/60"
            style={{ left: `${targetMarkerPosition}%` }}
          />
        )}
      </div>
    </div>
  );
}
