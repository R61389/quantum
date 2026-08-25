import { BATTERY_DATABASE, findProductsByVoltage, wattHours } from "./battery-database";
import type { BatteryProduct, BatterySpec } from "./types";

export interface ReplacementOption {
  product: BatteryProduct;
  benefitPercent: number; // increase in Wh vs. the current spec
}

export interface RecommendationResult {
  sameVoltageAvailable: boolean;
  equivalente: ReplacementOption | null;
  autonomia: ReplacementOption | null;
  premium: ReplacementOption | null;
}

function toOption(product: BatteryProduct, currentWh: number): ReplacementOption {
  const productWh = wattHours(product.voltaje, product.ah);
  const benefitPercent = currentWh > 0 ? ((productWh - currentWh) / currentWh) * 100 : 0;
  return { product, benefitPercent: Math.round(benefitPercent) };
}

/** Recommends equivalent / higher-autonomy / premium replacements at a matching voltage. */
export function recommendReplacements(current: BatterySpec): RecommendationResult {
  const candidates = findProductsByVoltage(current.voltaje);
  const currentWh = wattHours(current.voltaje, current.ah);

  if (candidates.length === 0) {
    return {
      sameVoltageAvailable: false,
      equivalente: null,
      autonomia: null,
      premium: null,
    };
  }

  const byTier = (tier: BatteryProduct["tier"]) =>
    candidates
      .filter((p) => p.tier === tier)
      .sort((a, b) => a.ah - b.ah)[0] ?? null;

  const estandar = byTier("estandar");
  const autonomia = byTier("autonomia");
  const premium = byTier("premium");

  return {
    sameVoltageAvailable: true,
    equivalente: estandar ? toOption(estandar, currentWh) : null,
    autonomia: autonomia ? toOption(autonomia, currentWh) : null,
    premium: premium ? toOption(premium, currentWh) : null,
  };
}

/** Smallest catalog product at a given voltage that meets a required Ah capacity. */
export function suggestProductForCapacity(
  voltaje: number,
  requiredAh: number
): { product: BatteryProduct; meetsRequirement: boolean } | null {
  const candidates = findProductsByVoltage(voltaje).sort((a, b) => a.ah - b.ah);
  if (candidates.length === 0) return null;

  const fits = candidates.find((p) => p.ah >= requiredAh);
  if (fits) return { product: fits, meetsRequirement: true };

  const largest = candidates[candidates.length - 1];
  return largest ? { product: largest, meetsRequirement: false } : null;
}

export interface IdentifyMatch {
  exact: BatteryProduct | null;
  closeMatches: BatteryProduct[];
}

/** Looks up a battery in the catalog by model name, or by voltage + approximate Ah. */
export function identifyBattery(spec: BatterySpec): IdentifyMatch {
  const normalizedModel = spec.modelo?.trim().toLowerCase();

  if (normalizedModel) {
    const exact = BATTERY_DATABASE.find(
      (p) => p.modelo.toLowerCase() === normalizedModel
    );
    if (exact) return { exact, closeMatches: [] };
  }

  const closeMatches = BATTERY_DATABASE.filter(
    (p) => p.voltaje === spec.voltaje && Math.abs(p.ah - spec.ah) <= spec.ah * 0.15
  ).sort((a, b) => Math.abs(a.ah - spec.ah) - Math.abs(b.ah - spec.ah));

  return { exact: null, closeMatches };
}
