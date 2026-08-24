import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { getPublishedPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog/BlogCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on product, fintech, and building things.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Chau Ngoc Buu Dang",
    description: "Writing on product, fintech, and building things.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Chau Ngoc Buu Dang",
    description: "Writing on product, fintech, and building things.",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  if (posts.length === 0) {
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

  return (
    <Section className="pt-16" containerClassName="flex flex-col gap-12">
      <h1 className="font-black tracking-tight text-5xl sm:text-7xl">Blog</h1>
      <ul className="flex flex-col">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </ul>
    </Section>
  );
}
