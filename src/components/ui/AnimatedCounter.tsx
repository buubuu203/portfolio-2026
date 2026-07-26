"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(shouldReduceMotion ? value : value);
    }
  }, [isInView, motionValue, value, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix, shouldReduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shouldReduceMotion ? value : 0}
      {suffix}
    </span>
  );
}
