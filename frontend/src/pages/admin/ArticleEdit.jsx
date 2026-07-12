import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useSEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ["Article", "Research", "White Paper", "Guide", "Report", "Policy Paper", "Case Study"];
const empty = { title: "", excerpt: "", body: "", category: "Article", tags: "", cover_image: "", author: "Caya Technologies", status: "published" };

export default function ArticleEdit() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  useSEO(isNew ? "New article" : "Edit article");
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin-article", id],
    queryFn: async () => (await api.get("/admin/articles")).data.find((a) => a.id === id),
    enabled: !isNew,
  });

  useEffect(() => {
    if (data) setForm({ ...data, tags: (data.tags || []).join(", ") });
  }, [data]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    setBusy(true);
    const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      if (isNew) await api.post("/admin/articles", payload);
      else await api.put(`/admin/articles/${id}`, payload);
      toast.success(isNew ? "Article created" : "Article saved");
      navigate("/admin/articles");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-3xl" data-testid="article-editor">
      <button onClick={() => navigate("/admin/articles")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to insights</button>
      <h1 className="mt-4 text-2xl font-semibold">{isNew ? "New article" : "Edit article"}</h1>

      <form onSubmit={save} className="mt-8 space-y-5">
        <div>
          <Label className="text-xs">Title</Label>
          <Input value={form.title} onChange={set("title")} placeholder="Article title" className="mt-1.5" data-testid="article-title" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Category</Label>
            <Select value={form.category} onValueChange={set("category")}>
              <SelectTrigger className="mt-1.5" data-testid="article-category"><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Status</Label>
            <Select value={form.status} onValueChange={set("status")}>
              <SelectTrigger className="mt-1.5" data-testid="article-status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="text-xs">Cover image URL</Label>
          <Input value={form.cover_image} onChange={set("cover_image")} placeholder="https://…" className="mt-1.5" data-testid="article-cover" />
        </div>
        <div>
          <Label className="text-xs">Excerpt</Label>
          <Textarea rows={2} value={form.excerpt} onChange={set("excerpt")} placeholder="Short summary" className="mt-1.5" data-testid="article-excerpt" />
        </div>
        <div>
          <Label className="text-xs">Body</Label>
          <Textarea rows={10} value={form.body} onChange={set("body")} placeholder="Full article content (paragraphs separated by line breaks)" className="mt-1.5" data-testid="article-body" />
        </div>
        <div>
          <Label className="text-xs">Tags (comma separated)</Label>
          <Input value={form.tags} onChange={set("tags")} placeholder="DPI, Policy, AI" className="mt-1.5" data-testid="article-tags" />
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={busy} className="rounded-full" data-testid="article-save">
            {busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…</> : "Save article"}
          </Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={() => navigate("/admin/articles")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
