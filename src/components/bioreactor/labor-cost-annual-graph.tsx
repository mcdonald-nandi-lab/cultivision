"use client";

import { useCalculations } from "@/context/calculation-context";
import { useEffect, useRef } from "react";
import {
  Chart,
  ChartConfiguration,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const ANNUAL_COST_COLOR = "#659C46"; 

const LaborCostAnnualGraph = () => {
  const { laborCostTable } = useCalculations();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!laborCostTable || !chartRef.current) return;

    const { relativePercentages, results } = laborCostTable;

    const labels = relativePercentages.map((relPercentage) =>
      relPercentage > 0 ? `+${relPercentage}%` : `${relPercentage}%`
    );

    const totalCosts = relativePercentages.map(
      (relPercentage) =>
        results[relPercentage.toString()].totalAnnualCost / 1000000 // Convert to millions for better display
    );

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Annual Labor Cost",
            data: totalCosts,
            backgroundColor: ANNUAL_COST_COLOR,
            borderColor: `${ANNUAL_COST_COLOR}D0`,
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "Annual Cost (M$)",
              font: {
                weight: "bold",
              },
            },
            ticks: {
              callback: (value) => `$${(value as number).toFixed(2)}M`,
            },
          },
          x: {
            title: {
              display: true,
              text: "Relative Change",
              font: {
                weight: "bold",
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Annual Cost: $${context.parsed.y.toFixed(2)}M`;
              },
            },
          },
          legend: {
            position: "top",
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
  }, [laborCostTable]);

  if (!laborCostTable) {
    return <div>Loading labor cost data...</div>;
  }

  return (
    <div className='h-full flex flex-col'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>
        Total Annual Labor Cost
      </h3>
      <div
        className='flex-1'
        role='img'
        aria-label='Bar chart showing annual labor cost by percentage change'
      >
        <canvas ref={chartRef} className='w-full h-full' />
      </div>
      <div className='text-xs text-gray-500 mt-2'>
        Showing costs for current labor cost setting of{" "}
        {laborCostTable.currentPercentage}%
      </div>
    </div>
  );
};

export default LaborCostAnnualGraph;
