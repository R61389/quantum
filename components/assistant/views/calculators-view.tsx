"use client";

import { useMemo, useState } from "react";
import { Zap, Clock, Sun, BatteryCharging } from "lucide-react";

import {
  ahToWh,
  estimateAutonomyHours,
  estimateSolarCapacity,
  estimateUpsCapacity,
} from "@/lib/assistant/calculators";
import { suggestProductForCapacity } from "@/lib/assistant/recommender";
import { useAssistant } from "../context";

type CalcType = "ah-wh" | "autonomia" | "solar" | "ups";

const VOLTAGE_OPTIONS = [12, 24, 36, 48, 60, 72];

const TABS: { id: CalcType; label: string; icon: typeof Zap }[] = [
  { id: "ah-wh", label: "Ah → Wh", icon: Zap },
  { id: "autonomia", label: "Autonomía", icon: Clock },
  { id: "solar", label: "Solar", icon: Sun },
  { id: "ups", label: "UPS", icon: BatteryCharging },
];

function NumberField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground/60">{label}</label>
      <div className="mt-1.5 flex items-center rounded-lg border border-foreground/10 bg-muted focus-within:border-primary/50">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground outline-none"
        />
        <span className="pr-3 text-xs text-foreground/40">{suffix}</span>
      </div>
    </div>
  );
}

