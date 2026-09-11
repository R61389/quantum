"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  /** Pins the effect to the viewport so it stays visible behind the whole
   * page as it scrolls, instead of scrolling away with one section. */
  fixed?: boolean;
}

const blobs = [
  {
    color: "rgba(0,32,91,0.22)",
    size: "46rem",
    start: { top: "-12%", left: "2%" },
    drift: { x: [0, 70, -25, 0], y: [0, 50, 20, 0] },
    duration: 26,
  },
  {
    color: "rgba(73,104,162,0.24)",
    size: "40rem",
    start: { top: "4%", right: "-4%" },
    drift: { x: [0, -55, 35, 0], y: [0, 35, -25, 0] },
    duration: 32,
  },
  {
    color: "rgba(22,50,105,0.2)",
    size: "38rem",
    start: { top: "42%", left: "-6%" },
    drift: { x: [0, 45, -35, 0], y: [0, -35, 25, 0] },
    duration: 30,
  },
  {
    color: "rgba(0,32,91,0.18)",
    size: "42rem",
    start: { top: "58%", right: "6%" },
    drift: { x: [0, -40, 30, 0], y: [0, 30, -30, 0] },
    duration: 36,
  },
  {
    color: "rgba(73,104,162,0.16)",
    size: "34rem",
    start: { bottom: "-10%", left: "30%" },
    drift: { x: [0, 40, -40, 0], y: [0, -25, 25, 0] },
    duration: 40,
  },
];

/**
 * Light-mode aurora backdrop — soft, slowly drifting navy/steel-blue color
 * bands blurred behind the page content. Adapted from the community Aurora
 * Background pattern (21st.dev / Aceternity) for this project's Tailwind +
 * Motion stack and the QB 2026 navy palette; 21st.dev's own CLI pull
 * requires an account API key this session doesn't have, so the effect is
 * reproduced directly rather than fetched.
 */
export function AuroraBackground({ className, fixed = false }: AuroraBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none inset-0 overflow-hidden",
        fixed ? "fixed z-0 h-screen w-screen" : "absolute",
        className
      )}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            ...blob.start,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { x: blob.drift.x, y: blob.drift.y, scale: [1, 1.08, 0.96, 1] }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
