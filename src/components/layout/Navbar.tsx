"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
  { href: "/fit-check", label: "Fit Check" },
  { href: "/blog", label: "Blog" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "py-1 text-sm transition-colors",
        isActive ? "font-bold text-foreground" : "font-medium text-foreground/60 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="text-lg font-black tracking-tight" onClick={() => setOpen(false)}>
          Dang Chau
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden items-center gap-8 sm:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <motion.span
              className="h-px w-5 bg-foreground"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="h-px w-5 bg-foreground"
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-foreground/10 sm:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
