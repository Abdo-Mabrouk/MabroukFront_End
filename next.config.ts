import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export: same deployment model as the original site (HTML/CSS/JS only).
  // Remove these two options if you deploy on Vercel / a Node server.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
