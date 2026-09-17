"use client";

import { useMemo, useState } from "react";
import { Camera, CheckCircle2, Search, Sparkles } from "lucide-react";

import { wattHours } from "@/lib/assistant/battery-database";
import { identifyBattery, recommendReplacements } from "@/lib/assistant/recommender";
import { useAssistant } from "../context";

const VOLTAGE_OPTIONS = [12, 24, 36, 48, 60, 72];

export function IdentifyView() {
  const { updateCollected, setMode } = useAssistant();
  const [modelo, setModelo] = useState("");
  const [voltaje, setVoltaje] = useState(12);
  const [ah, setAh] = useState<number>(100);
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const identification = useMemo(() => {
    if (!submitted) return null;
    return identifyBattery({ modelo: modelo || undefined, voltaje, ah });
  }, [submitted, modelo, voltaje, ah]);

  const currentWh = wattHours(voltaje, ah);

  const recommendation = useMemo(() => {
    if (!submitted) return null;
    return recommendReplacements({ voltaje, ah });
  }, [submitted, voltaje, ah]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function saveAndContinue() {
    updateCollected({
      bateriaActual: { modelo: modelo || undefined, voltaje, ah, wh: currentWh },
    });
    setMode("resumen");
  }

  if (submitted && identification && recommendation) {
    const matched = identification.exact ?? identification.closeMatches[0] ?? null;

    return (
      <div>
        <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-quantum-navy-light">
            <CheckCircle2 className="h-3.5 w-3.5" /> Batería Actual
          </p>
          <dl className="grid grid-cols-2 gap-y-1.5 text-sm">
            <dt className="text-foreground/50">Modelo</dt>
            <dd className="text-right text-foreground">{modelo || matched?.modelo || "No especificado"}</dd>
            <dt className="text-foreground/50">Voltaje</dt>
            <dd className="text-right text-foreground">{voltaje} V</dd>
            <dt className="text-foreground/50">Capacidad</dt>
            <dd className="text-right text-foreground">{ah} Ah</dd>
            <dt className="text-foreground/50">Energía</dt>
            <dd className="text-right text-foreground">{currentWh.toLocaleString("es-BO")} Wh</dd>
            {matched && (
              <>
                <dt className="text-foreground/50">Tecnología</dt>
                <dd className="text-right text-foreground">{matched.tipoQuimico}</dd>
                <dt className="text-foreground/50">Aplicación</dt>
                <dd className="text-right text-foreground">{matched.aplicacion.join(", ")}</dd>
              </>
            )}
          </dl>
          {identification.exact && (
            <p className="mt-3 text-xs text-quantum-navy-light">
              Modelo encontrado en nuestro catálogo.
            </p>
          )}
          {!identification.exact && identification.closeMatches.length > 0 && (
            <p className="mt-3 text-xs text-foreground/50">
              No encontramos ese modelo exacto, pero identificamos equivalencias cercanas por voltaje y capacidad.
            </p>
          )}
          {!identification.exact && identification.closeMatches.length === 0 && (
            <p className="mt-3 text-xs text-foreground/50">
              No encontramos coincidencias automáticas. Un ingeniero puede confirmar la equivalencia exacta.
            </p>
          )}
        </div>

        {recommendation.sameVoltageAvailable ? (
          <div className="mt-4 space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              Reemplazos recomendados
            </p>
            {[
              { label: "Equivalente", option: recommendation.equivalente },
              { label: "Mayor autonomía", option: recommendation.autonomia },
              { label: "Premium", option: recommendation.premium },
            ].map(({ label, option }) => {
              if (!option) return null;
              return (
                <div key={label} className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-quantum-navy-light">{label}</span>
                    {option.benefitPercent > 0 && (
                      <span className="rounded-full bg-quantum-navy-light/10 px-2 py-0.5 text-[0.65rem] text-quantum-navy-light">
                        +{option.benefitPercent}% energía
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">{option.product.modelo}</p>
                  <p className="text-xs text-muted-foreground">
                    {option.product.voltaje}V · {option.product.ah}Ah · {wattHours(option.product.voltaje, option.product.ah).toLocaleString("es-BO")} Wh
                  </p>
                  <p className="mt-1 text-xs text-foreground/50">
                    {option.product.aplicacion.join(", ")} · {option.product.ciclosVida.toLocaleString("es-BO")} ciclos
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No tenemos productos en catálogo para {voltaje}V todavía. Un
            ingeniero puede evaluar una solución a medida.
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <button
            onClick={saveAndContinue}
            className="rounded-full bg-[linear-gradient(90deg,#00205B,#4968A2)] px-5 py-3 text-sm font-medium text-white"
          >
            Continuar y solicitar cotización
          </button>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-full border border-foreground/10 px-5 py-3 text-sm text-foreground/70 hover:text-foreground"
          >
            Editar datos
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        Ingresa los datos de tu batería actual para identificarla y encontrar
        un reemplazo compatible.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="modelo" className="text-xs font-medium text-foreground/60">
            Modelo (opcional)
          </label>
          <input
            id="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            placeholder="Ej. QB-12-100"
            className="mt-1.5 w-full rounded-lg border border-foreground/10 bg-muted px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-primary/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="voltaje" className="text-xs font-medium text-foreground/60">
              Voltaje
            </label>
            <select
              id="voltaje"
              value={voltaje}
              onChange={(e) => setVoltaje(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border border-foreground/10 bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
            >
              {VOLTAGE_OPTIONS.map((v) => (
                <option key={v} value={v} className="bg-white">
                  {v} V
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ah" className="text-xs font-medium text-foreground/60">
              Capacidad (Ah)
            </label>
            <input
              id="ah"
              type="number"
              min={1}
              value={ah}
              onChange={(e) => setAh(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border border-foreground/10 bg-muted px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-foreground/60">Fotografía (opcional)</label>
          <label className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-foreground/15 bg-muted px-4 py-6 text-center transition-colors hover:border-primary/40">
            <Camera className="h-5 w-5 text-foreground/40" />
            <span className="text-xs text-foreground/50">
              {photo ? photo.name : "Sube una foto de la etiqueta de tu batería"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            />
          </label>
          <p className="mt-1.5 flex items-start gap-1.5 text-[0.7rem] leading-relaxed text-foreground/35">
            <Sparkles className="mt-0.5 h-3 w-3 shrink-0" />
            La lectura automática de etiquetas (OCR) está en desarrollo. Por
            ahora, un ingeniero revisará la foto manualmente junto con tu
            cotización.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#00205B,#4968A2)] px-5 py-3 text-sm font-medium text-white"
      >
        <Search className="h-4 w-4" />
        Identificar y recomendar
      </button>
    </form>
  );
}
