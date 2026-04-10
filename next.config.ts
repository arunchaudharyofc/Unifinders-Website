import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  // Allow <img> tags with external src (we use plain img for perf flexibility)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export default nextConfig;
