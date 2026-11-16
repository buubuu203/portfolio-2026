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
      className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded-full sm:h-[148px] sm:w-[148px]"
      style={{
        transformPerspective: 1200,
        boxShadow: "0 8px 30px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08)",
        animation: shouldReduceMotion ? "none" : "float 6s ease-in-out infinite",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="148px"
        className="object-cover"
      />
    </motion.div>
  );
}
