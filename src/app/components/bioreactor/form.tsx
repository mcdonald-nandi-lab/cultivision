"use client";

import { useState, useEffect } from "react";
import { ProductionCosts } from "@/types";
import { defaultProductionCosts } from "@/lib/bioreactors";

interface ParameterFormProps {
  onUpdate: (costs: ProductionCosts) => void;
  bioreactorId: string;
}

export default function ParameterForm({
  onUpdate,
  bioreactorId,
}: ParameterFormProps) {
  const [costs, setCosts] = useState<ProductionCosts>(defaultProductionCosts);
  const [isDirty, setIsDirty] = useState(false);

  // Reset form when bioreactor changes
  useEffect(() => {
    setCosts(defaultProductionCosts);
    setIsDirty(false);
  }, [bioreactorId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCosts((prev) => ({
      ...prev,
      [id]: parseFloat(value) || 0,
    }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(costs);
    setIsDirty(false);
  };

  const handleReset = () => {
    setCosts(defaultProductionCosts);
    setIsDirty(true);
  };

  const parameterInputs = [
    { id: 'mediaCost', label: 'Media Cost', unit: '$/L', step: '0.1' },
    { id: 'laborCost', label: 'Labor Cost Change', unit: '%', step: '1' },
    { id: 'electricityCost', label: 'Electricity Cost', unit: '$/kWh', step: '0.01' },
    { id: 'steamCost', label: 'Steam Cost', unit: '$/MT', step: '0.1' },
    { id: 'coolingWaterCost', label: 'Cooling Water', unit: '$/MT', step: '0.01' },
    { id: 'chilledWaterCost', label: 'Chilled Water', unit: '$/MT', step: '0.01' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-slate-700">Cost Parameters</h2>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Reset
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          {parameterInputs.map((param) => (
            <div key={param.id} className="form-group">
              <label
                htmlFor={param.id}
                className="block mb-1 text-xs font-semibold text-gray-500"
              >
                {param.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-xs">
                    {/* {param.unit.startsWith()} */}
                  </span>
                </div>
                <input
                  type="number"
                  id={param.id}
                  value={costs[param.id as keyof ProductionCosts]}
                  onChange={handleChange}
                  className="block w-full pl-5 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-slate-700 text-gray-600"
                  placeholder="0.00"
                  step={param.step}
                  min="0"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-xs">
                    {param.unit.startsWith('') ? param.unit.substring(1) : param.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            disabled={!isDirty}
            className={`w-full py-1.5 rounded-md text-sm font-medium ${
              isDirty
                ? 'bg-slate-700 text-white hover:bg-slate-800'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Update Calculations
          </button>
        </div>
      </form>
    </div>
  );
}