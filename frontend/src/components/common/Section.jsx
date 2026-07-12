import React from "react";

export function Eyebrow({ children, className = "" }) {
  return (
    <span className={`label-eyebrow inline-flex items-center gap-2 ${className}`}>
      <span className="h-px w-6 bg-coral" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = "left", className = "" }) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>}
    </div>
  );
}
