import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cultivision",
  assetPrefix: "/cultivision/",
  trailingSlash: true,

  images: {
    domains: ["res.cloudinary.com"],
  },
  compress: true,
  poweredByHeader: false,
  distDir: "out",
};

export default nextConfig;
