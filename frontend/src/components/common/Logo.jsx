import React from "react";
import { Link } from "react-router-dom";

export function Logo({ className = "", onClick }) {
  return (
    <Link to="/" onClick={onClick} data-testid="logo-link" className={`flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
        <circle cx="16" cy="16" r="4" fill="hsl(var(--coral))" />
        <circle cx="16" cy="16" r="9" stroke="hsl(var(--coral))" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="25" cy="9" r="1.8" fill="hsl(var(--nexus))" />
        <circle cx="7" cy="9" r="1.8" fill="hsl(var(--nexus))" />
        <circle cx="7" cy="23" r="1.8" fill="hsl(var(--nexus))" />
        <circle cx="25" cy="23" r="1.8" fill="hsl(var(--nexus))" />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Caya<span className="text-coral">.</span>
      </span>
    </Link>
  );
}
