"use client";

import { motion } from "motion/react";

const cells = [
  { angle: 0, delay: 0 },
  { angle: 60, delay: 0.15 },
  { angle: 120, delay: 0.3 },
  { angle: 180, delay: 0.45 },
  { angle: 240, delay: 0.6 },
  { angle: 300, delay: 0.75 },
];

const particles = Array.from({ length: 14 }, (_, i) => i);

/**
 * Stylized "battery core" hero visual: a glowing central cell surrounded by
 * orbiting lithium cells and drifting energy particles. Built entirely from
 * CSS gradients + Motion (no WebGL) so it stays light and holds 60fps on
 * mobile, per the performance requirement in the brief.
 */
export function BatteryCoreVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden="true">
      {/* outer rotating rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-quantum-navy/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[8%] rounded-full border border-dashed border-quantum-navy-light/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[18%] rounded-full border border-quantum-navy-mid/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* pulsing core glow */}
      <motion.div
        className="absolute inset-[30%] rounded-full bg-quantum-navy/40 blur-3xl"
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* central lithium core */}
      <div className="absolute inset-[34%] flex items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-quantum-navy-dark to-black shadow-[0_0_80px_-10px_rgba(0,32,91,0.55)]">
        <div className="relative flex h-full w-full items-center justify-center rounded-full">
          <motion.div
            className="h-[46%] w-[46%] rounded-full bg-[conic-gradient(from_0deg,#00205B,#4968A2,#163269,#00205B)] opacity-90"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ filter: "blur(0.5px)" }}
          />
          <div className="absolute h-[30%] w-[30%] rounded-full bg-black/80 backdrop-blur-xl" />
          <span className="absolute font-mono text-[0.65rem] font-medium tracking-widest text-white/80">
            LiFePO4
          </span>
        </div>
      </div>

      {/* orbiting cells */}
      {cells.map((cell) => (
        <motion.div
          key={cell.angle}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: cell.delay }}
          style={{ rotate: cell.angle }}
        >
          <motion.div
            className="absolute left-1/2 top-0 h-10 w-6 -translate-x-1/2 rounded-md border border-quantum-navy/40 bg-gradient-to-b from-quantum-navy/30 to-quantum-navy-light/20 shadow-[0_0_18px_-2px_rgba(0,32,91,0.6)]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: cell.delay }}
          />
        </motion.div>
      ))}

      {/* drifting energy particles */}
      {particles.map((i) => {
        const left = 8 + ((i * 37) % 84);
        const top = 6 + ((i * 53) % 88);
        const duration = 6 + (i % 5);
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-quantum-navy-mid shadow-[0_0_8px_2px_rgba(22,50,105,0.7)]"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
