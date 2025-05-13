"use client";

import { CalculatedExpenses } from "@/types";
import cn from "classnames";
import TableDownloadButton from "@/components/bioreactor/tables/download-button"; 

interface MetricsTableProps {
  expenses: CalculatedExpenses;
}

const MetricsTable = ({ expenses }: MetricsTableProps) => {
  console.log('Expenses', expenses)
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatCurrency = (num: number, decimals = 2): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const metrics = [
    {
      name: "Annual Production",
      value: formatNumber(expenses.annualProduction),
      unit: "kg/yr",
    },
    {
      name: "Facilities Needed for 100M kg/yr",
      value: expenses.facilitiesNeeded.toFixed(0),
      unit: "facilities",
    },
    {
      name: "Capital Expenses",
      value: formatCurrency(expenses.capitalExpenses, 1),
      unit: "million USD",
    },
    {
      name: "Operating Expenses",
      value: formatCurrency(expenses.operatingExpenses, 1),
      unit: "million USD/yr",
    },
    {
      name: "COGS (with Depreciation)",
      value: formatCurrency(expenses.cogsWithDepreciation, 2),
      unit: "USD/kg",
    },
    {
      name: "COGS (without Depreciation)",
      value: formatCurrency(expenses.cogsWithoutDepreciation, 2),
      unit: "USD/kg",
    },
  ];

  const headers = ["Metric", "Value", "Unit"];
  const rows = metrics.map((m) => [m.name, m.value, m.unit]);

  return (
    <div className='h-full flex flex-col pb-2'>
      <div className='flex items-center justify-start gap-x-2 mb-4'>
        <h2 className='text-lg font-semibold text-slate-700'>
          Performance Metrics
        </h2>
        <TableDownloadButton
          filename='performance-metrics.csv'
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
                className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Value
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Unit
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {metrics.map((metric, index) => (
              <tr
                key={index}
                className={cn("bg-gray-50", { "bg-white": index % 2 === 0 })}
              >
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm font-medium text-gray-900'>
                    {metric.name}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium'>
                  {metric.value}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500'>
                  {metric.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-4 text-sm text-gray-500 border-t pt-4'>
        <div className='font-medium mb-1'>Notes:</div>
        <ul className='list-disc pl-5 space-y-1'>
          <li>COGS = Cost of Goods Sold</li>
          <li>Capital expenses are reported in millions of USD</li>
          <li>All calculations based on provided cost parameters</li>
        </ul>
      </div>
    </div>
  );
};

export default MetricsTable;
