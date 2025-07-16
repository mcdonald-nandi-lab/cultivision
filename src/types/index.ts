export interface BasicObject {
  [key: string]: string;
}

export interface OtherFacilityCostsSplit {
    depreciation: number;
    maintenance: number;
    insurance: number;
    localTaxes: number;
    factoryExpense: number
}

export interface BioreactorData {
  image: string;
  annualProduction: number;
  mediaVolume: number;
  otherMaterialsCost: number;
  wasteTreatmentCost: number;
  otherFacilityCosts: number;
  consumableCosts: number;
  powerUsage: number;
  steamUsage: number;
  coolingWaterUsage: number;
  chilledWaterUsage: number;
  capitalExpense: number;
  laborHours: {
    main: number;
    upstream: number;
    downstream: number;
  };
  otherFacilityCostsSplit: OtherFacilityCostsSplit
}

export interface Bioreactor {
  id: string;
  name: string;
  reactors: {
    [timeKey: string]: {
      [densityKey: string]: BioreactorData;
    };
  };
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
  otherFacilityCostsSplit: OtherFacilityCostsSplit;
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
