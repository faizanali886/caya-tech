import React from "react";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Stagger, StaggerItem } from "@/components/common/Reveal";
import LeadForm from "@/components/forms/LeadForm";
import { useSEO } from "@/components/SEO";

const CATEGORIES = [
  "Technology", "Implementation", "Systems Integration", "Cloud Infrastructure",
  "Education", "Healthcare", "Government", "Tourism",
  "Regional Organizations", "Financial Institutions", "Universities",
];

export default function Partners() {
  useSEO("Partners", "Partner with Caya Technologies to build the Caribbean's digital ecosystem.");
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Build the ecosystem with us"
        intro="Caya works with technology, implementation, and sector partners across the region. Together we deliver national-scale digital infrastructure."
      />
      <section className="container-px mx-auto max-w-7xl py-16">
        <SectionHeading eyebrow="Partnership categories" title="Ways to partner with Caya" />
        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <StaggerItem key={c} className="rounded-2xl border border-border bg-card p-6 text-sm font-semibold transition-colors hover:bg-accent">{c}</StaggerItem>
          ))}
        </Stagger>
      </section>
      <section className="border-t border-border bg-surface">
        <div className="container-px mx-auto max-w-3xl py-20">
          <SectionHeading eyebrow="Partnership enquiry" title="Apply to become a partner" align="center" className="mb-8" />
          <LeadForm formType="partner" title={null} />
        </div>
      </section>
    </>
  );
}
