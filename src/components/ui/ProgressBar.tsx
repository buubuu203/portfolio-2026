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
  const clamped = Math.min(percent, 100);

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="text-foreground/70">{label}</span>
          <span className="font-medium text-foreground">{percent}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${clamped}%` : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </div>
    </div>
  );
}
