import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api, { formatApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const FORM_TITLES = {
  government_briefing: "Request a Government Briefing",
  demo: "Request a Demonstration",
  general: "General Enquiry",
  partner: "Partner Application",
  investor: "Investor Enquiry",
  media: "Media Contact",
  career: "Career Application",
  consultation: "Request a Consultation",
};

export default function LeadForm({
  formType = "general",
  platform = "",
  compact = false,
  showOrg = true,
  showSubject = false,
  title,
  description,
}) {
  const [form, setForm] = useState({
    name: "", email: "", organization: "", role: "", phone: "", subject: "", message: "", hp_field: "",
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (!form.message.trim()) er.message = "Please add a short message.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      const { data } = await api.post("/submissions", {
        form_type: formType, platform,
        name: form.name, email: form.email, organization: form.organization,
        role: form.role, phone: form.phone, subject: form.subject, message: form.message,
        meta: { hp_field: form.hp_field },
      });
      setDone(true);
      toast.success(data.message || "Submitted successfully.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        data-testid="form-success"
        className="rounded-2xl border border-border bg-card p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-coral" />
        <h3 className="mt-4 text-2xl font-semibold">Thank you</h3>
        <p className="mt-2 text-muted-foreground">Our team has received your request and will be in touch shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} data-testid={`lead-form-${formType}`} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      {title !== null && <h3 className="text-xl font-semibold">{title || FORM_TITLES[formType]}</h3>}
      {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}

      {/* honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" value={form.hp_field}
             onChange={set("hp_field")} className="hidden" aria-hidden />

      <div className={`mt-5 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Full name" required error={errors.name}>
          <Input value={form.name} onChange={set("name")} placeholder="Jane Doe" data-testid="field-name" />
        </Field>
        <Field label="Email" required error={errors.email}>
          <Input type="email" value={form.email} onChange={set("email")} placeholder="jane@organization.gov" data-testid="field-email" />
        </Field>
        {showOrg && (
          <>
            <Field label="Organization">
              <Input value={form.organization} onChange={set("organization")} placeholder="Ministry / Company" data-testid="field-organization" />
            </Field>
            <Field label="Role / Title">
              <Input value={form.role} onChange={set("role")} placeholder="Director, CTO…" data-testid="field-role" />
            </Field>
          </>
        )}
        {showSubject && (
          <Field label="Subject" className="sm:col-span-2">
            <Input value={form.subject} onChange={set("subject")} placeholder="How can we help?" data-testid="field-subject" />
          </Field>
        )}
      </div>

      <Field label="Message" required error={errors.message} className="mt-4">
        <Textarea rows={4} value={form.message} onChange={set("message")} placeholder="Tell us about your goals…" data-testid="field-message" />
      </Field>

      <Button type="submit" disabled={busy} className="mt-5 w-full rounded-full sm:w-auto" data-testid="lead-form-submit">
        {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</> : "Submit request"}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">Protected by spam filtering & rate limiting. We respect your privacy.</p>
    </form>
  );
}

function Field({ label, required, error, children, className = "" }) {
  return (
    <div className={className}>
      <Label className="text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-coral">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive" data-testid="field-error">{error}</p>}
    </div>
  );
}
