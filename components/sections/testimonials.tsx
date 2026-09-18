"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Representative testimonial themes — replace with real, attributed client
// quotes before production launch.
const testimonials = [
  {
    quote: "La conversión a litio redujo drásticamente nuestras paradas por mantenimiento de batería. El equipo de ingeniería entendió exactamente lo que necesitábamos.",
    role: "Gerente de Mantenimiento",
    sector: "Sector Industrial",
  },
  {
    quote: "El sistema BMS nos da visibilidad total del estado de cada celda. Pasamos de reaccionar a fallas a anticiparlas.",
    role: "Jefe de Planta",
    sector: "Energía Solar",
  },
  {
    quote: "Nuestra flota de montacargas ahora opera con carga oportunista, sin cambios de batería. El impacto en productividad fue inmediato.",
    role: "Coordinador de Logística",
    sector: "Logística e Industria",
  },
  {
    quote: "Quantum Batteries no vendió un producto genérico — diseñaron una solución específica para nuestra operación de electromovilidad.",
    role: "Responsable de Flota",
    sector: "Electromovilidad",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const current = testimonials[index]!;

  return (
    <section className="relative py-28 lg:py-36">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>Testimonios</Badge>
          </div>
          <TextReveal
            as="h2"
            text="La confianza de quienes ya modernizaron su energía"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
        </div>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ScrollReveal className="glass relative min-h-[260px] overflow-hidden rounded-3xl p-8 sm:p-12">
            <Quote className="h-10 w-10 text-quantum-navy-light/30" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-4 mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-quantum-navy-light text-quantum-navy-light" />
                  ))}
                </div>
                <p className="text-balance text-lg leading-relaxed text-foreground sm:text-xl">
                  “{current.quote}”
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-foreground">{current.role}</p>
                  <p className="text-xs text-quantum-navy-light">{current.sector}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              aria-label="Testimonio anterior"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-quantum-navy" : "w-1.5 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Siguiente testimonio"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
