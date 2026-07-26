"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { StatGrid } from "@/components/work/StatGrid";
import type { Experience } from "@/content/profile";
import { renderRichText } from "@/lib/richText";

const MAX_TILT_DEG = 2;
const SPRING = { stiffness: 220, damping: 24, mass: 0.6 };

export function ExperienceCard({ experience }: { experience: Experience }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const lift = useMotionValue(0);
  const springRotateX = useSpring(rotateX, SPRING);
  const springRotateY = useSpring(rotateY, SPRING);
  const springLift = useSpring(lift, SPRING);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT_DEG * 2);
    rotateX.set(py * -MAX_TILT_DEG * 2);
  }

  function handleMouseEnter() {
    if (!shouldReduceMotion) lift.set(-3);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        y: springLift,
        transformPerspective: 1400,
      }}
      className="-mx-3 border-t border-foreground/10 px-6 py-16 transition-colors duration-300 ease-out first:border-t-0 first:pt-10 hover:bg-foreground/[0.03] sm:-mx-4 sm:px-8 lg:-mx-6 lg:px-12"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <Reveal>
          <p className="text-sm text-foreground/60">{experience.period}</p>
          <div className="mt-1 flex items-center gap-1.5">
            {experience.markImage ? (
              <Image
                src={experience.markImage.src}
                alt={experience.markImage.alt}
                width={experience.markImage.width}
                height={experience.markImage.height}
                className="h-[18px] w-auto flex-none object-contain"
              />
            ) : (
              experience.mark && (
                <span
                  aria-hidden
                  className="grid h-[18px] w-[18px] flex-none place-items-center rounded-[4px] bg-foreground text-[10px] font-extrabold leading-none text-background"
                >
                  {experience.mark}
                </span>
              )
            )}
            <p className="text-sm text-foreground/60">{experience.company}</p>
          </div>
          <p className="mt-4 text-sm font-medium text-foreground/70">{experience.role}</p>
        </Reveal>

        <div className="max-w-3xl">
          <Reveal>
            <h3 className="font-black tracking-tight text-3xl sm:text-4xl">{experience.title}</h3>
            <p className="mt-4 text-lg text-foreground/70">{renderRichText(experience.summary)}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-2">
              {experience.highlights.map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/70">
                  <span aria-hidden className="text-foreground/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{renderRichText(item)}</span>
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
    </motion.article>
  );
}
