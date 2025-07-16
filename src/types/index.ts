export interface BasicObject {
  [key: string]: string;
}

export interface BioreactorData {
  image: string,
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
  depreciation: number;
  laborHours: {
    main: number;
    upstream: number;
    downstream: number;
  };
}

export interface Bioreactor {
  id: string;
  name: string;
  reactors: {
    [timeKey: string]: {
      [densityKey: string]: Partial<BioreactorData>;
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
