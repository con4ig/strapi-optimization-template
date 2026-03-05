import { Metadata } from "next";
import { Navbar } from "@/components/blocks/Navbar";
import { Breadcrumbs } from "@/components/blocks/Breadcrumbs";
import { fetchAPI } from "@/lib/api";
import { StrapiResponse, StrapiCategory } from "@/types/strapi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories | SEO Core",
  description: "Explore our content categories and technical deep-dives.",
};

async function getCategories() {
  const response = await fetchAPI<StrapiResponse<StrapiCategory[]>>(
    "/categories",
    {
      populate: "*",
    },
  );
  return response?.data || [];
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Navbar />
      <main>
        <header className="max-w-6xl mx-auto px-6 pt-16 pb-12 border-b border-border">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Categories" }]}
          />
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
            /categories
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Categories
          </h1>
        </header>

        <section className="max-w-6xl mx-auto px-6 py-12">
          {categories.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border rounded-lg">
              <p className="text-muted text-sm">No categories found yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/articles?category=${category.slug}`}
                  className="group block"
                >
                  <article className="h-full flex flex-col p-6 border border-border rounded-lg hover:bg-surface transition-colors">
                    <span className="font-mono text-xs text-muted mb-4 uppercase">
                      Category
                    </span>
                    <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:underline underline-offset-4">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted leading-relaxed grow">
                        {category.description}
                      </p>
                    )}
                    <span className="mt-6 text-sm font-medium text-fg/60 group-hover:text-fg transition-colors">
                      View articles
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
