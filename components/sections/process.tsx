"use client";

import { motion } from "motion/react";
import { Stethoscope, ClipboardList, PenTool, Wrench, Rocket, Radar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";

const steps = [
  { icon: Stethoscope, title: "Diagnóstico", description: "Evaluación del sistema energético actual y sus necesidades reales." },
  { icon: ClipboardList, title: "Análisis Técnico", description: "Estudio de carga, consumo y condiciones de operación específicas." },
  { icon: PenTool, title: "Diseño de Solución", description: "Ingeniería del pack de litio y configuración BMS a medida." },
  { icon: Wrench, title: "Ensamblaje", description: "Ensamblaje y control de calidad en nuestro laboratorio en Bolivia." },
  { icon: Rocket, title: "Implementación", description: "Instalación y puesta en marcha en sitio con validación técnica." },
  { icon: Radar, title: "Monitoreo y Soporte", description: "Seguimiento continuo del desempeño y soporte técnico especializado." },
];

export function Process() {
  return (
    <section id="proceso" className="relative scroll-mt-28 py-28 lg:py-36">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>Proceso de Trabajo</Badge>
          </div>
          <TextReveal
            as="h2"
            text="De diagnóstico a soporte continuo"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
        </div>

        <div className="relative mt-20">
          {/* connecting energy line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-foreground/10 lg:left-0 lg:right-0 lg:top-6 lg:h-px lg:w-full" />
          <motion.div
            initial={{ scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top left" }}
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-quantum-navy via-quantum-navy-light to-quantum-navy-mid lg:left-0 lg:right-0 lg:top-6 lg:h-px lg:w-full lg:bg-gradient-to-r"
          />

          <div className="grid gap-10 lg:grid-cols-6 lg:gap-6">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-5 lg:flex-col lg:gap-4"
              >
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-quantum-navy/40 bg-background text-quantum-navy shadow-[0_0_20px_-4px_rgba(0,32,91,0.35)]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="font-mono text-xs text-quantum-navy-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
