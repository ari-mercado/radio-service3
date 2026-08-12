/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 16 writes AGENTS.md/CLAUDE.md on `next dev` unless this is disabled.
  agentRules: false,
};

module.exports = nextConfig;
