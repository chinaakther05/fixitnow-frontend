import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: 'i.ibb.co',
      },
    ],
  },
};

export default nextConfig;