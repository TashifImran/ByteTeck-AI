import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // Hugging Face par images load karne ke liye zaroori hai
  },
};

export default nextConfig;