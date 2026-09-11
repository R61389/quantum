"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

/**
 * Light-mode aurora backdrop — soft, slowly drifting navy/steel-blue color
 * bands blurred behind the hero content. Adapted from the community Aurora
 * Background pattern (21st.dev / Aceternity) for this project's Tailwind +
 * Motion stack and the QB 2026 navy palette; 21st.dev's own CLI pull
 * requires an account API key this session doesn't have, so the effect is
 * reproduced directly rather than fetched.
 */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  const blobs = [
    {
      color: "rgba(0,32,91,0.16)",
      size: "44rem",
      start: { top: "-10%", left: "4%" },
      drift: { x: [0, 60, -20, 0], y: [0, 40, 20, 0] },
      duration: 26,
    },
    {
      color: "rgba(73,104,162,0.18)",
      size: "38rem",
      start: { top: "-6%", right: "0%" },
      drift: { x: [0, -50, 30, 0], y: [0, 30, -20, 0] },
      duration: 32,
    },
    {
      color: "rgba(22,50,105,0.14)",
      size: "34rem",
      start: { bottom: "-14%", left: "28%" },
      drift: { x: [0, 40, -40, 0], y: [0, -30, 20, 0] },
      duration: 38,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[90px]"
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
