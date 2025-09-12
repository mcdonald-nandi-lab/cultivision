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
import { BRAND_COLOR_ORDER } from "@/lib/constants";
import useChartDownload from "@/hooks/use-chart-download";
import ChartDownloadButton from "./download-button";
import Title from "@/components/title";
import { useCalculations } from "@/context/calculation";
import MaximizeButton from "@/components/maximize-button";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const OpexDistribution = () => {
  const { expenses } = useCalculations();

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const { downloadChart } = useChartDownload();

  const calculatePercentages = (chartData: CalculatedExpenses["chartData"]) => {
    const expenseValues = [
      chartData.media,
      chartData.otherMaterials,
      chartData.labor,
      chartData.waste,
      chartData.facility,
      chartData.consumables,
      chartData.utilities.total,
    ];

    const total = expenseValues.reduce((sum, value) => sum + value, 0);

    return {
      media: (chartData.media / total) * 100,
      otherMaterials: (chartData.otherMaterials / total) * 100,
      labor: (chartData.labor / total) * 100,
      waste: (chartData.waste / total) * 100,
      facility: (chartData.facility / total) * 100,
      consumables: (chartData.consumables / total) * 100,
      utilities: (chartData.utilities.total / total) * 100,
    };
  };

  useEffect(() => {
    if (!chartRef.current || !expenses?.chartData) return;

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
        `Other Raw Materials (${percentages.otherMaterials.toFixed(1)}%)`,
        `Labor (${percentages.labor.toFixed(1)}%)`,
        `Waste (${percentages.waste.toFixed(1)}%)`,
        `Facility Dependent Cost (${percentages.facility.toFixed(1)}%)`,
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
            chartData.utilities.total,
          ],
          backgroundColor: BRAND_COLOR_ORDER,
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
        layout: {
          padding: {
            top: 20,
            right: 0,
            bottom: 20,
            left: 0,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            align: "center",
            labels: {
              padding: 15,
              boxWidth: 12,
              font: {
                size: 12,
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

  return (
    <div className='h-full flex flex-col pb-2'>
      <div className='flex items-center justify-between gap-x-4 mb-4'>
        <div className='flex items-center justify-start gap-x-2'>
          <Title title={"OPEX Distribution"} />
          <ChartDownloadButton
            downloadChart={downloadChart}
            chartInstance={chartInstance}
            filename='cost-distribution-chart.png'
          />
        </div>
        <MaximizeButton
          id={"opexDistribution"}
          title={"OPEX Distribution Chart"}
        />
      </div>
      <div
        className='flex-1 relative h-full'
        aria-label='Doughnut chart showing percentage distribution of operational expenses'
        style={{ minHeight: "300px" }}
      >
        <canvas ref={chartRef} className='w-full h-full' />
      </div>
    </div>
  );
};

export default OpexDistribution;
