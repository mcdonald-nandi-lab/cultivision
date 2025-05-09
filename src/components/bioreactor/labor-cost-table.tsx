// components/bioreactor/labor-cost-table.tsx
"use client";

import { useCalculations } from "@/context/calculation-context";
import cn from "classnames";

const LaborCostTable = () => {
  const { laborCostTable, costs, setCosts } = useCalculations();
  
  if (!laborCostTable) {
    return <div>Loading labor cost data...</div>;
  }
  
  const { laborHours, percentages, currentPercentage, results, currentAnnualCost } = laborCostTable;
  
  const handlePercentageChange = (percentage: number) => {
    setCosts({
      ...costs,
      laborCost: percentage
    });
  };
  
  return (
    <div className='h-full flex flex-col'>
      <h3 className='text-lg font-semibold text-gray-700 mb-2'>
        Labor Cost Analysis
      </h3>
      <p className='text-sm text-gray-600 mb-4'>
        Click any row to set the current labor cost percentage.
      </p>
      <div className='overflow-scroll border border-gray-200 rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Percent Change (%)
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                USP Operator ($/hr)
                <br />
                <small className='font-normal'>
                  <span className='font-medium'>
                    {laborHours.upstream.toLocaleString()}
                  </span>{" "}
                  hours per year
                </small>
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Operator ($/hr)
                <br />
                <small className='font-normal'>
                  <span className='font-medium'>
                    {laborHours.main.toLocaleString()}
                  </span>{" "}
                  hours per year
                </small>
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                DSP Operator ($/hr)
                <br />
                <small className='font-normal'>
                  <span className='font-medium'>
                    {laborHours.downstream.toLocaleString()}
                  </span>{" "}
                  hours per year
                </small>
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Total Annual Cost
                <br />
                <small className='font-normal'>USD per year</small>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {percentages.map((percentage, index) => {
              const isCurrentPercentage =
                Math.abs(percentage - currentPercentage) < 0.1;
              const result = results[percentage];

              return (
                <tr
                  key={`percentage-${percentage}`}
                  className={cn(
                    "bg-gray-50",
                    { "bg-white": index % 2 === 0 },
                    { "bg-green-50": isCurrentPercentage }
                  )}
                  onClick={() => handlePercentageChange(percentage)}
                  style={{ cursor: "pointer" }}
                  title='Click to set as current percentage'
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {percentage}
                    {isCurrentPercentage && (
                      <span className='ml-2 text-green-600 text-xs'>
                        (current)
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {result.hourlyRates.upstream.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {result.hourlyRates.main.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {result.hourlyRates.downstream.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap font-medium'>
                    $
                    {result.totalAnnualCost.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className='bg-gray-100 text-sm font-semibold'>
              <td colSpan={5} className='px-6 py-4 whitespace-nowrap'>
                <div className='flex justify-between items-center'>
                  <span>
                    Current labor cost adjustment: {currentPercentage}%
                  </span>
                  <span>
                    Current annual labor cost: $
                    {currentAnnualCost.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default LaborCostTable;