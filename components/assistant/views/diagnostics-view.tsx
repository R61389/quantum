"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ChevronRight, ShieldAlert } from "lucide-react";

import { SYMPTOMS, getSymptom, type DiagnosticResult } from "@/lib/assistant/diagnostics";
import { useAssistant } from "../context";

const SEVERITY_STYLES: Record<DiagnosticResult["severity"], string> = {
  baja: "border-quantum-navy-light/30 bg-quantum-navy-light/10 text-quantum-navy-light",
  media: "border-amber-400/30 bg-amber-400/10 text-amber-400",
  alta: "border-red-400/30 bg-red-400/10 text-red-400",
};

const SEVERITY_LABEL: Record<DiagnosticResult["severity"], string> = {
  baja: "Prioridad baja",
  media: "Prioridad media",
  alta: "Prioridad alta",
};

export function DiagnosticsView() {
  const { updateCollected, setMode } = useAssistant();
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const symptom = symptomId ? getSymptom(symptomId) : undefined;
  const question = symptom?.questions[step];

  const result = useMemo(() => {
    if (!symptom) return null;
    if (Object.keys(answers).length < symptom.questions.length) return null;
    return symptom.resolve(answers);
  }, [symptom, answers]);

  function selectSymptom(id: string) {
    setSymptomId(id);
    setStep(0);
    setAnswers({});
  }

  function answer(questionId: string, optionId: string) {
    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);
    if (symptom && step < symptom.questions.length - 1) {
      setStep(step + 1);
    }
  }

  function saveAndContinue() {
    if (!symptom || !result) return;
    updateCollected({ diagnostico: { symptomLabel: symptom.label, result } });
    setMode("resumen");
  }

  if (!symptom) {
    return (
      <div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Selecciona el problema que mejor describe tu situación.
        </p>
        <div className="grid gap-2">
          {SYMPTOMS.map((s) => (
            <button
              key={s.id}
              onClick={() => selectSymptom(s.id)}
              className="flex items-center justify-between rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-left text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-foreground/[0.05]"
            >
              {s.label}
              <ChevronRight className="h-4 w-4 text-foreground/30" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!result && question) {
    return (
      <div>
        <div className="mb-4 flex items-center gap-1.5">
          {symptom.questions.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-quantum-navy" : "bg-foreground/10"}`}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-foreground">{question.question}</p>
        <div className="mt-4 grid gap-2">
          {question.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => answer(question.id, opt.id)}
              className="rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-left text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-foreground/[0.05]"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div>
        <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium w-fit ${SEVERITY_STYLES[result.severity]}`}>
          {result.severity === "alta" ? (
            <ShieldAlert className="h-3.5 w-3.5" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5" />
          )}
          {SEVERITY_LABEL[result.severity]}
        </div>

        <h3 className="mt-4 text-base font-semibold text-foreground">{result.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.explanation}</p>

        <div className="mt-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-quantum-navy-light">
            Acción recomendada
          </p>
          <p className="mt-1.5 text-sm text-foreground/85">{result.recommendedAction}</p>
        </div>

        {result.safetyWarning && (
          <div className="mt-3 flex gap-2.5 rounded-xl border border-red-400/25 bg-red-400/5 p-4">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <p className="text-xs leading-relaxed text-red-200/90">{result.safetyWarning}</p>
          </div>
        )}

        <p className="mt-4 text-xs text-foreground/40">
          Este es un diagnóstico preliminar automatizado, no reemplaza la
          evaluación de un técnico.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={saveAndContinue}
            className="rounded-full bg-[linear-gradient(90deg,#00205B,#4968A2)] px-5 py-3 text-sm font-medium text-white"
          >
            Continuar y hablar con un ingeniero
          </button>
          <button
            onClick={() => setSymptomId(null)}
            className="rounded-full border border-foreground/10 px-5 py-3 text-sm text-foreground/70 hover:text-foreground"
          >
            Elegir otro síntoma
          </button>
        </div>
      </div>
    );
  }

  return null;
}
