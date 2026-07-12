import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { PLATFORMS, INDUSTRIES } from "@/data/site";
import api, { formatApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const cols = [
  { title: "Platforms", links: PLATFORMS.slice(0, 6).map((p) => [p.name, `/platforms/${p.slug}`]) },
  { title: "Solutions", links: [["Government", "/government"], ...INDUSTRIES.slice(0, 5).map((i) => [i.name, `/industries/${i.slug}`])] },
  { title: "Company", links: [["About", "/about"], ["Insights", "/insights"], ["Partners", "/partners"], ["Careers", "/careers"], ["Contact", "/contact"]] },
  { title: "Resources", links: [["Privacy", "/legal/privacy"], ["Terms", "/legal/terms"], ["Security", "/legal/security"], ["Admin", "/admin/login"]] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      const { data } = await api.post("/newsletter", { email });
      toast.success(data.message || "Subscribed.");
      setEmail("");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer data-testid="footer" className="border-t border-border bg-surface">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Caya Technologies builds the interconnected digital infrastructure for the Caribbean's next economy — where Coral DPI provides the foundation and Nexus AI delivers intelligence across every sector.
            </p>
            <form onSubmit={subscribe} className="mt-6 max-w-sm" data-testid="footer-newsletter-form">
              <label className="label-eyebrow">Subscribe to Caya Insights</label>
              <div className="mt-2 flex gap-2">
                <Input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organization.gov" data-testid="newsletter-email-input"
                  className="rounded-full"
                />
                <Button type="submit" disabled={busy} size="icon" className="shrink-0 rounded-full" data-testid="newsletter-submit">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([label, to]) => (
                    <li key={to}>
                      <Link to={to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Caya Technologies. Building Caribbean Digital Infrastructure.</p>
          <div className="flex items-center gap-3">
            {[Linkedin, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
