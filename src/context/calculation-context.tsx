"use client";

import {
  bioreactors,
  calculateExpenses,
  defaultProductionCosts,
  getBioreactorById,
  getAvailableDoublingTimes,
  getAvailableDensities,
} from "@/lib/bioreactors";
import { generateLaborCostTable } from "@/lib/labor-costs";
import { decodeProductionCosts } from "@/lib/url-params";
import { CalculatedExpenses, ProductionCosts } from "@/types";
import { LaborCostTable } from "@/lib/labor-costs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CalculationContextType {
  activeReactorId: string;
  setActiveReactorId: (id: string) => void;
  doublingTime: string;
  setDoublingTime: (time: string) => void;
  density: string;
  setDensity: (density: string) => void;
  costs: ProductionCosts;
  setCosts: (costs: ProductionCosts) => void;
  expenses: CalculatedExpenses | null;
  laborCostTable: LaborCostTable | null;
  isUrlParamProcessed: boolean;
}

const CalculationContext = createContext<CalculationContextType | undefined>(
  undefined
);

export function CalculationProvider({ children }: { children: ReactNode }) {
  const [activeReactorId, setActiveReactorId] = useState(
    bioreactors[0]?.id ?? ""
  );
  const [doublingTime, setDoublingTime] = useState("");
  const [density, setDensity] = useState("");
  const [costs, setCosts] = useState<ProductionCosts>(defaultProductionCosts);
  const [expenses, setExpenses] = useState<CalculatedExpenses | null>(null);
  const [laborCostTable, setLaborCostTable] = useState<LaborCostTable | null>(
    null
  );
  const [isUrlParamProcessed, setIsUrlParamProcessed] = useState(false);

  // Initialize doubling time and density when reactor changes
  useEffect(() => {
    const reactor = getBioreactorById(activeReactorId);
    if (reactor) {
      const availableTimes = getAvailableDoublingTimes(reactor);
      if (availableTimes.length > 0 && !availableTimes.includes(doublingTime)) {
        setDoublingTime(availableTimes[0]);
      }
    }
  }, [activeReactorId, doublingTime]);

  useEffect(() => {
    const reactor = getBioreactorById(activeReactorId);
    if (reactor && doublingTime) {
      const availableDensities = getAvailableDensities(reactor, doublingTime);
      if (
        availableDensities.length > 0 &&
        !availableDensities.includes(density)
      ) {
        setDensity(availableDensities[0]);
      }
    }
  }, [activeReactorId, doublingTime, density]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const encodedParams = params.get("p");
      const reactorId = params.get("r");
      const timeParam = params.get("t");
      const densityParam = params.get("d");

      if (encodedParams) {
        const decodedCosts = decodeProductionCosts(encodedParams);
        if (decodedCosts) {
          setCosts(decodedCosts);
        }
      }
      if (reactorId && bioreactors.some((r) => r.id === reactorId)) {
        setActiveReactorId(reactorId);
      }
      if (timeParam) {
        setDoublingTime(timeParam);
      }
      if (densityParam) {
        setDensity(densityParam);
      }
      setIsUrlParamProcessed(true);
    }
  }, []);

  useEffect(() => {
    const reactor = getBioreactorById(activeReactorId);
    if (reactor && doublingTime && density) {
      const result = calculateExpenses(reactor, doublingTime, density, costs);
      setExpenses(result);

      const laborTable = generateLaborCostTable(
        activeReactorId,
        doublingTime,
        density,
        costs.laborCost
      );
      setLaborCostTable(laborTable);
    }
  }, [activeReactorId, doublingTime, density, costs]);

  return (
    <CalculationContext.Provider
      value={{
        activeReactorId,
        setActiveReactorId,
        doublingTime,
        setDoublingTime,
        density,
        setDensity,
        costs,
        setCosts,
        expenses,
        laborCostTable,
        isUrlParamProcessed,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
}

export function useCalculations() {
  const context = useContext(CalculationContext);
  if (!context)
    throw new Error("useCalculations must be used inside CalculationProvider");
  return context;
}
