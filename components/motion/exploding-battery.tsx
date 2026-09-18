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
 * An original (no third-party branding), generic LiFePO4 block battery —
 * silhouette inspired by a standard sealed lithium pack: rounded case, two
 * top terminal bolts, two side leads — that comes apart piece by piece as
 * the visitor scrolls through the whole landing page. Fully exploded and
 * faded out by the time the footer arrives. Purely decorative (fixed,
 * aria-hidden, pointer-events-none) and skipped under reduced motion, since
 * its entire point is the scroll-linked motion.
 */
export function ExplodingBattery() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const terminalLeft = usePart(scrollYProgress, [0, 0.16], { x: -26, y: -46, rotate: -30, opacityEnd: 0 });
  const terminalRight = usePart(scrollYProgress, [0.02, 0.18], { x: 26, y: -46, rotate: 30, opacityEnd: 0 });
  const label = usePart(scrollYProgress, [0.05, 0.3], { y: -20, rotate: -6, opacityEnd: 0 });
  const leftShell = usePart(scrollYProgress, [0.08, 0.36], { x: -58, rotate: -14, opacityEnd: 0.08 });
  const rightShell = usePart(scrollYProgress, [0.08, 0.36], { x: 58, rotate: 14, opacityEnd: 0.08 });
  const cell0 = usePart(scrollYProgress, [0.28, 0.58], { x: -34, y: -14, rotate: -8, opacityEnd: 0.85 });
  const cell1 = usePart(scrollYProgress, [0.32, 0.62], { x: -12, y: 6, rotate: -3, opacityEnd: 0.85 });
  const cell2 = usePart(scrollYProgress, [0.36, 0.66], { x: 12, y: -6, rotate: 3, opacityEnd: 0.85 });
  const cell3 = usePart(scrollYProgress, [0.4, 0.7], { x: 34, y: 14, rotate: 8, opacityEnd: 0.85 });
  const cells = [cell0, cell1, cell2, cell3];
  const bmsBoard = usePart(scrollYProgress, [0.48, 0.76], { x: 66, y: 34, rotate: 22, opacityEnd: 0.15 });
  const cableLeft = usePart(scrollYProgress, [0.58, 0.88], { x: -30, y: 46, rotate: -18, opacityEnd: 0 });
  const cableRight = usePart(scrollYProgress, [0.62, 0.92], { x: 30, y: 46, rotate: 18, opacityEnd: 0 });
  const wrapOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: wrapOpacity }}
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:right-10 lg:block"
    >
      <div className="relative h-64 w-40">
        {/* side cables — loop out from the top corners, past the case */}
        <motion.svg
          style={{ x: cableLeft.x, y: cableLeft.y, rotate: cableLeft.rotate, opacity: cableLeft.opacity }}
          viewBox="0 0 40 180"
          className="absolute left-0 top-8 h-44 w-10 overflow-visible"
        >
          <path
            d="M 26 0 C 2 30, 2 90, 20 150 C 26 168, 30 174, 36 178"
            fill="none"
            stroke="rgba(73,104,162,0.7)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </motion.svg>
        <motion.svg
          style={{ x: cableRight.x, y: cableRight.y, rotate: cableRight.rotate, opacity: cableRight.opacity }}
          viewBox="0 0 40 180"
          className="absolute right-0 top-8 h-44 w-10 overflow-visible"
        >
          <path
            d="M 14 0 C 38 30, 38 90, 20 150 C 14 168, 10 174, 4 178"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </motion.svg>

        {/* terminal bolts — static placement on a wrapper div (left/top only,
            no transform) since Motion's x/y style would silently override
            any Tailwind translate-* class on the same element */}
        <div className="absolute" style={{ left: 37, top: 17 }}>
          <motion.div
            style={{
              x: terminalLeft.x,
              y: terminalLeft.y,
              rotate: terminalLeft.rotate,
              opacity: terminalLeft.opacity,
            }}
            className="h-3.5 w-3.5 rounded-full border border-white/40 bg-gradient-to-br from-white/50 to-quantum-navy-light/60 shadow-[0_0_6px_1px_rgba(73,104,162,0.7)]"
          />
        </div>
        <div className="absolute" style={{ left: 109, top: 17 }}>
          <motion.div
            style={{
              x: terminalRight.x,
              y: terminalRight.y,
              rotate: terminalRight.rotate,
              opacity: terminalRight.opacity,
            }}
            className="h-3.5 w-3.5 rounded-full border border-white/40 bg-gradient-to-br from-white/50 to-quantum-navy-light/60 shadow-[0_0_6px_1px_rgba(73,104,162,0.7)]"
          />
        </div>

        {/* outer case (front label — leaves with the left shell) */}
        <div className="pointer-events-none absolute z-10" style={{ left: 80, top: 64, width: 96, marginLeft: -48 }}>
          <motion.div
            style={{ x: label.x, y: label.y, rotate: label.rotate, opacity: label.opacity }}
            className="flex flex-col items-center gap-0.5 text-center"
          >
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/90">
              Quantum
            </span>
            <span className="font-mono text-[0.55rem] text-quantum-navy-light/90">
              LiFePO4 · 12.8V
            </span>
          </motion.div>
        </div>

        {/* outer casing shells */}
        <div className="absolute top-9 h-[13.5rem]" style={{ left: 24, width: 56 }}>
          <motion.div
            style={{ x: leftShell.x, rotate: leftShell.rotate, opacity: leftShell.opacity }}
            className="h-full w-full rounded-l-2xl border border-quantum-navy-light/30 bg-gradient-to-br from-quantum-navy-mid/60 via-quantum-navy/50 to-quantum-navy-dark/60"
          />
        </div>
        <div className="absolute top-9 h-[13.5rem]" style={{ left: 80, width: 56 }}>
          <motion.div
            style={{ x: rightShell.x, rotate: rightShell.rotate, opacity: rightShell.opacity }}
            className="h-full w-full rounded-r-2xl border border-quantum-navy-light/30 bg-gradient-to-bl from-quantum-navy-mid/60 via-quantum-navy/50 to-quantum-navy-dark/60"
          />
        </div>

        {/* cell stack, revealed as the case opens */}
        <div className="absolute left-1/2 top-24 flex w-24 -translate-x-1/2 flex-col gap-1.5">
          {cells.map((cell, i) => (
            <motion.div
              key={CELL_LABELS[i]}
              style={{ x: cell.x, y: cell.y, rotate: cell.rotate, opacity: cell.opacity }}
              className="flex h-8 items-center justify-between rounded-md border border-quantum-navy-light/40 bg-gradient-to-r from-quantum-navy-mid/50 to-quantum-navy-light/20 px-2 shadow-[0_0_14px_-4px_rgba(73,104,162,0.7)]"
            >
              <span className="font-mono text-[0.5rem] text-quantum-navy-light/80">
                {CELL_LABELS[i]}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-quantum-navy-light" />
            </motion.div>
          ))}
        </div>

        {/* BMS board */}
        <div className="absolute bottom-6" style={{ left: 52, width: 56 }}>
          <motion.div
            style={{ x: bmsBoard.x, y: bmsBoard.y, rotate: bmsBoard.rotate, opacity: bmsBoard.opacity }}
            className="flex h-10 w-14 flex-col justify-center gap-1 rounded-md border border-quantum-navy-light/40 bg-quantum-navy-dark/70 px-2"
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
        </div>
      </div>
    </motion.div>
  );
}
