import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Mail, Check } from "lucide-react";
import api from "@/lib/api";
import { useSEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

const TYPES = ["all", "government_briefing", "demo", "consultation", "partner", "investor", "media", "career", "general"];

export default function Submissions() {
  useSEO("Enquiries");
  const qc = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["submissions", filter],
    queryFn: async () => (await api.get("/submissions", { params: { form_type: filter } })).data,
  });

  const markRead = useMutation({
    mutationFn: (id) => api.patch(`/submissions/${id}/read`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
  const del = useMutation({
    mutationFn: (id) => api.delete(`/submissions/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["submissions"] }); toast.success("Deleted"); setSelected(null); },
  });

  const open = (s) => { setSelected(s); if (!s.read) markRead.mutate(s.id); };

  return (
    <div data-testid="admin-submissions">
      <h1 className="text-2xl font-semibold">Enquiries</h1>
      <p className="mt-1 text-sm text-muted-foreground">Form submissions from across the website.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t} onClick={() => setFilter(t)}
            data-testid={`filter-${t}`}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filter === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"}`}
          >
            {t.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {isLoading ? (
          <div className="space-y-2 p-4">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
        ) : data.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No enquiries in this category.</p>
        ) : (
          <div className="divide-y divide-border">
            {data.map((s) => (
              <button
                key={s.id} onClick={() => open(s)}
                data-testid={`submission-row-${s.id}`}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-accent"
              >
                {!s.read && <span className="h-2 w-2 shrink-0 rounded-full bg-coral" />}
                <div className="min-w-0 flex-1">
                  <p className={`truncate ${s.read ? "font-medium" : "font-semibold"}`}>{s.name} <span className="text-muted-foreground">· {s.email}</span></p>
                  <p className="truncate text-sm text-muted-foreground">{s.subject || s.message}</p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium capitalize sm:block">{s.form_type?.replace(/_/g, " ")}</span>
                <span className="hidden shrink-0 text-xs text-muted-foreground md:block">{new Date(s.created_at).toLocaleDateString()}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">{selected.name}
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium capitalize">{selected.form_type?.replace(/_/g, " ")}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <Row label="Email" value={selected.email} />
                {selected.organization && <Row label="Organization" value={selected.organization} />}
                {selected.role && <Row label="Role" value={selected.role} />}
                {selected.phone && <Row label="Phone" value={selected.phone} />}
                {selected.platform && <Row label="Platform" value={selected.platform} />}
                {selected.subject && <Row label="Subject" value={selected.subject} />}
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Message</p>
                  <p className="mt-1 whitespace-pre-wrap rounded-lg border border-border bg-background p-3">{selected.message}</p>
                </div>
                <p className="text-xs text-muted-foreground">Received {new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><Mail className="h-4 w-4" /> Reply</a>
                <button onClick={() => del.mutate(selected.id)} data-testid="delete-submission" className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /> Delete</button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-2">
      <span className="w-24 shrink-0 text-xs font-medium text-muted-foreground">{label}</span>
      <span className="break-all">{value}</span>
    </div>
  );
}
