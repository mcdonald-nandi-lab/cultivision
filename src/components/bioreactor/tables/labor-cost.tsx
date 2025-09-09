"use client";

import { useCalculations } from "@/context/calculation-context";
import cn from "classnames";
import TableDownloadButton from "@/components/bioreactor/tables/download-button";
import Title from "@/components/title";
import { DEFAULT_PRODUCTION_COSTS } from "@/lib/data";

const LaborCostTable = () => {
  const { expenses } = useCalculations();

  if (!expenses) {
    return <div>Loading labor cost data...</div>;
  }

  const headers = [
    "Values",
    "USP Operator ($/hr)",
    "Operator ($/hr)",
    "DSP Operator ($/hr)",
    "Total Annual Cost",
  ];

  const DIFFERENCE = expenses.laborCostValues.differenceOfTotals;

  const rows = [
    [
      "Default",
      DEFAULT_PRODUCTION_COSTS.uspLaborCostPerHour,
      DEFAULT_PRODUCTION_COSTS.mainLaborCostPerHour,
      DEFAULT_PRODUCTION_COSTS.dspLaborCostPerHour,
      `${expenses.laborCostValues.baseCosts.totalCost.toLocaleString(
        undefined,
        { maximumFractionDigits: 1 }
      )}`,
    ],
    [
      "Updated",
      expenses.laborCostValues.updatedCosts.uspLaborCostPerHour,
      DEFAULT_PRODUCTION_COSTS.mainLaborCostPerHour,
      expenses.laborCostValues.updatedCosts.dspLaborCostPerHour,
      `${expenses.laborCostValues.updatedCosts.totalCost.toLocaleString(
        undefined,
        { maximumFractionDigits: 1 }
      )}`,
    ],
    [
      "Difference",
      "", // Empty for USP
      "", // Empty for Operator
      "", // Empty for DSP
      DIFFERENCE.toFixed(2),
    ],
  ];

  return (
    <div className='h-full flex flex-col pb-2'>
      <div className='flex items-center justify-start gap-x-2 mb-4'>
        <Title title={`Labor Cost Analysis`} />
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
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Values
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                USP Operator ($/hr)
                <br />
                <small className='font-normal'>
                  <span className='font-medium'>
                    {expenses.laborCostValues.laborHours.upstream.toLocaleString()}
                  </span>{" "}
                  hours per year
                </small>
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Operator ($/hr)
                <br />
                <small className='font-normal'>
                  <span className='font-medium'>
                    {expenses.laborCostValues.laborHours.main.toLocaleString()}
                  </span>{" "}
                  hours per year
                </small>
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                DSP Operator ($/hr)
                <br />
                <small className='font-normal'>
                  <span className='font-medium'>
                    {expenses.laborCostValues.laborHours.downstream.toLocaleString()}
                  </span>{" "}
                  hours per year
                </small>
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Total Annual Cost
                <br />
                <small className='font-normal'>USD per year</small>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 text-sm'>
            {!expenses.laborCostValues.isEqual && (
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-center text-gray-500 font-semibold'>
                  Updated
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {expenses.laborCostValues.updatedCosts.uspLaborCostPerHour}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {DEFAULT_PRODUCTION_COSTS.mainLaborCostPerHour}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center'>
                  {expenses.laborCostValues.updatedCosts.dspLaborCostPerHour}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-center font-medium'>
                  $
                  {expenses.laborCostValues.updatedCosts.totalCost.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 1,
                    }
                  )}
                </td>
              </tr>
            )}
            <tr className={cn()}>
              <td className='px-6 py-4 whitespace-nowrap text-center text-gray-700'>
                Default
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center'>
                {DEFAULT_PRODUCTION_COSTS.uspLaborCostPerHour}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center'>
                {DEFAULT_PRODUCTION_COSTS.mainLaborCostPerHour}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center'>
                {DEFAULT_PRODUCTION_COSTS.dspLaborCostPerHour}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-center font-medium'>
                $
                {expenses.laborCostValues.baseCosts.totalCost.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 1,
                  }
                )}
              </td>
            </tr>
          </tbody>
          {!expenses.laborCostValues.isEqual && (
            <tfoot>
              <tr className='bg-gray-100 text-sm font-semibold'>
                <td colSpan={6} className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex justify-center gap-6'>
                    <span>
                      Difference in Labor Cost due to hourly rate change ($):
                    </span>
                    <span
                      className={cn(
                        "text-gray-500",
                        {
                          "text-red-500": DIFFERENCE > 0,
                        },
                        {
                          "text-green-600": DIFFERENCE < 0,
                        }
                      )}
                    >
                      {DIFFERENCE.toFixed(2)}
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default LaborCostTable;
