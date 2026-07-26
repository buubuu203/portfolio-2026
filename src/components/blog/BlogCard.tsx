import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import type { Post } from "@/content/posts";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: Post }) {
  const rowClasses =
    "-mx-6 flex flex-col gap-3 border-b border-foreground/10 px-6 py-8 first:border-t first:border-foreground/10 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12";
  const interactiveClasses =
    "transition-transform duration-300 ease-out hover:scale-[1.008] hover:bg-foreground/[0.02]";

  const content = (
    <>
      <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60">
        <span>{formatDate(post.date)}</span>
        {post.readingTime !== "-" && (
          <>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </>
        )}
        {!post.published && <Badge className="text-xs">Coming soon</Badge>}
      </div>
      <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{post.title}</h2>
      <p className="max-w-2xl text-foreground/60">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </>
  );

  return (
    <Reveal as="li">
      {post.published ? (
        <Link href={`/blog/${post.slug}`} className={`${rowClasses} ${interactiveClasses} block`}>
          {content}
        </Link>
      ) : (
        <div className={`${rowClasses} opacity-60`}>{content}</div>
      )}
    </Reveal>
  );
}
