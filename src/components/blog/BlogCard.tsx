import Link from "next/link";
import type { Post } from "@prisma/client";
import { Reveal } from "@/components/ui/Reveal";
import { estimateReadingTime } from "@/lib/posts";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="glass spring-hover block"
        style={{ borderRadius: "var(--radius-card)", padding: 36, display: "flex", flexDirection: "column", gap: 18, color: "#1d1d1f" }}
      >
        <div className="flex flex-wrap items-center gap-2.5">
          {post.tags.length > 0 && post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#1d1d1f",
                color: "#fff",
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 text-[15px] text-[var(--text-secondary)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[15px] text-[var(--text-secondary)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>
            {estimateReadingTime(post.content)}
          </span>
        </div>
        <h2
          className="font-bold"
          style={{ margin: 0, fontSize: "clamp(28px, 5vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          {post.title}
        </h2>
        {post.excerpt && (
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.5, color: "var(--text-secondary)" }}>
            {post.excerpt}
          </p>
        )}
        <span style={{ fontSize: 17, fontWeight: 600 }}>Read the post ›</span>
      </Link>
    </Reveal>
  );
}
