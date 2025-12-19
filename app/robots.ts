import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/project", "/settings"],
    },
    sitemap: "https://plandata.se/sitemap.xml",
  }
}
