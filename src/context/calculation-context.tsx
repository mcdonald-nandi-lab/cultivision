// src/context/CalculationContext.tsx
"use client";

import {
    bioreactors,
    calculateExpenses,
    defaultProductionCosts,
} from "@/lib/bioreactors";
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
  costs: ProductionCosts;
  setCosts: (costs: ProductionCosts) => void;
  expenses: CalculatedExpenses | null;
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

  useEffect(() => {
    const reactor = bioreactors.find((r) => r.id === activeReactorId);
    if (reactor) {
      const result = calculateExpenses(reactor, costs);
      setExpenses(result);
    }
  }, [activeReactorId, costs]);

  return (
    <CalculationContext.Provider
      value={{ activeReactorId, setActiveReactorId, costs, setCosts, expenses }}
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
