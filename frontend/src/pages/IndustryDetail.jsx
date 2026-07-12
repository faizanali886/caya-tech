import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import CTABand from "@/components/common/CTABand";
import LeadForm from "@/components/forms/LeadForm";
import { useSEO } from "@/components/SEO";
import { getIndustry, getPlatform, INDUSTRIES, ICONS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function IndustryDetail() {
  const { slug } = useParams();
  const ind = getIndustry(slug);
  useSEO(ind?.name, ind?.desc);
  if (!ind) return <Navigate to="/industries" replace />;
  const platform = getPlatform(ind.platform);
  const Icon = ICONS[ind.icon] || ICONS.Network;

  return (
    <>
      <PageHero eyebrow="Industry" title={ind.name} intro={ind.desc}>
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-nexus/12 text-nexus"><Icon className="h-6 w-6" /></span>
      </PageHero>

      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="How Caya helps" title={`Transforming ${ind.name.toLowerCase()}`} />
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{ind.desc}</p>
            <ul className="mt-8 space-y-3">
              {["Shared identity & payments via Coral DPI", "Sector intelligence via Nexus AI", "Interoperable with existing systems", "Built for accessibility and scale"].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral/12 text-coral"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-base">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          {platform && (
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <span className="label-eyebrow">Recommended platform</span>
                <h3 className="mt-3 text-2xl font-semibold">{platform.full}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{platform.overview}</p>
                <Button asChild className="mt-6 rounded-full" data-testid="industry-platform-link">
                  <Link to={`/platforms/${platform.slug}`}>Explore {platform.name} <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-3xl py-20">
          <SectionHeading eyebrow="Get started" title={`Discuss a ${ind.name.toLowerCase()} initiative`} className="mb-8" align="center" />
          <LeadForm formType="consultation" platform={ind.platform} title={null} />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-16">
        <h3 className="text-lg font-semibold">Other industries</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {INDUSTRIES.filter((x) => x.slug !== ind.slug).map((x) => (
            <Link key={x.slug} to={`/industries/${x.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">{x.name}</Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
