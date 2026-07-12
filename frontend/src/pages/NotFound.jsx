import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/components/SEO";

export default function NotFound() {
  useSEO("Page not found", "The page you are looking for could not be found.");
  return (
    <section className="container-px mx-auto flex max-w-3xl flex-col items-center py-32 text-center">
      <span className="font-display text-7xl font-bold text-coral">404</span>
      <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <Button asChild className="mt-8 rounded-full"><Link to="/">Back to home</Link></Button>
    </section>
  );
}
