"use client";

import { motion } from "motion/react";
import { Sun, Forklift, Car, SlidersHorizontal, TrendingUp, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/scroll-reveal";
import { useAssistant } from "@/components/assistant/context";

const solutions = [
  {
    icon: SlidersHorizontal,
    title: "Soluciones Personalizadas",
    problema: "Tu operación no encaja en un catálogo estándar de baterías.",
    solucion: "Diseñamos e ingenierizamos un pack de litio a medida: capacidad, voltaje, BMS y formato específicos para tu equipo.",
    beneficio: "Compatibilidad exacta con tu operación, sin adaptar tu equipo a la batería.",
    roi: "ROI medible desde la primera renovación de ciclo frente a soluciones genéricas mal dimensionadas.",
  },
  {
    icon: Forklift,
    title: "Montacargas",
    problema: "Cambios de batería que detienen la operación y afectan turnos completos.",
    solucion: "Conversión a litio con carga oportunista, sin cambios de batería ni cuarto de carga dedicado.",
    beneficio: "Operación continua, menos mantenimiento y mayor disponibilidad de flota.",
    roi: "Hasta 3x más vida útil frente a plomo-ácido, con menor costo total de propiedad.",
  },
  {
    icon: Sun,
    title: "Energía Solar",
    problema: "Tu sistema solar genera energía que no puedes aprovechar cuando más la necesitas.",
    solucion: "Almacenamiento en litio con gestión térmica y balanceo automático que maximiza cada kWh generado.",
    beneficio: "Mayor autonomía energética y menor dependencia de la red o generadores.",
    roi: "Recuperación de inversión acelerada al reducir consumo de diésel o tarifas en horas pico.",
  },
  {
    icon: Car,
    title: "Electromovilidad",
    problema: "Packs de batería originales costosos, con repuestos limitados o descontinuados.",
    solucion: "Diseño y fabricación de packs de litio de reemplazo, con BMS propio y garantía nacional.",
    beneficio: "Extiende la vida útil de tu flota eléctrica sin depender de repuestos importados.",
    roi: "Menor costo por reemplazo frente a packs originales, con soporte técnico local.",
  },
];

const fields: { key: "problema" | "solucion" | "beneficio" | "roi"; label: string }[] = [
  { key: "problema", label: "Problema" },
  { key: "solucion", label: "Solución" },
  { key: "beneficio", label: "Beneficio principal" },
  { key: "roi", label: "Retorno esperado" },
];

export function Solutions() {
  const { openAssistant } = useAssistant();

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
            text="Una solución específica para cada operación"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-lg text-balance text-muted-foreground">
            No partimos del producto. Partimos de tu problema operativo — y
            diseñamos la solución energética que lo resuelve.
          </p>
        </div>

        <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2">
          {solutions.map(({ icon: Icon, title, ...card }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-7"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(500px circle at 50% 0%, rgba(73,104,162,0.2), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-gradient-to-br from-quantum-navy/30 to-quantum-navy-light/20 text-quantum-navy-light transition-colors group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                  </div>

                  <dl className="mt-6 space-y-4 border-t border-foreground/10 pt-5">
                    {fields.map(({ key, label }) => (
                      <div key={key}>
                        <dt className="text-[0.65rem] font-medium uppercase tracking-[0.15em] text-quantum-navy-light">
                          {label}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {card[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex items-center gap-1.5 rounded-lg border border-quantum-navy-light/20 bg-quantum-navy-light/[0.06] px-3 py-2 text-xs font-medium text-quantum-navy-light">
                    <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                    Diseñado para ROI medible, no solo especificación técnica
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => openAssistant("comercial")}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-quantum-navy-light hover:text-white"
          >
            ¿Tu caso no encaja en ninguna? Cuéntanos tu proyecto
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
