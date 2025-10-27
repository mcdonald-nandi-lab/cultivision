'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCalculations } from './calculation';

interface DashboardAction {
  type: 'change-reactor' | 'change-doubling-time' | 'change-density' | 'change-cost';
  parameter: string;
  currentValue: string | number;
  suggestedValue: string | number;
  reasoning: string;
  estimatedImpact: string;
  field?: string; // For cost changes
}

interface DashboardActionsContextType {
  executeAction: (action: DashboardAction) => void;
  getAvailableOptions: () => AvailableOptions;
}

interface AvailableOptions {
  reactors: string[];
  doublingTimes: string[];
  densities: string[];
  adjustableCosts: string[];
}

const DashboardActionsContext = createContext<DashboardActionsContextType | undefined>(
  undefined
);

export function DashboardActionsProvider({ children }: { children: ReactNode }) {
  const {
    setActiveReactorId,
    setDoublingTime,
    setDensity,
    costs,
    setCosts,
  } = useCalculations();

  const executeAction = (action: DashboardAction) => {
    console.log('[Dashboard Action] Executing:', action);

    switch (action.type) {
      case 'change-reactor':
        setActiveReactorId(action.suggestedValue as string);
        break;
      case 'change-doubling-time':
        setDoublingTime(action.suggestedValue as string);
        break;
      case 'change-density':
        setDensity(action.suggestedValue as string);
        break;
      case 'change-cost':
        if (action.field && costs) {
          // Handle nested cost properties
          if (action.field.includes('.')) {
            const [parent, child] = action.field.split('.');
            setCosts({
              ...costs,
              [parent]: {
                ...(costs as any)[parent],
                [child]: action.suggestedValue as number,
              },
            });
          } else {
            setCosts({ ...costs, [action.field]: action.suggestedValue as number });
          }
        }
        break;
    }
  };

  const getAvailableOptions = (): AvailableOptions => {
    return {
      reactors: ['105K_STR', '150K_STR', '210K_STR', '262K_ALF'],
      doublingTimes: ['17h', '20h', '23h', '26h', '29h'],
      densities: ['80gpl', '90gpl', '100gpl'],
      adjustableCosts: [
        'mediaGrowth',
        'mediaProduction',
        'rawMaterials',
        'consumables',
        'wasteDisposal',
        'utilities.power',
        'utilities.steam',
        'utilities.coolingWater',
        'utilities.chilledWater',
        'labor.uspHourly',
        'labor.mainHourly',
        'labor.dspHourly',
      ],
    };
  };

  return (
    <DashboardActionsContext.Provider value={{ executeAction, getAvailableOptions }}>
      {children}
    </DashboardActionsContext.Provider>
  );
}

export function useDashboardActions() {
  const context = useContext(DashboardActionsContext);
  if (!context) {
    throw new Error('useDashboardActions must be used inside DashboardActionsProvider');
  }
  return context;
}