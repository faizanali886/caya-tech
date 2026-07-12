import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function StatCounter({ value, suffix = "", display, duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || display) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, display]);

  return (
    <span ref={ref} className="font-display tabular-nums">
      {display || `${n}${suffix}`}
    </span>
  );
}
