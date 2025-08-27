import {
  Bioreactor,
  ProductionCosts,
  CalculatedExpenses,
  BioreactorData,
} from "@/types";
import { BASE_LABOR_UNIT_COST, BIOREACTORS } from "./data";

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

export function calculateExpenses(
  bioreactor: Bioreactor,
  doublingTime: string,
  density: string,
  costs: ProductionCosts
): CalculatedExpenses | null {
  
  
  const bioreactorData =
    getBioreactorData(bioreactor, doublingTime, density);

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
  const utilities = power + steam + coolingWater + chilledWater;

  // Calculate operating expenses
  const media = costs.mediaCost * bioreactorData.mediaVolume!;
  const otherMaterials = bioreactorData.otherMaterialsCost!;
  
  // Calculate base labor cost from labor hours
  let baseLaborCost = 0;
  if (bioreactorData.laborHours) {
    Object.entries(bioreactorData.laborHours).forEach(([key, value]) => {
      baseLaborCost += value * BASE_LABOR_UNIT_COST[key];
    });
  }
  
  const labor = (1 + costs.laborCost / 100) * baseLaborCost;
  const waste = bioreactorData.wasteTreatmentCost!;
  const facility = bioreactorData.otherFacilityCosts!;
  const consumables = bioreactorData.consumableCosts!;

  const operatingExpenses =
    media + otherMaterials + labor + waste + facility + consumables + utilities;

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

  return {
    annualProduction: bioreactorData.annualProduction!,
    facilitiesNeeded,
    capitalExpenses: capitalExpense / 1000000, // Convert to millions
    operatingExpenses: operatingExpenses / 1000000, // Convert to millions
    cogsWithDepreciation,
    cogsWithoutDepreciation,
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