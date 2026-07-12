import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHero from "@/components/common/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { useSEO } from "@/components/SEO";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Article", "Research", "White Paper", "Guide", "Report", "Policy Paper", "Case Study"];

export default function Insights() {
  useSEO("Insights", "Articles, research, white papers, and guides on digital public infrastructure and government technology.");
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles", category, q],
    queryFn: async () => {
      const params = {};
      if (category !== "All") params.category = category;
      if (q) params.q = q;
      const { data } = await api.get("/articles", { params });
      return data;
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="The Caya knowledge centre"
        intro="Research, white papers, and practical guides on digital public infrastructure, responsible AI, and the future of government technology in the Caribbean."
      />

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                data-testid={`insights-cat-${c.toLowerCase().replace(/\s/g, "-")}`}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${category === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search insights…" className="rounded-full pl-9" data-testid="insights-search" />
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl" />)
            : articles.length === 0
            ? <p className="col-span-full text-muted-foreground">No insights found. Try a different search or category.</p>
            : articles.map((a, idx) => (
                <Reveal key={a.id} delay={(idx % 3) * 0.08}>
                  <Link to={`/insights/${a.slug}`} data-testid={`article-card-${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      {a.cover_image && <img src={a.cover_image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="label-eyebrow text-coral">{a.category}</span>
                      <h3 className="mt-3 text-lg font-semibold leading-snug">{a.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{a.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </Reveal>
              ))}
        </div>
      </section>
    </>
  );
}
