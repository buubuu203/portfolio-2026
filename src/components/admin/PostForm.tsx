"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import type { Post } from "@prisma/client";
import type { PostFormState } from "@/app/admin/actions";
import { uploadCoverImage } from "@/app/admin/actions";
import { cropImageToCoverRatio } from "@/lib/cropImage";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

type Action = (
  prevState: PostFormState,
  formData: FormData
) => Promise<PostFormState>;

export function PostForm({ post, action }: { post?: Post; action: Action }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, startUpload] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    startUpload(async () => {
      let croppedFile: File;
      try {
        croppedFile = await cropImageToCoverRatio(file);
      } catch {
        setUploadError("Could not process that image. Try a different file.");
        return;
      }

      const formData = new FormData();
      formData.set("file", croppedFile);

      const result = await uploadCoverImage(formData);
      if (result.error) {
        setUploadError(result.error);
        return;
      }
      if (result.url) {
        setCoverImage(result.url);
      }
    });
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          defaultValue={post?.title}
          required
          className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none focus:border-foreground/50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="slug">
          Slug (URL) — leave blank to auto-generate from title
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          placeholder="my-first-post"
          className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none focus:border-foreground/50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">
          Cover image (thumbnail/banner) — optional
        </label>
        <p className="text-xs text-foreground/50">
          Shown at a 16:9 ratio everywhere on the site. Uploaded photos are
          auto-cropped to fit — pick any size, the center gets kept.
        </p>

        {coverImage && (
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-foreground/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt="" className="h-full w-full object-cover" />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="text-sm"
          />
          {isUploading && (
            <span className="text-sm text-foreground/60">Uploading...</span>
          )}
        </div>
        {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}

        <input
          type="text"
          value={coverImage}
          onChange={(event) => setCoverImage(event.target.value)}
          placeholder="or paste an image URL (already 16:9 works best): https://images.unsplash.com/..."
          className="rounded-lg border border-foreground/20 bg-background px-4 py-2 text-sm outline-none focus:border-foreground/50"
        />
        <input type="hidden" name="coverImage" value={coverImage} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="excerpt">
          Excerpt (short summary shown on the blog list)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt}
          required
          rows={2}
          className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none focus:border-foreground/50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Content</label>
        <RichTextEditor name="content" defaultValue={post?.content} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={post?.tags.join(", ")}
          placeholder="Product, Fintech"
          className="rounded-lg border border-foreground/20 bg-background px-4 py-2 outline-none focus:border-foreground/50"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published}
        />
        Published (visible on the site)
      </label>

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-lg bg-foreground px-6 py-2 font-medium text-background disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save post"}
      </button>
    </form>
  );
}
