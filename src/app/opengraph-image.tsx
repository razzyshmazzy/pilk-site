import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — Split the check. Not the friendship.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, generated at build time. Self-contained — no external
// image URL that could disappear.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBF7EF",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0B8F63",
              borderRadius: 20,
              color: "white",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#17150F" }}>
            {siteConfig.name}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#17150F",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Split the check.
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#0B8F63",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Not the friendship.
          </div>
        </div>

        {/* Footer line */}
        <div style={{ fontSize: 30, color: "#57513F", maxWidth: 900 }}>
          Scan in, pick your share, and skip the post-dinner Venmo chase.
        </div>
      </div>
    ),
    { ...size },
  );
}
