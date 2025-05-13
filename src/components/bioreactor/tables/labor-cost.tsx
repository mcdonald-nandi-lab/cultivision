// components/bioreactor/labor-cost-table.tsx
"use client";

import { useCalculations } from "@/context/calculation-context";
import cn from "classnames";
import TableDownloadButton from "@/components/bioreactor/tables/download-button"; 

const LaborCostTable = () => {
  const { laborCostTable } = useCalculations();

  if (!laborCostTable) {
    return <div>Loading labor cost data...</div>;
  }

  const { laborHours, relativePercentages, currentPercentage, results } =
    laborCostTable;

    const headers = [
      "Relative Change (%)",
      "Applied %",
      "USP Operator ($/hr)",
      "Operator ($/hr)",
      "DSP Operator ($/hr)",
      "Total Annual Cost",
    ];

    const rows = relativePercentages.map((rel) => {
      const r = results[rel.toString()];
      return [
        rel > 0 ? `+${rel}%` : `${rel}%`,
        `${r.absolutePercentage}%`,
        r.hourlyRates.upstream.toFixed(2),
        r.hourlyRates.main.toFixed(2),
        r.hourlyRates.downstream.toFixed(2),
        `$${r.totalAnnualCost.toLocaleString()}`,
      ];
    });
    
  return (
    <div className='h-full flex flex-col pb-2'>
      <div className='flex items-center justify-start gap-x-2 mb-4'>
        <h3 className='text-lg font-semibold text-gray-700'>
          Labor Cost Analysis
        </h3>
        <TableDownloadButton
          filename='labor-cost-analysis.csv'
          headers={headers}
          rows={rows}
        />
      </div>
      <div className='overflow-auto border border-gray-200 rounded-lg'>
        <table
          className='min-w-full divide-y divide-gray-200'
          role='table'
          aria-label='Table of labor costs by relative percentage'
        >
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Relative Change (%)
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Applied Percentage (%)
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
          <tbody className='bg-white divide-y divide-gray-200 text-sm'>
            {relativePercentages.map((relPercentage, index) => {
              const result = results[relPercentage.toString()];
              const isCurrentRow = relPercentage === 0;
              return (
                <tr
                  key={`percentage-${relPercentage}`}
                  className={cn(
                    { "bg-white": index % 2 === 0 },
                    { "bg-gray-50": index % 2 !== 0 },
                    { "bg-green-50": isCurrentRow } // Highlight the row with 0 relative change
                  )}
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {relPercentage > 0 ? `+${relPercentage}` : relPercentage}%
                    {isCurrentRow && (
                      <span className='ml-2 text-green-600 text-xs'>
                        (current)
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {result.absolutePercentage}%
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
              <td colSpan={6} className='px-6 py-4 whitespace-nowrap'>
                <div className='flex justify-between items-center'>
                  <span>Current labor cost setting: {currentPercentage}%</span>
                  <span>Use the form to change the labor cost percentage</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default LaborCostTable;
