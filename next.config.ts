/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // The new rewrite rule for your API
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://chefalio-backend.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
