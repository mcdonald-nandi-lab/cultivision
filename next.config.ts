import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image configuration
  images: {
    domains: [],
    // Ensure images in public directory work correctly
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },

  // Configure webpack
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },

  trailingSlash: false,
  output: "standalone",
  env: {
    NEXT_PUBLIC_APP_NAME: "Bioreactor Dashboard",
  },
};

export default nextConfig;
