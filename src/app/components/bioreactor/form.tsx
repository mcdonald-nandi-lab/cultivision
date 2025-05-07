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

  // Reset form when bioreactor changes
  useEffect(() => {
    setCosts(defaultProductionCosts);
  }, [bioreactorId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCosts((prev) => ({
      ...prev,
      [id]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(costs);
  };

  return (
    <div className='bg-white rounded-lg shadow-sm p-6 h-full'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Parameters</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-4'>
          <div className='form-group'>
            <label
              htmlFor='mediaCost'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Media Cost ($/L)
            </label>
            <div className='relative mt-1 rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                id='mediaCost'
                value={costs.mediaCost}
                onChange={handleChange}
                className='block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='0.00'
                step='0.1'
                min='0'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>/L</span>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label
              htmlFor='laborCost'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Change in Labor Cost (%)
            </label>
            <div className='relative mt-1 rounded-md shadow-sm'>
              <input
                type='number'
                id='laborCost'
                value={costs.laborCost}
                onChange={handleChange}
                className='block w-full pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='0'
                step='1'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>%</span>
              </div>
            </div>
            <p className='mt-1 text-xs text-gray-500'>
              Labor cost as a percent difference from base labor cost of
              bioreactor
            </p>
          </div>

          <div className='form-group'>
            <label
              htmlFor='electricityCost'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Electricity Cost ($/kW-h)
            </label>
            <div className='relative mt-1 rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                id='electricityCost'
                value={costs.electricityCost}
                onChange={handleChange}
                className='block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='0.00'
                step='0.01'
                min='0'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>/kW-h</span>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label
              htmlFor='steamCost'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Steam Cost ($/MT)
            </label>
            <div className='relative mt-1 rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                id='steamCost'
                value={costs.steamCost}
                onChange={handleChange}
                className='block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='0.00'
                step='0.1'
                min='0'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>/MT</span>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label
              htmlFor='coolingWaterCost'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Cooling Water Cost ($/MT)
            </label>
            <div className='relative mt-1 rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                id='coolingWaterCost'
                value={costs.coolingWaterCost}
                onChange={handleChange}
                className='block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='0.00'
                step='0.01'
                min='0'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>/MT</span>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label
              htmlFor='chilledWaterCost'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Chilled Water Cost ($/MT)
            </label>
            <div className='relative mt-1 rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>$</span>
              </div>
              <input
                type='number'
                id='chilledWaterCost'
                value={costs.chilledWaterCost}
                onChange={handleChange}
                className='block w-full pl-7 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                placeholder='0.00'
                step='0.01'
                min='0'
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span className='text-gray-500 sm:text-sm'>/MT</span>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-4'>
          <button
            type='submit'
            className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
