import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/posts";
import { logout } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/posts/new"
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            New post
          </Link>
          <form action={logout}>
            <button type="submit" className="text-sm text-foreground/60 hover:text-foreground">
              Log out
            </button>
          </form>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-foreground/60">No posts yet. Create your first one.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between rounded-lg border border-foreground/10 px-4 py-3"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-foreground/50">
                  /blog/{post.slug} · {post.published ? "Published" : "Draft"}
                </p>
              </div>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="text-sm underline underline-offset-4"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
