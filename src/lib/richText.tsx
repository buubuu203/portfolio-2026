import type { ReactNode } from "react";

export type RichNode =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; url: string };

const RICH_TEXT_PATTERN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

export function parseRichText(text: string): RichNode[] {
  const nodes: RichNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(RICH_TEXT_PATTERN)) {
    const [full, label, url, bold] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push({ type: "text", value: text.slice(lastIndex, index) });

    if (bold !== undefined) {
      nodes.push({ type: "bold", value: bold });
    } else {
      nodes.push({ type: "link", label, url });
    }
    lastIndex = index + full.length;
  }
  if (lastIndex < text.length) nodes.push({ type: "text", value: text.slice(lastIndex) });

  return nodes;
}

/** Lowercases the first character of the first non-empty node, for mid-sentence splicing. */
export function lowercaseFirstChar(nodes: RichNode[]): RichNode[] {
  const copy = nodes.map((n) => ({ ...n }));
  for (const n of copy) {
    const text = n.type === "link" ? n.label : n.value;
    if (text.length > 0) {
      const lowered = text.charAt(0).toLowerCase() + text.slice(1);
      if (n.type === "link") n.label = lowered;
      else n.value = lowered;
      break;
    }
  }
  return copy;
}

export function renderRichNodes(nodes: RichNode[]): ReactNode[] {
  return nodes.map((node, i) => {
    if (node.type === "bold") {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {node.value}
        </strong>
      );
    }
    if (node.type === "link") {
      return (
        <a
          key={i}
          href={node.url}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 underline decoration-foreground/30 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
        >
          {node.label}
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          >
            <path
              d="M3 9L9 3M9 3H4M9 3V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      );
    }
    return node.value;
  });
}

export function renderRichText(text: string): ReactNode[] {
  return renderRichNodes(parseRichText(text));
}
