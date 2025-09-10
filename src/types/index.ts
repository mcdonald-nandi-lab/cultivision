import { LaborCostValues } from "@/lib/labor-costs";

export interface BasicObject {
  [key: string]: string;
}

export interface PlantOtherDirectCost {
  installation: number;
  processPiping: number;
  instrumentation: number;
  insulation: number;
  electrical: number;
  buildings: number;
  yardImprovement: number;
  auxiliaryFacilities: number;
};

export interface PlantDirectCost {
  equipmentPurchaseCost: number;
  otherDirectCost: PlantOtherDirectCost;
  total: number;
};

export interface PlantIndirectCost {
  engineering: number;
  construction: number;
  total: number;
};

export interface FixedCapitalMiscellaneousCost  {
  contractorFee: number;
  contingency: number;
  total: number;
};

export interface DirectFixedCapital {
  plantDirectCost: PlantDirectCost;
  plantIndirectCost: PlantIndirectCost;
  totalPlantCost: number;
  miscellaneousCost: FixedCapitalMiscellaneousCost;
  totalCapital: number;
};

export interface Capex {
  directFixedCapital: DirectFixedCapital;
  workingCapital: number;
  startupCapital: number;
  upfrontRandDCapital: number;
  upfrontRoyaltiesCapital: number;
  totalCapexCost: number;
};

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
  otherFacilityCostsSplit: OtherFacilityCostsSplit;
  capex: Capex;
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

export interface Utilities {
  total: number;
  power: number;
  steam: number;
  coolingWater: number;
  chilledWater: number;
}

export interface ProductionCosts {
  mediaCost: number;
  uspLaborCostPerHour: number;
  mainLaborCostPerHour: number;
  dspLaborCostPerHour: number;
  electricityCost: number;
  steamCost: number;
  coolingWaterCost: number;
  chilledWaterCost: number;
  taxRate: number;
  projectDuration: number;
}

export interface ExpenseBreakdown {
  media: number;
  otherMaterials: number;
  labor: number;
  waste: number;
  facility: number;
  consumables: number;
  utilities: Utilities;
  otherFacilityCostsSplit: OtherFacilityCostsSplit;
}

export interface CalculatedExpenses {
  annualProduction: number;
  facilitiesNeeded: number;
  capitalExpenses: number;
  operatingExpenses: number;
  cogsWithDepreciation: number;
  cogsWithoutDepreciation: number;
  minimumSellingPrice: number;
  capex: Capex,
  laborCostValues: LaborCostValues;
  chartData: ExpenseBreakdown;
}
