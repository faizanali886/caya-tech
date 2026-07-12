import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";

export default function Subscribers() {
  useSEO("Subscribers");
  const { data = [], isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => (await api.get("/newsletter")).data,
  });
  return (
    <div data-testid="admin-subscribers">
      <h1 className="text-2xl font-semibold">Newsletter subscribers</h1>
      <p className="mt-1 text-sm text-muted-foreground">{data.length} subscriber{data.length === 1 ? "" : "s"}.</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        {isLoading ? (
          <div className="space-y-2 p-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : data.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No subscribers yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {data.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 text-sm">
                <span className="font-medium">{s.email}</span>
                <span className="text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
