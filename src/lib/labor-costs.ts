import { getBioreactorById, getBioreactorData } from "./bioreactors";
import { DEFAULT_PRODUCTION_COSTS } from "./data";

export interface LaborHours {
  upstream: number;
  main: number;
  downstream: number;
}

export interface LaborBaseDetails extends LaborHours {
  totalCost: number;
}

export interface LaborUpdatedDetails extends LaborBaseDetails {
  uspLaborCostPerHour: number;
  dspLaborCostPerHour: number;
}

export interface LaborCostValues {
  laborHours: LaborHours;
  updatedCosts: LaborUpdatedDetails;
  baseCosts: LaborBaseDetails;
  differenceOfTotals: number;
  isEqual: boolean;
}

const upstreamLaborCostPerHourDefault = DEFAULT_PRODUCTION_COSTS.uspLaborCostPerHour;
const mainLaborCostPerHourDefault = DEFAULT_PRODUCTION_COSTS.mainLaborCostPerHour;
const downstreamLaborCostPerHourDefault =
    DEFAULT_PRODUCTION_COSTS.dspLaborCostPerHour;


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

export function generateLaborCostValues(
  uspLaborCostPerHour: number,
  dspLaborCostPerHour: number,
  laborHours: LaborHours
): LaborCostValues {
  let baseCosts = {
    main: mainLaborCostPerHourDefault * laborHours.main,
    upstream: upstreamLaborCostPerHourDefault * laborHours.upstream,
    downstream: downstreamLaborCostPerHourDefault * laborHours.downstream,
    totalCost: 0,
  };

  let updatedCosts = {
    main: mainLaborCostPerHourDefault * laborHours.main,
    upstream: uspLaborCostPerHour * laborHours.upstream,
    downstream: dspLaborCostPerHour * laborHours.downstream,
    uspLaborCostPerHour,
    dspLaborCostPerHour,
    totalCost: 0,
  };

  const baseCostsTotal: number = Object.values(baseCosts).reduce(
    (sum: number, value: number) => sum + value
  );

  baseCosts = { ...baseCosts, totalCost: baseCostsTotal };

  const updatedCostsTotal: number =
    Object.values(updatedCosts).reduce(
      (sum: number, value: number) => sum + value
    ) -
    (uspLaborCostPerHour + dspLaborCostPerHour);

  updatedCosts = { ...updatedCosts, totalCost: updatedCostsTotal };

  const differenceOfTotals = updatedCostsTotal - baseCostsTotal;

  return {
    laborHours,
    baseCosts,
    updatedCosts,
    differenceOfTotals,
    isEqual:
      updatedCosts.upstream === baseCosts.upstream &&
      updatedCosts.downstream === baseCosts.downstream,
  };
}
