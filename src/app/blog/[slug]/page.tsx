import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { getPostBySlug, getPublishedPosts } from "@/content/posts";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <Section className="pt-16">
      <h1 className="font-black tracking-tight text-4xl sm:text-6xl">{post.title}</h1>
      <p className="mt-4 text-foreground/60">{post.date}</p>
      <div className="prose mt-12 max-w-2xl text-foreground/80">{post.excerpt}</div>
    </Section>
  );
}
