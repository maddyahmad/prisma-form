import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.dummyjson.com"],
  },
  allowedDevOrigins: ["192.168.100.100"],
};

export default nextConfig;
