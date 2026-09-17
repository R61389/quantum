"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  MapPinned,
  HeartHandshake,
  Headset,
  Recycle,
  PhoneCall,
  Building2,
  Award,
  Quote,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/text-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/scroll-reveal";
import { useAssistant } from "@/components/assistant/context";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Garantía Nacional",
    description: "Cobertura real dentro de Bolivia, sin trámites ni importaciones para hacerla válida.",
  },
  {
    icon: MapPinned,
    title: "Soporte Local Especializado",
    description: "Ingenieros bolivianos que conocen tu operación y responden en horas, no semanas.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento de por Vida",
    description: "Seguimiento y asesoría durante toda la vida útil del pack, no solo al momento de la venta.",
  },
  {
    icon: Headset,
    title: "Asesoramiento Técnico Permanente",
    description: "Consultoría continua para optimizar rendimiento y anticipar mantenimiento.",
  },
  {
    icon: Recycle,
    title: "Programa de Reciclaje",
    description: "Gestión responsable del fin de vida útil de tus baterías, con trazabilidad completa.",
  },
  {
    icon: PhoneCall,
    title: "Atención Postventa Real",
    description: "Un equipo que sigue respondiendo después de la factura, no solo antes de firmarla.",
  },
  {
    icon: Building2,
    title: "Presencia Nacional",
    description: "Cobertura en las principales ciudades y centros industriales de Bolivia.",
  },
  {
    icon: Award,
    title: "Soporte Cuando Otros Desaparecen",
    description: "Seguimos aquí cuando proveedores importados dejan de responder o salen del mercado.",
  },
];

export function LifetimePartner() {
  const { openAssistant } = useAssistant();

  return (
    <section id="garantia" className="relative scroll-mt-28 overflow-hidden py-28 lg:py-36">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(73,104,162,0.16),transparent)]"
      />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Badge>Mucho Más Que Una Garantía</Badge>
          </div>
          <TextReveal
            as="h2"
            text="Tu aliado durante toda la vida útil de la batería"
            className="mx-auto mt-5 justify-center text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong relative mx-auto mt-12 max-w-3xl rounded-3xl p-8 text-center sm:p-10"
        >
          <Quote className="mx-auto h-8 w-8 text-quantum-navy-light/50" />
          <p className="mt-4 text-balance text-xl font-semibold leading-snug text-foreground sm:text-2xl">
            No solo vendemos una batería.{" "}
            <span className="gradient-text">
              Te acompañamos durante toda su vida útil.
            </span>
          </p>
        </motion.div>

        <StaggerGroup className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-gradient-to-br from-quantum-navy/30 to-quantum-navy-light/20 text-quantum-navy-light">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Button size="lg" onClick={() => openAssistant("comercial")}>
            Quiero este nivel de acompañamiento
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
