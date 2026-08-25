export type Severity = "baja" | "media" | "alta";

export interface DiagnosticOption {
  id: string;
  label: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: DiagnosticOption[];
}

export interface DiagnosticResult {
  title: string;
  explanation: string;
  severity: Severity;
  recommendedAction: string;
  safetyWarning?: string;
}

export interface Symptom {
  id: string;
  label: string;
  questions: DiagnosticQuestion[];
  resolve: (answers: Record<string, string>) => DiagnosticResult;
}

const GENERIC_FALLBACK: DiagnosticResult = {
  title: "Diagnóstico no concluyente",
  explanation:
    "Con la información disponible no podemos precisar la causa. Puede tratarse de varios factores (celda, BMS, cargador o instalación).",
  severity: "media",
  recommendedAction:
    "Recomendamos una revisión técnica presencial o remota con uno de nuestros ingenieros.",
};

export const SYMPTOMS: Symptom[] = [
  {
    id: "no-carga",
    label: "La batería no carga",
    questions: [
      {
        id: "cargador",
        question: "¿El cargador enciende y muestra alguna luz o código?",
        options: [
          { id: "normal", label: "Sí, muestra una luz de carga normal" },
          { id: "error", label: "Sí, pero muestra una luz de error o parpadeo" },
          { id: "apagado", label: "No enciende ninguna luz" },
        ],
      },
      {
        id: "voltaje",
        question: "¿Has medido el voltaje de la batería en reposo?",
        options: [
          { id: "normal", label: "Sí, el voltaje parece normal" },
          { id: "bajo", label: "Sí, es muy bajo o marca 0V" },
          { id: "no-medido", label: "No lo he medido" },
        ],
      },
    ],
    resolve: (a) => {
      if (a.cargador === "apagado") {
        return {
          title: "Posible falla en el cargador o la alimentación",
          explanation:
            "Si el cargador no enciende ninguna luz, el problema puede estar en el cargador, el cable o la toma de corriente, más que en la batería.",
          severity: "media",
          recommendedAction:
            "Verifica el cargador con otra toma de corriente. Si el problema persiste, contáctanos para revisar el cargador y la batería.",
        };
      }
      if (a.cargador === "error" || a.voltaje === "bajo") {
        return {
          title: "Posible corte de protección del BMS",
          explanation:
            "Es probable que el sistema BMS haya bloqueado la carga como protección ante sobredescarga, temperatura fuera de rango o desbalance entre celdas.",
          severity: "alta",
          recommendedAction:
            "No fuerces la carga con otro cargador. Te recomendamos un diagnóstico técnico para verificar el estado del BMS y las celdas.",
        };
      }
      return GENERIC_FALLBACK;
    },
  },
  {
    id: "dura-poco",
    label: "La batería dura poco",
    questions: [
      {
        id: "antiguedad",
        question: "¿Hace cuánto tiempo notas esta pérdida de duración?",
        options: [
          { id: "reciente", label: "Es reciente (semanas)" },
          { id: "gradual", label: "Ha sido gradual (meses o años de uso)" },
        ],
      },
      {
        id: "uso",
        question: "¿El equipo o consumo conectado cambió recientemente?",
        options: [
          { id: "si", label: "Sí, agregamos más carga o equipos" },
          { id: "no", label: "No, el consumo es el mismo de siempre" },
        ],
      },
    ],
    resolve: (a) => {
      if (a.uso === "si") {
        return {
          title: "Posible desajuste entre capacidad y consumo actual",
          explanation:
            "Si el consumo conectado aumentó, es normal que la autonomía baje aunque la batería esté en buen estado.",
          severity: "baja",
          recommendedAction:
            "Podemos ayudarte a recalcular la capacidad necesaria para tu consumo actual y recomendarte un pack adecuado.",
        };
      }
      if (a.antiguedad === "gradual") {
        return {
          title: "Degradación normal por ciclos de uso",
          explanation:
            "La pérdida gradual de capacidad a lo largo de meses o años suele deberse al desgaste natural de las celdas tras muchos ciclos de carga y descarga.",
          severity: "media",
          recommendedAction:
            "Un diagnóstico de capacidad real (test de descarga) confirma cuánta capacidad útil queda y si conviene reemplazar el pack.",
        };
      }
      return {
        title: "Posible desbalance de celdas",
        explanation:
          "Una caída reciente y no gradual en la duración suele apuntar a una celda débil o desbalanceada dentro del pack.",
        severity: "media",
        recommendedAction:
          "Recomendamos un diagnóstico de balanceo de celdas para confirmar la causa exacta.",
      };
    },
  },
  {
    id: "descarga-rapida",
    label: "La batería se descarga rápidamente",
    questions: [
      {
        id: "reposo",
        question: "¿Se descarga incluso sin estar en uso (en reposo)?",
        options: [
          { id: "si", label: "Sí, pierde carga estando desconectada" },
          { id: "no", label: "No, solo se descarga rápido en uso" },
        ],
      },
    ],
    resolve: (a) => {
      if (a.reposo === "si") {
        return {
          title: "Posible autodescarga anormal o consumo fantasma",
          explanation:
            "Una batería LiFePO4 en buen estado tiene una autodescarga muy baja. Perder carga en reposo puede indicar una celda dañada, un BMS con consumo elevado, o un dispositivo conectado consumiendo en segundo plano.",
          severity: "media",
          recommendedAction:
            "Verifica que no haya un consumo permanente conectado. Si el problema persiste, se recomienda un diagnóstico del BMS y las celdas.",
        };
      }
      return {
        title: "Posible caída de capacidad real bajo carga",
        explanation:
          "Cuando la descarga rápida ocurre solo con carga conectada, suele deberse a una pérdida de capacidad real de las celdas o a que el consumo actual excede la capacidad del pack.",
        severity: "media",
        recommendedAction:
          "Podemos ayudarte a calcular si tu consumo actual es compatible con la capacidad de tu batería, o evaluar un reemplazo.",
      };
    },
  },
  {
    id: "ups-poca-autonomia",
    label: "El sistema UPS tiene poca autonomía",
    questions: [
      {
        id: "diseno",
        question: "¿Conoces la capacidad (Ah) instalada en tu UPS?",
        options: [
          { id: "si", label: "Sí, la conozco" },
          { id: "no", label: "No la conozco" },
        ],
      },
    ],
    resolve: (a) => ({
      title: "Posible subdimensionamiento del banco de baterías",
      explanation:
        "La causa más común de poca autonomía en un UPS es que la capacidad instalada no fue dimensionada para la carga actual, o que las baterías perdieron capacidad con el uso.",
      severity: "baja",
      recommendedAction:
        a.diseno === "si"
          ? "Usa la Calculadora UPS del asistente con la potencia de tu equipo para verificar si la capacidad instalada es suficiente."
          : "Podemos ayudarte a medir la potencia de tu equipo y calcular la capacidad recomendada para la autonomía que necesitas.",
    }),
  },
  {
    id: "solar-no-almacena",
    label: "El sistema solar ya no almacena suficiente energía",
    questions: [
      {
        id: "paneles",
        question: "¿Los paneles solares siguen generando energía con normalidad?",
        options: [
          { id: "si", label: "Sí, la generación parece normal" },
          { id: "no", label: "No estoy seguro / parece baja" },
        ],
      },
    ],
    resolve: (a) => {
      if (a.paneles === "no") {
        return {
          title: "Revisar primero la etapa de generación",
          explanation:
            "Antes de asumir un problema en la batería, conviene confirmar que los paneles y el controlador de carga estén generando la energía esperada.",
          severity: "baja",
          recommendedAction:
            "Si confirmas que la generación es normal y el problema persiste, contáctanos para evaluar la batería.",
        };
      }
      return {
        title: "Posible pérdida de capacidad en el banco de baterías",
        explanation:
          "Si la generación solar es normal pero el almacenamiento ya no alcanza, es probable que el banco de baterías haya perdido capacidad útil por ciclos de uso.",
        severity: "media",
        recommendedAction:
          "Usa la Calculadora Solar del asistente para verificar la capacidad mínima recomendada para tu consumo y horas de respaldo.",
      };
    },
  },
  {
    id: "calentamiento",
    label: "La batería presenta calentamiento",
    questions: [
      {
        id: "momento",
        question: "¿Cuándo notas el calentamiento?",
        options: [
          { id: "carga", label: "Durante la carga" },
          { id: "uso", label: "Durante el uso / descarga" },
          { id: "reposo", label: "Incluso en reposo, sin uso" },
        ],
      },
    ],
    resolve: () => ({
      title: "Atención: el calentamiento es una señal de seguridad",
      explanation:
        "El calentamiento en una batería de litio puede indicar sobrecarga, un cortocircuito interno, una celda dañada o una falla del BMS. No es un síntoma para diagnosticar por prueba y error.",
      severity: "alta",
      recommendedAction:
        "Contacta a un ingeniero de inmediato para una evaluación técnica antes de seguir usando la batería.",
      safetyWarning:
        "Por seguridad: desconecta la batería si puedes hacerlo sin riesgo, colócala en una superficie no inflamable, aléjate de materiales combustibles y no la sigas cargando ni usando hasta que sea revisada.",
    }),
  },
  {
    id: "bms-errores",
    label: "El BMS muestra errores",
    questions: [
      {
        id: "codigo",
        question: "¿El error se repite de forma constante o es intermitente?",
        options: [
          { id: "constante", label: "Es constante" },
          { id: "intermitente", label: "Es intermitente" },
        ],
      },
    ],
    resolve: (a) => ({
      title: "Error de protección del sistema BMS",
      explanation:
        a.codigo === "constante"
          ? "Un error constante suele indicar una condición de protección activa (sobrevoltaje, subvoltaje, sobretemperatura o desbalance) que el BMS no puede resolver por sí solo."
          : "Un error intermitente puede deberse a una conexión suelta, una celda al límite de su rango, o variaciones de temperatura.",
      severity: "alta",
      recommendedAction:
        "Comparte el código o mensaje exacto que muestra el BMS con nuestro equipo técnico para un diagnóstico preciso.",
      safetyWarning:
        "Evita reiniciar o forzar el sistema repetidamente. Si notas olor, humo o deformación en la carcasa, desconecta la batería de inmediato y contáctanos.",
    }),
  },
];

export function getSymptom(id: string): Symptom | undefined {
  return SYMPTOMS.find((s) => s.id === id);
}
