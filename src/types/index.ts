export interface Bioreactor {
  id: string;
  name: string;
  image: string;
  annualProduction: number;
  mediaVolume: number;
  baseLaborCost: number;
  otherMaterialsCost: number;
  wasteTreatmentCost: number;
  facilityCosts: number;
  consumableCosts: number;
  powerUsage: number;
  steamUsage: number;
  coolingWaterUsage: number;
  chilledWaterUsage: number;
  capitalExpense: number;
  depreciation: number;
}

export interface ProductionCosts {
  mediaCost: number;
  laborCost: number;
  electricityCost: number;
  steamCost: number;
  coolingWaterCost: number;
  chilledWaterCost: number;
}

export interface ExpenseBreakdown {
  media: number;
  otherMaterials: number;
  labor: number;
  waste: number;
  facility: number;
  consumables: number;
  utilities: number;
}

export interface CalculatedExpenses {
  annualProduction: number;
  facilitiesNeeded: number;
  capitalExpenses: number;
  operatingExpenses: number;
  cogsWithDepreciation: number;
  cogsWithoutDepreciation: number;
  chartData: ExpenseBreakdown;
}
