"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 14;
const BASE_COLOR = "5, 7, 13"; // matches --background
const PALETTE = [
  "115, 143, 201", // quantum-navy-light, lifted
  "73, 104, 162", // quantum-navy-light
  "22, 50, 105", // quantum-navy-mid
  "219, 232, 255", // near-white glass highlight
];

interface Particle {
  angleOffset: number;
  radiusJitter: number;
  jitterSeed: number;
  colorIndex: number;
}

/**
 * Canvas-drawn homage to a "cursor-chasing ring of jittering circles that
 * smears trails" shader look — recreated with plain Canvas 2D (no WebGPU/GPU
 * license dependency) so it degrades gracefully everywhere. Orbit center
 * swings opposite the pointer with momentum; a soft glow trails the pointer
 * directly to suggest the lens pass. Everything stays in the site's blue
 * palette instead of the rainbow dispersion of the original reference.
 */
export function IsotopeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      angleOffset: (i / PARTICLE_COUNT) * Math.PI * 2,
      radiusJitter: 0.7 + Math.sin(i * 12.9) * 0.3,
      jitterSeed: i * 7.31,
      colorIndex: i % PALETTE.length,
    }));

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.fillStyle = `rgb(${BASE_COLOR})`;
      ctx!.fillRect(0, 0, width, height);
    }

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    resize();

    // Pointer state — target is set by real pointer movement, current lerps toward it.
    const pointerTarget = { x: 0.5, y: 0.42 };
    const pointerCurrent = { x: 0.5, y: 0.42 };
    let hasPointer = false;

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointerTarget.x = (e.clientX - rect.left) / rect.width;
      pointerTarget.y = (e.clientY - rect.top) / rect.height;
      hasPointer = true;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let angleBase = 0;
    let rafId = 0;
    let lastTime = performance.now();

    function drawStaticFrame() {
      const cx = width / 2;
      const cy = height * 0.46;
      const minDim = Math.min(width, height);
      const orbitRadius = minDim * 0.16;

      ctx!.fillStyle = `rgb(${BASE_COLOR})`;
      ctx!.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        const angle = p.angleOffset;
        const r = orbitRadius * p.radiusJitter;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 0.6;
        drawParticle(ctx!, x, y, minDim * 0.018, PALETTE[p.colorIndex]!);
      });
    }

    function drawParticle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, rgb: string) {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${rgb}, 0.9)`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }

    function frame(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Trail: low-alpha overlay instead of a hard clear, so motion smears.
      ctx!.fillStyle = `rgba(${BASE_COLOR}, 0.16)`;
      ctx!.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.46;
      const minDim = Math.min(width, height);

      // Orbit center swings opposite the pointer, with momentum.
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.05;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.05;
      const reach = minDim * 0.14;
      const orbitCx = cx - (pointerCurrent.x - 0.5) * 2 * reach;
      const orbitCy = cy - (pointerCurrent.y - 0.5) * 2 * reach;

      angleBase += dt * 0.5; // slow continuous auto-rotation, independent of pointer

      const orbitRadius = minDim * 0.16;
      particles.forEach((p) => {
        const jitter = Math.sin(now * 0.0006 + p.jitterSeed) * 0.12;
        const angle = angleBase + p.angleOffset + jitter;
        const r = orbitRadius * (p.radiusJitter + jitter * 0.4);
        const x = orbitCx + Math.cos(angle) * r;
        const y = orbitCy + Math.sin(angle) * r * 0.6;
        drawParticle(ctx!, x, y, minDim * 0.018, PALETTE[p.colorIndex]!);
      });

      // Soft cursor-following glow — a restrained nod to the lens pass.
      if (hasPointer) {
        const gx = pointerCurrent.x * width;
        const gy = pointerCurrent.y * height;
        const glowRadius = minDim * 0.22;
        ctx!.globalCompositeOperation = "lighter";
        const glow = ctx!.createRadialGradient(gx, gy, 0, gx, gy, glowRadius);
        glow.addColorStop(0, "rgba(219, 232, 255, 0.10)");
        glow.addColorStop(1, "rgba(219, 232, 255, 0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(gx, gy, glowRadius, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalCompositeOperation = "source-over";
      }

      rafId = requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      drawStaticFrame();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
