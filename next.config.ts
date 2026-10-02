import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't let `next dev` write agent rules into the private agent instruction files
  agentRules: false,
};

export default nextConfig;
