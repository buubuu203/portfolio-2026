export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  published: boolean;
};

export const posts: Post[] = [
  {
    slug: "coming-soon",
    title: "Coming soon",
    excerpt:
      "Writing on product management, fintech, and what shipping CTicket Platform actually looked like week to week.",
    date: "2026-09-01",
    readingTime: "-",
    tags: ["Announcement"],
    published: false,
  },
];

export function getPublishedPosts() {
  return posts.filter((post) => post.published);
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
