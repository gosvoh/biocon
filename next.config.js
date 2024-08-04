/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "biocon.international",
        pathname: "/images/**",
        protocol: "https",
      },
    ],
  },
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
