import { Navbar } from "@/components/blocks/Navbar";
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

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <Navbar />
      <main>
        <header className="max-w-6xl mx-auto px-6 pt-16 pb-12 border-b border-border">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
            /articles
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            All articles
          </h1>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-12">
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
        </section>
      </main>
    </>
  );
}
