interface ActionIntent {
  type: 'change-reactor' | 'change-doubling-time' | 'change-density' | 'change-cost';
  parameter: string;
  currentValue: string | number;
  suggestedValue: string | number;
  reasoning: string;
  estimatedImpact: string;
  field?: string;
}

// Match your actual ProductionCosts interface
interface CalculationContext {
  activeReactorId: string;
  doublingTime: string;
  density: string;
  costs: {
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
  };
}

export function detectActionIntent(
  userMessage: string, 
  aiResponse: string,
  context: CalculationContext
): ActionIntent | null {
  const lower = userMessage.toLowerCase();
  
  const isChangeRequest = 
    lower.includes('change') || 
    lower.includes('set') || 
    lower.includes('switch') ||
    lower.includes('adjust') ||
    lower.includes('modify') ||
    lower.includes('update') ||
    (lower.includes('yes') && (lower.includes('do') || lower.includes('let'))) ||
    lower.includes('apply') ||
    lower.includes('use');

  if (!isChangeRequest) return null;

  const { activeReactorId, doublingTime, density, costs } = context;

  // DOUBLING TIME
  if (lower.includes('doubling') || lower.includes('time')) {
    const timeMatch = userMessage.match(/(\d+)\s*h/i) || userMessage.match(/to\s+(\d+)/);
    if (timeMatch) {
      return {
        type: 'change-doubling-time',
        parameter: 'Doubling Time',
        currentValue: doublingTime,
        suggestedValue: timeMatch[1] + 'h',
        reasoning: 'Changing doubling time affects production cycles',
        estimatedImpact: 'Production cycles will adjust'
      };
    }
  }

  // CELL DENSITY
  if (lower.includes('density') || lower.includes('gpl')) {
    const densityMatch = userMessage.match(/(\d+)\s*gpl/i) || userMessage.match(/to\s+(\d+)/);
    if (densityMatch) {
      return {
        type: 'change-density',
        parameter: 'Cell Density',
        currentValue: density,
        suggestedValue: densityMatch[1] + 'gpl',
        reasoning: 'Changing cell density affects yield per batch',
        estimatedImpact: 'Production yield per batch will adjust'
      };
    }
  }

  // BIOREACTOR TYPE
  if (lower.includes('bioreactor') || lower.includes('reactor')) {
    const reactorTypes = ['105k_str', '150k_str', '210k_str', '262k_alf'];
    for (const type of reactorTypes) {
      if (lower.includes(type.replace('_', '')) || lower.includes(type.replace('_', ' '))) {
        return {
          type: 'change-reactor',
          parameter: 'Bioreactor Type',
          currentValue: activeReactorId,
          suggestedValue: type.toUpperCase(),
          reasoning: 'Different bioreactor sizes offer different economies of scale',
          estimatedImpact: 'Production capacity and costs will adjust'
        };
      }
    }
  }

  // MEDIA COST
  if (lower.includes('media')) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Media Cost',
        currentValue: `$${costs.mediaCost}`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'mediaCost',
        reasoning: 'Media is the largest cost driver',
        estimatedImpact: `Changing from $${costs.mediaCost} to $${priceMatch[1]}`
      };
    }
  }

  // ELECTRICITY/POWER COST
  if (lower.includes('electric') || lower.includes('power')) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Electricity Cost',
        currentValue: `$${costs.electricityCost}/kWh`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'electricityCost',
        reasoning: 'Electricity powers bioreactors and facilities',
        estimatedImpact: `Changing from $${costs.electricityCost}/kWh to $${priceMatch[1]}/kWh`
      };
    }
  }

  // STEAM COST
  if (lower.includes('steam')) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Steam Cost',
        currentValue: `$${costs.steamCost}/kg`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'steamCost',
        reasoning: 'Steam is used for sterilization',
        estimatedImpact: `Changing from $${costs.steamCost}/kg to $${priceMatch[1]}/kg`
      };
    }
  }

  // COOLING WATER COST
  if (lower.includes('cooling water')) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Cooling Water Cost',
        currentValue: `$${costs.coolingWaterCost}/m³`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'coolingWaterCost',
        reasoning: 'Cooling water maintains bioreactor temperatures',
        estimatedImpact: `Changing from $${costs.coolingWaterCost}/m³ to $${priceMatch[1]}/m³`
      };
    }
  }

  // CHILLED WATER COST
  if (lower.includes('chilled water')) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Chilled Water Cost',
        currentValue: `$${costs.chilledWaterCost}/m³`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'chilledWaterCost',
        reasoning: 'Chilled water provides precise temperature control',
        estimatedImpact: `Changing from $${costs.chilledWaterCost}/m³ to $${priceMatch[1]}/m³`
      };
    }
  }

  // USP LABOR
  if (lower.includes('usp') || lower.includes('upstream')) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'USP Labor Rate',
        currentValue: `$${costs.uspLaborCostPerHour}/hr`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'uspLaborCostPerHour',
        reasoning: 'USP operators manage upstream processes',
        estimatedImpact: `Changing from $${costs.uspLaborCostPerHour}/hr to $${priceMatch[1]}/hr`
      };
    }
  }

  // MAIN OPERATOR LABOR
  if (lower.includes('main') && (lower.includes('operator') || lower.includes('labor'))) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Main Operator Labor Rate',
        currentValue: `$${costs.mainLaborCostPerHour}/hr`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'mainLaborCostPerHour',
        reasoning: 'Main operators oversee bioreactor operations',
        estimatedImpact: `Changing from $${costs.mainLaborCostPerHour}/hr to $${priceMatch[1]}/hr`
      };
    }
  }

  // DSP LABOR
  if (lower.includes('dsp') || lower.includes('downstream')) {
    const priceMatch = userMessage.match(/\$?\s*(\d+\.?\d*)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'DSP Labor Rate',
        currentValue: `$${costs.dspLaborCostPerHour}/hr`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'dspLaborCostPerHour',
        reasoning: 'DSP operators handle downstream processing',
        estimatedImpact: `Changing from $${costs.dspLaborCostPerHour}/hr to $${priceMatch[1]}/hr`
      };
    }
  }

  // TAX RATE
  if (lower.includes('tax')) {
    const priceMatch = userMessage.match(/(\d+\.?\d*)\s*%?/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Tax Rate',
        currentValue: `${costs.taxRate}%`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'taxRate',
        reasoning: 'Tax rate affects overall financial projections',
        estimatedImpact: `Changing from ${costs.taxRate}% to ${priceMatch[1]}%`
      };
    }
  }

  // PROJECT DURATION
  if (lower.includes('project') && lower.includes('duration')) {
    const priceMatch = userMessage.match(/(\d+)/);
    if (priceMatch) {
      return {
        type: 'change-cost',
        parameter: 'Project Duration',
        currentValue: `${costs.projectDuration} years`,
        suggestedValue: parseFloat(priceMatch[1]),
        field: 'projectDuration',
        reasoning: 'Project duration affects amortization calculations',
        estimatedImpact: `Changing from ${costs.projectDuration} years to ${priceMatch[1]} years`
      };
    }
  }

  return null;
}