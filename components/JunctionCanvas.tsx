"use client";

import { useEffect, useRef } from "react";

type Axis = "h" | "v";
type Car = {
  axis: Axis;
  lane: number;
  dir: 1 | -1;
  pos: number;
  speed: number;
  len: number;
  max: number;
  stopped: number;
};
type Signal = {
  vx: number;
  hy: number;
  phase: Axis;
  yellow: boolean;
  t: number;
  max: number;
  qh: number;
  qv: number;
};

const LANE_OFFSET = 7;
const STOP_DIST = 20;
const ACCEL = 90;
const DECEL = 150;
const GAP = 8;
const SURGE_RADIUS = 120;
const MAX_CARS = 150;

export default function JunctionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let hRoads: number[] = [];
    let vRoads: number[] = [];
    let cars: Car[] = [];
    let signals: Signal[] = [];
    let spawn: Record<string, number> = {};
    const pointer = { x: -999, y: -999, on: false };
    const colors = { text: "#fff", accent: "#fb0", amber: "#e3a23b", go: "#4c8", stop: "#f55" };

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      colors.text = s.getPropertyValue("--text").trim() || colors.text;
      colors.accent = s.getPropertyValue("--accent").trim() || colors.accent;
      colors.go = s.getPropertyValue("--go").trim() || colors.go;
      colors.stop = s.getPropertyValue("--stop").trim() || colors.stop;
      colors.amber = s.getPropertyValue("--amber").trim() || colors.amber;
    };

    const build = () => {
      const r = host.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      hRoads = W < 700 ? [H * 0.3, H * 0.72] : [H * 0.28, H * 0.7];
      vRoads = W < 700 ? [W * 0.3, W * 0.74] : [W * 0.46, W * 0.7, W * 0.92];
      cars = [];
      spawn = {};
      signals = [];
      vRoads.forEach((vx, i) =>
        hRoads.forEach((hy, j) => {
          signals.push({
            vx,
            hy,
            phase: (i + j) % 2 ? "h" : "v",
            yellow: false,
            t: Math.random() * 4,
            max: 9 + Math.random() * 2,
            qh: 0,
            qv: 0,
          });
        }),
      );
      if (reduced) for (let i = 0; i < 480; i++) step(1 / 60);
    };

    const stopLine = (c: Car, s: Signal) => {
      const center = c.axis === "h" ? s.vx : s.hy;
      return center - c.dir * STOP_DIST;
    };

    const isGreen = (c: Car, s: Signal) => s.phase === c.axis && !s.yellow;

    function step(dt: number) {
      // signals adapt to the queue on each axis
      for (const s of signals) {
        s.t += dt;
        s.qh = 0;
        s.qv = 0;
      }
      for (const c of cars) {
        if (c.speed > 10) continue;
        for (const s of signals) {
          const along = c.axis === "h" ? c.pos : c.pos;
          const line = stopLine(c, s);
          const onRoad =
            c.axis === "h" ? Math.abs(hRoads[c.lane] - s.hy) < 1 : Math.abs(vRoads[c.lane] - s.vx) < 1;
          if (!onRoad) continue;
          const d = (line - along) * c.dir;
          if (d > -4 && d < 110) {
            if (c.axis === "h") s.qh++;
            else s.qv++;
          }
        }
      }
      for (const s of signals) {
        const cur = s.phase === "h" ? s.qh : s.qv;
        const other = s.phase === "h" ? s.qv : s.qh;
        if (s.yellow) {
          if (s.t > 0.9) {
            s.phase = s.phase === "h" ? "v" : "h";
            s.yellow = false;
            s.t = 0;
            s.max = 9 + Math.random() * 2;
          }
        } else if (s.t > 3 && ((other > cur + 1 && s.t > 3) || s.t > s.max)) {
          s.yellow = true;
          s.t = 0;
        }
      }

      // spawn
      if (cars.length < MAX_CARS) {
        const lanes: [Axis, number, 1 | -1][] = [];
        hRoads.forEach((_, i) => {
          lanes.push(["h", i, 1], ["h", i, -1]);
        });
        vRoads.forEach((_, i) => {
          lanes.push(["v", i, 1], ["v", i, -1]);
        });
        for (const [axis, lane, dir] of lanes) {
          const key = `${axis}${lane}${dir}`;
          spawn[key] = (spawn[key] ?? Math.random() * 1.5) - dt;
          if (spawn[key] > 0) continue;
          const span = axis === "h" ? W : H;
          const start = dir === 1 ? -16 : span + 16;
          const clear = !cars.some(
            (c) => c.axis === axis && c.lane === lane && c.dir === dir && Math.abs(c.pos - start) < 46,
          );
          if (!clear) continue;
          spawn[key] = 0.9 + Math.random() * 1.5;
          cars.push({
            axis,
            lane,
            dir,
            pos: start,
            speed: 50,
            len: 9 + Math.random() * 4,
            max: 62 + Math.random() * 26,
            stopped: 0,
          });
        }
      }

      // move: car-following + signal stop lines + crowd surge near the pointer
      const groups = new Map<string, Car[]>();
      for (const c of cars) {
        const k = `${c.axis}${c.lane}${c.dir}`;
        (groups.get(k) ?? groups.set(k, []).get(k)!).push(c);
      }
      for (const group of groups.values()) {
        group.sort((a, b) => b.pos * b.dir - a.pos * a.dir);
        group.forEach((c, idx) => {
          const front = c.pos + (c.dir * c.len) / 2;
          let limit = Infinity;
          const leader = group[idx - 1];
          if (leader) {
            const rear = leader.pos - (leader.dir * leader.len) / 2;
            limit = Math.min(limit, ((rear - c.dir * GAP) - front) * c.dir);
          }
          const brake = (c.speed * c.speed) / (2 * DECEL);
          for (const s of signals) {
            const onRoad =
              c.axis === "h" ? Math.abs(hRoads[c.lane] - s.hy) < 1 : Math.abs(vRoads[c.lane] - s.vx) < 1;
            if (!onRoad) continue;
            const d = (stopLine(c, s) - front) * c.dir;
            if (d < -1 || isGreen(c, s)) continue;
            if (s.phase === c.axis && s.yellow && d < brake) continue;
            limit = Math.min(limit, d);
          }

          const x = c.axis === "h" ? c.pos : vRoads[c.lane] + c.dir * LANE_OFFSET;
          const y = c.axis === "h" ? hRoads[c.lane] + c.dir * LANE_OFFSET : c.pos;
          const surge = pointer.on && Math.hypot(x - pointer.x, y - pointer.y) < SURGE_RADIUS ? 0.28 : 1;

          let target = c.max * surge;
          if (limit < Infinity) {
            target = Math.min(target, Math.sqrt(Math.max(0, 2 * DECEL * Math.max(0, limit - 1))));
          }
          c.speed += Math.sign(target - c.speed) * Math.min(Math.abs(target - c.speed), (target > c.speed ? ACCEL : DECEL) * dt);
          let move = c.speed * dt;
          if (limit < Infinity) move = Math.min(move, Math.max(0, limit));
          c.pos += c.dir * move;
          c.stopped = c.speed < 4 ? c.stopped + dt : 0;
        });
      }
      cars = cars.filter((c) => {
        const span = c.axis === "h" ? W : H;
        return c.pos > -40 && c.pos < span + 40;
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";

      // roads
      ctx.fillStyle = colors.text;
      ctx.globalAlpha = 0.075;
      for (const y of hRoads) ctx.fillRect(0, y - 15, W, 30);
      for (const x of vRoads) ctx.fillRect(x - 15, 0, 30, H);
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = colors.text;
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);
      for (const y of hRoads) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      for (const x of vRoads) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // signals
      for (const s of signals) {
        const draws: [number, number, Axis][] = [
          [s.vx - 22, s.hy + 17, "h"],
          [s.vx + 22, s.hy - 17, "h"],
          [s.vx - 17, s.hy - 22, "v"],
          [s.vx + 17, s.hy + 22, "v"],
        ];
        for (const [x, y, axis] of draws) {
          const green = s.phase === axis && !s.yellow;
          const amber = s.phase === axis && s.yellow;
          const col = green ? colors.go : amber ? colors.amber : colors.stop;
          ctx.globalAlpha = 0.18;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.95;
          ctx.beginPath();
          ctx.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // cars coloured by how stuck they are
      for (const c of cars) {
        const x = c.axis === "h" ? c.pos : vRoads[c.lane] + c.dir * LANE_OFFSET;
        const y = c.axis === "h" ? hRoads[c.lane] + c.dir * LANE_OFFSET : c.pos;
        ctx.fillStyle = c.stopped > 4 ? colors.stop : c.stopped > 0.8 ? colors.amber : colors.text;
        ctx.globalAlpha = c.stopped > 0.8 ? 0.92 : 0.62;
        const w = c.axis === "h" ? c.len : 5;
        const h = c.axis === "h" ? 5 : c.len;
        ctx.beginPath();
        ctx.roundRect(x - w / 2, y - h / 2, w, h, 2);
        ctx.fill();
      }

      // crowd surge halo
      if (pointer.on) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, SURGE_RADIUS);
        g.addColorStop(0, colors.accent);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.16;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, SURGE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = colors.accent;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, SURGE_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.globalAlpha = 1;
    };

    readColors();
    build();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= r.width && pointer.y <= r.height;
    };
    const onLeave = () => {
      pointer.on = false;
    };

    const ro = new ResizeObserver(() => {
      build();
      if (reduced) draw();
    });
    ro.observe(host);

    if (reduced) {
      draw();
      return () => ro.disconnect();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let last = performance.now();
    let frame = 0;
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible && !document.hidden) {
        step(dt);
        if (++frame % 120 === 0) readColors();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
