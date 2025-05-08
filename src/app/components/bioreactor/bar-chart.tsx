"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  ChartConfiguration,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { CalculatedExpenses } from "@/types";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface BioreactorBarChartProps {
  expenses: CalculatedExpenses;
}

export default function BioreactorBarChart({
  expenses,
}: BioreactorBarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartData = expenses.chartData;

    // Convert data to millions for better readability
    const dataInMillions = [
      chartData.media / 1000000,
      chartData.otherMaterials / 1000000,
      chartData.labor / 1000000,
      chartData.waste / 1000000,
      chartData.facility / 1000000,
      chartData.consumables / 1000000,
      chartData.utilities / 1000000,
    ];

    const labels = [
      "Media",
      "Raw Materials",
      "Labor",
      "Waste",
      "Facility",
      "Consumables",
      "Utilities",
    ];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Expense ($ Million)",
          data: dataInMillions,
          backgroundColor: [
            "#4361ee",
            "#3a0ca3",
            "#7209b7",
            "#f72585",
            "#4cc9f0",
            "#4895ef",
            "#56cfe1",
          ],
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };

    const config: ChartConfiguration = {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw as number;
                return `${formatCurrency(value * 1000000)}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "USD (Millions)",
            },
            ticks: {
              callback: function (value) {
                return "$" + value + "M";
              },
            },
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

  const totalExpense =
    Object.values(expenses.chartData).reduce((sum, value) => sum + value, 0) /
    1000000;

  return (
    <div className='h-full flex flex-col'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-xl font-semibold text-slate-700'>Cost Breakdown</h2>
        <div className='text-right'>
          <div className='text-lg font-semibold text-slate-700'>
            {formatCurrency(totalExpense * 1000000)}
          </div>
          <div className='text-xs text-slate-500'>Total Operating Expense</div>
        </div>
      </div>

      <div className='flex-1 relative' style={{ minHeight: "300px" }}>
        <canvas ref={chartRef} className='w-full h-full'></canvas>
      </div>
    </div>
  );
}
