"use client";

import { useEffect, useRef } from "react";

const clamp = (n: number, min = -1, max = 1) => Math.min(max, Math.max(min, n));

/**
 * Tracks the pointer and exposes a smoothed look direction as --ax / --ay (-1..1) on the wrapper,
 * so anything inside can turn toward the cursor. Falls back to a gentle idle sway on touch screens
 * and holds still for reduced motion. A click triggers a wink (adds .winking for a moment).
 */
export default function LookAt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let lastMove = 0;
    let visible = true;
    let raf = 0;
    let winkTimer: ReturnType<typeof setTimeout> | undefined;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.4;
      target.x = clamp((e.clientX - cx) / (innerWidth * 0.5));
      target.y = clamp((e.clientY - cy) / (innerHeight * 0.5));
      lastMove = performance.now();
    };

    const onDown = () => {
      el.classList.add("winking");
      clearTimeout(winkTimer);
      winkTimer = setTimeout(() => el.classList.remove("winking"), 520);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (now - lastMove > 3500) {
        // idle: slow sway so it feels alive without a pointer
        target.x = Math.sin(now / 1700) * 0.35;
        target.y = Math.sin(now / 2300 + 1) * 0.15;
      }
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      el.style.setProperty("--ax", cur.x.toFixed(3));
      el.style.setProperty("--ay", cur.y.toFixed(3));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerdown", onDown);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(winkTimer);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div ref={ref} className={`av ${className}`}>
      {children}
    </div>
  );
}
