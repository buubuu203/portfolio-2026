import { redirect } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth";

export default async function NewPostPage() {
  try { await requireAdminSession(); } catch { redirect("/admin/login"); }
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">New post</h1>
      <PostForm action={createPost} />
    </div>
  );
}
