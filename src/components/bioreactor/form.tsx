"use client";

import { useEffect, useRef, useState } from "react";
import { useCalculations } from "@/context/calculation";
import {
  getBioreactorById,
  getAvailableDoublingTimes,
  getAvailableDensities,
} from "@/lib/bioreactors";
import Title from "@/components/title";
import cn from "classnames";
import {
  trackButtonClick,
  trackFormSubmission,
  trackUserBehavior,
} from "@/lib/analytics";
import { BIOREACTORS, DEFAULT_PRODUCTION_COSTS } from "@/lib/data";

interface ParameterProps {
  id: string;
  label: string;
  unit: string;
  step: string;
  default: number;
  description: string;
  min?: number | 0;
  max?: number | 100;
}

const costInputs: ParameterProps[] = [
  {
    id: "mediaCost",
    label: "Media Cost",
    unit: "$/L",
    step: "0.1",
    default: DEFAULT_PRODUCTION_COSTS.mediaCost,
    description: `Base case cost: $${DEFAULT_PRODUCTION_COSTS.mediaCost}/L`,
    min: 0,
  },
  {
    id: "uspLaborCostPerHour",
    label: "USP Operator",
    unit: "$/h",
    step: "0.1",
    default: DEFAULT_PRODUCTION_COSTS.uspLaborCostPerHour,
    description: "Labor Cost (upstream operator) per hour",
    min: 0,
  },
  {
    id: "dspLaborCostPerHour",
    label: "DSP Operator",
    unit: "$/h",
    step: "0.1",
    default: DEFAULT_PRODUCTION_COSTS.dspLaborCostPerHour,
    description: "Labor Cost (downstream operator) per hour",
    min: 0,
  },
];

const priceInput: ParameterProps[] = [
  {
    id: "taxRate",
    label: "Tax Rate",
    unit: "%",
    step: "0.1",
    default: DEFAULT_PRODUCTION_COSTS.taxRate,
    description: `Default tax rate: ${DEFAULT_PRODUCTION_COSTS.taxRate}%`,
    min: 0,
    max: 100,
  },
  {
    id: "projectDuration",
    label: "Project Duration",
    unit: "years",
    step: "1",
    default: DEFAULT_PRODUCTION_COSTS.projectDuration,
    description: `Default project duration: ${DEFAULT_PRODUCTION_COSTS.projectDuration} years`,
    min: 10,
  },
];

const utilitiesInput: ParameterProps[] = [
  {
    id: "electricityCost",
    label: "Electricity",
    unit: "$/kWh",
    step: "0.01",
    default: DEFAULT_PRODUCTION_COSTS.electricityCost,
    description: `Base case cost: $${DEFAULT_PRODUCTION_COSTS.electricityCost}/kW-h`,
    min: 0,
  },
  {
    id: "steamCost",
    label: "Steam",
    unit: "$/MT",
    step: "0.1",
    default: DEFAULT_PRODUCTION_COSTS.steamCost,
    description: `Base case cost: $${DEFAULT_PRODUCTION_COSTS.steamCost}/MT`,
    min: 0,
  },
  {
    id: "coolingWaterCost",
    label: "Cooling Water",
    unit: "$/MT",
    step: "0.01",
    default: DEFAULT_PRODUCTION_COSTS.coolingWaterCost,
    description: `Base case cost: $${DEFAULT_PRODUCTION_COSTS.coolingWaterCost}/MT`,
    min: 0,
  },
  {
    id: "chilledWaterCost",
    label: "Chilled Water",
    unit: "$/MT",
    step: "0.01",
    default: DEFAULT_PRODUCTION_COSTS.chilledWaterCost,
    description: `Base case cost: $${DEFAULT_PRODUCTION_COSTS.chilledWaterCost}/MT`,
    min: 0,
  },
];

