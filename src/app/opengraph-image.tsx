import { ImageResponse } from "next/og";
import { identity } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
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
          {identity.heroEyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#111111",
          }}
        >
          <span>Chau Ngoc</span>
          <span>Buu Dang</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 48, height: 4, backgroundColor: "#2f5bff" }} />
          <div style={{ display: "flex", fontSize: 28, color: "#555555" }}>
            {identity.name} · {identity.location}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
