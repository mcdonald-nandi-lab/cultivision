"use client"

import { RefObject } from "react";
import { Chart } from "chart.js";

const useChartDownload = () => {
  const downloadChart = (
    chartRef: RefObject<Chart | null>,
    filename = "chart.png",
    useBlob = false
  ) => {
    const chart = chartRef.current;
    if (!chart) return;

    const canvas = chart.canvas;

    if (useBlob && canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      });
    } else {
      const link = document.createElement("a");
      link.href = chart.toBase64Image();
      link.download = filename;
      link.click();
    }
  };

  return { downloadChart };
};

export default useChartDownload;
