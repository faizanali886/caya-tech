import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { NAV, PLATFORMS, ICONS } from "@/data/site";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetTrigger, SheetClose,
} from "@/components/ui/sheet";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
} from "@/components/ui/command";

function MegaItem({ item, onNavigate }) {
  const Icon = ICONS[item.icon] || ICONS.Network;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      data-testid={`mega-link-${item.to.replace(/\//g, "-")}`}
      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
    >
      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${item.accent === "coral" ? "bg-coral/12 text-coral" : "bg-nexus/12 text-nexus"}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{item.label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground line-clamp-2">{item.desc}</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpen(null); }, [location.pathname]);

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-border" : "bg-transparent"}`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpen(null)}>
          {NAV.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.mega ? item.label : null)}>
              <Link
                to={item.to}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
                {item.mega && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
              <AnimatePresence>
                {item.mega && open === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-[min(92vw,640px)] rounded-xl border border-border bg-popover p-3 shadow-xl">
                      <div className="grid grid-cols-2 gap-1">
                        {item.mega.map((m) => (
                          <MegaItem key={m.to + m.label} item={m} onNavigate={() => setOpen(null)} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            data-testid="search-open"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
          >
            <Search className="h-4 w-4" />
          </button>
          <div className="hidden sm:block"><ThemeToggle /></div>
          <select
            data-testid="language-select"
            aria-label="Language"
            className="hidden h-9 rounded-full border border-border bg-transparent px-3 text-xs font-medium text-foreground lg:block"
            defaultValue="en"
          >
            <option value="en">EN</option>
            <option value="es" disabled>ES (soon)</option>
            <option value="fr" disabled>FR (soon)</option>
          </select>
          <Button asChild size="sm" className="hidden rounded-full md:inline-flex" data-testid="nav-cta">
            <Link to="/contact?type=government_briefing">Request a Briefing</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button data-testid="mobile-menu-trigger" aria-label="Open menu" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
              <div className="flex items-center justify-between border-b border-border p-4">
                <Logo />
                <SheetClose asChild>
                  <button aria-label="Close" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"><X className="h-4 w-4" /></button>
                </SheetClose>
              </div>
              <div className="p-4">
                {NAV.map((item) => (
                  <div key={item.label} className="border-b border-border/60 py-1">
                    <Link to={item.to} data-testid={`mobile-nav-${item.label.toLowerCase()}`} className="block py-2.5 text-base font-semibold">{item.label}</Link>
                    {item.mega && (
                      <div className="mb-2 ml-1 space-y-1">
                        {item.mega.map((m) => (
                          <Link key={m.to + m.label} to={m.to} className="block py-1.5 text-sm text-muted-foreground">{m.label}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between">
                  <ThemeToggle />
                  <Button asChild className="rounded-full"><Link to="/contact?type=government_briefing">Request a Briefing</Link></Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search platforms, solutions, pages…" data-testid="global-search-input" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Platforms">
            {PLATFORMS.map((p) => (
              <CommandItem key={p.slug} value={p.full} onSelect={() => { setSearchOpen(false); window.location.href = `/platforms/${p.slug}`; }}>
                {p.full}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Pages">
            {[["Home", "/"], ["About", "/about"], ["Government Solutions", "/government"], ["Industries", "/industries"], ["Insights", "/insights"], ["Partners", "/partners"], ["Careers", "/careers"], ["Contact", "/contact"]].map(([l, to]) => (
              <CommandItem key={to} value={l} onSelect={() => { setSearchOpen(false); window.location.href = to; }}>{l}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
