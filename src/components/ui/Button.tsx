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
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-foreground text-background hover:bg-accent focus-visible:ring-accent",
  secondary:
    "border border-foreground/20 text-foreground hover:border-foreground/60 focus-visible:ring-foreground/40",
  ghost: "text-foreground hover:text-accent focus-visible:ring-accent",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
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
