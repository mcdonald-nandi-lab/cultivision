"use client";

import Title from "@/components/title";
import { useCalculations } from "@/context/calculation";
import useChartDownload from "@/hooks/use-chart-download";
import {
  ArcElement,
  Chart,
  ChartConfiguration,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";
import ChartDownloadButton from "./download-button";
import MaximizeButton from "@/components/maximize-button";
import { formatCurrency } from "@/lib/csv-export";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CapexDistribution = () => {
  const { expenses } = useCalculations();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const { downloadChart } = useChartDownload();

  useEffect(() => {
    if (!chartRef.current || !expenses?.capex) return;

    // Cleanup existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const capex = expenses.capex;
    const total = capex.totalCapexCost;

    const otherDirectCostValue =
      capex.directFixedCapital.plantDirectCost.total -
      capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: "doughnut",
      data: {
        labels: [
          // Inner ring labels (main categories)
          "Direct Fixed Capital (DFC)",
          "Working Capital",
          "Startup Capital",
          // Outer ring labels (Direct Fixed Capital breakdown)
          "Equipment Purchase (DFC)",
          "Other Direct Cost (DFC)",
          "Plant Indirect Cost (DFC)",
          "Miscellaneous Cost (DFC)",
        ],
        datasets: [
          {
            label: "Main Categories",
            data: [
              capex.directFixedCapital.totalCapital,
              capex.workingCapital,
              capex.startupCapital,
            ],
            backgroundColor: ["#168aad", "#bc4749", "#dda15e"] as const,
            borderWidth: 2,
            borderColor: "#ffffff",
            hoverOffset: 6,
            weight: 1,
          },
          {
            label: "Direct Fixed Capital Details",
            data: [
              0,
              0,
              0, // Transparent placeholders for main categories
              capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost,
              otherDirectCostValue,
              capex.directFixedCapital.plantIndirectCost.total,
              capex.directFixedCapital.miscellaneousCost.total,
            ],
            backgroundColor: [
              "transparent",
              "transparent",
              "transparent",
              "#34a0a4",
              "#52b69a",
              "#76c893",
              "#99d98c",
            ] as const,
            borderWidth: 2,
            borderColor: "#ffffff",
            hoverOffset: 8,
            weight: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "40%",
        radius: "95%",
        layout: {
          padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
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
              usePointStyle: true,
              generateLabels: function (chart) {
                const data = chart.data;
                const datasets = data.datasets;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const labels = [];

                // Add main categories first
                datasets[0].data.forEach((value, index) => {
                  const percentage = (
                    ((value as number) / total) *
                    100
                  ).toFixed(1);
                  labels.push({
                    text: `${data.labels![index]} (${percentage}%)`,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    fillStyle: datasets[0].backgroundColor![index],
                    strokeStyle: datasets[0].borderColor,
                    lineWidth: datasets[0].borderWidth,
                    datasetIndex: 0,
                    index: index,
                  });
                });

                // Add Direct Fixed Capital breakdown after main categories
                datasets[1].data.slice(3).forEach((value, index) => {
                  const actualIndex = index + 3;
                  const percentage = (
                    ((value as number) /
                      capex.directFixedCapital.totalCapital) *
                    100
                  ).toFixed(1);
                  labels.push({
                    text: `${data.labels![actualIndex]} (${percentage}%)`,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    fillStyle: datasets[1].backgroundColor![actualIndex],
                    strokeStyle: datasets[1].borderColor,
                    lineWidth: datasets[1].borderWidth,
                    datasetIndex: 1,
                    index: actualIndex,
                  });
                });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                return labels;
              },
            },
          },
          tooltip: {
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              label: function (context) {
                const value = context.raw as number;
                if (value === 0) return null;

                const label = context.label || "";
                let percentage: string;

                if (context.datasetIndex === 0) {
                  percentage = ((value / total) * 100).toFixed(1);
                } else {
                  percentage = (
                    (value / capex.directFixedCapital.totalCapital) *
                    100
                  ).toFixed(1);
                }

                return `${label}: ${formatCurrency(value)} (${percentage}%)`;
              },
              filter: function (tooltipItem: { raw: number }) {
                return (tooltipItem.raw as number) > 0;
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
          <Title title={"CAPEX Distribution"} />
          <ChartDownloadButton
            downloadChart={downloadChart}
            chartInstance={chartInstance}
            filename='capex-nested-doughnut-chart.png'
          />
        </div>
        <MaximizeButton
          id={"capexDistribution"}
          title={"CAPEX Distribution Chart"}
        />
      </div>
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 relative' style={{ minHeight: "400px" }}>
          <canvas ref={chartRef} className='w-full h-full' />
        </div>
        <div className='mt-3 text-xs text-gray-600 text-center'>
          <div className='font-medium mb-1'>Chart Guide:</div>
          <div>
            Outer ring shows main CAPEX categories • Inner ring shows Direct
            Fixed Capital breakdown
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapexDistribution;
