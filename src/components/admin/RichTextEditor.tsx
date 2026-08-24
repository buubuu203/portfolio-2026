"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageResize } from "tiptap-extension-resize-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown, type MarkdownStorage } from "tiptap-markdown";
import { useRef, useState, useTransition } from "react";
import { uploadCoverImage } from "@/app/admin/actions";

declare module "@tiptap/core" {
  interface Storage {
    markdown: MarkdownStorage;
  }
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors disabled:opacity-30 ${
        active
          ? "bg-foreground text-background"
          : "text-foreground/70 hover:bg-foreground/10"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [markdown, setMarkdown] = useState(defaultValue ?? "");
  const [isUploading, startUpload] = useTransition();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      ImageResize.configure({ minWidth: 120, maxWidth: 900 }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: "Write your post...",
      }),
      Markdown.configure({
        html: true,
        transformPastedText: true,
        transformCopiedText: true,
        linkify: true,
      }),
    ],
    content: defaultValue ?? "",
    onUpdate: ({ editor }) => {
      setMarkdown(editor.storage.markdown.getMarkdown());
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[320px] px-4 py-3 outline-none [&_table]:w-full [&_td]:border [&_td]:border-foreground/20 [&_td]:p-2 [&_th]:border [&_th]:border-foreground/20 [&_th]:p-2 [&_th]:bg-foreground/5",
      },
    },
  });

  function handleImageFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !editor) return;

    setUploadError(null);
    startUpload(async () => {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadCoverImage(formData);
      if (result.error) {
        setUploadError(result.error);
        return;
      }
      if (result.url) {
        editor.chain().focus().setImage({ src: result.url }).run();
      }
    });
  }

  if (!editor) {
    return (
      <div className="min-h-[360px] rounded-lg border border-foreground/20 bg-background px-4 py-3 text-sm text-foreground/40">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-foreground/20 bg-background p-1.5">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

        <ToolbarButton
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          &ldquo;Quote&rdquo;
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

        <ToolbarButton
          label="Insert table"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Table
        </ToolbarButton>
        <ToolbarButton
          label="Insert image"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? "Uploading..." : "Image"}
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          className="hidden"
        />

        <span className="mx-1 h-5 w-px bg-foreground/15" aria-hidden />

        <ToolbarButton
          label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          ↶
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          ↷
        </ToolbarButton>
      </div>

      {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}

      <div className="rounded-lg border border-foreground/20 bg-background">
        <EditorContent editor={editor} />
      </div>

      <input type="hidden" name={name} value={markdown} />
    </div>
  );
}
