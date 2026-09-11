"use client";

import { motion } from "motion/react";
import { Factory, Sun, BatteryCharging, Forklift, Car, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/scroll-reveal";

// Representative project archetypes by sector — replace with real client case
// studies, photography, and verified metrics before production launch.
const cases = [
  {
    icon: Factory,
    sector: "Industria",
    title: "Modernización Energética Industrial",
    description: "Conversión de banco de baterías plomo-ácido a LiFePO4 en planta de producción continua.",
    stats: [["-60%", "mantenimiento"], ["3x", "vida útil"]],
  },
  {
    icon: Sun,
    sector: "Energía Solar",
    title: "Almacenamiento Solar de Alta Eficiencia",
    description: "Sistema de respaldo solar con BMS inteligente para operación autónoma fuera de red.",
    stats: [["98%", "eficiencia de ciclo"], ["10 años", "vida útil estimada"]],
  },
  {
    icon: BatteryCharging,
    sector: "Sistemas UPS",
    title: "Respaldo Crítico sin Interrupciones",
    description: "Migración de UPS convencional a litio para infraestructura de misión crítica.",
    stats: [["-70%", "peso del sistema"], ["3x", "más rápida la carga"]],
  },
  {
    icon: Forklift,
    sector: "Montacargas",
    title: "Flota de Montacargas de Alto Rendimiento",
    description: "Conversión de flota a litio para operación continua con carga oportunista.",
    stats: [["-40%", "tiempo de inactividad"], ["0", "cambios de batería"]],
  },
  {
    icon: Car,
    sector: "Electromovilidad",
    title: "Reemplazo de Packs para Electromovilidad",
    description: "Diseño y fabricación de packs de litio a medida con BMS propio.",
    stats: [["100%", "BMS a medida"], ["+", "diagnóstico por celda"]],
  },
  {
    icon: Wrench,
    sector: "Equipos Especializados",
    title: "Soluciones a Medida para Maquinaria",
    description: "Ingeniería de baterías personalizadas para equipos y maquinaria especializada.",
    stats: [["100%", "diseño a medida"], ["24/7", "soporte técnico local"]],
  },
];

export function CaseStudies() {
  return (
    <section id="casos-de-exito" className="relative scroll-mt-28 py-28 lg:py-36">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>Casos de Éxito</Badge>
          </div>
          <TextReveal
            as="h2"
            text="Ingeniería aplicada en el terreno"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
        </div>

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map(({ icon: Icon, sector, title, description, stats }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02]"
              >
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_120%,rgba(0,32,91,0.14),transparent_70%)]">
                  <div className="grid-bg absolute inset-0 opacity-40" />
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/10 bg-white/70 text-quantum-navy backdrop-blur"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </motion.div>
                </div>

                <div className="p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-quantum-navy-light">
                    {sector}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <div className="mt-6 flex gap-6 border-t border-foreground/10 pt-4">
                    {stats.map(([value, label]) => (
                      <div key={label}>
                        <p className="font-mono text-lg font-semibold text-foreground">{value}</p>
                        <p className="text-xs text-muted-foreground">{label}</p>
                      </div>
                    ))}
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
