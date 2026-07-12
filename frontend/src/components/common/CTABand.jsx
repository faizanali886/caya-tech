import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";

export default function CTABand({
  eyebrow = "Get started",
  title = "Ready to build national-scale digital infrastructure?",
  text = "Talk to our team about a government briefing, a platform demonstration, or a pilot programme.",
  primary = { label: "Request a Government Briefing", to: "/contact?type=government_briefing" },
  secondary = { label: "Explore the ecosystem", to: "/ecosystem" },
}) {
  return (
    <section className="container-px mx-auto max-w-7xl py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-8 py-16 text-primary-foreground sm:px-16">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
          <div className="relative max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">{eyebrow}</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/75 sm:text-lg">{text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-full" data-testid="cta-primary">
                <Link to={primary.to}>{primary.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" data-testid="cta-secondary">
                <Link to={secondary.to}>{secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
