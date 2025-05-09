// lib/url-params.ts
import { ProductionCosts } from "@/types";
import { defaultProductionCosts } from "@/lib/bioreactors";

/**
 * Encodes production costs into a URL-safe string
 * Only includes parameters that differ from default values
 */
export function encodeProductionCosts(costs: ProductionCosts): string {
  const orderedKeys = [
    "mediaCost",
    "laborCost",
    "electricityCost",
    "steamCost",
    "coolingWaterCost",
    "chilledWaterCost",
  ] as const;

  const changedParams: Record<string, number> = {};

  orderedKeys.forEach((key) => {
    const defaultValue = defaultProductionCosts[key];
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
      return { ...defaultProductionCosts };
    }

    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");

    const jsonStr = atob(base64);

    const changedParams = JSON.parse(jsonStr);

    const costs = { ...defaultProductionCosts };

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
  bioreactorId: string
): string {
  const encoded = encodeProductionCosts(costs);

  if (!encoded) {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return `${window.location.origin}${basePath}?r=${bioreactorId}`;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${window.location.origin}${basePath}?p=${encoded}&r=${bioreactorId}`;
}
