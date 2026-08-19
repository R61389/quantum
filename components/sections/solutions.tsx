"use client";

import { motion } from "motion/react";
import {
  RefreshCw,
  BatteryCharging,
  Sun,
  Forklift,
  Car,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/scroll-reveal";

const solutions = [
  {
    icon: RefreshCw,
    title: "Conversión a Litio",
    description: "Transformación de sistemas tradicionales de plomo-ácido a tecnología LiFePO4 de alto rendimiento.",
  },
  {
    icon: BatteryCharging,
    title: "Sistemas UPS",
    description: "Respaldo energético inteligente con mayor densidad, menor peso y ciclos de vida superiores.",
  },
  {
    icon: Sun,
    title: "Energía Solar",
    description: "Almacenamiento eficiente de energía solar con gestión térmica y balanceo automático de celdas.",
  },
  {
    icon: Forklift,
    title: "Montacargas",
    description: "Mayor rendimiento operativo, carga rápida y menor mantenimiento frente a baterías de plomo.",
  },
  {
    icon: Car,
    title: "Electromovilidad",
    description: "Reemplazo y fabricación de packs de baterías de litio para vehículos y equipos eléctricos.",
  },
  {
    icon: SlidersHorizontal,
    title: "Soluciones Personalizadas",
    description: "Desarrollo de baterías de litio diseñadas según los requerimientos técnicos de tu operación.",
  },
];

export function Solutions() {
  return (
    <section id="soluciones" className="relative scroll-mt-28 py-28 lg:py-36">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Badge>Nuestras Soluciones</Badge>
          </motion.div>
          <TextReveal
            as="h2"
            text="Ingeniería de litio para cada aplicación"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
        </div>

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 0%, rgba(0,212,255,0.12), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-quantum-electric-blue/15 to-quantum-lithium-green/10 text-quantum-electric-blue transition-colors group-hover:text-quantum-lithium-green">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-quantum-electric-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Conocer más
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
