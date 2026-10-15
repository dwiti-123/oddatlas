import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // App Router metadata and generateStaticParams need no rewrites or SEO plugin.
};

export default nextConfig;
