"use client";

import { useEffect, useRef } from "react";
import { BG_HEX, hexToRgb, moods, type Mood } from "@/lib/moods";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uBg;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  float t = uTime * 0.07;

  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float md = length(p - m);
  p += (p - m) * exp(-md * 2.6) * 0.18;

  vec2 q = vec2(fbm(p * 1.3 + vec2(0.0, t)), fbm(p * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.3 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3), fbm(p * 1.3 + 3.0 * q + vec2(8.3, 2.8) - t * 1.1));
  float f = fbm(p * 1.3 + 3.0 * r);

  vec3 col = mix(uBg, uC1, smoothstep(0.18, 0.75, f));
  col = mix(col, uC2, clamp(length(q) * 0.95, 0.0, 1.0) * smoothstep(0.2, 0.7, r.x));
  col = mix(col, uC3, clamp(r.y * r.y * 1.8, 0.0, 1.0) * 0.5);
  col += 0.22 * uC1 * exp(-md * 3.0);

  float vig = smoothstep(1.3, 0.2, length(uv - 0.5) * 1.5);
  col = mix(uBg, col, vig * 0.95 + 0.05);
  col *= 0.85 + 0.5 * smoothstep(0.0, 0.7, f);

  gl_FragColor = vec4(col, 1.0);
}`;

type RGB = [number, number, number];

export default function AuroraShader() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uMouse = u("uMouse");
    const uC = [u("uC1"), u("uC2"), u("uC3")];
    gl.uniform3fv(u("uBg"), hexToRgb(BG_HEX));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const current = document.documentElement.getAttribute("data-mood");
    const start = moods.find((m) => m.id === current) ?? moods[0];
    let target: RGB[] = start.c.map(hexToRgb) as RGB[];
    const cols: RGB[] = target.map((c) => [...c] as RGB);
    const mouse = { x: 0.5, y: 0.55, tx: 0.5, ty: 0.55 };

    const resize = () => {
      const r = host.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.55;
      canvas.width = Math.max(2, Math.round(r.width * scale));
      canvas.height = Math.max(2, Math.round(r.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = (time: number) => {
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      cols.forEach((c, i) => gl.uniform3f(uC[i], c[0], c[1], c[2]));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const onMood = (e: Event) => {
      const m = (e as CustomEvent<Mood>).detail;
      target = m.c.map(hexToRgb) as RGB[];
      if (reduced) {
        target.forEach((c, i) => (cols[i] = [...c] as RGB));
        draw(14);
      }
    };
    window.addEventListener("mood", onMood);

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(14);
    });
    ro.observe(host);

    if (reduced) {
      draw(14);
      return () => {
        window.removeEventListener("mood", onMood);
        ro.disconnect();
      };
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      mouse.ty = Math.min(1, Math.max(0, 1 - (e.clientY - r.top) / r.height));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      cols.forEach((c, i) => {
        for (let k = 0; k < 3; k++) c[k] += (target[i][k] - c[k]) * 0.06;
      });
      draw((now - t0) / 1000 + 6);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mood", onMood);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
