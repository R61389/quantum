export type Chemistry = "LiFePO4" | "NMC";

export type Application =
  | "UPS"
  | "Solar"
  | "Industrial"
  | "Montacargas"
  | "Electromovilidad";

export type Tier = "estandar" | "autonomia" | "premium";

export interface BatteryProduct {
  id: string;
  modelo: string;
  voltaje: number; // V
  ah: number; // Ah
  dimensiones: string; // mm (L x An x Al)
  peso: number; // kg
  tipoQuimico: Chemistry;
  aplicacion: Application[];
  ciclosVida: number;
  compatibilidades: string[];
  tier: Tier;
}

export interface BatterySpec {
  modelo?: string;
  voltaje: number;
  ah: number;
  aplicacion?: Application;
}
