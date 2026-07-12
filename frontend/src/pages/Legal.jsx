import React from "react";
import { useParams } from "react-router-dom";
import PageHero from "@/components/common/PageHero";
import { useSEO } from "@/components/SEO";

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    intro: "How Caya Technologies collects, uses, and protects personal data.",
    sections: [
      ["Our commitment", "We are committed to protecting the privacy of citizens, partners, and visitors. Personal data is processed lawfully, fairly, and transparently."],
      ["Data we collect", "We collect only the information necessary to respond to enquiries, deliver services, and improve our platforms — including details submitted through our forms."],
      ["How we use data", "Submitted information is used to respond to your request and is never sold. Where applicable, data is handled in line with regional data-protection standards."],
      ["Your rights", "You may request access to, correction of, or deletion of your personal data at any time by contacting hello@cayatech.com."],
    ],
  },
  terms: {
    title: "Terms of Use",
    intro: "The terms governing your use of the Caya Technologies website.",
    sections: [
      ["Acceptance", "By accessing this website you agree to these terms. If you do not agree, please do not use the site."],
      ["Use of content", "Content is provided for information only. You may not reproduce it for commercial purposes without written permission."],
      ["No warranty", "The website is provided 'as is'. We make no warranties regarding accuracy or availability."],
      ["Contact", "Questions about these terms can be directed to hello@cayatech.com."],
    ],
  },
  security: {
    title: "Security",
    intro: "Our approach to enterprise-grade security and trust.",
    sections: [
      ["Security by design", "Security is foundational to every Caya platform — encryption in transit and at rest, role-based access, and immutable audit logging."],
      ["Compliance", "We align with government security standards and accessibility requirements (WCAG 2.2 AA)."],
      ["Form protection", "All forms are protected by rate limiting, input validation, and spam filtering."],
      ["Responsible disclosure", "If you discover a security issue, please contact security@cayatech.com."],
    ],
  },
};

export default function Legal() {
  const { doc } = useParams();
  const c = CONTENT[doc] || CONTENT.privacy;
  useSEO(c.title, c.intro);
  return (
    <>
      <PageHero eyebrow="Legal" title={c.title} intro={c.intro} />
      <section className="container-px mx-auto max-w-3xl py-16">
        <div className="space-y-10">
          {c.sections.map(([h, body]) => (
            <div key={h}>
              <h2 className="text-xl font-semibold">{h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">Last updated {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long" })}.</p>
        </div>
      </section>
    </>
  );
}
