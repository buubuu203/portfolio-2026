"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { usePreloaderReady } from "@/components/layout/Preloader";

export function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  const shouldReduceMotion = useReducedMotion();
  const preloaderReady = usePreloaderReady();

  const hidden = { rotateY: -100, opacity: 0 };
  const shown = { rotateY: 0, opacity: 1 };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : hidden}
      animate={shouldReduceMotion || preloaderReady ? shown : hidden}
      transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200 }}
      className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[320px] lg:mx-0"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="(min-width: 1024px) 640px, 560px"
        className="object-contain"
      />
    </motion.div>
  );
}
