import React from "react";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import EcosystemMap from "@/components/EcosystemMap";
import CTABand from "@/components/common/CTABand";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { useSEO } from "@/components/SEO";
import { PLATFORMS, ICONS } from "@/data/site";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Ecosystem() {
  useSEO("Ecosystem", "Explore the Caya ecosystem — Coral DPI at the center, connected to every sector operating system and powered by Nexus AI.");

  return (
    <>
      <PageHero
        eyebrow="The Caya Ecosystem"
        title="One interconnected ecosystem for the public good"
        intro="Coral Digital Public Infrastructure provides the foundation. Nexus AI delivers the intelligence. Every sector operating system plugs in — so value compounds across the whole region."
      />

      <section className="border-b border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-20">
          <SectionHeading eyebrow="Interactive Map" title="Explore the connected platforms" intro="Hover or tap any node to learn more, then open its dedicated page." className="mb-12" />
          <EcosystemMap />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading eyebrow="All Platforms" title="The full platform catalogue" />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((p) => {
            const Icon = ICONS[p.icon] || ICONS.Network;
            return (
              <StaggerItem key={p.slug}>
                <Link to={`/platforms/${p.slug}`} data-testid={`ecosystem-card-${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${p.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    {p.core && <span className="rounded-full border border-coral/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-coral">Core</span>}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{p.full}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </StaggerItem>
            );
          })}
          <Reveal>
            <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-border bg-card/50 p-7">
              <h3 className="text-lg font-semibold text-muted-foreground">Future Platforms</h3>
              <p className="mt-2 text-sm text-muted-foreground">The ecosystem is designed to grow. New sector operating systems plug into Coral DPI as needs emerge.</p>
            </div>
          </Reveal>
        </Stagger>
      </section>

      <CTABand />
    </>
  );
}
