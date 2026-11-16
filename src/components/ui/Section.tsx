import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-12", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
