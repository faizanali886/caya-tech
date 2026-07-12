import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Inbox, MailOpen, Mail, FileText, ArrowRight } from "lucide-react";
import api from "@/lib/api";
import { useSEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  useSEO("CMS Dashboard");
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await api.get("/submissions/stats")).data,
  });
  const { data: recent = [] } = useQuery({
    queryKey: ["admin-recent"],
    queryFn: async () => (await api.get("/submissions")).data,
  });

  const cards = [
    { label: "Total enquiries", value: stats?.total, icon: Inbox },
    { label: "Unread", value: stats?.unread, icon: MailOpen },
    { label: "Newsletter subscribers", value: stats?.newsletter, icon: Mail },
    { label: "Published insights", value: stats?.articles, icon: FileText },
  ];

  return (
    <div data-testid="admin-dashboard">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of activity across the Caya website.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-6">
            <c.icon className="h-5 w-5 text-coral" />
            <div className="mt-4 text-3xl font-bold">{isLoading ? <Skeleton className="h-8 w-16" /> : (c.value ?? 0)}</div>
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent enquiries</h2>
        <Link to="/admin/submissions" className="inline-flex items-center gap-1 text-sm font-semibold text-coral">View all <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {recent.slice(0, 6).map((s) => (
          <div key={s.id} className="flex items-center justify-between p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{s.name} <span className="text-muted-foreground">· {s.email}</span></p>
              <p className="truncate text-sm text-muted-foreground">{s.message}</p>
            </div>
            <span className="ml-4 shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium capitalize">{s.form_type?.replace(/_/g, " ")}</span>
          </div>
        ))}
        {recent.length === 0 && <p className="p-6 text-sm text-muted-foreground">No enquiries yet.</p>}
      </div>
    </div>
  );
}
