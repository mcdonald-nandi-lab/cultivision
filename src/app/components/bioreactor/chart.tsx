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

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

interface BioreactorChartProps {
  expenses: CalculatedExpenses;
}

export default function BioreactorChart({ expenses }: BioreactorChartProps) {
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

  // Calculate percentages
  const calculatePercentages = (chartData: any) => {
    const total = Object.values(chartData).reduce(
      (sum: number, value: any) => sum + value,
      0
    );
    return Object.entries(chartData).reduce(
      (acc: any, [key, value]: [string, any]) => {
        acc[key] = (value / total) * 100;
        return acc;
      },
      {}
    );
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartData = expenses.chartData;
    const percentages = calculatePercentages(chartData);

    const data = {
      labels: [
        `Media (${percentages.media.toFixed(1)}%)`,
        `Raw Materials (${percentages.otherMaterials.toFixed(1)}%)`,
        `Labor (${percentages.labor.toFixed(1)}%)`,
        `Waste (${percentages.waste.toFixed(1)}%)`,
        `Facility (${percentages.facility.toFixed(1)}%)`,
        `Consumables (${percentages.consumables.toFixed(1)}%)`,
        `Utilities (${percentages.utilities.toFixed(1)}%)`,
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
            "#4361ee",
            "#3a0ca3",
            "#7209b7",
            "#f72585",
            "#4cc9f0",
            "#4895ef",
            "#56cfe1",
          ],
          borderWidth: 1,
          borderColor: "#ffffff",
          hoverOffset: 6,
        },
      ],
    };

    const config: ChartConfiguration = {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 10,
              padding: 10,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw as number;
                return `${label.split(" (")[0]}: ${formatCurrency(value)}`;
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

  // Calculate total expenses
  const totalExpenses = Object.values(expenses.chartData).reduce(
    (sum, value) => sum + value,
    0
  );

  return (
    <div className='h-full flex flex-col'>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-xl font-semibold text-slate-700'>
          Cost Distribution
        </h2>
        <div className='text-right'>
          <div className='text-sm font-semibold text-slate-700'>
            COGS: {formatCurrency(expenses.cogsWithDepreciation, 2)}/kg
          </div>
        </div>
      </div>

      <div className='flex-1 relative' style={{ minHeight: "300px" }}>
        <canvas ref={chartRef} className='w-full h-full'></canvas>
      </div>

      <div className='text-center text-sm mt-2 text-slate-500'>
        Total Operating Expenses: {formatCurrency(totalExpenses)}
      </div>
    </div>
  );
}
