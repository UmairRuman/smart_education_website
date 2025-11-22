import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // No custom experimental flags configured. Turbopack/runtime flags
  // that are not recognized by Next's config schema should be passed
  // via CLI or environment instead of `next.config`.
};

export default nextConfig;
