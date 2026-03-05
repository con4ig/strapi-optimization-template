"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-bold text-base tracking-tight hover:opacity-70 transition-opacity"
        >
          SEO Core
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/articles"
            className="text-sm text-muted hover:text-fg transition-colors"
          >
            Articles
          </Link>
          <Link
            href="/categories"
            className="text-sm text-muted hover:text-fg transition-colors"
          >
            Categories
          </Link>
          <Link
            href="https://github.com/con4ig/seo-core"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-fg transition-colors"
            aria-label="View Source on GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
