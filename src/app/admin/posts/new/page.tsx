import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "@/app/admin/actions";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold">New post</h1>
      <PostForm action={createPost} />
    </div>
  );
}
