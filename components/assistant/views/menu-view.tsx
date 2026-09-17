import { HelpCircle, Stethoscope, ScanSearch, Calculator, MessageCircle } from "lucide-react";

import { useAssistant } from "../context";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/assistant/whatsapp";

const actions = [
  {
    mode: "diagnostico" as const,
    icon: Stethoscope,
    title: "Diagnóstico Guiado",
    description: "Describe el problema y recibe un diagnóstico preliminar.",
  },
  {
    mode: "identificar" as const,
    icon: ScanSearch,
    title: "Identificar mi Batería",
    description: "Ingresa los datos de tu batería y encuentra su equivalente.",
  },
  {
    mode: "calculadoras" as const,
    icon: Calculator,
    title: "Calculadora de Litio",
    description: "Ah → Wh, autonomía, energía solar y respaldo UPS.",
  },
  {
    mode: "faq" as const,
    icon: HelpCircle,
    title: "Preguntas Frecuentes",
    description: "Respuestas rápidas sobre baterías de litio.",
  },
];

export function MenuView() {
  const { setMode } = useAssistant();

  return (
    <div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Soy el asistente técnico de Quantum Batteries. Puedo ayudarte a
        diagnosticar problemas, identificar tu batería, calcular capacidades
        o resolver dudas frecuentes. ¿En qué te ayudo?
      </p>

      <div className="mt-5 grid gap-3">
        {actions.map(({ mode, icon: Icon, title, description }) => (
          <button
            key={mode}
            onClick={() => setMode(mode)}
            className="group flex items-start gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-4 text-left transition-colors hover:border-primary/40 hover:bg-foreground/[0.04]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-muted text-quantum-navy-light">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">{title}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                {description}
              </span>
            </span>
          </button>
        ))}
      </div>

      <a
        href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <MessageCircle className="h-4 w-4" />
        Hablar directo con un ingeniero
      </a>
    </div>
  );
}
