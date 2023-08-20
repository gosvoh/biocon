/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async headers() {
        return [{
            source: "/(.*)",
            headers: [
                { key: "X-Frame-Options", value: "DENY" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "same-origin" },
                { key: "X-XSS-Protection", value: "1; mode=block" },
            ]
        }];
    },
    experimental: {
        legacyBrowsers: false
    },
    images: {
        remotePatterns: [
            {
                hostname: "biocon.international",
                pathname: "/images/**",
                protocol: "https"
            }
        ]
    }
}

module.exports = nextConfig
