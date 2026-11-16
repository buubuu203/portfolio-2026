import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
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
        className="min-h-[60vh] pt-6 sm:pt-10"
        containerClassName="flex flex-col items-center justify-center gap-6 text-center"
      >
        <h1
          className="font-bold"
          style={{ fontSize: "clamp(40px, 10.5vw, 72px)", letterSpacing: "-0.035em", lineHeight: 1.07 }}
        >
          Coming soon.
        </h1>
        <div className="flex items-center justify-center gap-2.5" aria-hidden>
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--text-tertiary)] [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--text-tertiary)] [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[var(--text-tertiary)]" />
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-6 sm:pt-10" containerClassName="flex flex-col gap-8 sm:gap-10">
      <Reveal>
        <div className="flex items-center gap-2.5">
          <span className="squircle squircle-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h14v16H5z" /><path d="M8.5 9h7M8.5 13h7M8.5 17h4" /></svg>
          </span>
          <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Blog</span>
        </div>
        <h1
          className="mt-3 font-bold sm:mt-4"
          style={{ fontSize: "clamp(40px, 10.5vw, 80px)", letterSpacing: "-0.035em", lineHeight: 1.03 }}
        >
          Blog.
        </h1>
        <p className="mt-6 max-w-[760px] text-[var(--text-secondary)] sm:mt-8" style={{ fontSize: "clamp(16px, 2.5vw, 24px)", lineHeight: 1.4 }}>
          Writing on product, fintech, and building things.
        </p>
      </Reveal>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
