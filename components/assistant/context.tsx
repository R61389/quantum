"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { DiagnosticResult } from "@/lib/assistant/diagnostics";

export type AssistantMode =
  | "menu"
  | "faq"
  | "diagnostico"
  | "identificar"
  | "calculadoras"
  | "resumen";

export interface CollectedDiagnostic {
  symptomLabel: string;
  result: DiagnosticResult;
}

export interface CollectedBattery {
  modelo?: string;
  voltaje: number;
  ah: number;
  wh: number;
}

export interface CollectedCalculation {
  tipo: "Ah → Wh" | "Autonomía" | "Solar" | "UPS";
  resumen: string;
}

export interface CollectedContext {
  diagnostico?: CollectedDiagnostic;
  bateriaActual?: CollectedBattery;
  calculo?: CollectedCalculation;
}

interface AssistantContextValue {
  isOpen: boolean;
  mode: AssistantMode;
  openAssistant: (mode?: AssistantMode) => void;
  closeAssistant: () => void;
  setMode: (mode: AssistantMode) => void;
  collected: CollectedContext;
  updateCollected: (patch: Partial<CollectedContext>) => void;
  resetCollected: () => void;
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AssistantMode>("menu");
  const [collected, setCollected] = useState<CollectedContext>({});

  const openAssistant = useCallback((initialMode: AssistantMode = "menu") => {
    setMode(initialMode);
    setIsOpen(true);
  }, []);

  const closeAssistant = useCallback(() => setIsOpen(false), []);

  const updateCollected = useCallback((patch: Partial<CollectedContext>) => {
    setCollected((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetCollected = useCallback(() => setCollected({}), []);

  const value = useMemo(
    () => ({
      isOpen,
      mode,
      openAssistant,
      closeAssistant,
      setMode,
      collected,
      updateCollected,
      resetCollected,
    }),
    [isOpen, mode, openAssistant, closeAssistant, collected, updateCollected, resetCollected]
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used within an AssistantProvider");
  return ctx;
}
