import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog coming soon, from Chau Ngoc Buu Dang.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Chau Ngoc Buu Dang",
    description: "Blog coming soon, from Chau Ngoc Buu Dang.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Chau Ngoc Buu Dang",
    description: "Blog coming soon, from Chau Ngoc Buu Dang.",
  },
};

export default function BlogPage() {
  return (
    <Section
      className="min-h-[60vh] pt-16"
      containerClassName="flex flex-col items-center justify-center gap-8 text-center"
    >
      <h1 className="font-black tracking-tight text-6xl leading-none sm:text-8xl">
        Coming soon.
      </h1>
      <div className="flex items-center justify-center gap-3" aria-hidden>
        <span className="h-3 w-3 animate-bounce rounded-full bg-foreground/60 [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-foreground/60 [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-foreground/60" />
      </div>
    </Section>
  );
}
