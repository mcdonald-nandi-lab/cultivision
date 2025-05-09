// lib/labor-costs.ts

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

export const laborHoursByReactor: Record<string, LaborHours> = {
  "40K_STR": {
    upstream: 24076,
    main: 722,
    downstream: 261,
  },
  "210K_STR": {
    upstream: 20302,
    main: 1443,
    downstream: 261,
  },
  "260K_ALR": {
    upstream: 20353,
    main: 2756,
    downstream: 261,
  },
};

// Modified hourly rates with percentage change
export function calculateModifiedRates(
  percentageChange: number = 0
): HourlyRate {
  return {
    upstream: baseHourlyCosts.upstream * (1 + percentageChange / 100),
    main: baseHourlyCosts.main * (1 + percentageChange / 100),
    downstream: baseHourlyCosts.downstream * (1 + percentageChange / 100),
  };
}

// Total annual labor cost with percentage change
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

// Generate labor cost table data
export function generateLaborCostTable(
  bioreactorId: string,
  currentLaborCostPercentage: number
): LaborCostTable {
  const laborHours = laborHoursByReactor[bioreactorId];
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
