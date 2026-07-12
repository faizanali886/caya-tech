import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import CTABand from "@/components/common/CTABand";
import { useSEO } from "@/components/SEO";
import { GOV_BODIES, PLATFORMS, ICONS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, FileCheck2, Users2 } from "lucide-react";

export default function Government() {
  useSEO("Government Solutions", "How Caya Technologies supports governments — from the Prime Minister's Office to local government.");
  return (
    <>
      <PageHero
        eyebrow="Government Solutions"
        title="Digital transformation for the whole of government"
        intro="From the Prime Minister's Office to local councils, Caya gives every part of government a shared foundation, sector operating systems, and the intelligence to serve citizens better."
        image="https://images.unsplash.com/photo-1621831337128-35676ca30868?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
      >
        <Button asChild size="lg" className="rounded-full" data-testid="gov-briefing-cta">
          <Link to="/contact?type=government_briefing">Request a Government Briefing <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </PageHero>

      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading eyebrow="Who we serve" title="Built for every government domain" intro="Caya supports the full spectrum of public institutions with tailored platforms on a common foundation." />
        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {GOV_BODIES.map((g) => (
            <StaggerItem key={g} className="rounded-xl border border-border bg-card p-5 text-sm font-medium transition-colors hover:bg-accent">{g}</StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-20">
          <SectionHeading eyebrow="Why governments choose Caya" title="Confidence at national scale" />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, t: "Sovereign & secure", d: "Data sovereignty, enterprise security, and full auditability built in." },
              { icon: FileCheck2, t: "Standards-based", d: "Open, interoperable standards that prevent vendor lock-in." },
              { icon: Users2, t: "Citizen-centric", d: "Services designed around citizen needs and accessibility." },
            ].map((x) => (
              <StaggerItem key={x.t} className="rounded-2xl border border-border bg-card p-7">
                <x.icon className="h-7 w-7 text-coral" />
                <h3 className="mt-4 font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading eyebrow="Platforms for government" title="Operating systems for the public sector" />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((p) => {
            const Icon = ICONS[p.icon] || ICONS.Network;
            return (
              <StaggerItem key={p.slug}>
                <Link to={`/platforms/${p.slug}`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${p.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus"}`}><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 font-semibold">{p.full}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
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
