"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const DURATION_MS = 2000;

const PreloaderReadyContext = createContext(true);

export function usePreloaderReady() {
  return useContext(PreloaderReadyContext);
}

export function Preloader({ children }: { children?: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const showOverlay = visible && !shouldReduceMotion;

  useEffect(() => {
    if (shouldReduceMotion) return;

    document.body.style.overflow = "hidden";

    const dismiss = () => setVisible(false);
    const timer = setTimeout(dismiss, DURATION_MS);

    window.addEventListener("wheel", dismiss, { passive: true });
    window.addEventListener("touchmove", dismiss, { passive: true });
    window.addEventListener("keydown", dismiss);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!showOverlay) {
      document.body.style.overflow = "";
    }
  }, [showOverlay]);

  return (
    <PreloaderReadyContext.Provider value={!showOverlay}>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
            style={{ background: "var(--wallpaper)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="text-3xl font-bold tracking-tight sm:text-5xl"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Dang Chau
            </motion.p>
            <div className="h-[3px] w-24 overflow-hidden rounded-full bg-black/[.06] sm:w-32">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PreloaderReadyContext.Provider>
  );
}
