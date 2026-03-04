import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto px-6 py-32 md:py-48 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 text-fg">
          Intelligent content.
          <br /> Engineered for SEO.
        </h1>

        <p className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-2xl">
          <span className="font-mono font-bold text-fg">SEO Core</span> is a
          minimalist open-source engine designed for semantic architecture and
          AI-driven content optimization. Built for clarity, speed, and ranking
          performance.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link
            href="/articles"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-fg text-bg text-sm font-medium rounded-full hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            Explore Knowledge Base
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="https://github.com/con4ig/strapi-optimization-template"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-border bg-surface/50 backdrop-blur-sm text-fg text-sm font-medium rounded-full hover:bg-border/30 transition-all active:scale-95"
          >
            <Github className="w-4 h-4" />
            View Source Code
          </Link>
        </div>
      </div>

      {/* Subtle architectural background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] blur-[120px]" />
      </div>
    </section>
  );
}
