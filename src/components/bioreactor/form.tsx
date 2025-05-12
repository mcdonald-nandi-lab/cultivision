"use client";

import { useEffect, useState } from "react";
import { useCalculations } from "@/context/calculation-context";
import { defaultProductionCosts } from "@/lib/bioreactors";
import Title from "@/components/title";
import classNames from "classnames";

const parameterInputs = [
  {
    id: "mediaCost",
    label: "Media Cost",
    unit: "$/L",
    step: "0.1",
    default: defaultProductionCosts.mediaCost,
    description: `Base case cost: $${defaultProductionCosts.mediaCost}/L`,
  },
  {
    id: "laborCost",
    label: "Labor Cost Change",
    unit: "%",
    step: "1",
    default: defaultProductionCosts.laborCost,
    description: "Labor cost as a percent difference from base labor cost",
  },
  {
    id: "electricityCost",
    label: "Electricity Cost",
    unit: "$/kWh",
    step: "0.01",
    default: defaultProductionCosts.electricityCost,
    description: `Base case cost: $${defaultProductionCosts.electricityCost}/kW-h`,
  },
  {
    id: "steamCost",
    label: "Steam Cost",
    unit: "$/MT",
    step: "0.1",
    default: defaultProductionCosts.steamCost,
    description: `Base case cost: $${defaultProductionCosts.steamCost}/MT`,
  },
  {
    id: "coolingWaterCost",
    label: "Cooling Water",
    unit: "$/MT",
    step: "0.01",
    default: defaultProductionCosts.coolingWaterCost,
    description: `Base case cost: $${defaultProductionCosts.coolingWaterCost}/MT`,
  },
  {
    id: "chilledWaterCost",
    label: "Chilled Water",
    unit: "$/MT",
    step: "0.01",
    default: defaultProductionCosts.chilledWaterCost,
    description: `Base case cost: $${defaultProductionCosts.chilledWaterCost}/MT`,
  },
];

const ParameterForm = () => {
  const { costs, setCosts, isUrlParamProcessed } = useCalculations();
  const [localCosts, setLocalCosts] = useState(costs);
  const [realTimeUpdates, setRealTimeUpdates] = useState(false);
  const [urlParamsSet, setUrlParamsSet] = useState(false);

  useEffect(() => {
    if ((isUrlParamProcessed && !urlParamsSet) || !urlParamsSet) {
      setLocalCosts(costs);
      setUrlParamsSet(true);
    }
  }, [costs, isUrlParamProcessed, urlParamsSet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newCosts = {
      ...localCosts,
      [id]: parseFloat(value) || 0,
    };

    setLocalCosts(newCosts);

    if (realTimeUpdates) {
      setCosts(newCosts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCosts(localCosts);
  };

  const handleReset = () => {
    const defaultCosts = defaultProductionCosts;
    setLocalCosts(defaultCosts);
    setCosts(defaultCosts);
  };

  const toggleRealTimeUpdates = () => {
    setRealTimeUpdates(!realTimeUpdates);
    if (!realTimeUpdates) {
      setCosts(localCosts);
    }
  };

  const hasCustomSettings = Object.entries(localCosts).some(
    ([key, value]) =>
      value !==
      defaultProductionCosts[key as keyof typeof defaultProductionCosts]
  );

  return (
    <div className='h-full flex flex-col gap-y-4'>
      <div className='flex flex-col gap-y-2 pb-2 border-b border-gray-200'>
        <div className='flex justify-between items-center gap-x-2'>
          <Title title='Cost Parameters' />
          <div className='flex gap-x-2'>
            <button
              type='button'
              onClick={handleReset}
              className={`flex items-center gap-x-1 text-xs font-medium ${
                hasCustomSettings
                  ? "text-slate-600 hover:text-green-600"
                  : "text-slate-400 cursor-not-allowed"
              } transition`}
              disabled={!hasCustomSettings}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3 w-3'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              Reset
            </button>
            <div className='flex items-center gap-x-1 bg-gray-100 px-2 py-1 rounded-md text-slate-600'>
              <span className='text-xs font-medium'>
                {realTimeUpdates ? "Real-time" : "Manual"}
              </span>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  className='sr-only peer'
                  checked={realTimeUpdates}
                  onChange={toggleRealTimeUpdates}
                />
                <div className="w-8 h-4 bg-gray-300 peer-focus:ring-1 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={classNames("flex-1 flex flex-col gap-y-8", { 'pb-4': realTimeUpdates })}
      >
        <div className='flex-1 space-y-6'>
          {parameterInputs.map((param) => (
            <div key={param.id} className='form-group'>
              <label
                htmlFor={param.id}
                className='block mb-1 text-xs font-semibold text-gray-500'
              >
                {param.label}
              </label>
              <div className='relative'>
                <input
                  type='number'
                  id={param.id}
                  value={localCosts[param.id as keyof typeof localCosts]}
                  onChange={handleChange}
                  className={`block w-full pl-5 pr-12 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-slate-700 text-gray-600`}
                  placeholder='0.00'
                  step={param.step}
                  min='0'
                />
                <div className='absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-xs text-gray-500'>
                  {param.unit}
                </div>
                <div className='absolute -bottom-4 left-0 text-xs text-gray-400'>
                  {param.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!realTimeUpdates && (
          <div className=''>
            <button
              type='submit'
              className='w-full py-1.5 rounded-md text-sm font-medium bg-slate-700 text-white hover:bg-slate-800 cursor-pointer'
            >
              Run Calculation
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ParameterForm;
