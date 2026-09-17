"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Zap } from "lucide-react";

import { useAssistant } from "./context";
import { MenuView } from "./views/menu-view";
import { FaqView } from "./views/faq-view";
import { ConsultationView } from "./views/consultation-view";
import { DiagnosticsView } from "./views/diagnostics-view";
import { IdentifyView } from "./views/identify-view";
import { CalculatorsView } from "./views/calculators-view";
import { SummaryView } from "./views/summary-view";

const TITLES: Record<string, string> = {
  menu: "Asesor Comercial",
  faq: "Preguntas Frecuentes",
  comercial: "Cuéntanos tu Proyecto",
  diagnostico: "Diagnóstico Guiado",
  identificar: "Identificar Batería",
  calculadoras: "Calculadora de Litio",
  resumen: "Resumen y Contacto",
};

export function AssistantPanel() {
  const { isOpen, mode, setMode, closeAssistant } = useAssistant();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong fixed inset-x-4 bottom-24 z-[55] flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-3xl shadow-2xl sm:inset-x-auto sm:right-6 sm:w-[400px]"
        >
          <header className="flex items-center gap-3 border-b border-foreground/10 bg-foreground/[0.02] px-5 py-4">
            {mode !== "menu" ? (
              <button
                aria-label="Volver al menú"
                onClick={() => setMode("menu")}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#00205B,#4968A2)]">
                <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{TITLES[mode]}</p>
              <p className="flex items-center gap-1.5 text-[0.65rem] text-quantum-navy-light">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-quantum-navy-light" />
                Asesor Comercial · Quantum Batteries
              </p>
            </div>
            <button
              aria-label="Cerrar asistente"
              onClick={closeAssistant}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 hover:text-foreground"
            >
              ×
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                {mode === "menu" && <MenuView />}
                {mode === "faq" && <FaqView />}
                {mode === "comercial" && <ConsultationView />}
                {mode === "diagnostico" && <DiagnosticsView />}
                {mode === "identificar" && <IdentifyView />}
                {mode === "calculadoras" && <CalculatorsView />}
                {mode === "resumen" && <SummaryView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
