import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { STORAGE_KEY } from "@/lib/content";

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

const SITE_URL = "https://mabroukfrontend.mabroukui.com/";
const DESCRIPTION ="متخصص في تطوير واجهات الويب الحديثة والتطبيقات الرقمية باستخدام React.js وNext.js. أركز على بناء واجهات تفاعلية وسريعة وقابلة للتوسع، وتطوير تجارب مستخدم متكاملة، وربط الواجهات بالـ APIs، مع الاهتمام بتنظيم الكود، وتحسين الأداء، وتحقيق التوازن بين احتياجات المستخدم ومتطلبات المشروع."
const SOCIAL_TITLE = "عبدالرحمن مبروك - مصمم واجهة اماميه";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abdelrhman Mabrouk Front_End",
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
    url: SITE_URL + "/",
    images: [
      {
        url: "/assets/portrait-static.png",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "كافر معرض أعمال عبدالرحمن مبروك",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: ["/assets/portrait-static.png"],
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
      </head>
      <body>{children}</body>
    </html>
  );
}
