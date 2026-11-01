/** Public address of the portfolio: used for metadata, the share button and the QR code. */
export const SITE_URL = "https://mabroukfrontend.mabroukui.com/";

/** The link-preview card (rendered by app/og-card.png/route.tsx, with the QR code). */
export const OG_CARD = {
  url: "/og-card.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Abdelrhman Mabrouk — Front-End Developer",
} as const;
