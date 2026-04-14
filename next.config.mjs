/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.exercism.org" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.cloudflarestream.com" },
    ],
  },
  // Disable ESLint during build to avoid blocking deploys
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
