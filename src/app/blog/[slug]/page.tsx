import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Section } from "@/components/ui/Section";
import { getPostBySlug } from "@/lib/posts";
import { estimateReadingTime } from "@/lib/posts";
import { identity, siteUrl } from "@/content/profile";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: [identity.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    author: {
      "@type": "Person",
      name: identity.name,
      url: siteUrl,
    },
    keywords: post.tags.join(", "),
    url: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <Section className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="font-black tracking-tight text-4xl sm:text-6xl">{post.title}</h1>
      <p className="mt-4 text-foreground/60">
        {post.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {estimateReadingTime(post.content)}
      </p>
      {post.coverImage && (
        <div className="mt-8 aspect-video w-full max-w-2xl overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="prose mt-12 max-w-2xl [&_table]:w-full [&_td]:border [&_td]:border-foreground/20 [&_td]:p-2 [&_th]:border [&_th]:border-foreground/20 [&_th]:bg-foreground/5 [&_th]:p-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </Section>
  );
}
