import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/content";
import { OG_CARD, SITE_URL } from "@/lib/site";

const ping = localFont({
  src: [
    { path: "./fonts/alfont_com_PingARLT-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/alfont_com_PingARLT-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/alfont_com_PingARLT-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-ping-src",
  display: "swap",
});

const thmanyah = localFont({
  src: [
    { path: "./fonts/thmanyahseriftext-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/thmanyahseriftext-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-thmanyah-src",
  display: "swap",
});

// Only needed for the English version, so it is not preloaded for Arabic visitors.
const googleSans = localFont({
  src: [{ path: "./fonts/GoogleSans-Variable.ttf", weight: "100 900", style: "normal" }],
  variable: "--font-google-src",
  display: "swap",
  preload: false,
});

const DESCRIPTION =
  "مطوّر واجهات أمامية متخصص في React.js وNext.js. أبني واجهات ويب سريعة ومتجاوبة وقابلة للتوسع، وأربطها بالـ APIs، مع اهتمام حقيقي بالأداء وجودة الكود وتجربة المستخدم.";
const SOCIAL_TITLE = "عبدالرحمن مبروك - مطوّر واجهات أمامية";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abdelrhman Mabrouk — Front-End Developer",
  description: DESCRIPTION,
  applicationName: "MabroukFront_End",
  alternates: { canonical: "/" },
  icons: { icon: "/assets/portrait-static.png", apple: "/assets/portrait-static.png" },
  openGraph: {
    type: "website",
    siteName: "MabroukFront",
    locale: "ar_EG",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [OG_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [OG_CARD],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Applies the saved language before first paint so the layout never flips direction.
const languageBootScript = `try{if(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})==='en'){var d=document.documentElement;d.lang='en';d.dir='ltr';d.classList.add('english')}}catch(e){}`;

// Applies the saved theme before first paint so dark-mode visitors never see a white flash.
// With nothing saved yet, it follows the operating system's preference.
const themeBootScript = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${ping.variable} ${thmanyah.variable} ${googleSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
