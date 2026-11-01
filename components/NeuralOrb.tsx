"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; z: number };
type Pulse = { e: number; t: number; v: number; dir: 1 | -1 };

const N = 120;
const LINK = 0.5;
const clamp = (n: number, min = -1, max = 1) => Math.min(max, Math.max(min, n));

function build() {
  const nodes: Node[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * i) / (N - 1);
    const r = Math.sqrt(1 - y * y);
    const a = i * golden;
    nodes.push({ x: Math.cos(a) * r, y, z: Math.sin(a) * r });
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y, nodes[i].z - nodes[j].z);
      if (d < LINK) edges.push([i, j]);
    }
  }
  return { nodes, edges };
}

/**
 * A live neural-network sphere. It turns toward the cursor, nodes near the pointer light up and fire
 * signals along their connections, and idle pulses keep it alive. Decorative, so aria-hidden.
 */
export default function NeuralOrb() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { nodes, edges } = build();
    const adj: number[][] = nodes.map(() => []);
    edges.forEach(([a, b], i) => {
      adj[a].push(i);
      adj[b].push(i);
    });

    let W = 0;
    let H = 0;
    let dpr = 1;
    const pointer = { x: -999, y: -999, nx: 0, ny: 0, on: false, last: 0 };
    const view = { yaw: 0.6, pitch: 0.15, tx: 0, ty: 0, cx: 0, cy: 0 };
    const pulses: Pulse[] = [];
    const col = { line: "#f1e6d3", glow: "#ff8a4c", core: "#ffffff" };
    const proj = nodes.map(() => ({ x: 0, y: 0, z: 0, s: 1, heat: 0 }));

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      col.line = s.getPropertyValue("--text").trim() || col.line;
      col.glow = s.getPropertyValue("--m3").trim() || col.glow;
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const fire = (node: number) => {
      const list = adj[node];
      if (!list.length || pulses.length > 70) return;
      const e = list[(Math.random() * list.length) | 0];
      pulses.push({ e, t: 0, v: 0.9 + Math.random() * 0.9, dir: edges[e][0] === node ? 1 : -1 });
    };

    let idleClock = 0;
    const step = (dt: number, now: number) => {
      // rotation: slow spin + lean toward the cursor
      if (now - pointer.last > 3500) {
        view.tx = Math.sin(now / 2100) * 0.25;
        view.ty = Math.sin(now / 2700 + 1) * 0.15;
      } else {
        view.tx = pointer.nx;
        view.ty = pointer.ny;
      }
      view.cx += (view.tx - view.cx) * 0.06;
      view.cy += (view.ty - view.cy) * 0.06;
      view.yaw += dt * 0.22;
      const yaw = view.yaw + view.cx * 0.9;
      const pitch = view.pitch + view.cy * -0.55;

      const R = Math.min(W, H) * 0.42;
      const cx = W / 2;
      const cy = H / 2;
      const cyaw = Math.cos(yaw);
      const syaw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x1 = n.x * cyaw + n.z * syaw;
        const z1 = -n.x * syaw + n.z * cyaw;
        const y2 = n.y * cp - z1 * sp;
        const z2 = n.y * sp + z1 * cp;
        const s = 3 / (3 - z2);
        const p = proj[i];
        p.x = cx + x1 * R * s;
        p.y = cy + y2 * R * s;
        p.z = z2;
        p.s = s;
        const d = pointer.on ? Math.hypot(p.x - pointer.x, p.y - pointer.y) : 999;
        const target = Math.max(0, 1 - d / (R * 0.55));
        p.heat += (target - p.heat) * 0.18;
        if (target > 0.55 && z2 > -0.2 && Math.random() < 0.035) fire(i);
      }

      idleClock += dt;
      if (idleClock > 0.12) {
        idleClock = 0;
        fire((Math.random() * nodes.length) | 0);
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt * p.v;
        if (p.t >= 1) {
          // relay: continue the signal from the node it reached
          const [a, b] = edges[p.e];
          const arrived = p.dir === 1 ? b : a;
          pulses.splice(i, 1);
          if (Math.random() < 0.55) fire(arrived);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.42;

      // soft core glow
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, R * 1.05);
      g.addColorStop(0, col.glow);
      g.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, R * 1.05, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineCap = "round";
      for (let i = 0; i < edges.length; i++) {
        const a = proj[edges[i][0]];
        const b = proj[edges[i][1]];
        const depth = (a.z + b.z) / 2;
        const heat = Math.max(a.heat, b.heat);
        ctx.globalAlpha = Math.min(1, 0.1 + 0.2 * (depth + 1) * 0.5 + heat * 0.55);
        ctx.strokeStyle = heat > 0.15 ? col.glow : col.line;
        ctx.lineWidth = 0.6 + heat * 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // signals travelling along connections
      for (const p of pulses) {
        const a = proj[edges[p.e][p.dir === 1 ? 0 : 1]];
        const b = proj[edges[p.e][p.dir === 1 ? 1 : 0]];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const front = (a.z + b.z) / 2 > -0.35 ? 1 : 0.35;
        ctx.globalAlpha = 0.95 * front;
        ctx.fillStyle = col.core;
        ctx.shadowColor = col.glow;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (const p of proj) {
        const front = (p.z + 1) / 2;
        const r = (1.3 + 1.7 * front) * p.s + p.heat * 3.2;
        ctx.globalAlpha = 0.35 + 0.65 * front;
        ctx.fillStyle = p.heat > 0.2 ? col.core : col.line;
        if (p.heat > 0.2) {
          ctx.shadowColor = col.glow;
          ctx.shadowBlur = 10 + p.heat * 14;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    };

    readColors();
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) {
        step(0, 0);
        draw();
      }
    });
    ro.observe(host);

    if (reduced) {
      step(0, 0);
      draw();
      return () => ro.disconnect();
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = pointer.x > -40 && pointer.y > -40 && pointer.x < r.width + 40 && pointer.y < r.height + 40;
      pointer.nx = clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth * 0.5));
      pointer.ny = clamp((e.clientY - (r.top + r.height / 2)) / (innerHeight * 0.5));
      pointer.last = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(host);

    let raf = 0;
    let last = performance.now();
    let frame = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      if (++frame % 90 === 0) readColors();
      step(dt, now);
      draw();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full" />;
}
