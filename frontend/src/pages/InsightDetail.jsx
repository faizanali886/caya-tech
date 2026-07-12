import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import CTABand from "@/components/common/CTABand";
import { useSEO } from "@/components/SEO";
import api from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function InsightDetail() {
  const { slug } = useParams();
  const { data: a, isLoading, isError } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => (await api.get(`/articles/${slug}`)).data,
  });
  useSEO(a?.title || "Insight", a?.excerpt);

  if (isLoading) return <div className="container-px mx-auto max-w-3xl py-32"><Skeleton className="h-10 w-3/4" /><Skeleton className="mt-6 h-64 w-full" /></div>;
  if (isError || !a) return <div className="container-px mx-auto max-w-3xl py-32 text-center"><p className="text-muted-foreground">Article not found.</p><Link to="/insights" className="mt-4 inline-block font-semibold text-coral">Back to Insights</Link></div>;

  return (
    <>
      <article className="container-px mx-auto max-w-3xl py-20">
        <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to Insights</Link>
        <Reveal>
          <span className="mt-8 block label-eyebrow text-coral">{a.category}</span>
          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{a.title}</h1>
          <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{a.author}</span>
            {a.created_at && <><span>•</span><span>{new Date(a.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span></>}
          </div>
        </Reveal>
        {a.cover_image && (
          <Reveal delay={0.1}>
            <img src={a.cover_image} alt="" className="mt-8 aspect-[16/9] w-full rounded-2xl border border-border object-cover" />
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <div className="prose-caya mt-10 space-y-5 text-lg leading-relaxed text-foreground/90">
            {(a.body || a.excerpt || "").split("\n").filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {a.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
              {a.tags.map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">{t}</span>)}
            </div>
          )}
        </Reveal>
      </article>
      <CTABand title="Want a briefing on this topic?" eyebrow="Talk to us" text="Our team can walk your organization through the implications for your sector." />
    </>
  );
}
