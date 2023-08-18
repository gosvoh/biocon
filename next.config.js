/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
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
