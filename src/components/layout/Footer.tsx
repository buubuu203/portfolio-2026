import { identity } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-10">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm text-foreground/60 sm:flex-row sm:items-center">
        <p>
          &copy; {new Date().getFullYear()} {identity.name}
        </p>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
          <a href={`mailto:${identity.email}`} className="flex items-center gap-2 whitespace-nowrap hover:text-foreground">
            <Icon name="Email" className="h-4 w-4" />
            {identity.email}
          </a>
          <a
            href={`tel:${identity.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-2 whitespace-nowrap hover:text-foreground"
          >
            <Icon name="Phone" className="h-4 w-4" />
            {identity.phone}
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 whitespace-nowrap hover:text-foreground"
          >
            <Icon name="LinkedIn" className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
