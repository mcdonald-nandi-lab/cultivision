import { ProductionCosts } from "@/types";
import { DEFAULT_PRODUCTION_COSTS } from "./data";

export function encodeProductionCosts(costs: ProductionCosts): string {
  const orderedKeys = [
    "mediaCost",
    "uspLaborCostPerHour",
    "mainLaborCostPerHour",
    "dspLaborCostPerHour",
    "electricityCost",
    "steamCost",
    "coolingWaterCost",
    "chilledWaterCost",
    "taxRate",
    "projectDuration",
  ] as const;

  const changedParams: Record<string, number> = {};

  orderedKeys.forEach((key) => {
    const defaultValue = DEFAULT_PRODUCTION_COSTS[key];
    const currentValue = costs[key];

    if (Math.abs(currentValue - defaultValue) > 0.001) {
      changedParams[key] = currentValue;
    }
  });

  if (Object.keys(changedParams).length === 0) {
    return "";
  }
  const jsonStr = JSON.stringify(changedParams);
  const encoded = btoa(jsonStr)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return encoded;
}

/**
 * Decodes a URL-safe string back into production costs
 */
export function decodeProductionCosts(encoded: string): ProductionCosts | null {
  try {
    if (!encoded) {
      return { ...DEFAULT_PRODUCTION_COSTS };
    }
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = atob(base64);
    const changedParams = JSON.parse(jsonStr);
    const costs = { ...DEFAULT_PRODUCTION_COSTS };

    Object.entries(changedParams).forEach(([key, value]) => {
      if (key in costs) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (costs as any)[key] = value;
      }
    });

    return costs;
  } catch (error) {
    console.error("Error decoding production costs:", error);
    return null;
  }
}

export function createShareableUrl(
  costs: ProductionCosts,
  bioreactorId: string,
  doublingTime: string,
  density: string,
  includeToken: boolean = false
): string {
  const encoded = encodeProductionCosts(costs);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const params = new URLSearchParams();
  params.set("r", bioreactorId);
  params.set("t", doublingTime);
  params.set("d", density);

  if (encoded) {
    params.set("p", encoded);
  }

  if (includeToken) {
    const token = localStorage.getItem("cultivision_access_token");
    if (token) {
      params.set("token", token);
    }
  }

  return `${window.location.origin}${basePath}'/dashboard?${params.toString()}`;
}
