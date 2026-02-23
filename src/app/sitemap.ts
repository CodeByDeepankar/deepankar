import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { allPosts } from "content-collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = allPosts.map((post) => {
    const slug = post._meta.path.replace(/\.mdx$/, "");
    return {
      url: `${DATA.url}/blog/${slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  const routes: MetadataRoute.Sitemap = [
    {
      url: DATA.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${DATA.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...routes, ...blogPosts];
}
