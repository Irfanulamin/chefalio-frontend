/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return {
      // beforeFiles forces Next.js to forward the request immediately
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "https://chefalio-backend.vercel.app/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
