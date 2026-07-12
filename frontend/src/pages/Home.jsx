import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Layers, Cpu, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { SectionHeading, Eyebrow } from "@/components/common/Section";
import { StatCounter } from "@/components/StatCounter";
import EcosystemMap from "@/components/EcosystemMap";
import CTABand from "@/components/common/CTABand";
import { useSEO } from "@/components/SEO";
import { STATS, SECTORS, PLATFORMS, ICONS } from "@/data/site";

const pillars = [
  { icon: Layers, title: "Digital Public Infrastructure", desc: "Coral provides the shared identity, payments and data-exchange rails for an entire nation.", accent: "coral" },
  { icon: Cpu, title: "Artificial Intelligence", desc: "Nexus AI delivers responsible, explainable intelligence across every platform.", accent: "nexus" },
  { icon: ShieldCheck, title: "Enterprise-grade Security", desc: "Sovereign, auditable, and compliant by design — built for government scale.", accent: "coral" },
  { icon: Globe2, title: "Caribbean Relevance", desc: "Global standards, engineered for the realities and ambitions of the region.", accent: "nexus" },
];

export default function Home() {
  useSEO("Building the Caribbean's Digital Infrastructure", "Caya Technologies develops interconnected digital platforms for governments, institutions, and businesses.");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden />
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-coral/10 blur-3xl" aria-hidden />
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-nexus/10 blur-3xl" aria-hidden />
        <div className="container-px relative mx-auto max-w-7xl pb-12 pt-20 sm:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>Caribbean Digital Infrastructure</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-5 text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-[4rem]">
                  Building the Digital Infrastructure for the Caribbean's{" "}
                  <span className="text-coral">Next Economy.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Caya Technologies develops interconnected digital platforms that enable governments, institutions, and businesses to modernize services, improve efficiency, and create better experiences for citizens and communities.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="group rounded-full" data-testid="hero-primary-cta">
                    <Link to="/contact?type=government_briefing">
                      Request a Government Briefing
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full" data-testid="hero-secondary-cta">
                    <Link to="/ecosystem">Explore Our Ecosystem</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1653549893012-b8b4fbe97630?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
                    alt="Abstract digital network representing connected infrastructure"
                    className="h-[420px] w-full object-cover"
                    loading="eager"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                  className="glass absolute -bottom-6 -left-6 hidden rounded-2xl border border-border p-5 sm:block"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-coral text-coral-foreground font-display font-bold">C</span>
                    <div>
                      <p className="text-sm font-semibold">Coral DPI</p>
                      <p className="text-xs text-muted-foreground">Connecting every platform</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* sector marquee */}
          <Reveal delay={0.3}>
            <div className="mt-16 border-y border-border py-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="label-eyebrow">Capabilities</span>
                {SECTORS.map((s) => (
                  <span key={s} className="text-sm font-medium text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="container-px mx-auto max-w-7xl py-16">
        <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="rounded-2xl border border-border bg-card p-7">
              <div className="text-4xl font-bold text-foreground sm:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} display={s.display} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* PILLARS */}
      <section className="container-px mx-auto max-w-7xl py-16">
        <SectionHeading
          eyebrow="Why Caya"
          title="A single, interconnected foundation for the public good"
          intro="We don't build isolated apps. We build an ecosystem — where shared infrastructure and shared intelligence compound the value of every service."
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <StaggerItem key={p.title} className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus"}`}>
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ECOSYSTEM */}
      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-20">
          <SectionHeading
            eyebrow="The Ecosystem"
            title="Coral DPI at the center. Intelligence everywhere."
            intro="Explore how every sector operating system connects to the shared Coral foundation and draws intelligence from Nexus AI."
            className="mb-12"
          />
          <EcosystemMap />
        </div>
      </section>

      {/* FEATURED PLATFORMS */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Platforms" title="Purpose-built operating systems" />
          <Button asChild variant="ghost" className="group" data-testid="view-all-platforms">
            <Link to="/ecosystem">View all platforms <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </Button>
        </div>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.slice(0, 6).map((p) => {
            const Icon = ICONS[p.icon] || ICONS.Network;
            return (
              <StaggerItem key={p.slug}>
                <Link to={`/platforms/${p.slug}`} data-testid={`home-platform-${p.slug}`} className="group block h-full rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${p.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{p.full}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{p.overview}</p>
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
