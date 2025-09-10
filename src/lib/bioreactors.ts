import {
  Bioreactor,
  BioreactorData,
  CalculatedExpenses,
  ProductionCosts,
} from "@/types";
import { BIOREACTORS } from "./data";
import { generateLaborCostValues } from "./labor-costs";

export function getBioreactorById(id: string): Bioreactor | undefined {
  return BIOREACTORS.find((reactor) => reactor.id === id);
}

export function getAvailableDoublingTimes(bioreactor: Bioreactor): string[] {
  return Object.keys(bioreactor.reactors).sort();
}

export function getAvailableDensities(
  bioreactor: Bioreactor,
  doublingTime: string
): string[] {
  const timeData = bioreactor.reactors[doublingTime];
  if (!timeData) return [];
  return Object.keys(timeData).reverse();
}

export function getBioreactorData(
  bioreactor: Bioreactor,
  doublingTime: string,
  density: string
): BioreactorData | null {
  const timeData = bioreactor.reactors[doublingTime];
  if (!timeData) return null;

  const densityData = timeData[density];
  if (!densityData) return null;

  return densityData;
}

// Golden-section search (bounded minimization)
function minimizeScalar(
  func: (x: number) => number,
  lower: number,
  upper: number,
  tol: number = 1e-5
): number {
  const gr = (Math.sqrt(5) + 1) / 2;
  let a = lower;
  let b = upper;
  let c = b - (b - a) / gr;
  let d = a + (b - a) / gr;

  while (Math.abs(c - d) > tol) {
    if (Math.abs(func(c)) < Math.abs(func(d))) {
      b = d;
    } else {
      a = c;
    }
    c = b - (b - a) / gr;
    d = a + (b - a) / gr;
  }
  return (b + a) / 2;
}

const calculateMSP = (
  costs: ProductionCosts,
  bioreactorData: BioreactorData,
  cogs: number,
  msp: number
): number => {
  const opex = bioreactorData.annualProduction * cogs;
  const taxRate = 1 - costs.taxRate / 100;
  const depreciation = bioreactorData.otherFacilityCostsSplit.depreciation;
  const fivePercentOfCapex = bioreactorData.capitalExpense * 0.05;

  let sum1 = 0;
  for (let t = 1; t <= Math.min(10, costs.projectDuration); t++) {
    sum1 +=
      (bioreactorData.annualProduction * msp - opex * taxRate + depreciation) /
      1.0 ** t;
  }

  let sum2 = 0;
  for (let t = 11; t <= costs.projectDuration; t++) {
    sum2 +=
      ((bioreactorData.annualProduction * msp - opex + depreciation) *
        taxRate) /
      1.0 ** t;
  }

  return sum1 + sum2 - bioreactorData.capitalExpense - fivePercentOfCapex;
};

export function calculateExpenses(
  bioreactor: Bioreactor,
  doublingTime: string,
  density: string,
  costs: ProductionCosts,
): CalculatedExpenses | null {
  const bioreactorData = getBioreactorData(bioreactor, doublingTime, density);

  if (!bioreactorData) {
    return null;
  }

  // Calculate utilities
  const power = costs.electricityCost * bioreactorData.powerUsage!;
  const steam = costs.steamCost * bioreactorData.steamUsage!;
  const coolingWater =
    costs.coolingWaterCost * bioreactorData.coolingWaterUsage!;
  const chilledWater =
    costs.chilledWaterCost * bioreactorData.chilledWaterUsage!;
  const utilities = {
    total: power + steam + coolingWater + chilledWater,
    power,
    steam,
    coolingWater,
    chilledWater,
  };

  // Calculate operating expenses
  const media = costs.mediaCost * bioreactorData.mediaVolume!;
  const otherMaterials = bioreactorData.otherMaterialsCost!;

  // Calculate Labor Cost Values
  const laborCostValues = generateLaborCostValues(
    costs.uspLaborCostPerHour,
    costs.dspLaborCostPerHour,
    bioreactorData.laborHours
  );

  const labor = laborCostValues.updatedCosts.totalCost;
  const waste = bioreactorData.wasteTreatmentCost!;
  const facility = bioreactorData.otherFacilityCosts!;
  const consumables = bioreactorData.consumableCosts!;

  const operatingExpenses =
    media +
    otherMaterials +
    labor +
    waste +
    facility +
    consumables +
    utilities.total;

  const operatingExpensesWithoutDepreciation =
    operatingExpenses - bioreactorData.otherFacilityCostsSplit.depreciation!;

  // Capital expense
  const capitalExpense = bioreactorData.capitalExpense!;

  // Costs of goods sold
  const cogsWithDepreciation =
    operatingExpenses / bioreactorData.annualProduction!;
  const cogsWithoutDepreciation =
    operatingExpensesWithoutDepreciation / bioreactorData.annualProduction!;

  // Facilities needed
  const facilitiesNeeded = Math.ceil(
    100000000 / bioreactorData.annualProduction!
  );

  const otherFacilityCostsSplit = bioreactorData.otherFacilityCostsSplit;

  // Calculate Minimum Selling Price
  const f = (msp: number) =>
    calculateMSP(costs, bioreactorData, cogsWithoutDepreciation, msp);
  const minimumSellingPrice = Math.round(minimizeScalar(f, 0, 100) * 100) / 100;

  // Get CAPEX
  const capex = bioreactorData.capex;

  return {
    annualProduction: bioreactorData.annualProduction!,
    facilitiesNeeded,
    capitalExpenses: capitalExpense / 1000000, // Convert to millions
    operatingExpenses: operatingExpenses / 1000000, // Convert to millions
    cogsWithDepreciation,
    cogsWithoutDepreciation,
    minimumSellingPrice,
    laborCostValues,
    capex,
    chartData: {
      media,
      otherMaterials,
      labor,
      waste,
      facility,
      consumables,
      utilities,
      otherFacilityCostsSplit,
    },
  };
}