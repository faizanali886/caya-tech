import React from "react";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import LeadForm from "@/components/forms/LeadForm";
import { useSEO } from "@/components/SEO";
import { Heart, Rocket, GraduationCap, Globe2, Sparkles, Scale } from "lucide-react";

const benefits = [
  { icon: Heart, t: "Meaningful impact", d: "Work that improves millions of lives across the region." },
  { icon: Rocket, t: "Growth & ownership", d: "Real responsibility and a path to lead." },
  { icon: Globe2, t: "Remote-friendly", d: "A distributed, Caribbean-first team." },
  { icon: Scale, t: "Equity & inclusion", d: "A culture built on fairness and belonging." },
  { icon: Sparkles, t: "Learning budget", d: "Continuous development and conferences." },
  { icon: GraduationCap, t: "Wellbeing", d: "Health, time off, and flexibility that respects life." },
];

const positions = [
  ["Senior Platform Engineer", "Engineering", "Remote · Caribbean"],
  ["AI/ML Engineer — Nexus", "Engineering", "Remote · Caribbean"],
  ["Product Designer", "Design", "Remote · Caribbean"],
  ["Government Solutions Lead", "Go-to-market", "Hybrid · Bridgetown"],
  ["Security Engineer", "Engineering", "Remote · Caribbean"],
  ["Implementation Manager", "Delivery", "Hybrid · Port of Spain"],
];

export default function Careers() {
  useSEO("Careers", "Join Caya Technologies and help build the Caribbean's digital infrastructure.");
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Mission-driven work, national-scale impact"
        intro="We're building the digital foundations for an entire region. If you want your work to matter, you'll fit right in."
      />
      <section className="container-px mx-auto max-w-7xl py-16">
        <SectionHeading eyebrow="Culture & values" title="Why work at Caya" />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <StaggerItem key={b.t} className="rounded-2xl border border-border bg-card p-7">
              <b.icon className="h-7 w-7 text-coral" />
              <h3 className="mt-4 font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-px mx-auto max-w-7xl py-16">
          <SectionHeading eyebrow="Open positions" title="Join the team" intro="Don't see your role? We also run graduate programmes and internships — apply below and tell us how you'd contribute." />
          <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {positions.map(([title, dept, loc]) => (
              <div key={title} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between" data-testid={`position-${title.toLowerCase().replace(/\s/g, "-")}`}>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{dept} · {loc}</p>
                </div>
                <a href="#apply" className="text-sm font-semibold text-coral hover:underline">Apply →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="container-px mx-auto max-w-3xl py-20">
        <SectionHeading eyebrow="Apply online" title="Tell us about yourself" align="center" className="mb-8" />
        <LeadForm formType="career" title={null} description="Share your background and the role you're interested in. Add a link to your CV or portfolio in your message." />
      </section>
    </>
  );
}
