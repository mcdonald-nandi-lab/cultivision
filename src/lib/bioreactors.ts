import {
  Bioreactor,
  ProductionCosts,
  CalculatedExpenses,
  BioreactorData,
} from "@/types";

const baseLaborUnitCost: Record<string, number> = {
  main: 34.5,
  upstream: 46.0,
  downstream: 57.5,
};

export const bioreactors: Bioreactor[] = [
  // {
  //   id: "150K_STR",
  //   name: "150,000 L Stirred Tank",
  //   image: "",
  //   reactors: {
  //     "17h": {
  //       "100gpl": {},
  //     },
  //     "20h": {
  //       "100gpl": {},
  //     },
  //     "23h": {
  //       "100gpl": {},
  //     },
  //     "26h": {
  //       "100gpl": {},
  //     },
  //     "29h": {
  //       "100gpl": {},
  //     },
  //   },
  // },
  {
    id: "210K_STR",
    name: "210,000 L Stirred",
    reactors: {
      "17h": {
        "100gpl": {
          image: "/images/210K_STR_17h_100gpl.jpg",
          annualProduction: 20000664,
          capitalExpense: 1052455000,
          otherFacilityCosts: 183510000,
          otherFacilityCostsSplit: {
            depreciation: 92811000,
            maintenance: 12542000,
            insurance: 9770000,
            localTaxes: 19539000,
            factoryExpense: 48848000,
          },
          mediaVolume: 203278987,
          otherMaterialsCost: 85235082,
          powerUsage: 6438012,
          steamUsage: 29295,
          coolingWaterUsage: 1615531,
          chilledWaterUsage: 88696,
          consumableCosts: 262000,
          wasteTreatmentCost: 2491000,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
        },
      },
      "20h": {
        "100gpl": {
          image: "/images/210K_STR_20h_100gpl.jpg",
          annualProduction: 20000664,
          capitalExpense: 1055726000,
          otherFacilityCosts: 184092000,
          otherFacilityCostsSplit: {
            depreciation: 93106000,
            maintenance: 12581000,
            insurance: 9801000,
            localTaxes: 19601000,
            factoryExpense: 49003000,
          },
          mediaVolume: 203326673,
          otherMaterialsCost: 85125016,
          powerUsage: 7554962,
          steamUsage: 28878,
          coolingWaterUsage: 1769135,
          chilledWaterUsage: 88696,
          consumableCosts: 254000,
          wasteTreatmentCost: 2473000,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
        },
      },
      "23h": {
        "100gpl": {
          image: "/images/210K_STR_23h_100gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1062062000,
          otherFacilityCosts: 185214000,
          otherFacilityCostsSplit: {
            depreciation: 93675000,
            maintenance: 12654000,
            insurance: 9861000,
            localTaxes: 19721000,
            factoryExpense: 49303000,
          },
          mediaVolume: 203489229,
          otherMaterialsCost: 85130545,
          powerUsage: 8717255,
          steamUsage: 28429,
          coolingWaterUsage: 1929357,
          chilledWaterUsage: 88693,
          consumableCosts: 246000,
          wasteTreatmentCost: 2468000,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
        },
      },
      "26h": {
        "100gpl": {
          image: "/images/210K_STR_26h_100gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1158191000,
          otherFacilityCosts: 202406000,
          otherFacilityCostsSplit: {
            depreciation: 102370000,
            maintenance: 13831000,
            insurance: 10776000,
            localTaxes: 21552000,
            factoryExpense: 53879000,
          },
          mediaVolume: 203407037,
          otherMaterialsCost: 85023210,
          powerUsage: 9768730,
          steamUsage: 28418,
          coolingWaterUsage: 2074212,
          chilledWaterUsage: 88693,
          consumableCosts: 224000,
          wasteTreatmentCost: 2456000,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
        },
      },
      "29h": {
        "100gpl": {
          image: "/images/210K_STR_29h_100gpl.jpg",
          // 1. EXECUTIVE SUMMARY (2021 prices) - Cost Basis Annual Rate
          annualProduction: 20000000,
          // 1. EXECUTIVE SUMMARY (2021 prices) - Total Capital Investment
          capitalExpense: 1294860000,
          // 4. FACILITY-DEPENDENT COST - PROCESS SUMMARY - TOTAL - Annual Cost ($)
          otherFacilityCosts: 226837000,
          // 4. FACILITY-DEPENDENT COST - PROCESS SUMMARY - Annual Amount ($) Individual of all Cost Items
          otherFacilityCostsSplit: {
            depreciation: 114726000,
            maintenance: 15500000,
            insurance: 12076000,
            localTaxes: 24153000,
            factoryExpense: 60382000,
          },
          // 5. MATERIALS COST - PROCESS SUMMARY - Annual Amount - Beefy R Enhance
          mediaVolume: 203184922,
          // 5. MATERIALS COST - PROCESS SUMMARY - (Annual Cost ($) minus Beefy R Enhance Annual Amount)
          otherMaterialsCost: 84865004,
          // 6. UTILITY - Annual Amount- Std Power
          powerUsage: 10866766,
          // 6. UTILITY - Annual Amount - Steam
          steamUsage: 28387,
          // 6. UTILITY - Annual Amount - Cooling Water
          coolingWaterUsage: 2225103,
          // 6. UTILITY -  Annual Amount - Chilled Water
          chilledWaterUsage: 88693,
          // 7. LABOR COST - PROCESS SUMMARY - "Unit Cost ($/h)" * "Annual Amount(h)"
          // Operator (Annual Amount * Unit Cost) + USP Operator (Annual Amount * Unit Cost)  + DSP Operator (Annual Amount * Unit Cost)
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          // 10. ANNUAL OPERATING COST (2021 prices) - PROCESS SUMMARY - Consumables - $
          consumableCosts: 300000,
          // 10. ANNUAL OPERATING COST (2021 prices) - PROCESS SUMMARY - Waste Treatment/Disposal - $
          wasteTreatmentCost: 2446000,
        },
      },
    },
  },
  {
    id: "260K_ALR",
    name: "262,000 L Airlift",
    reactors: {
      "17h": {
        "100gpl": {
          image: "/images/260K_ALR_17h_100gpl.jpg",
          annualProduction: 25000024,
          capitalExpense: 327992000,
          mediaVolume: 253319331,
          otherMaterialsCost: 105824997,
          powerUsage: 2331567,
          steamUsage: 36118,
          coolingWaterUsage: 1168883,
          chilledWaterUsage: 110528,
          consumableCosts: 131000,
          wasteTreatmentCost: 3039000,
          otherFacilityCosts: 52701000,
          otherFacilityCostsSplit: {
            depreciation: 26682000,
            maintenance: 3551000,
            insurance: 2809000,
            localTaxes: 5617000,
            factoryExpense: 14043000,
          },
          laborHours: {
            main: 2934,
            upstream: 19499,
            downstream: 278,
          },
        },
      },
      "20h": {
        "100gpl": {
          image: "/images/260K_ALR_20h_100gpl.jpg",
          annualProduction: 25000008,
          capitalExpense: 331912000,
          mediaVolume: 253484625,
          otherMaterialsCost: 105744013,
          powerUsage: 2716262,
          steamUsage: 35625,
          coolingWaterUsage: 1216130,
          chilledWaterUsage: 110527,
          consumableCosts: 127000,
          wasteTreatmentCost: 3020000,
          otherFacilityCosts: 53397000,
          otherFacilityCostsSplit: {
            depreciation: 27035000,
            maintenance: 3597000,
            insurance: 2846000,
            localTaxes: 5691000,
            factoryExpense: 14229000,
          },
          laborHours: {
            main: 2845,
            upstream: 19941,
            downstream: 270,
          },
        },
      },
      "23h": {
        "100gpl": {
          image: "/images/260K_ALR_23h_100gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 345079000,
          otherFacilityCosts: 59461000,
          otherFacilityCostsSplit: {
            depreciation: 28220000,
            maintenance: 3752000,
            insurance: 2971000,
            localTaxes: 5941000,
            factoryExpense: 14853000,
          },
          mediaVolume: 253758783,
          otherMaterialsCost: 105953161,
          powerUsage: 3116542,
          steamUsage: 35198,
          coolingWaterUsage: 1264953,
          chilledWaterUsage: 110527,
          consumableCosts: 246000,
          wasteTreatmentCost: 3034000,
          laborHours: {
            main: 2755,
            upstream: 20353,
            downstream: 261,
          },
        },
      },
      "26h": {
        "100gpl": {
          image: "/images/260K_ALR_26h_100gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 368828000,
          mediaVolume: 253591939,
          otherMaterialsCost: 105775598,
          powerUsage: 3473221,
          steamUsage: 35131,
          coolingWaterUsage: 1301813,
          chilledWaterUsage: 110527,
          consumableCosts: 224000,
          wasteTreatmentCost: 3019000,
          otherFacilityCosts: 59975000,
          otherFacilityCostsSplit: {
            depreciation: 30366000,
            maintenance: 4038000,
            insurance: 3196000,
            localTaxes: 6393000,
            factoryExpense: 15982000,
          },
          laborHours: {
            main: 2509,
            upstream: 19402,
            downstream: 238,
          },
        },
      },
      "29h": {
        "100gpl": {
          image: "/images/260K_ALR_29h_100gpl.jpg",
          annualProduction: 25000007,
          capitalExpense: 430281000,
          otherFacilityCosts: 70935000,
          otherFacilityCostsSplit: {
            depreciation: 35912000,
            maintenance: 4781000,
            insurance: 3780000,
            localTaxes: 7560000,
            factoryExpense: 18901000,
          },
          mediaVolume: 253396983,
          otherMaterialsCost: 105862734,
          powerUsage: 3847186,
          steamUsage: 35908,
          coolingWaterUsage: 1338196,
          chilledWaterUsage: 110527,
          consumableCosts: 200000,
          wasteTreatmentCost: 3040000,
          laborHours: {
            main: 2240,
            upstream: 18140,
            downstream: 213,
          },
        },
      },
    },
  },
];

export const defaultProductionCosts: ProductionCosts = {
  mediaCost: 1.4,
  laborCost: 0,
  electricityCost: 0.1,
  steamCost: 12,
  coolingWaterCost: 0.05,
  chilledWaterCost: 0.4,
};

export function getBioreactorById(id: string): Bioreactor | undefined {
  return bioreactors.find((reactor) => reactor.id === id);
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
  return Object.keys(timeData).sort();
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
      baseLaborCost += value * baseLaborUnitCost[key];
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