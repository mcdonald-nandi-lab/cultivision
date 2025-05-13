"use client";

import { useCalculations } from "@/context/calculation-context";
import { useEffect, useRef } from "react";
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import useChartDownload from "@/hooks/useChartDownload";
import ChartDownloadButton from "@/components/bioreactor/charts/download-button";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const BRAND_COLORS = {
  upstream: "#B5D46F",
  main: "#CC7A5A",
  downstream: "#ED985F",
};

const LaborCostHourlyGraph = () => {
  const { laborCostTable } = useCalculations();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const { downloadChart } = useChartDownload();

  // Format currency for tooltip and axes
  const formatCurrency = (value: number, digits: number = 2): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  };

  useEffect(() => {
    if (!laborCostTable || !chartRef.current) return;

    const { relativePercentages, results } = laborCostTable;

    const labels = relativePercentages.map((relPercentage) =>
      relPercentage > 0 ? `+${relPercentage}%` : `${relPercentage}%`
    );

    const upstreamRates = relativePercentages.map(
      (relPercentage) => results[relPercentage.toString()].hourlyRates.upstream
    );

    const mainRates = relativePercentages.map(
      (relPercentage) => results[relPercentage.toString()].hourlyRates.main
    );

    const downstreamRates = relativePercentages.map(
      (relPercentage) =>
        results[relPercentage.toString()].hourlyRates.downstream
    );

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "USP Operator",
            data: upstreamRates,
            borderColor: BRAND_COLORS.upstream,
            backgroundColor: `${BRAND_COLORS.upstream}20`,
            borderWidth: 2,
            tension: 0.2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
          },
          {
            label: "Operator",
            data: mainRates,
            borderColor: BRAND_COLORS.main,
            backgroundColor: `${BRAND_COLORS.main}20`,
            borderWidth: 2,
            tension: 0.2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
          },
          {
            label: "DSP Operator",
            data: downstreamRates,
            borderColor: BRAND_COLORS.downstream,
            backgroundColor: `${BRAND_COLORS.downstream}20`,
            borderWidth: 2,
            tension: 0.2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
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
              text: "Hourly Rate ($/hr)",
              font: {
                weight: "bold",
              },
            },
            ticks: {
              callback: (value) => formatCurrency(value as number, 2),
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
                return `${context.dataset.label}: ${formatCurrency(
                  context.parsed.y
                )}`;
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
    <div className='h-full flex flex-col gap-3'>
      <div className='flex justify-start items-center w-full gap-x-2'>
        <h3 className='text-lg font-semibold text-gray-700'>
          Hourly Rates by Labor Type
        </h3>
        <ChartDownloadButton
          downloadChart={downloadChart}
          chartInstance={chartInstance}
          filename='hourly-labor-cost-chart.png'
        />
      </div>
      <div
        className='flex-1'
        role='img'
        aria-label='Line chart showing hourly labor rates by type and percentage change'
      >
        <canvas ref={chartRef} className='w-full h-full' />
      </div>
      <div className='text-xs text-gray-500 mt-2'>
        Showing rates for current labor cost setting of{" "}
        {laborCostTable.currentPercentage}%
      </div>
    </div>
  );
};

export default LaborCostHourlyGraph;
