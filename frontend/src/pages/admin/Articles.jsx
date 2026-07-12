import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import api from "@/lib/api";
import { useSEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Articles() {
  useSEO("Manage Insights");
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => (await api.get("/admin/articles")).data,
  });
  const del = useMutation({
    mutationFn: (id) => api.delete(`/admin/articles/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-articles"] }); toast.success("Article deleted"); },
  });

  return (
    <div data-testid="admin-articles">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Insights</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage knowledge-centre content.</p>
        </div>
        <Button asChild className="rounded-full" data-testid="new-article-btn">
          <Link to="/admin/articles/new"><Plus className="mr-1 h-4 w-4" /> New article</Link>
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        {isLoading ? (
          <div className="space-y-2 p-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
        ) : data.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No articles yet. Create your first.</p>
        ) : (
          <div className="divide-y divide-border">
            {data.map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-4" data-testid={`article-row-${a.id}`}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold">{a.title}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${a.status === "published" ? "bg-nexus/15 text-nexus" : "bg-muted text-muted-foreground"}`}>{a.status}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{a.category} · {a.excerpt}</p>
                </div>
                <Link to={`/insights/${a.slug}`} target="_blank" className="rounded-lg p-2 text-muted-foreground hover:bg-accent"><ExternalLink className="h-4 w-4" /></Link>
                <Link to={`/admin/articles/${a.id}`} data-testid={`edit-article-${a.id}`} className="rounded-lg p-2 text-muted-foreground hover:bg-accent"><Pencil className="h-4 w-4" /></Link>
                <button onClick={() => { if (window.confirm("Delete this article?")) del.mutate(a.id); }} data-testid={`delete-article-${a.id}`} className="rounded-lg p-2 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
