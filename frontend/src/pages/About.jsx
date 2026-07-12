import React from "react";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import CTABand from "@/components/common/CTABand";
import { useSEO } from "@/components/SEO";
import { Target, Eye, Compass, Heart, Globe2, Shield } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust by design", desc: "Security, privacy, and transparency are foundational, not afterthoughts." },
  { icon: Globe2, title: "Regional commitment", desc: "Global standards engineered for Caribbean realities and ambitions." },
  { icon: Heart, title: "Citizen-centric", desc: "Every decision is measured by the experience it creates for people." },
  { icon: Compass, title: "Interoperable", desc: "We build shared infrastructure, never isolated silos." },
];

export default function About() {
  useSEO("About", "Our mission, vision, and commitment to building shared digital infrastructure for the Caribbean.");
  return (
    <>
      <PageHero
        eyebrow="About Caya Technologies"
        title="We build the digital foundations nations rely on"
        intro="Caya Technologies designs and deploys Digital Public Infrastructure, AI platforms, and sector operating systems — giving Caribbean governments and institutions a sovereign, interconnected foundation for the next economy."
        image="https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
      />

      <section className="container-px mx-auto max-w-7xl py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <Target className="h-7 w-7 text-coral" />
              <h2 className="mt-4 text-2xl font-semibold">Mission</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">To build the shared digital infrastructure and intelligence that enable Caribbean governments and institutions to deliver better services, make better decisions, and create better lives for citizens.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <Eye className="h-7 w-7 text-nexus" />
              <h2 className="mt-4 text-2xl font-semibold">Vision</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">A connected Caribbean where every citizen has trusted digital identity and access, every institution shares the same foundation, and intelligence flows across an interoperable regional ecosystem.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="Our Story" title="Built for the region, by the region" />
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <p>Caya was founded on a simple conviction: the Caribbean should not import fragmented technology — it should own a shared, sovereign foundation built for its own context.</p>
                <p>We saw governments spending repeatedly on disconnected systems that could not share data, verify identity, or scale. So we set out to build the opposite: an interconnected ecosystem where Coral DPI provides the foundation and Nexus AI delivers intelligence across every sector.</p>
                <p>Today, Caya is building the digital public infrastructure for the Caribbean's next economy — platform by platform, partner by partner.</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <SectionHeading eyebrow="Why Shared Infrastructure" title="The case for a common foundation" />
              <ul className="mt-6 space-y-4">
                {[
                  "Small states gain disproportionate value from shared, reusable infrastructure.",
                  "Interoperability eliminates duplicated spend across ministries and islands.",
                  "A common identity and consent layer builds lasting citizen trust.",
                  "Regional integration becomes possible when systems speak the same language.",
                ].map((t) => (
                  <li key={t} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />
                    <span className="text-sm leading-relaxed text-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20">
        <SectionHeading eyebrow="Company Values" title="What guides our work" intro="Our leadership philosophy and digital transformation approach are grounded in a few enduring principles." />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title} className="rounded-2xl border border-border bg-card p-7">
              <v.icon className="h-7 w-7 text-coral" />
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand title="Partner with the team building Caribbean digital infrastructure" eyebrow="Work with us" />
    </>
  );
}
