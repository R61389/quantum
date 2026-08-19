"use client";

import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { MouseGlow } from "@/components/motion/mouse-glow";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-aurora-mesh" aria-hidden="true" />
      <MouseGlow size={640} color="rgba(0,255,136,0.14)" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-quantum-electric-blue/10 blur-[120px]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative text-center">
        <TextReveal
          as="h2"
          text="Construyamos la Próxima Generación de Energía"
          className="mx-auto max-w-3xl justify-center text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground"
        >
          Obtén una solución de almacenamiento energético diseñada
          específicamente para tus necesidades.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton>
            <Button size="lg">
              Solicitar Cotización
              <ArrowRight className="h-4 w-4" />
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button size="lg" variant="outline">
              <MessageCircle className="h-4 w-4" />
              Contactar Ingeniero
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
