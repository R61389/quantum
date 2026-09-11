import { FolderCheck, Users, BatteryFull, RefreshCw, CalendarClock } from "lucide-react";

import { AnimatedCounter } from "@/components/motion/animated-counter";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

// Illustrative figures — replace with verified real metrics before production launch.
const stats = [
  { icon: FolderCheck, value: 150, suffix: "+", label: "Proyectos Ejecutados" },
  { icon: Users, value: 80, suffix: "+", label: "Clientes Atendidos" },
  { icon: BatteryFull, value: 1200, suffix: "+", label: "kWh de Capacidad Instalada" },
  { icon: RefreshCw, value: 60, suffix: "+", label: "Sistemas Convertidos a Litio" },
  { icon: CalendarClock, value: 8, suffix: "+", label: "Años de Experiencia" },
];

export function Stats() {
  return (
    <section className="relative border-y border-foreground/5 py-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <ScrollReveal key={label} delay={i * 0.08} className="text-center">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.03] text-quantum-navy">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <AnimatedCounter
                value={value}
                suffix={suffix}
                className="block bg-[linear-gradient(90deg,#00205B,#4968A2)] bg-clip-text font-mono text-3xl font-bold text-transparent sm:text-4xl"
              />
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
