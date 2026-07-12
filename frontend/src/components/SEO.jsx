import { useEffect } from "react";

export function useSEO(title, description) {
  useEffect(() => {
    if (title) document.title = `${title} — Caya Technologies`;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute("content", description);
    }
  }, [title, description]);
}
