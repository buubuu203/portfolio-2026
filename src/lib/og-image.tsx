import { identity } from "@/content/profile";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function ogImageElement({ eyebrow, title }: { eyebrow: string; title: string }) {
  const fontSize = title.length > 24 ? 60 : title.length > 14 ? 76 : 96;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#8a8a8a",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize,
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: -2,
          color: "#111111",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", width: 48, height: 4, backgroundColor: "#2f5bff" }} />
        <div style={{ display: "flex", fontSize: 28, color: "#555555" }}>
          {identity.name} · {identity.location}
        </div>
      </div>
    </div>
  );
}
