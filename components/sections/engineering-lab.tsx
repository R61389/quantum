"use client";

import { motion } from "motion/react";
import { Layers, Zap, Scale, Cpu, Activity, Thermometer, Wifi } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/scroll-reveal";

const processes = [
  { icon: Layers, title: "Ensamblaje de Celdas", description: "Selección y ensamblaje de celdas de grado A con control de calidad por lote." },
  { icon: Zap, title: "Soldadura por Puntos", description: "Unión de celdas por soldadura de punto para máxima conductividad y durabilidad." },
  { icon: Scale, title: "Balanceo de Celdas", description: "Balanceo activo y pasivo para igualar voltaje entre celdas y extender su vida útil." },
  { icon: Cpu, title: "Programación BMS", description: "Configuración de firmware BMS a medida según la aplicación y perfil de carga." },
  { icon: Activity, title: "Diagnóstico Avanzado", description: "Análisis de impedancia, capacidad real y salud de celdas antes de cada ensamblaje." },
  { icon: Thermometer, title: "Simulación Térmica", description: "Modelado de comportamiento térmico bajo carga para prevenir puntos de falla." },
  { icon: Wifi, title: "Monitoreo Inteligente", description: "Telemetría remota del estado del pack durante toda su vida operativa." },
];

const proofPoints = [
  "Diseño propio de placas BMS",
  "Pruebas de estrés en cámara térmica",
  "Ensamblaje 100% en Bolivia",
  "Trazabilidad por celda y por lote",
];

export function EngineeringLab() {
  return (
    <section id="laboratorio" className="relative scroll-mt-28 overflow-hidden py-28 lg:py-36">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,255,136,0.08),transparent)]"
      />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>Laboratorio de Ingeniería de Litio</Badge>
          </div>
          <TextReveal
            as="h2"
            text="No solo vendemos baterías. Las diseñamos."
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-lg text-balance text-muted-foreground">
            Cada pack pasa por un proceso de ingeniería propio, desde el
            diagnóstico de celdas hasta la programación del sistema BMS.
          </p>
        </div>

        <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processes.map(({ icon: Icon, title, description }, i) => (
            <StaggerItem key={title} className={i === 6 ? "lg:col-start-2" : undefined}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                {/* scanning line accent */}
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-quantum-electric-blue to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-quantum-surface-light text-quantum-electric-blue">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollProof />
      </div>
    </section>
  );
}

function ScrollProof() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-6"
    >
      {proofPoints.map((point) => (
        <div key={point} className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-quantum-lithium-green shadow-[0_0_8px_2px_rgba(0,255,136,0.6)]" />
          <span className="text-sm text-white/75">{point}</span>
        </div>
      ))}
    </motion.div>
  );
}
