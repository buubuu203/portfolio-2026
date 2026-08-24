import Link from "next/link";
import type { Post } from "@prisma/client";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { estimateReadingTime } from "@/lib/posts";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: Post }) {
  const rowClasses =
    "-mx-6 flex flex-col gap-6 border-b border-foreground/10 px-6 py-8 first:border-t first:border-foreground/10 sm:-mx-8 sm:flex-row sm:items-center sm:px-8 lg:-mx-12 lg:px-12";
  const interactiveClasses =
    "transition-transform duration-300 ease-out hover:scale-[1.008] hover:bg-foreground/[0.02]";

  const content = (
    <>
      <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60">
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>·</span>
        <span>{estimateReadingTime(post.content)}</span>
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
      <Link href={`/blog/${post.slug}`} className={`${rowClasses} ${interactiveClasses} block`}>
        {post.coverImage && (
          <div className="aspect-video w-full shrink-0 overflow-hidden rounded-xl sm:w-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-3">{content}</div>
      </Link>
    </Reveal>
  );
}
