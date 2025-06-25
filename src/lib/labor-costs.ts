import { getBioreactorById, getBioreactorData } from "./bioreactors";

export interface LaborHours {
  upstream: number;
  main: number;
  downstream: number;
}

export interface HourlyRate {
  upstream: number;
  main: number;
  downstream: number;
}

export interface LaborCostResult {
  hourlyRates: HourlyRate;
  totalAnnualCost: number;
  absolutePercentage: number;
}

export interface LaborCostTable {
  laborHours: LaborHours;
  relativePercentages: number[];
  currentPercentage: number;
  results: Record<string, LaborCostResult>;
  currentAnnualCost: number;
}

export const baseHourlyCosts: HourlyRate = {
  upstream: 46.0,
  main: 34.5,
  downstream: 57.5,
};

export function getLaborHours(
  bioreactorId: string,
  doublingTime: string,
  density: string
): LaborHours | null {
  const bioreactor = getBioreactorById(bioreactorId);
  if (!bioreactor) return null;

  const data = getBioreactorData(bioreactor, doublingTime, density);
  if (!data || !data.laborHours) return null;

  return data.laborHours;
}

export function calculateModifiedRates(
  percentageChange: number = 0
): HourlyRate {
  return {
    upstream: baseHourlyCosts.upstream * (1 + percentageChange / 100),
    main: baseHourlyCosts.main * (1 + percentageChange / 100),
    downstream: baseHourlyCosts.downstream * (1 + percentageChange / 100),
  };
}

export function calculateTotalAnnualCost(
  hours: LaborHours,
  rates: HourlyRate
): number {
  return (
    hours.upstream * rates.upstream +
    hours.main * rates.main +
    hours.downstream * rates.downstream
  );
}

export function generateLaborCostTable(
  bioreactorId: string,
  doublingTime: string,
  density: string,
  currentLaborCostPercentage: number
): LaborCostTable | null {
  const laborHours = getLaborHours(bioreactorId, doublingTime, density);
  if (!laborHours) return null;

  const relativePercentages = [-2, -1, 0, 1, 2];

  const results: Record<string, LaborCostResult> = {};

  relativePercentages.forEach((relPercentage) => {
    const absolutePercentage = currentLaborCostPercentage + relPercentage;

    const hourlyRates = calculateModifiedRates(absolutePercentage);
    const totalAnnualCost = calculateTotalAnnualCost(laborHours, hourlyRates);

    results[relPercentage.toString()] = {
      hourlyRates,
      totalAnnualCost,
      absolutePercentage,
    };
  });

  const currentRates = calculateModifiedRates(currentLaborCostPercentage);
  const currentAnnualCost = calculateTotalAnnualCost(laborHours, currentRates);

  return {
    laborHours,
    relativePercentages,
    currentPercentage: currentLaborCostPercentage,
    results,
    currentAnnualCost,
  };
}
