import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <Section className="pt-16">
      <p className="text-sm uppercase tracking-widest text-foreground/50">Blog</p>
      <h1 className="mt-4 font-black tracking-tight text-6xl leading-none sm:text-8xl">Writing.</h1>
      <p className="mt-8 max-w-xl text-lg text-foreground/60 sm:text-xl">
        Notes on product management, fintech, and shipping platforms end-to-end.
      </p>

      <ul className="mt-12">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </ul>
    </Section>
  );
}
