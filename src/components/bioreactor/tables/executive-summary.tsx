"use client";

import TableDownloadButton from "@/components/bioreactor/tables/download-button";
import Title from "@/components/title";
import { useCalculations } from "@/context/calculation-context";
import cn from "classnames";

export const formatNumber = (num: number, fixed=1): string => {
  return num.toLocaleString(undefined, { maximumFractionDigits: fixed });
};

const ExecutiveSummaryTable = () => {
  const { expenses } = useCalculations();
  const data = expenses!;

  const metrics = [
    {
      name: "Annual Production",
      value: formatNumber(data.annualProduction, 2),
      combinedValue: formatNumber(
        data.annualProduction * data.facilitiesNeeded,
        2
      ),
      unit: "kg/yr",
    },
    {
      name: "Capital Expenses",
      value: formatNumber(data.capitalExpenses),
      combinedValue: formatNumber(
        data.capitalExpenses * data.facilitiesNeeded
      ),
      unit: "million $",
    },
    {
      name: "Operating Expenses",
      value: formatNumber(data.operatingExpenses),
      combinedValue: formatNumber(
        data.operatingExpenses * data.facilitiesNeeded
      ),
      unit: "million $/yr",
    },
    {
      name: "COGS (with Depreciation)",
      value: data.cogsWithDepreciation.toFixed(2),
      combinedValue: data.cogsWithDepreciation.toFixed(2),
      unit: "$/kg",
    },
    {
      name: "COGS (without Depreciation)",
      value: data.cogsWithoutDepreciation.toFixed(2),
      combinedValue: data.cogsWithoutDepreciation.toFixed(2),
      unit: "$/kg",
    },
    {
      name: "Minimum Selling Price",
      value: data.minimumSellingPrice.toFixed(2),
      combinedValue: data.minimumSellingPrice.toFixed(2),
      unit: "$/kg",
    },
  ];

  const headers = ["Metric", "Single Facility", "Ten Facilities", "Unit"];
  const rows = metrics.map((m) => [m.name, m.value, m.combinedValue, m.unit]);

  return (
    <div className='h-full flex flex-col pb-2'>
      <div className='flex items-center justify-start gap-x-2 mb-4'>
        <Title title={"Executive Summary"} />
        <TableDownloadButton
          filename='executive-summary.csv'
          headers={headers}
          rows={rows}
        />
      </div>
      <div className='overflow-scroll border border-gray-200 rounded-lg'>
        <table
          className='min-w-full divide-y divide-gray-200'
          role='table'
          aria-label='Performance metrics table'
        >
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Metric
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Single Facility
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                {data.facilitiesNeeded}* Facilities
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Unit
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {metrics.map((metric, index) => (
              <tr
                key={index}
                className={cn("bg-gray-50 text-left", {
                  "bg-white": index % 2 === 0,
                })}
              >
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900'>
                    {metric.name}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
                  {metric.value}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
                  {metric.combinedValue}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {metric.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='border-t border-gray-400 mx-4 my-4' />

      <div className='text-sm text-gray-500 px-4'>
        <div className='font-medium mb-1'>Notes:</div>
        <ul className='list-disc pl-5 space-y-1'>
          <li>COGS = Cost of Goods Sold</li>
          <li>*Value summary of number of facilities required to produce approximately 100M kg/yr</li>
          <li>Capital expenses are reported in millions of $</li>
          <li>All calculations are based on provided cost parameters</li>
        </ul>
      </div>
    </div>
  );
};

export default ExecutiveSummaryTable;
