"use client";

import { motion } from "motion/react";
import { Activity, RadioTower, Scale3d, ShieldAlert, Waves } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/scroll-reveal";

const features = [
  { icon: Waves, title: "Flujo de Datos en Tiempo Real", description: "Voltaje, corriente y temperatura de cada celda, actualizados constantemente." },
  { icon: ShieldAlert, title: "Protección Electrónica", description: "Corte automático ante sobrecarga, sobredescarga, cortocircuito o sobretemperatura." },
  { icon: Scale3d, title: "Balanceo Automático", description: "Igualación activa de celdas para maximizar capacidad útil y vida del pack." },
  { icon: RadioTower, title: "Telemetría y Diagnóstico Remoto", description: "Monitoreo del estado del sistema desde cualquier lugar, sin intervención física." },
];

// Deterministic per-cell health values (%) — avoids randomization mismatches between server and client render.
const cellVoltages = [96, 94, 97, 92, 95, 98, 71, 93, 96, 95, 94, 97, 92, 96, 95, 93];

export function BmsSystem() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="container grid items-center gap-16 lg:grid-cols-2 lg:gap-8">
        <div>
          <div className="flex">
            <Badge>Sistema BMS Inteligente</Badge>
          </div>
          <TextReveal
            as="h2"
            text="Cada celda, monitoreada en tiempo real"
            className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
          <p className="mt-4 max-w-md text-balance text-muted-foreground">
            Nuestro sistema de gestión de batería (BMS) opera como el sistema
            nervioso del pack — inspirado en la filosofía de monitoreo de
            Tesla Energy — protegiendo cada celda de forma individual.
          </p>

          <StaggerGroup className="mt-10 space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-muted text-quantum-navy-light">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong relative rounded-3xl p-6 sm:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-quantum-navy-light" />
              <span className="font-mono text-xs uppercase tracking-widest text-foreground/60">
                BMS · Estado del Pack
              </span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-quantum-navy-light/30 bg-quantum-navy-light/10 px-2.5 py-1 text-[0.65rem] font-medium text-quantum-navy-light">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-quantum-navy-light" />
              En línea
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {cellVoltages.map((v, i) => {
              const isWarning = v < 80;
              return (
                <div
                  key={i}
                  className="relative flex flex-col items-center gap-2 rounded-lg border border-foreground/10 bg-muted p-3"
                >
                  <div className="relative h-16 w-3 overflow-hidden rounded-full bg-foreground/[0.06]">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute bottom-0 w-full rounded-full ${
                        isWarning
                          ? "bg-amber-400"
                          : "bg-[linear-gradient(180deg,#4968A2,#00205B)]"
                      }`}
                    />
                  </div>
                  <span className={`font-mono text-[0.65rem] ${isWarning ? "text-amber-400" : "text-foreground/50"}`}>
                    {v}%
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-4 text-xs text-foreground/50">
            <span>16 celdas monitoreadas</span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <ShieldAlert className="h-3.5 w-3.5" />1 celda en diagnóstico
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
