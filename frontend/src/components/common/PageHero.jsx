import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/Section";

export default function PageHero({ eyebrow, title, intro, children, image }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-coral/10 blur-3xl" aria-hidden />
      <div className="container-px relative mx-auto max-w-7xl py-20 sm:py-28">
        <div className={image ? "grid items-center gap-12 lg:grid-cols-2" : "max-w-3xl"}>
          <Reveal>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
            {children && <div className="mt-8">{children}</div>}
          </Reveal>
          {image && (
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-border">
                <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
