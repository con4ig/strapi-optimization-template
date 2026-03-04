import { Navbar } from "@/components/blocks/Navbar";
import { Hero } from "@/components/blocks/Hero";
import { ArticleCard } from "@/components/blocks/ArticleCard";
import { fetchAPI } from "@/lib/api";
import { StrapiCollectionResponse, StrapiArticle } from "@/types/strapi";

async function getArticles() {
  const response = await fetchAPI<StrapiCollectionResponse<StrapiArticle>>(
    "/articles",
    { sort: "publishedAt:desc" },
  );
  return response?.data ?? [];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="border-t border-border" id="articles">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="text-2xl font-bold tracking-tight">
                Latest articles
              </h2>
              <span className="font-mono text-xs text-muted">
                {articles.length} entries
              </span>
            </div>

            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.documentId} article={article} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-border rounded-lg">
                <p className="text-muted text-sm">No articles published yet.</p>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            <span className="font-mono text-xs text-muted">
              SEO Core © 2026
            </span>
            <div className="flex gap-6 font-mono text-xs text-muted">
              <a href="#" className="hover:text-fg transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-fg transition-colors">
                Documentation
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
