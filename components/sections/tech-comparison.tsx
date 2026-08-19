"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Gauge } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Chemistry = "lifepo4" | "nmc";

const profiles: Record<
  Chemistry,
  {
    name: string;
    tagline: string;
    applications: string;
    metrics: { label: string; value: number; note: string }[];
  }
> = {
  lifepo4: {
    name: "LiFePO4",
    tagline: "Fosfato de hierro y litio — máxima seguridad y ciclo de vida",
    applications: "Industrial, UPS, energía solar, montacargas y aplicaciones de alta exigencia.",
    metrics: [
      { label: "Seguridad", value: 95, note: "Máxima estabilidad térmica, sin riesgo de combustión" },
      { label: "Vida útil", value: 90, note: "Hasta 10 años de operación continua" },
      { label: "Densidad energética", value: 65, note: "Buena densidad, mayor volumen por kWh" },
      { label: "Ciclos de carga", value: 92, note: "3,000 – 5,000 ciclos de carga" },
      { label: "Rendimiento", value: 78, note: "Estable bajo alta demanda de corriente" },
    ],
  },
  nmc: {
    name: "NMC",
    tagline: "Níquel-manganeso-cobalto — máxima densidad energética",
    applications: "Electromovilidad ligera, electrónica portátil y aplicaciones de espacio reducido.",
    metrics: [
      { label: "Seguridad", value: 60, note: "Mayor sensibilidad térmica, requiere gestión avanzada" },
      { label: "Vida útil", value: 55, note: "5 – 8 años según condiciones de uso" },
      { label: "Densidad energética", value: 92, note: "Alta densidad, ideal para espacios reducidos" },
      { label: "Ciclos de carga", value: 55, note: "1,000 – 2,000 ciclos de carga" },
      { label: "Rendimiento", value: 88, note: "Alta potencia específica" },
    ],
  },
};

function AnimatedBar({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="font-mono text-sm text-quantum-electric-blue">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-[linear-gradient(90deg,#00D4FF,#00FF88)]"
        />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

export function TechComparison() {
  const [active, setActive] = useState<Chemistry>("lifepo4");
  const profile = profiles[active];

  return (
    <section id="tecnologia" className="relative scroll-mt-28 py-28 lg:py-36">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>Tecnologías de Litio</Badge>
          </div>
          <TextReveal
            as="h2"
            text="Comparador de químicas de batería"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-lg text-balance text-muted-foreground">
            Elegimos la química adecuada según seguridad, ciclo de vida y
            aplicación — no todas las baterías de litio son iguales.
          </p>
        </div>

        <ScrollReveal className="mx-auto mt-14 max-w-3xl">
          <Tabs value={active} onValueChange={(v) => setActive(v as Chemistry)}>
            <div className="flex justify-center">
              <TabsList>
                {(Object.keys(profiles) as Chemistry[]).map((key) => (
                  <TabsTrigger key={key} value={key} className="relative">
                    {active === key && (
                      <motion.span
                        layoutId="chemistry-pill"
                        className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#00D4FF,#00FF88)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{profiles[key].name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {(Object.keys(profiles) as Chemistry[]).map((key) => (
              <TabsContent key={key} value={key}>
                <div className="glass rounded-3xl p-8 sm:p-10">
                  <div className="flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{profile.tagline}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-quantum-lithium-green">
                      <ShieldCheck className="h-4 w-4" />
                      {active === "lifepo4" ? "Recomendado para uso industrial" : "Ideal para alta densidad"}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-7 sm:grid-cols-2">
                    {profile.metrics.map((metric) => (
                      <AnimatedBar key={metric.label} {...metric} />
                    ))}
                  </div>

                  <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-quantum-electric-blue" />
                    <div>
                      <p className="text-sm font-medium text-white">Aplicaciones recomendadas</p>
                      <p className="mt-1 text-sm text-muted-foreground">{profile.applications}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  );
}
