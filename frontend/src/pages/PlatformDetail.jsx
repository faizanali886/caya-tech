import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowRight, Check, ShieldCheck, Scale, Plug, BarChart3, Sparkles,
  Users, Building2, ImageIcon, FileText, Network,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import LeadForm from "@/components/forms/LeadForm";
import { useSEO } from "@/components/SEO";
import { getPlatform, PLATFORMS, ICONS } from "@/data/site";

const enterprise = [
  { icon: ShieldCheck, title: "Security", desc: "End-to-end encryption, role-based access, and immutable audit logging. Compliant with government security standards.", accent: "coral" },
  { icon: Scale, title: "Scalability", desc: "Cloud-native architecture that scales from a single pilot to national deployment without re-platforming.", accent: "nexus" },
  { icon: Plug, title: "Integration", desc: "Open APIs and standards-based connectors integrate with existing government and third-party systems via Coral DPI.", accent: "coral" },
  { icon: BarChart3, title: "Analytics", desc: "Real-time dashboards and operational analytics, with intelligence delivered by Nexus AI.", accent: "nexus" },
];

export default function PlatformDetail() {
  const { slug } = useParams();
  const p = getPlatform(slug);
  useSEO(p?.full || "Platform", p?.tagline);

  if (!p) return <Navigate to="/ecosystem" replace />;
  const Icon = ICONS[p.icon] || Network;
  const accentBg = p.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus";

  return (
    <>
      <PageHero eyebrow={p.core ? "Core Platform" : "Sector Operating System"} title={p.full} intro={p.tagline}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full" data-testid="platform-demo-cta">
            <Link to={`/contact?type=demo&platform=${p.slug}`}>Request a Demonstration <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/ecosystem">Back to ecosystem</Link>
          </Button>
        </div>
        <span className={`mt-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accentBg}`}>
          <Icon className="h-6 w-6" />
        </span>
      </PageHero>

      {/* OVERVIEW */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Overview" title="What it is" />
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.overview}</p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-7">
              <h4 className="font-semibold">Platform Vision</h4>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading eyebrow="Key Challenges" title="The problems we solve" />
            <ul className="mt-6 space-y-4">
              {p.challenges.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/12 text-coral text-xs font-bold">!</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* MODULES */}
      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-20">
          <SectionHeading eyebrow="Core Modules" title="What's inside the platform" intro="Modular capabilities that deploy independently or as a complete operating system." />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.modules.map((m) => (
              <StaggerItem key={m.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* BENEFITS + USERS */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Benefits" title="Outcomes that matter" />
            <ul className="mt-6 space-y-3">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-nexus/12 text-nexus"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-base text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <SectionHeading eyebrow="Target Users" title="Who it serves" />
            <div className="mt-6 flex flex-wrap gap-3">
              {p.users.map((u) => (
                <span key={u} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">{u}</span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <Users className="h-5 w-5 text-coral" />
                <h4 className="mt-3 font-semibold">Citizen Experience</h4>
                <p className="mt-1.5 text-sm text-muted-foreground">Simple, accessible, mobile-first services with a single trusted identity.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <Building2 className="h-5 w-5 text-nexus" />
                <h4 className="mt-3 font-semibold">Institution Experience</h4>
                <p className="mt-1.5 text-sm text-muted-foreground">Powerful operational tooling, dashboards, and automation for staff.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ARCHITECTURE DIAGRAM */}
      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-20">
          <SectionHeading eyebrow="Architecture" title="How it fits the ecosystem" intro="Every platform is built on Coral DPI and enhanced by Nexus AI." align="center" className="mx-auto" />
          <Reveal>
            <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
              <ArchCard title="Nexus AI" sub="Intelligence Layer" desc="Predictive, conversational, and decision intelligence." tone="nexus" />
              <div className="flex flex-col rounded-2xl border-2 border-coral bg-card p-7">
                <span className="label-eyebrow text-coral">This platform</span>
                <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Sector modules, workflows, and citizen/institution interfaces.</p>
                <div className="mt-auto pt-4 text-xs text-muted-foreground">↓ consumes shared services ↓</div>
              </div>
              <ArchCard title="Coral DPI" sub="Foundation Layer" desc="Identity, payments, interoperability, audit & consent." tone="coral" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENTERPRISE CAPABILITIES */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading eyebrow="Enterprise-grade" title="Security, scale, integration & analytics" />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {enterprise.map((e) => (
            <StaggerItem key={e.title} className="rounded-2xl border border-border bg-card p-7">
              <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${e.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus"}`}>
                <e.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* AI FEATURES */}
      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="Powered by Nexus AI" title="Artificial intelligence features" />
              <ul className="mt-6 space-y-3">
                {p.aiFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-nexus" />
                    <span className="text-sm leading-relaxed text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              <SectionHeading eyebrow="Coming soon" title="Screenshots & case studies" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Placeholder icon={ImageIcon} label="Product screenshots" />
                <Placeholder icon={FileText} label="Case studies" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Detailed product imagery and implementation case studies are being prepared. Request a demonstration to see the platform live.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading eyebrow="Implementation Approach" title="From pilot to national scale" intro="A proven, low-risk path to adoption." />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-4">
          {[
            ["01", "Discovery", "Briefing, needs assessment, and success metrics."],
            ["02", "Pilot", "A focused deployment proving value quickly."],
            ["03", "Scale", "Phased rollout across institutions and regions."],
            ["04", "Operate", "Ongoing support, optimization, and intelligence."],
          ].map(([n, t, d]) => (
            <StaggerItem key={n} className="rounded-2xl border border-border bg-card p-7">
              <span className="font-mono text-sm text-coral">{n}</span>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* DEMO FORM */}
      <section className="container-px mx-auto max-w-3xl py-12 pb-24">
        <SectionHeading eyebrow="Get started" title={`Request a ${p.name} demonstration`} className="mb-8" />
        <LeadForm formType="demo" platform={p.slug} title={null} />
      </section>

      {/* OTHER PLATFORMS */}
      <section className="border-t border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-16">
          <h3 className="text-lg font-semibold">Explore other platforms</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {PLATFORMS.filter((x) => x.slug !== p.slug).map((x) => (
              <Link key={x.slug} to={`/platforms/${x.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">{x.name}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ArchCard({ title, sub, desc, tone }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-7">
      <span className={`label-eyebrow ${tone === "coral" ? "text-coral" : "text-nexus"}`}>{sub}</span>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Placeholder({ icon: Icon, label }) {
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background/50 text-muted-foreground">
      <Icon className="h-7 w-7" />
      <span className="mt-2 text-xs">{label}</span>
    </div>
  );
}
