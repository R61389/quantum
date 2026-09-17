"use client";

import { motion } from "motion/react";
import { Building2, Factory, Boxes, Landmark, Warehouse, Zap, Truck, Wheat } from "lucide-react";

import { Marquee } from "@/components/motion/marquee";

// Placeholder sector badges — swap for real client/institution logos before launch.
const sectors = [
  { icon: Factory, label: "Manufactura Industrial" },
  { icon: Warehouse, label: "Logística y Montacargas" },
  { icon: Zap, label: "Energía Solar" },
  { icon: Boxes, label: "Centros de Distribución" },
  { icon: Landmark, label: "Sector Público" },
  { icon: Building2, label: "Minería" },
  { icon: Truck, label: "Transporte y Flotas" },
  { icon: Wheat, label: "Agroindustria" },
];

export function TrustedBy() {
  return (
    <section id="trusted-by" className="relative scroll-mt-28 border-y border-foreground/5 py-14">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-xs font-medium uppercase tracking-[0.28em] text-foreground/40"
        >
          Empresas e Instituciones que Confían en Nosotros
        </motion.p>
      </div>

      <Marquee>
        {sectors.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-foreground/8 bg-foreground/[0.02] px-6 py-3.5 text-foreground/50 transition-colors hover:border-primary/30 hover:text-foreground/90"
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
            <span className="whitespace-nowrap text-sm font-medium">{label}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
