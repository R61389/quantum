"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  wordDelay?: number;
}

/**
 * Word-by-word blur-to-focus reveal. Each word animates independently so
 * the effect reads as text materializing rather than a simple fade.
 */
export function TextReveal({
  text,
  className,
  as = "h2",
  delay = 0,
  wordDelay = 0.06,
}: TextRevealProps) {
  const words = text.split(" ");
  const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;
  const Tag = tags[as];

  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.7,
            delay: delay + i * wordDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mr-[0.28em] inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