function VoltageSelect({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground/60">Voltaje del sistema</label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full rounded-lg border border-foreground/10 bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
      >
        {VOLTAGE_OPTIONS.map((v) => (
          <option key={v} value={v} className="bg-white">
            {v} V
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">{children}</div>
  );
}

function SuggestedProduct({ voltaje, requiredAh }: { voltaje: number; requiredAh: number }) {
  const suggestion = suggestProductForCapacity(voltaje, requiredAh);
  if (!suggestion) {
    return (
      <p className="mt-3 text-xs text-foreground/50">
        No hay productos en catálogo para {voltaje}V. Un ingeniero puede evaluar una solución a medida.
      </p>
    );
  }
  return (
    <div className="mt-3 border-t border-foreground/10 pt-3">
      <p className="text-xs font-medium uppercase tracking-wide text-quantum-navy">
        Modelo Quantum recomendado
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{suggestion.product.modelo}</p>
      <p className="text-xs text-muted-foreground">
        {suggestion.product.voltaje}V · {suggestion.product.ah}Ah
      </p>
      {!suggestion.meetsRequirement && (
        <p className="mt-1 text-xs text-amber-400">
          Este es el modelo de mayor capacidad disponible en {voltaje}V; para
          cubrir el 100% del requerimiento puede necesitarse más de una unidad.
        </p>
      )}
    </div>
  );
}

export function CalculatorsView() {
  const { updateCollected, setMode } = useAssistant();
  const [tab, setTab] = useState<CalcType>("ah-wh");

  // Ah -> Wh
  const [v1, setV1] = useState(12);
  const [ah1, setAh1] = useState(100);
  const wh1 = useMemo(() => ahToWh(v1, ah1), [v1, ah1]);

  // Autonomía
  const [v2, setV2] = useState(12);
  const [ah2, setAh2] = useState(100);
  const [load2, setLoad2] = useState(200);
  const hours2 = useMemo(() => estimateAutonomyHours(v2, ah2, load2), [v2, ah2, load2]);

  // Solar
  const [dailyWh, setDailyWh] = useState(2000);
  const [backupHours, setBackupHours] = useState(12);
  const [v3, setV3] = useState(24);
  const solarResult = useMemo(
    () => estimateSolarCapacity(dailyWh, backupHours, v3),
    [dailyWh, backupHours, v3]
  );

  // UPS
  const [upsLoad, setUpsLoad] = useState(500);
  const [upsHours, setUpsHours] = useState(2);
  const [v4, setV4] = useState(24);
  const upsResult = useMemo(() => estimateUpsCapacity(upsLoad, upsHours, v4), [upsLoad, upsHours, v4]);

  function saveAndContinue(resumen: string, tipo: "Ah → Wh" | "Autonomía" | "Solar" | "UPS") {
    updateCollected({ calculo: { tipo, resumen } });
    setMode("resumen");
  }

  return (
    <div>
      <div className="mb-5 grid grid-cols-4 gap-1 rounded-full border border-foreground/10 bg-foreground/[0.02] p-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center gap-1 rounded-full py-2 text-[0.65rem] transition-colors ${
              tab === id ? "bg-foreground/10 text-foreground" : "text-foreground/40 hover:text-foreground/70"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === "ah-wh" && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Voltaje" value={v1} onChange={setV1} suffix="V" />
            <NumberField label="Capacidad" value={ah1} onChange={setAh1} suffix="Ah" />
          </div>
          <ResultCard>
            <p className="text-xs text-foreground/50">Energía total</p>
            <p className="mt-1 font-mono text-2xl font-bold text-quantum-navy">
              {wh1.toLocaleString("es-BO")} Wh
            </p>
          </ResultCard>
          <button
            onClick={() => saveAndContinue(`${v1}V × ${ah1}Ah = ${wh1.toLocaleString("es-BO")} Wh`, "Ah → Wh")}
            className="mt-4 w-full rounded-full bg-[linear-gradient(90deg,#00205B,#4968A2)] px-5 py-3 text-sm font-medium text-white"
          >
            Enviar este cálculo a un ingeniero
          </button>
        </div>
      )}

      {tab === "autonomia" && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Voltaje" value={v2} onChange={setV2} suffix="V" />
            <NumberField label="Capacidad" value={ah2} onChange={setAh2} suffix="Ah" />
          </div>
          <div className="mt-3">
            <NumberField label="Consumo del equipo" value={load2} onChange={setLoad2} suffix="W" />
          </div>
          <ResultCard>
            <p className="text-xs text-foreground/50">Autonomía estimada</p>
            <p className="mt-1 font-mono text-2xl font-bold text-quantum-navy">
              {hours2.toFixed(1)} horas
            </p>
            <p className="mt-1 text-[0.7rem] text-foreground/40">
              Estimación con 80% de profundidad de descarga útil.
            </p>
          </ResultCard>
          <button
            onClick={() =>
              saveAndContinue(
                `${v2}V ${ah2}Ah con carga de ${load2}W ≈ ${hours2.toFixed(1)} horas de autonomía`,
                "Autonomía"
              )
            }
            className="mt-4 w-full rounded-full bg-[linear-gradient(90deg,#00205B,#4968A2)] px-5 py-3 text-sm font-medium text-white"
          >
            Enviar este cálculo a un ingeniero
          </button>
        </div>
      )}

      {tab === "solar" && (
        <div>
          <div className="space-y-3">
            <NumberField label="Consumo diario" value={dailyWh} onChange={setDailyWh} suffix="Wh/día" />
            <NumberField label="Horas de respaldo deseadas" value={backupHours} onChange={setBackupHours} suffix="h" />
            <VoltageSelect value={v3} onChange={setV3} />
          </div>
          <ResultCard>
            <p className="text-xs text-foreground/50">Capacidad mínima recomendada</p>
            <p className="mt-1 font-mono text-2xl font-bold text-quantum-navy">
              {Math.round(solarResult.requiredAh).toLocaleString("es-BO")} Ah
            </p>
            <p className="text-xs text-foreground/40">
              ({Math.round(solarResult.requiredWh).toLocaleString("es-BO")} Wh a {v3}V)
            </p>
            <SuggestedProduct voltaje={v3} requiredAh={solarResult.requiredAh} />
          </ResultCard>
          <button
            onClick={() =>
              saveAndContinue(
                `Consumo ${dailyWh}Wh/día, ${backupHours}h de respaldo a ${v3}V → ${Math.round(solarResult.requiredAh)} Ah recomendados`,
                "Solar"
              )
            }
            className="mt-4 w-full rounded-full bg-[linear-gradient(90deg,#00205B,#4968A2)] px-5 py-3 text-sm font-medium text-white"
          >
            Enviar este cálculo a un ingeniero
          </button>
        </div>
      )}

      {tab === "ups" && (
        <div>
          <div className="space-y-3">
            <NumberField label="Potencia del equipo" value={upsLoad} onChange={setUpsLoad} suffix="W" />
            <NumberField label="Tiempo de autonomía deseado" value={upsHours} onChange={setUpsHours} suffix="h" />
            <VoltageSelect value={v4} onChange={setV4} />
          </div>
          <ResultCard>
            <p className="text-xs text-foreground/50">Capacidad requerida</p>
            <p className="mt-1 font-mono text-2xl font-bold text-quantum-navy">
              {Math.round(upsResult.requiredAh).toLocaleString("es-BO")} Ah
            </p>
            <p className="text-xs text-foreground/40">
              ({Math.round(upsResult.requiredWh).toLocaleString("es-BO")} Wh a {v4}V)
            </p>
            <SuggestedProduct voltaje={v4} requiredAh={upsResult.requiredAh} />
          </ResultCard>
          <button
            onClick={() =>
              saveAndContinue(
                `Equipo de ${upsLoad}W, ${upsHours}h de autonomía a ${v4}V → ${Math.round(upsResult.requiredAh)} Ah recomendados`,
                "UPS"
              )
            }
            className="mt-4 w-full rounded-full bg-[linear-gradient(90deg,#00205B,#4968A2)] px-5 py-3 text-sm font-medium text-white"
          >
            Enviar este cálculo a un ingeniero
          </button>
        </div>
      )}
    </div>
  );
}
