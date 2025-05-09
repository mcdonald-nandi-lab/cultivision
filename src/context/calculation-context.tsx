// src/context/calculation-context.tsx
"use client";

import {
  bioreactors,
  calculateExpenses,
  defaultProductionCosts,
  getBioreactorById,
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
    bioreactors[0]?.id || ""
  );
  const [costs, setCosts] = useState<ProductionCosts>(defaultProductionCosts);
  const [expenses, setExpenses] = useState<CalculatedExpenses | null>(null);
  const [laborCostTable, setLaborCostTable] = useState<LaborCostTable | null>(
    null
  );
  const [isUrlParamProcessed, setIsUrlParamProcessed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const encodedParams = params.get("p");
      const reactorId = params.get("r");

      if (encodedParams) {
        const decodedCosts = decodeProductionCosts(encodedParams);
        if (decodedCosts) {
          setCosts(decodedCosts);
        }
      }
      if (reactorId && bioreactors.some((r) => r.id === reactorId)) {
        setActiveReactorId(reactorId);
      }
      setIsUrlParamProcessed(true);
    }
  }, []);

  useEffect(() => {
    const reactor = getBioreactorById(activeReactorId);
    if (reactor) {
      const result = calculateExpenses(reactor, costs);
      setExpenses(result);

      const laborTable = generateLaborCostTable(
        activeReactorId,
        costs.laborCost
      );
      setLaborCostTable(laborTable);
    }
  }, [activeReactorId, costs]);

  return (
    <CalculationContext.Provider
      value={{
        activeReactorId,
        setActiveReactorId,
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
