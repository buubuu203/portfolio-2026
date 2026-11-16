import { identity } from "@/content/profile";

export function Footer() {
  return (
    <footer className="pb-36 pt-8 text-center text-[13px] text-[var(--text-secondary)]">
      <p>&copy; {new Date().getFullYear()} {identity.name}</p>
    </footer>
  );
}
