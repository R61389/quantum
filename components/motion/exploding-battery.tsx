"use client";

import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";

interface PartTarget {
  x?: number;
  y?: number;
  rotate?: number;
  opacityEnd?: number;
}

function usePart(scrollYProgress: MotionValue<number>, range: [number, number], target: PartTarget) {
  const x = useTransform(scrollYProgress, range, [0, target.x ?? 0]);
  const y = useTransform(scrollYProgress, range, [0, target.y ?? 0]);
  const rotate = useTransform(scrollYProgress, range, [0, target.rotate ?? 0]);
  const opacity = useTransform(scrollYProgress, range, [1, target.opacityEnd ?? 1]);
  return { x, y, rotate, opacity };
}

const CELL_LABELS = ["01", "02", "03", "04"];

/**
 * A LiFePO4 pack that comes apart piece by piece as the visitor scrolls
 * through the whole landing page — casing shells peel away, the cell stack
 * fans out, the BMS board detaches, and the leads unspool — fully exploded
 * and faded out by the time the footer arrives. Purely decorative (fixed,
 * aria-hidden, pointer-events-none) and skipped under reduced motion, since
 * its entire point is the scroll-linked motion.
 */
export function ExplodingBattery() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const topCap = usePart(scrollYProgress, [0, 0.18], { y: -70, rotate: -20, opacityEnd: 0 });
  const leftShell = usePart(scrollYProgress, [0.05, 0.35], { x: -60, rotate: -16, opacityEnd: 0.1 });
  const rightShell = usePart(scrollYProgress, [0.05, 0.35], { x: 60, rotate: 16, opacityEnd: 0.1 });
  const cell0 = usePart(scrollYProgress, [0.28, 0.58], { x: -34, y: -14, rotate: -8, opacityEnd: 0.85 });
  const cell1 = usePart(scrollYProgress, [0.32, 0.62], { x: -12, y: 6, rotate: -3, opacityEnd: 0.85 });
  const cell2 = usePart(scrollYProgress, [0.36, 0.66], { x: 12, y: -6, rotate: 3, opacityEnd: 0.85 });
  const cell3 = usePart(scrollYProgress, [0.4, 0.7], { x: 34, y: 14, rotate: 8, opacityEnd: 0.85 });
  const cells = [cell0, cell1, cell2, cell3];
  const bmsBoard = usePart(scrollYProgress, [0.48, 0.76], { x: 66, y: 34, rotate: 22, opacityEnd: 0.15 });
  const wireA = usePart(scrollYProgress, [0.62, 0.9], { y: 70, rotate: -10, opacityEnd: 0 });
  const wireB = usePart(scrollYProgress, [0.66, 0.94], { y: 90, rotate: 10, opacityEnd: 0 });
  const wrapOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: wrapOpacity }}
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:right-8 lg:block"
    >
      <div className="relative h-64 w-28">
        {/* top cap / terminals */}
        <motion.div
          style={{ x: topCap.x, y: topCap.y, rotate: topCap.rotate, opacity: topCap.opacity }}
          className="absolute left-1/2 top-0 flex h-6 w-14 -translate-x-1/2 items-center justify-center gap-2 rounded-t-lg border border-quantum-navy-light/40 bg-gradient-to-b from-quantum-navy-light/30 to-quantum-navy/20"
        >
          <span className="h-2 w-2 rounded-full bg-quantum-navy-light shadow-[0_0_6px_1px_rgba(73,104,162,0.8)]" />
          <span className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_6px_1px_rgba(255,255,255,0.6)]" />
        </motion.div>

        {/* outer casing shells */}
        <motion.div
          style={{ x: leftShell.x, rotate: leftShell.rotate, opacity: leftShell.opacity }}
          className="absolute left-0 top-6 h-[13.5rem] w-1/2 rounded-l-2xl border border-quantum-navy-light/25 bg-gradient-to-br from-quantum-navy/25 to-transparent"
        />
        <motion.div
          style={{ x: rightShell.x, rotate: rightShell.rotate, opacity: rightShell.opacity }}
          className="absolute right-0 top-6 h-[13.5rem] w-1/2 rounded-r-2xl border border-quantum-navy-light/25 bg-gradient-to-bl from-quantum-navy/25 to-transparent"
        />

        {/* cell stack */}
        <div className="absolute inset-x-3 top-10 flex flex-col gap-2">
          {cells.map((cell, i) => (
            <motion.div
              key={CELL_LABELS[i]}
              style={{ x: cell.x, y: cell.y, rotate: cell.rotate, opacity: cell.opacity }}
              className="flex h-9 items-center justify-between rounded-md border border-quantum-navy-light/40 bg-gradient-to-r from-quantum-navy-mid/50 to-quantum-navy-light/20 px-2 shadow-[0_0_14px_-4px_rgba(73,104,162,0.7)]"
            >
              <span className="font-mono text-[0.55rem] text-quantum-navy-light/80">
                {CELL_LABELS[i]}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-quantum-navy-light" />
            </motion.div>
          ))}
        </div>

        {/* BMS board */}
        <motion.div
          style={{ x: bmsBoard.x, y: bmsBoard.y, rotate: bmsBoard.rotate, opacity: bmsBoard.opacity }}
          className="absolute bottom-8 right-0 flex h-10 w-14 flex-col justify-center gap-1 rounded-md border border-quantum-navy-light/40 bg-quantum-navy-dark/60 px-2"
        >
          <span className="font-mono text-[0.5rem] uppercase tracking-wide text-quantum-navy-light/80">
            BMS
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-1 w-1 rounded-full bg-quantum-navy-light/70" />
            ))}
          </div>
        </motion.div>

        {/* leads */}
        <motion.div
          style={{ y: wireA.y, rotate: wireA.rotate, opacity: wireA.opacity }}
          className="absolute bottom-0 left-4 h-8 w-0.5 rounded-full bg-gradient-to-b from-quantum-navy-light/70 to-transparent"
        />
        <motion.div
          style={{ y: wireB.y, rotate: wireB.rotate, opacity: wireB.opacity }}
          className="absolute bottom-0 right-4 h-8 w-0.5 rounded-full bg-gradient-to-b from-white/50 to-transparent"
        />
      </div>
    </motion.div>
  );
}
