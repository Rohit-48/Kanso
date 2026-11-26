import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the Kanso mark on a dark tile. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111",
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 28,
            border: "12px solid #fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 38, height: 38, borderRadius: 19, background: "#fafafa" }} />
        </div>
      </div>
    ),
    size
  );
}
