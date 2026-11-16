import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string };

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "spring-hover group relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-[var(--accent)] text-white shadow-[0_10px_24px_rgba(0,0,0,.25)]",
  secondary:
    "glass text-[var(--text-primary)]",
  ghost: "bg-[rgba(255,255,255,.35)] border border-[rgba(255,255,255,.7)] text-[var(--text-primary)]",
};

const sizes = {
  sm: "px-[18px] py-[10px] text-[15px] min-h-[44px]",
  md: "px-6 py-[13px] text-[17px] min-h-[44px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
