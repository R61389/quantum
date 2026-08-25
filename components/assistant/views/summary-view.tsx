import { MessageCircle, Stethoscope, ScanSearch, Calculator, Inbox } from "lucide-react";

import { buildWhatsAppLink } from "@/lib/assistant/whatsapp";
import { useAssistant, type CollectedContext } from "../context";

function buildSummaryMessage(collected: CollectedContext): string {
  const lines = [
    "Hola, soy un visitante del sitio de Quantum Batteries Bolivia.",
    "Usé el asistente virtual y esto es lo que recopilé:",
    "",
  ];

  if (collected.diagnostico) {
    lines.push(
      `🔧 Diagnóstico: ${collected.diagnostico.symptomLabel}`,
      `→ ${collected.diagnostico.result.title}`
    );
  }

  if (collected.bateriaActual) {
    const b = collected.bateriaActual;
    lines.push(
      `🔋 Batería actual: ${b.modelo ? `${b.modelo} · ` : ""}${b.voltaje}V ${b.ah}Ah (${b.wh.toLocaleString("es-BO")} Wh)`
    );
  }

  if (collected.calculo) {
    lines.push(`📐 Cálculo (${collected.calculo.tipo}): ${collected.calculo.resumen}`);
  }

  lines.push("", "Me gustaría recibir asesoría y una cotización, por favor.");
  return lines.join("\n");
}

export function SummaryView() {
  const { collected, resetCollected, setMode } = useAssistant();
  const hasContext = Boolean(collected.diagnostico || collected.bateriaActual || collected.calculo);

  return (
    <div>
      {!hasContext && (
        <div className="mb-5 flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center">
          <Inbox className="h-6 w-6 text-white/30" />
          <p className="text-sm text-muted-foreground">
            Aún no recopilamos información. Usa el diagnóstico, la
            identificación de batería o una calculadora, o escribe
            directamente a un ingeniero.
          </p>
        </div>
      )}

      {collected.diagnostico && (
        <div className="mb-3 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-quantum-electric-blue" />
          <div>
            <p className="text-xs font-medium text-white">{collected.diagnostico.symptomLabel}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{collected.diagnostico.result.title}</p>
          </div>
        </div>
      )}

      {collected.bateriaActual && (
        <div className="mb-3 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <ScanSearch className="mt-0.5 h-4 w-4 shrink-0 text-quantum-electric-blue" />
          <div>
            <p className="text-xs font-medium text-white">
              {collected.bateriaActual.modelo || "Batería identificada"}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {collected.bateriaActual.voltaje}V · {collected.bateriaActual.ah}Ah ·{" "}
              {collected.bateriaActual.wh.toLocaleString("es-BO")} Wh
            </p>
          </div>
        </div>
      )}

      {collected.calculo && (
        <div className="mb-3 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Calculator className="mt-0.5 h-4 w-4 shrink-0 text-quantum-electric-blue" />
          <div>
            <p className="text-xs font-medium text-white">Cálculo: {collected.calculo.tipo}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{collected.calculo.resumen}</p>
          </div>
        </div>
      )}

      <a
        href={buildWhatsAppLink(buildSummaryMessage(collected))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <MessageCircle className="h-4 w-4" />
        {hasContext ? "Enviar resumen por WhatsApp" : "Escribir a un ingeniero"}
      </a>

      {hasContext && (
        <button
          onClick={() => {
            resetCollected();
            setMode("menu");
          }}
          className="mt-2 w-full rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 hover:text-white"
        >
          Empezar de nuevo
        </button>
      )}

      <p className="mt-4 text-[0.7rem] leading-relaxed text-white/35">
        Este resumen se abre en WhatsApp para que lo envíes tú mismo a
        nuestro equipo — ningún dato se comparte automáticamente sin tu
        confirmación.
      </p>
    </div>
  );
}
