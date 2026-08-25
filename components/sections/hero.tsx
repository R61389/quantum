"use client";

import { motion } from "motion/react";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { MouseGlow } from "@/components/motion/mouse-glow";
import { BatteryCoreVisual } from "@/components/motion/battery-core-visual";
import { useAssistant } from "@/components/assistant/context";

export function Hero() {
  const { openAssistant } = useAssistant();

  return (
    <section id="top" className="relative scroll-mt-28 overflow-hidden pb-20 pt-40 lg:pb-32 lg:pt-48">
      <div className="absolute inset-0 bg-aurora-mesh" aria-hidden="true" />
      <div className="grid-bg absolute inset-0 h-[140%]" aria-hidden="true" />
      <MouseGlow />

      {/* dynamic light beams */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-24 left-1/4 h-[520px] w-[2px] origin-top rotate-[18deg] bg-gradient-to-b from-quantum-electric-blue/60 via-quantum-electric-blue/10 to-transparent blur-[2px]"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -top-24 right-1/3 h-[420px] w-[2px] origin-top -rotate-[14deg] bg-gradient-to-b from-quantum-lithium-green/50 via-quantum-lithium-green/10 to-transparent blur-[2px]"
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container relative grid items-center gap-16 lg:grid-cols-2 lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-quantum-lithium-green" />
              Ingeniería en Litio · Bolivia
            </Badge>
          </motion.div>

          <TextReveal
            as="h1"
            text="Ingeniería de Litio para el Futuro Energético de Bolivia"
            className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted-foreground"
          >
            Diseñamos, ensamblamos y modernizamos baterías de litio de alto
            rendimiento para aplicaciones industriales, sistemas UPS, energía
            solar, montacargas y soluciones energéticas especializadas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton>
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => openAssistant("identificar")}
              >
                Solicitar Cotización
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => openAssistant("diagnostico")}
              >
                <MessageCircle className="h-4 w-4" />
                Hablar con un Ingeniero
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-8"
          >
            {[
              ["LiFePO4", "Química de última generación"],
              ["BMS Inteligente", "Monitoreo en tiempo real"],
              ["100% Bolivia", "Ingeniería y soporte local"],
            ].map(([title, sub]) => (
              <div key={title}>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <BatteryCoreVisual />
        </motion.div>
      </div>

      <motion.a
        href="#trusted-by"
        aria-label="Desplázate hacia abajo"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Explorar</span>
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
