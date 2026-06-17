import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly use Pages Router only
  pageExtensions: ["tsx", "ts", "jsx", "js"],
};

export default nextConfig;
