import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://biocon.international";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/biocon2023`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    // {
    //   url: `${baseUrl}/program`,
    //   lastModified: new Date(),
    // },
    {
      url: `${baseUrl}/speakers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    // {
    //   url: `${baseUrl}/venue`,
    //   lastModified: new Date(),
    // },
  ];
}
