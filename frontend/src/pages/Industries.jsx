import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import CTABand from "@/components/common/CTABand";
import { useSEO } from "@/components/SEO";
import { INDUSTRIES, ICONS } from "@/data/site";
import { ArrowRight } from "lucide-react";

export default function Industries() {
  useSEO("Industries", "Sector solutions across government, healthcare, education, agriculture, tourism, commerce, climate, and more.");
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Solutions for every sector of the economy"
        intro="Each industry gets a purpose-built operating system — all connected to Coral DPI and powered by Nexus AI."
      />
      <section className="container-px mx-auto max-w-7xl py-20">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i) => {
            const Icon = ICONS[i.icon] || ICONS.Network;
            return (
              <StaggerItem key={i.slug}>
                <Link to={`/industries/${i.slug}`} data-testid={`industry-card-${i.slug}`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-nexus/12 text-nexus"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg font-semibold">{i.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{i.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
      <CTABand />
    </>
  );
}
