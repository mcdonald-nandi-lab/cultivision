import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH
    ? `${process.env.NEXT_PUBLIC_BASE_PATH}/`
    : "",
  trailingSlash: true,

  images: {
    unoptimized: true,
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
