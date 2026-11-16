import { notFound, redirect } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { getPostById } from "@/lib/posts";
import { updatePost, deletePost } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try { await requireAdminSession(); } catch { redirect("/admin/login"); }
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const updatePostWithId = updatePost.bind(null, id);
  const deletePostWithId = deletePost.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit post</h1>
        <form action={deletePostWithId}>
          <button
            type="submit"
            className="text-sm text-red-500 hover:text-red-600"
          >
            Delete post
          </button>
        </form>
      </div>
      <PostForm post={post} action={updatePostWithId} />
    </div>
  );
}
