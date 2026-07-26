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
  // When over target, scale the track to the actual percent so the fill
  // reaches full width and a marker can flag where the 100% target sat.
  const scale = Math.max(percent, 100);
  const fillWidth = (percent / scale) * 100;
  const targetMarkerPosition = isOverTarget ? (100 / scale) * 100 : null;

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-foreground/70">{label}</span>
          <span className="flex items-center gap-1.5">
            <span className="font-medium text-foreground">{percent}%</span>
            {isOverTarget && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
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
            <span className="text-[9px] font-semibold uppercase tracking-wider text-foreground/40">
              Target
            </span>
            <span className="mt-0.5 h-1.5 w-px bg-foreground/40" />
          </div>
        </div>
      )}

      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isOverTarget ? "bg-gradient-to-r from-accent/50 to-accent" : "bg-accent"
          )}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${fillWidth}%` : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
          }
        />
        {isOverTarget && (
          <motion.div
            className="absolute inset-y-0 right-0 w-6 bg-gradient-to-r from-transparent to-accent/40"
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
            className="absolute top-0 h-full w-px bg-background/70"
            style={{ left: `${targetMarkerPosition}%` }}
          />
        )}
      </div>
    </div>
  );
}
