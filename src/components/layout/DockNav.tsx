"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const navItems = [
  { href: "/", label: "About", icon: "M12 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM5 20c.8-3.6 3.8-5.5 7-5.5s6.2 1.9 7 5.5" },
  { href: "/work", label: "Work", icon: "M3 10h18v10a3 3 0 01-3 3H6a3 3 0 01-3-3V10zM9 10V7a2 2 0 012-2h2a2 2 0 012 2v3" },
  { href: "/contact", label: "Contact", icon: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" },
  { href: "/fit-check", label: "Fit Check", icon: "M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM8 12.5l2.7 2.7L16 9.5" },
  { href: "/blog", label: "Blog", icon: "M5 4h14v16H5zM8.5 9h7M8.5 13h7M8.5 17h4" },
];

const ICON_GRADIENTS = [
  "linear-gradient(145deg,#5c5c63,#1d1d1f)",
  "linear-gradient(145deg,#7a7a82,#2c2c30)",
];

export function DockNav() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const dockRef = useRef<HTMLDivElement>(null);
  const [scales, setScales] = useState<number[]>(navItems.map(() => 1));

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion !== false || !window.matchMedia("(hover: hover)").matches) {
        setScales(navItems.map(() => 1));
        return;
      }
      const dock = dockRef.current;
      if (!dock) return;
      const items = dock.querySelectorAll<HTMLElement>("[data-dock-item]");
      const centers = Array.from(items).map((item) => {
        const rect = item.getBoundingClientRect();
        return rect.left + rect.width / 2;
      });
      const activeIndex = centers.reduce(
        (closest, center, index) =>
          Math.abs(e.clientX - center) < Math.abs(e.clientX - centers[closest]) ? index : closest,
        0
      );
      const scalesByDistance = [1.3, 1.12, 1.04];
      const newScales = centers.map((_, index) =>
        scalesByDistance[Math.abs(index - activeIndex)] ?? 1
      );
      setScales(newScales);
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setScales(navItems.map(() => 1));
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
      aria-label="Primary"
      style={{ maxWidth: "calc(100vw - 24px)" }}
    >
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass flex items-end justify-center px-3 pb-[10px] pt-3 sm:px-4"
        style={{ borderRadius: 34, gap: "clamp(6px, 1.8vw, 14px)" }}
      >
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          const sc = scales[i];
          return (
            <Link
              key={item.href}
              href={item.href}
              data-dock-item
              className="dockitem"
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className="dockicon"
                style={{
                  background: ICON_GRADIENTS[i % 2],
                  transform: `scale(${shouldReduceMotion === false ? sc : 1})`,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d={item.icon} stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{item.label}</span>
              {isActive && !shouldReduceMotion && (
                <motion.span
                  layoutId="dock-dot"
                  className="h-[5px] w-[5px] rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
