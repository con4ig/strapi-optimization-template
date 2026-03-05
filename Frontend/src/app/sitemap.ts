import type { MetadataRoute } from "next";
import { fetchAPI } from "@/lib/api";
import { StrapiResponse, StrapiArticle, StrapiCategory } from "@/types/strapi";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all articles
  const articlesResponse = await fetchAPI<StrapiResponse<StrapiArticle[]>>(
    "/articles",
    { sort: "publishedAt:desc" },
  );
  const articles = articlesResponse?.data ?? [];

  // Fetch all categories
  const categoriesResponse = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
    "/categories",
    { populate: "*" },
  );
  const categories = categoriesResponse?.data ?? [];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/articles?category=${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...categoryPages];
}
