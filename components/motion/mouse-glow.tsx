"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MouseGlowProps {
  className?: string;
  size?: number;
  color?: string;
}

/** A soft radial light that follows the cursor within its parent — used behind the hero. */
export function MouseGlow({ className, size = 480, color = "rgba(0,212,255,0.16)" }: MouseGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - size / 2);
    y.set(e.clientY - rect.top - size / 2);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
        }}
        className="absolute rounded-full blur-2xl"
      />
    </div>
  );
}
