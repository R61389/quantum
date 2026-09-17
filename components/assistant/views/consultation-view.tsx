"use client";

import { useState } from "react";
import { Sun, Forklift, Car, SlidersHorizontal, Flame, ChevronRight } from "lucide-react";

import { scoreLead, type Application, type UnitsRange } from "@/lib/assistant/lead-scoring";
import { useAssistant } from "../context";

const APPLICATIONS: { value: Application; icon: typeof Sun; label: string }[] = [
  { value: "Solar", icon: Sun, label: "Energía Solar" },
  { value: "Montacargas", icon: Forklift, label: "Montacargas" },
  { value: "Electromovilidad", icon: Car, label: "Electromovilidad" },
  { value: "Personalizada", icon: SlidersHorizontal, label: "Solución Personalizada" },
];

const UNIT_OPTIONS: { value: UnitsRange; label: string }[] = [
  { value: "1-4", label: "1 a 4 unidades" },
  { value: "5-19", label: "5 a 19 unidades" },
  { value: "20+", label: "20 o más unidades" },
];

const TIER_STYLES = {
  tibio: "border-quantum-navy-light/30 bg-quantum-navy-light/10 text-quantum-navy-light",
  caliente: "border-amber-400/30 bg-amber-400/10 text-amber-400",
  prioritario: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
};

const TIER_MESSAGE = {
  tibio: "Tu proyecto entra a nuestra lista de seguimiento comercial. Un asesor se pondrá en contacto para entender mejor tu necesidad.",
  caliente: "Tu proyecto tiene buen potencial — un asesor comercial te contactará con prioridad.",
  prioritario: "Tu proyecto entra como prioritario. Un asesor comercial senior te contactará directamente.",
};

export function ConsultationView() {
  const { updateCollected, setMode } = useAssistant();
  const [step, setStep] = useState(0);
  const [aplicacion, setAplicacion] = useState<Application | null>(null);
  const [usaBaterias, setUsaBaterias] = useState<"si" | "no" | null>(null);
  const [unidades, setUnidades] = useState<UnitsRange | null>(null);

  function selectAplicacion(value: Application) {
    setAplicacion(value);
    setStep(1);
  }

  function selectUsaBaterias(value: "si" | "no") {
    setUsaBaterias(value);
    setStep(2);
  }

  function selectUnidades(value: UnitsRange) {
    setUnidades(value);
    if (!aplicacion || !usaBaterias) return;
    const answers = { aplicacion, usaBaterias, unidades: value };
    const score = scoreLead(answers);
    updateCollected({ lead: { answers, score } });
    setStep(3);
  }

  if (step === 0) {
    return (
      <div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          3 preguntas rápidas para conectarte con el asesor adecuado.
          ¿Qué aplicación necesitas?
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {APPLICATIONS.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => selectAplicacion(value)}
              className="flex flex-col items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.02] px-3 py-5 text-center text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-foreground/[0.05]"
            >
              <Icon className="h-5 w-5 text-quantum-navy-light" strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div>
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-1 flex-1 rounded-full bg-quantum-navy" />
          <span className="h-1 flex-1 rounded-full bg-foreground/10" />
          <span className="h-1 flex-1 rounded-full bg-foreground/10" />
        </div>
        <p className="text-sm font-medium text-foreground">¿Actualmente utilizas baterías?</p>
        <div className="mt-4 grid gap-2">
          <button
            onClick={() => selectUsaBaterias("si")}
            className="flex items-center justify-between rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-left text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-foreground/[0.05]"
          >
            Sí, tengo baterías que quiero reemplazar o mejorar
            <ChevronRight className="h-4 w-4 text-foreground/30" />
          </button>
          <button
            onClick={() => selectUsaBaterias("no")}
            className="flex items-center justify-between rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-left text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-foreground/[0.05]"
          >
            No, es un proyecto nuevo
            <ChevronRight className="h-4 w-4 text-foreground/30" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-1 flex-1 rounded-full bg-quantum-navy" />
          <span className="h-1 flex-1 rounded-full bg-quantum-navy" />
          <span className="h-1 flex-1 rounded-full bg-foreground/10" />
        </div>
        <p className="text-sm font-medium text-foreground">¿Cuántas unidades requieres?</p>
        <div className="mt-4 grid gap-2">
          {UNIT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => selectUnidades(value)}
              className="flex items-center justify-between rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-left text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-foreground/[0.05]"
            >
              {label}
              <ChevronRight className="h-4 w-4 text-foreground/30" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3 && aplicacion && usaBaterias && unidades) {
    const { tier, tierLabel } = scoreLead({ aplicacion, usaBaterias, unidades });

    return (
      <div>
        <div className={`flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${TIER_STYLES[tier]}`}>
          <Flame className="h-3.5 w-3.5" />
          {tierLabel}
        </div>

        <h3 className="mt-4 text-base font-semibold text-foreground">
          Gracias — ya tenemos lo esencial de tu proyecto
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {TIER_MESSAGE[tier]}
        </p>

        <div className="mt-4 space-y-2 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Aplicación</span>
            <span className="font-medium text-foreground">{aplicacion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">¿Usa baterías hoy?</span>
            <span className="font-medium text-foreground">{usaBaterias === "si" ? "Sí" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Unidades requeridas</span>
            <span className="font-medium text-foreground">{unidades}</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={() => setMode("resumen")}
            className="rounded-full bg-[linear-gradient(90deg,#163269,#4968A2)] px-5 py-3 text-sm font-medium text-white"
          >
            Continuar por WhatsApp
          </button>
          <button
            onClick={() => setMode("identificar")}
            className="rounded-full border border-foreground/10 px-5 py-3 text-sm text-foreground/70 hover:text-foreground"
          >
            Ya sé qué batería necesito, identificarla
          </button>
        </div>
      </div>
    );
  }

  return null;
}