const ParameterForm = () => {
  const {
    costs,
    setCosts,
    isUrlParamProcessed,
    activeReactorId,
    setActiveReactorId,
    doublingTime,
    setDoublingTime,
    density,
    setDensity,
  } = useCalculations();
  const [localCosts, setLocalCosts] = useState(costs);
  const [realTimeUpdates, setRealTimeUpdates] = useState(false);
  const [urlParamsSet, setUrlParamsSet] = useState(false);

  const [isReactorOpen, setIsReactorOpen] = useState(false);
  const [isDoublingOpen, setIsDoublingOpen] = useState(false);
  const [isDensityOpen, setIsDensityOpen] = useState(false);
  const reactorRef = useRef<HTMLDivElement>(null);
  const doublingRef = useRef<HTMLDivElement>(null);
  const densityRef = useRef<HTMLDivElement>(null);

  const activeReactor = getBioreactorById(activeReactorId);
  const availableDoublingTimes = activeReactor
    ? getAvailableDoublingTimes(activeReactor)
    : [];
  const availableDensities =
    activeReactor && doublingTime
      ? getAvailableDensities(activeReactor, doublingTime)
      : [];

  useEffect(() => {
    if ((isUrlParamProcessed && !urlParamsSet) || !urlParamsSet) {
      setLocalCosts(costs);
      setUrlParamsSet(true);
    }
  }, [costs, isUrlParamProcessed, urlParamsSet]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        reactorRef.current &&
        !reactorRef.current.contains(e.target as Node)
      ) {
        setIsReactorOpen(false);
      }
      if (
        doublingRef.current &&
        !doublingRef.current.contains(e.target as Node)
      ) {
        setIsDoublingOpen(false);
      }
      if (
        densityRef.current &&
        !densityRef.current.contains(e.target as Node)
      ) {
        setIsDensityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleReactorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveReactorId(e.target.value);
    trackUserBehavior("bioreactor_selection", {
      reactor_id: e.target.value,
      reactor_name:
        BIOREACTORS.find((r) => r.id === e.target.value)?.name || "Unknown",
    });
  };

  const handleDoublingTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDoublingTime(e.target.value);
    trackUserBehavior("doubling_time_selection", {
      reactor_id: activeReactorId,
      doubling_time: e.target.value,
    });
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDensity(e.target.value);
    trackUserBehavior("density_selection", {
      reactor_id: activeReactorId,
      doubling_time: doublingTime,
      density: e.target.value,
    });
  };

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
    trackFormSubmission("cost_parameters", "Cost Parameters Form");
  };

  const handleReset = () => {
    const defaultCosts = DEFAULT_PRODUCTION_COSTS;
    setLocalCosts(defaultCosts);
    setCosts(defaultCosts);
    trackButtonClick("reset_form", "Reset", {
      form_id: "cost_parameters",
      button_text: "hasCustomSettings",
    });
  };

  const toggleRealTimeUpdates = () => {
    const newValue = !realTimeUpdates;
    setRealTimeUpdates(newValue);
    if (newValue) setCosts(localCosts);
    trackUserBehavior("toggle_realtime_updates", {
      enabled: newValue,
    });
  };

  const hasCustomSettings = Object.entries(localCosts).some(
    ([key, value]) =>
      value !==
      DEFAULT_PRODUCTION_COSTS[key as keyof typeof DEFAULT_PRODUCTION_COSTS]
  );

  return (
    <div className='h-full flex flex-col gap-y-4'>
      <div className='flex flex-col gap-y-2 pb-2 mb-1 border-b border-slate-300'>
        <div className='flex flex-col xl:flex-row justify-between items-center gap-2'>
          <Title title='Parameters' />
          <div className='flex gap-x-2'>
            <button
              type='button'
              onClick={handleReset}
              className={cn(
                "flex items-center gap-x-1 text-xs font-medium transition cursor-pointer hover:text-green-500",
                { "text-slate-600 hover:text-green-600": hasCustomSettings }
              )}
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
            <div
              className={cn(
                "flex items-center gap-x-1 bg-gray-100 px-2 py-1 rounded-md text-slate-600"
              )}
            >
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
        className={cn("flex-1 flex flex-col gap-y-4", {
          "pb-4": realTimeUpdates,
        })}
      >
        <div className='space-y-3'>
          <div className='flex items-center justify-center text-sm font-semibold text-slate-700'>
            &#183; Bioreactor Configuration &#183;
          </div>
          <div className='form-group' ref={reactorRef}>
            <label
              htmlFor='bioreactor'
              className='block mb-1 text-xs font-semibold text-gray-500'
            >
              Type
            </label>
            <div className='relative'>
              <button
                type='button'
                onClick={() => setIsReactorOpen(!isReactorOpen)}
                className={cn(
                  "flex w-full rounded-md border border-gray-300 overflow-hidden",
                  "focus:ring-1 focus:ring-slate-700 focus:border-slate-700 transition-all",
                  "hover:border-gray-400 cursor-pointer"
                )}
              >
                <div className='flex-grow px-4 py-1.5 text-sm text-left text-gray-600 bg-white'>
                  {BIOREACTORS.find((r) => r.id === activeReactorId)?.name ||
                    "Select"}
                </div>
                <div className='flex items-center justify-center w-20 px-2 text-xs text-gray-500 bg-gray-50 border-l border-gray-200 gap-2'>
                  <span>Reactor</span>
                  <svg
                    className={cn("h-3 w-3 transition-transform duration-200", {
                      "rotate-180": isReactorOpen,
                    })}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 right-0 mt-1 py-1 bg-white border border-gray-300 rounded-md shadow-lg z-20 transition-all duration-200",
                  {
                    "opacity-100 visible translate-y-0": isReactorOpen,
                    "opacity-0 invisible -translate-y-2": !isReactorOpen,
                  }
                )}
              >
                {BIOREACTORS.map((reactor) => (
                  <button
                    key={reactor.id}
                    type='button'
                    onClick={() => {
                      handleReactorChange({
                        target: { value: reactor.id },
                      } as React.ChangeEvent<HTMLSelectElement>);
                      setIsReactorOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
                      {
                        "bg-gray-50 font-medium":
                          activeReactorId === reactor.id,
                      }
                    )}
                  >
                    {reactor.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className='form-group' ref={doublingRef}>
            <label
              htmlFor='doublingTime'
              className='block mb-1 text-xs font-semibold text-gray-500'
            >
              Doubling Time
            </label>
            <div
              className={cn("relative", {
                "opacity-50": availableDoublingTimes.length === 0,
              })}
            >
              <button
                type='button'
                onClick={() =>
                  availableDoublingTimes.length > 0 &&
                  setIsDoublingOpen(!isDoublingOpen)
                }
                disabled={availableDoublingTimes.length === 0}
                className={cn(
                  "flex w-full rounded-md border border-gray-300 overflow-hidden",
                  "focus:ring-1 focus:ring-slate-700 focus:border-slate-700 transition-all",
                  "hover:border-gray-400 cursor-pointer",
                  { "cursor-not-allowed": availableDoublingTimes.length === 0 }
                )}
              >
                <div className='flex-grow px-4 py-1.5 text-sm text-left text-gray-600 bg-white'>
                  {doublingTime.replace("h", "")}
                </div>
                <div className='flex items-center justify-center w-20 px-3 text-xs text-gray-500 bg-gray-50 border-l border-gray-200 gap-2'>
                  <span>hours</span>
                  <svg
                    className={cn("h-3 w-3 transition-transform duration-200", {
                      "rotate-180": isDoublingOpen,
                    })}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 right-0 mt-1 py-1 bg-white border border-gray-300 rounded-md shadow-lg z-20 transition-all duration-200",
                  {
                    "opacity-100 visible translate-y-0": isDoublingOpen,
                    "opacity-0 invisible -translate-y-2": !isDoublingOpen,
                  }
                )}
              >
                {availableDoublingTimes.map((time) => (
                  <button
                    key={time}
                    type='button'
                    onClick={() => {
                      handleDoublingTimeChange({
                        target: { value: time },
                      } as React.ChangeEvent<HTMLSelectElement>);
                      setIsDoublingOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
                      { "bg-gray-50 font-medium": doublingTime === time }
                    )}
                  >
                    {time.replace("h", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className='form-group' ref={densityRef}>
            <label
              htmlFor='density'
              className='block mb-1 text-xs font-semibold text-gray-500'
            >
              Cell Harvest Density
            </label>
            <div
              className={cn("relative", {
                "opacity-50": availableDensities.length === 0,
              })}
            >
              <button
                type='button'
                onClick={() =>
                  availableDensities.length > 0 &&
                  setIsDensityOpen(!isDensityOpen)
                }
                disabled={availableDensities.length === 0}
                className={cn(
                  "flex w-full rounded-md border border-gray-300 overflow-hidden",
                  "focus:ring-1 focus:ring-slate-700 focus:border-slate-700 transition-all",
                  "hover:border-gray-400 cursor-pointer",
                  { "cursor-not-allowed": availableDensities.length === 0 }
                )}
              >
                <div className='flex-grow px-4 py-1.5 text-sm text-left text-gray-600 bg-white'>
                  {density.replace("gpl", "")}
                </div>
                <div className='flex items-center justify-center w-20 px-3 text-xs text-gray-500 bg-gray-50 border-l border-gray-200 gap-2'>
                  <span>g/L</span>
                  <svg
                    className={cn("h-3 w-3 transition-transform duration-200", {
                      "rotate-180": isDensityOpen,
                    })}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </button>

              <div
                className={cn(
                  "absolute top-full left-0 right-0 mt-1 py-1 bg-white border border-gray-300 rounded-md shadow-lg z-20 transition-all duration-200",
                  {
                    "opacity-100 visible translate-y-0": isDensityOpen,
                    "opacity-0 invisible -translate-y-2": !isDensityOpen,
                  }
                )}
              >
                {availableDensities.map((dens) => (
                  <button
                    key={dens}
                    type='button'
                    onClick={() => {
                      handleDensityChange({
                        target: { value: dens },
                      } as React.ChangeEvent<HTMLSelectElement>);
                      setIsDensityOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
                      { "bg-gray-50 font-medium": density === dens }
                    )}
                  >
                    {dens.replace("gpl", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center justify-center text-sm font-semibold text-slate-700'>
            &#183; Cost Parameters &#183;
          </div>
          {costInputs.map((param) => (
            <div key={param.id} className='form-group'>
              <label
                htmlFor={param.id}
                className='block mb-1 text-xs font-semibold text-gray-500'
              >
                {param.label}
              </label>
              <div className='grid grid-cols-1'>
                <div
                  className={
                    "flex w-full rounded-md border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-slate-700 focus-within:border-slate-700"
                  }
                >
                  <input
                    type='number'
                    id={param.id}
                    value={localCosts[param.id as keyof typeof localCosts]}
                    onChange={handleChange}
                    className={"flex-grow w-full px-4 py-1.5 text-sm focus:outline-none text-gray-600 border-0"}
                    placeholder='0.0'
                    step={param.step}
                    min={0}
                    aria-describedby={`${param.id}-desc`}
                  />
                  <div
                    className={"flex items-center justify-center px-3 text-xs text-gray-500 bg-gray-50 border-l border-gray-200 whitespace-nowrap"}
                  >
                    {param.unit}
                  </div>
                </div>
                <div
                  className={cn("text-xs text-gray-400 mt-1")}
                  id={`${param.id}-desc`}
                >
                  {param.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-center text-sm font-semibold text-slate-700 mb-[-0.5em]'>
          &#183; Utilities &#183;
        </div>

        <div className='flex-1 space-y-3'>
          {utilitiesInput.map((param) => (
            <div key={param.id} className='form-group'>
              <label
                htmlFor={param.id}
                className='block mb-1 text-xs font-semibold text-gray-500'
              >
                {param.label}
              </label>
              <div className='grid grid-cols-1'>
                <div
                  className={
                    "flex w-full rounded-md border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-slate-700 focus-within:border-slate-700"
                  }
                >
                  <input
                    type='number'
                    id={param.id}
                    value={localCosts[param.id as keyof typeof localCosts]}
                    onChange={handleChange}
                    className={cn(
                      "flex-grow w-full px-4 py-1.5 text-sm",
                      "focus:outline-none text-gray-600 border-0"
                    )}
                    placeholder='0.00'
                    step={param.step}
                    min={0}
                    aria-describedby={`${param.id}-desc`}
                  />
                  <div
                    className={
                      "flex items-center justify-center px-3 text-xs text-gray-500 bg-gray-50 border-l border-gray-200 whitespace-nowrap"
                    }
                  >
                    {param.unit}
                  </div>
                </div>
                <div
                  className={"text-xs text-gray-400 mt-1"}
                  id={`${param.id}-desc`}
                >
                  {param.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-center text-sm font-semibold text-slate-700 mb-[-0.5em]'>
          &#183; Project Details &#183;
        </div>
        <div className='flex-1 space-y-3'>
          {priceInput.map((param) => (
            <div key={param.id} className='form-group'>
              <label
                htmlFor={param.id}
                className='block mb-1 text-xs font-semibold text-gray-500'
              >
                {param.label}
              </label>
              <div className='grid grid-cols-1'>
                <div
                  className={cn(
                    "flex w-full rounded-md border border-gray-300 overflow-hidden",
                    "focus-within:ring-1 focus-within:ring-slate-700 focus-within:border-slate-700"
                  )}
                >
                  <input
                    type='number'
                    id={param.id}
                    value={localCosts[param.id as keyof typeof localCosts]}
                    onChange={handleChange}
                    className={cn(
                      "flex-grow w-full px-4 py-1.5 text-sm",
                      "focus:outline-none text-gray-600 border-0"
                    )}
                    placeholder='0.00'
                    step={param.step}
                    min={param.min}
                    max={param.max ?? undefined}
                    aria-describedby={`${param.id}-desc`}
                  />
                  <div
                    className={
                      "flex items-center justify-center px-3 text-xs text-gray-500 bg-gray-50 border-l border-gray-200"
                    }
                  >
                    {param.unit}
                  </div>
                </div>
                <div
                  className={cn("text-xs text-gray-400 mt-1")}
                  id={`${param.id}-desc`}
                >
                  {param.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        {!realTimeUpdates && (
          <div>
            <button
              type='submit'
              className={
                "w-full py-1.5 rounded-md text-sm font-medium bg-slate-700 text-white hover:bg-slate-800 cursor-pointer mt-1"
              }
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
