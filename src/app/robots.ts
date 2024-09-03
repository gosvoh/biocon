import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: [
        "/openGraph",
        "/api",
        "admin",
        "/_next",
        "/images",
        "/fonts",
        "/news",
      ],
    },
    sitemap: "https://biocon.international/sitemap.xml",
  };
}
