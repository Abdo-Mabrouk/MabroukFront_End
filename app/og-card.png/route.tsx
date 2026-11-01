import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import { OG_CARD, SITE_URL } from "@/lib/site";

/*
 * The card shown when the portfolio link is shared (WhatsApp, LinkedIn, Facebook, X, Slack…).
 * Generated once at build time. The QR code opens the site directly.
 * Text is English only: the image renderer cannot join Arabic letters correctly.
 */

// A route named "og-card.png" so the static export writes a real .png file
// (static hosts serve extension-less files with the wrong content type).
export const dynamic = "force-static";

const INK = "#0f1013";
const ACCENT = "#d6ff35";

export async function GET() {
  const root = process.cwd();
  const [portrait, regular, bold, qr] = await Promise.all([
    readFile(join(root, "public/assets/portrait-static.png")),
    readFile(join(root, "app/fonts/alfont_com_PingARLT-Regular.otf")),
    readFile(join(root, "app/fonts/alfont_com_PingARLT-Bold.otf")),
    QRCode.toString(SITE_URL, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: INK, light: "#ffffff" } }),
  ]);

  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;
  const qrSrc = `data:image/svg+xml;base64,${Buffer.from(qr).toString("base64")}`;
  const host = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 64px",
          gap: 48,
          background: INK,
          backgroundImage: "radial-gradient(circle at 16px 16px, #2c3038 1.8px, transparent 2.2px)",
          backgroundSize: "32px 32px",
          fontFamily: "Ping",
          color: "#ececef",
        }}
      >
        {/* portrait */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: 260,
            height: 260,
            borderRadius: 130,
            background: "#1a1c21",
            border: `4px solid ${ACCENT}`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portraitSrc} width={250} height={250} alt="" style={{ objectFit: "cover" }} />
        </div>

        {/* name + role */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: 999,
              background: "#050505",
              border: "1px solid #2a2d34",
              fontSize: 22,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#c5fc2e", boxShadow: "0 0 12px #c5fc2e" }} />
            Available for work
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 26, fontSize: 62, fontWeight: 700, lineHeight: 1.05, color: "#ffffff" }}>
            <span>Abdelrhman</span>
            <span>Mabrouk</span>
          </div>
          <div style={{ marginTop: 16, fontSize: 32, color: "#a3a8b3" }}>Front-End Developer</div>
          <div style={{ marginTop: 8, fontSize: 22, color: "#8b909b" }}>React.js · Next.js · TypeScript</div>
          <div style={{ marginTop: 30, fontSize: 24, fontWeight: 700, color: ACCENT }}>{host}</div>
        </div>

        {/* QR code */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            padding: 22,
            borderRadius: 28,
            background: "#ffffff",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrSrc} width={200} height={200} alt="" />
          <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>Scan to visit</div>
        </div>
      </div>
    ),
    {
      width: OG_CARD.width,
      height: OG_CARD.height,
      fonts: [
        { name: "Ping", data: regular, weight: 400, style: "normal" },
        { name: "Ping", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
