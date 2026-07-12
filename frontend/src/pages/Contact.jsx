import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/common/Reveal";
import LeadForm from "@/components/forms/LeadForm";
import { useSEO } from "@/components/SEO";
import { MapPin, Phone, Mail, Landmark, Handshake, TrendingUp, Newspaper, MessageSquare } from "lucide-react";

const ENQUIRY_TYPES = [
  { key: "government_briefing", label: "Government", icon: Landmark, desc: "Briefings & public-sector projects" },
  { key: "demo", label: "Demonstration", icon: MessageSquare, desc: "See a platform live" },
  { key: "partner", label: "Partner", icon: Handshake, desc: "Partnership opportunities" },
  { key: "investor", label: "Investor", icon: TrendingUp, desc: "Investment enquiries" },
  { key: "media", label: "Media", icon: Newspaper, desc: "Press & media" },
  { key: "general", label: "General", icon: Mail, desc: "Everything else" },
];

export default function Contact() {
  useSEO("Contact", "Contact Caya Technologies — government, partner, investor, media, and general enquiries.");
  const location = useLocation();
  const [type, setType] = useState("general");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("type");
    if (t && ENQUIRY_TYPES.some((e) => e.key === t)) setType(t);
  }, [location.search]);

  const platform = new URLSearchParams(location.search).get("platform") || "";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something national in scale"
        intro="Whether you represent a government, an institution, a partner, or the press — choose your enquiry type and our team will respond promptly."
      />

      <section className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="How can we help?" title="Select an enquiry type" />
            <Stagger className="mt-8 grid grid-cols-2 gap-3">
              {ENQUIRY_TYPES.map((e) => (
                <StaggerItem key={e.key}>
                  <button
                    onClick={() => setType(e.key)}
                    data-testid={`enquiry-type-${e.key}`}
                    className={`flex h-full w-full flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all ${type === e.key ? "border-coral bg-coral/5" : "border-border bg-card hover:bg-accent"}`}
                  >
                    <e.icon className={`h-5 w-5 ${type === e.key ? "text-coral" : "text-muted-foreground"}`} />
                    <span className="font-semibold">{e.label}</span>
                    <span className="text-xs text-muted-foreground">{e.desc}</span>
                  </button>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-7">
              <h4 className="font-semibold">Office</h4>
              <div className="flex items-start gap-3 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 text-coral" /> Caribbean Regional HQ<br />Bridgetown · Port of Spain · Kingston</div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground"><Mail className="h-4 w-4 text-coral" /> hello@cayatech.com</div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground"><Phone className="h-4 w-4 text-coral" /> +1 (000) 000-0000</div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-border" data-testid="contact-map">
              <iframe
                title="Caya office map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-61.6%2C10.5%2C-59.4%2C13.3&layer=mapnik"
                className="h-64 w-full grayscale-[0.3]"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <Reveal key={type}>
              <LeadForm
                formType={type}
                platform={platform}
                showSubject
                description="Complete the form and our team will be in touch shortly."
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
