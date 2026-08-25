// Engineering assumptions used across calculators — kept as named constants
// so they're visible and adjustable rather than buried as magic numbers.
// These are conservative, general-purpose defaults for LiFePO4 systems, not
// a substitute for a real load study on critical installations.
export const DEPTH_OF_DISCHARGE = 0.8; // usable capacity fraction (LiFePO4 typically safe to ~80-90% DoD)
export const SYSTEM_EFFICIENCY = 0.9; // inverter/charge-controller conversion losses

export function ahToWh(voltageV: number, capacityAh: number): number {
  return voltageV * capacityAh;
}

/** Hours of runtime for a given load, applying the depth-of-discharge margin. */
export function estimateAutonomyHours(
  voltageV: number,
  capacityAh: number,
  loadWatts: number
): number {
  if (loadWatts <= 0) return 0;
  const usableWh = ahToWh(voltageV, capacityAh) * DEPTH_OF_DISCHARGE;
  return usableWh / loadWatts;
}

/** Minimum recommended battery capacity for a solar backup system. */
export function estimateSolarCapacity(
  dailyConsumptionWh: number,
  backupHours: number,
  systemVoltageV: number
) {
  const requiredWh =
    (dailyConsumptionWh * (backupHours / 24)) /
    (SYSTEM_EFFICIENCY * DEPTH_OF_DISCHARGE);
  const requiredAh = requiredWh / systemVoltageV;
  return { requiredWh, requiredAh };
}

/** Minimum recommended battery capacity for a UPS backup system. */
export function estimateUpsCapacity(
  loadWatts: number,
  autonomyHours: number,
  systemVoltageV: number
) {
  const requiredWh =
    (loadWatts * autonomyHours) / (SYSTEM_EFFICIENCY * DEPTH_OF_DISCHARGE);
  const requiredAh = requiredWh / systemVoltageV;
  return { requiredWh, requiredAh };
}
