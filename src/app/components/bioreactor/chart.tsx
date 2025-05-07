"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  ChartConfiguration,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { CalculatedExpenses } from "@/types";

// Register required Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface BioreactorChartProps {
  expenses: CalculatedExpenses;
}

export default function BioreactorChart({ expenses }: BioreactorChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // Cleanup previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartData = expenses.chartData;

    const data = {
      labels: [
        "Media",
        "Other Raw Materials",
        "Labor",
        "Waste Treatment",
        "Facility Dependent Cost",
        "Consumables",
        "Utilities",
      ],
      datasets: [
        {
          data: [
            chartData.media,
            chartData.otherMaterials,
            chartData.labor,
            chartData.waste,
            chartData.facility,
            chartData.consumables,
            chartData.utilities,
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4CAF50",
            "#9966FF",
            "#FFA07A",
            "#808080",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const config: ChartConfiguration = {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div className='h-full flex flex-col'>
      <h2 className='text-xl font-semibold text-gray-800 mb-3'>
        Expense Breakdown
      </h2>
      <p className='text-gray-600 mb-4'>
        {expenses.facilitiesNeeded} facilities needed to reach 100,000,000 kg/yr
      </p>

      <div className='flex-1 relative min-h-[300px]'>
        <canvas ref={chartRef} className='w-full h-full'></canvas>
      </div>

      <div className='mt-4 space-y-2'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='text-sm font-medium text-gray-700'>
            Annual Production:
          </div>
          <div className='text-sm text-gray-800'>
            {formatNumber(expenses.annualProduction)} kg/yr
          </div>

          <div className='text-sm font-medium text-gray-700'>
            Capital Expenses:
          </div>
          <div className='text-sm text-gray-800'>
            {expenses.capitalExpenses.toFixed(1)} million USD
          </div>

          <div className='text-sm font-medium text-gray-700'>
            Operating Expenses:
          </div>
          <div className='text-sm text-gray-800'>
            {expenses.operatingExpenses.toFixed(1)} million USD/yr
          </div>

          <div className='text-sm font-medium text-gray-700'>
            COGS (with Depreciation):
          </div>
          <div className='text-sm text-gray-800'>
            {expenses.cogsWithDepreciation.toFixed(2)} USD/kg
          </div>

          <div className='text-sm font-medium text-gray-700'>
            COGS (without Depreciation):
          </div>
          <div className='text-sm text-gray-800'>
            {expenses.cogsWithoutDepreciation.toFixed(2)} USD/kg
          </div>
        </div>
      </div>
    </div>
  );
}
