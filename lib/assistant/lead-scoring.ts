export type Application = "Solar" | "Montacargas" | "Electromovilidad" | "Personalizada";
export type UnitsRange = "1-4" | "5-19" | "20+";
export type LeadTier = "tibio" | "caliente" | "prioritario";

export interface LeadAnswers {
  aplicacion: Application;
  usaBaterias: "si" | "no";
  unidades: UnitsRange;
}

export interface LeadScoreResult {
  score: number;
  maxScore: number;
  tier: LeadTier;
  tierLabel: string;
  tierDescription: string;
}

const APPLICATION_POINTS: Record<Application, number> = {
  Solar: 15,
  Montacargas: 15,
  Electromovilidad: 15,
  Personalizada: 18,
};

const USES_BATTERIES_POINTS: Record<"si" | "no", number> = {
  si: 20,
  no: 10,
};

const UNITS_POINTS: Record<UnitsRange, number> = {
  "1-4": 10,
  "5-19": 20,
  "20+": 30,
};

const MAX_SCORE = 18 + 20 + 30;

/**
 * Simple, transparent point-based lead score — not a black box. Volume and an
 * existing (replaceable) battery fleet are the two strongest B2B purchase-intent
 * signals for this business, so they're weighted heaviest.
 */
export function scoreLead(answers: LeadAnswers): LeadScoreResult {
  const score =
    APPLICATION_POINTS[answers.aplicacion] +
    USES_BATTERIES_POINTS[answers.usaBaterias] +
    UNITS_POINTS[answers.unidades];

  let tier: LeadTier;
  let tierLabel: string;
  let tierDescription: string;

  if (score >= 57) {
    tier = "prioritario";
    tierLabel = "Lead Prioritario";
    tierDescription = "Volumen y necesidad claros — atención comercial inmediata recomendada.";
  } else if (score >= 45) {
    tier = "caliente";
    tierLabel = "Lead Caliente";
    tierDescription = "Necesidad definida con buen potencial de cierre a corto plazo.";
  } else {
    tier = "tibio";
    tierLabel = "Lead Tibio";
    tierDescription = "Interés inicial — requiere nutrición comercial antes del cierre.";
  }

  return { score, maxScore: MAX_SCORE, tier, tierLabel, tierDescription };
}
