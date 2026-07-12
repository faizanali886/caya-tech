import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PLATFORMS, ICONS } from "@/data/site";

// Orbit platforms exclude the two core nodes (Coral center, Nexus inner ring handled specially).
const orbit = PLATFORMS.filter((p) => p.slug !== "coral-dpi");

export default function EcosystemMap() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const size = 560;
  const c = size / 2;
  const R = 215;

  const nodes = orbit.map((p, i) => {
    const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
    return { ...p, x: c + R * Math.cos(angle), y: c + R * Math.sin(angle) };
  });

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative mx-auto w-full max-w-[560px]" data-testid="ecosystem-map">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full" role="img" aria-label="Caya ecosystem map with Coral DPI at the center">
          {/* connecting lines */}
          {nodes.map((n) => (
            <line
              key={`l-${n.slug}`} x1={c} y1={c} x2={n.x} y2={n.y}
              stroke={active && active !== n.slug ? "hsl(var(--border))" : "hsl(var(--coral))"}
              strokeOpacity={active && active !== n.slug ? 0.25 : 0.55}
              strokeWidth={active === n.slug ? 2 : 1}
              className="flow-line transition-all"
            />
          ))}
          {/* orbit ring */}
          <circle cx={c} cy={c} r={R} fill="none" stroke="hsl(var(--border))" strokeOpacity="0.5" strokeDasharray="2 8" />

          {/* center coral node */}
          <g
            onClick={() => navigate("/platforms/coral-dpi")}
            className="cursor-pointer"
            data-testid="ecosystem-node-coral-dpi"
            onMouseEnter={() => setActive(null)}
          >
            <circle cx={c} cy={c} r="58" fill="hsl(var(--coral))" fillOpacity="0.12" className="pulse-ring" style={{ transformOrigin: `${c}px ${c}px` }} />
            <circle cx={c} cy={c} r="46" fill="hsl(var(--coral))" />
            <text x={c} y={c - 2} textAnchor="middle" className="fill-[hsl(var(--coral-foreground))] font-display" fontSize="15" fontWeight="700">Coral</text>
            <text x={c} y={c + 15} textAnchor="middle" className="fill-[hsl(var(--coral-foreground))]" fontSize="9" opacity="0.85">DPI Core</text>
          </g>

          {/* orbit nodes */}
          {nodes.map((n) => {
            const Icon = ICONS[n.icon] || ICONS.Network;
            const dim = active && active !== n.slug;
            return (
              <g
                key={n.slug}
                transform={`translate(${n.x},${n.y})`}
                className="cursor-pointer transition-opacity"
                style={{ opacity: dim ? 0.4 : 1 }}
                onMouseEnter={() => setActive(n.slug)}
                onMouseLeave={() => setActive(null)}
                onClick={() => navigate(`/platforms/${n.slug}`)}
                data-testid={`ecosystem-node-${n.slug}`}
              >
                <circle r="34" fill="hsl(var(--surface))" stroke={n.accent === "coral" ? "hsl(var(--coral))" : "hsl(var(--nexus))"} strokeWidth={active === n.slug ? 2 : 1.25} />
                <foreignObject x="-12" y="-20" width="24" height="24">
                  <Icon className={`h-5 w-5 ${n.accent === "coral" ? "text-coral" : "text-nexus"}`} />
                </foreignObject>
                <text y="20" textAnchor="middle" className="fill-foreground font-display" fontSize="9.5" fontWeight="600">{n.name}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div data-testid="ecosystem-detail">
        {active ? (
          <ActivePanel platform={PLATFORMS.find((p) => p.slug === active)} navigate={navigate} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-border bg-card p-8">
            <span className="label-eyebrow">The Connected Ecosystem</span>
            <h3 className="mt-3 text-2xl font-semibold">One foundation. Every sector.</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              <span className="font-semibold text-coral">Coral DPI</span> sits at the center — providing shared identity, payments, and data-exchange rails. Every sector operating system plugs in, and <span className="font-semibold text-nexus">Nexus AI</span> delivers intelligence across them all.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Hover or tap any node to explore a platform.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ActivePanel({ platform, navigate }) {
  if (!platform) return null;
  const Icon = ICONS[platform.icon] || ICONS.Network;
  return (
    <motion.div
      key={platform.slug}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-8"
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${platform.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-2xl font-semibold">{platform.full}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{platform.tagline}</p>
      <button
        onClick={() => navigate(`/platforms/${platform.slug}`)}
        data-testid="ecosystem-explore-btn"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:gap-3 transition-all"
      >
        Explore platform <span aria-hidden>→</span>
      </button>
    </motion.div>
  );
}
