import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cultivision",
  assetPrefix: "/cultivision/",
  trailingSlash: true,

  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
