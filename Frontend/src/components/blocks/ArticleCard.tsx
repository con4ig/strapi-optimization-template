import Link from "next/link";
import { StrapiArticle } from "@/types/strapi";

interface ArticleCardProps {
  article: StrapiArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { title, description, slug, publishedAt } = article;
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="h-full flex flex-col p-6 border border-border rounded-lg hover:bg-surface transition-colors">
        <span className="font-mono text-xs text-muted mb-4">{date}</span>
        <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:underline underline-offset-4">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed grow">{description}</p>
        <span className="mt-6 text-sm font-medium text-fg/60 group-hover:text-fg transition-colors">
          Read more
        </span>
      </article>
    </Link>
  );
}
