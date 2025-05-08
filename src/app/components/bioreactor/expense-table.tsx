"use client";

import { CalculatedExpenses } from "@/types";

interface ExpenseTableProps {
  expenses: CalculatedExpenses;
}

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
  const chartData = expenses.chartData;

  // Calculate percentages
  const total = Object.values(chartData).reduce((sum, value) => sum + value, 0);

  const expenseItems = [
    { name: "Media", value: chartData.media, color: "#4361ee" },
    {
      name: "Other Raw Materials",
      value: chartData.otherMaterials,
      color: "#3a0ca3",
    },
    { name: "Labor", value: chartData.labor, color: "#7209b7" },
    { name: "Waste Treatment", value: chartData.waste, color: "#f72585" },
    {
      name: "Facility Dependent Cost",
      value: chartData.facility,
      color: "#4cc9f0",
    },
    { name: "Consumables", value: chartData.consumables, color: "#4895ef" },
    { name: "Utilities", value: chartData.utilities, color: "#56cfe1" },
  ];

  // Sort expenses by value (highest to lowest)
  expenseItems.sort((a, b) => b.value - a.value);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className='h-full flex flex-col'>
      <h2 className='text-xl font-semibold text-slate-700 mb-4'>
        Expense Breakdown
      </h2>
      <div className='overflow-scroll border border-gray-200 rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Category
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Cost
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Percentage
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {expenseItems.map((item, index) => (
              <tr key={index} className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div
                      className='h-3 w-3 rounded-full mr-2'
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className='text-sm font-medium text-gray-900'>
                      {item.name}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium'>
                  {formatCurrency(item.value)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900'>
                  {((item.value / total) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
            <tr className='bg-gray-50'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm font-medium text-gray-900'>Total</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-bold'>
                {formatCurrency(total)}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-bold'>
                100%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
