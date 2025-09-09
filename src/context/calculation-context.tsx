"use client";

import {
  calculateExpenses,
  getAvailableDensities,
  getAvailableDoublingTimes,
  getBioreactorById,
} from "@/lib/bioreactors";
import { BIOREACTORS, DEFAULT_PRODUCTION_COSTS } from "@/lib/data";
import { decodeProductionCosts } from "@/lib/url-params";
import { CalculatedExpenses, ProductionCosts } from "@/types";
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
  isUrlParamProcessed: boolean;
}

const CalculationContext = createContext<CalculationContextType | undefined>(
  undefined
);

export function CalculationProvider({ children }: { children: ReactNode }) {
  const [activeReactorId, setActiveReactorId] = useState(
    BIOREACTORS[0]?.id ?? ""
  );
  const [doublingTime, setDoublingTime] = useState("");
  const [density, setDensity] = useState("");
  const [costs, setCosts] = useState<ProductionCosts>(DEFAULT_PRODUCTION_COSTS);
  const [expenses, setExpenses] = useState<CalculatedExpenses | null>(null);
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
      if (reactorId && BIOREACTORS.some((r) => r.id === reactorId)) {
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
      const result = calculateExpenses(
        reactor,
        doublingTime,
        density,
        costs,
      );
      setExpenses(result);
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
