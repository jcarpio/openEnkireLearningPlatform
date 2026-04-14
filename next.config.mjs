/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.exercism.org" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.cloudflarestream.com" },
    ],
  },
};

export default nextConfig;
