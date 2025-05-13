import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { Chart } from "chart.js";

type ChartDownloadButtonProps = {
  downloadChart: (
    chartRef: React.RefObject<Chart | null>,
    filename: string
  ) => void;
  chartInstance: React.RefObject<Chart | null>;
  filename: string;
};

const ChartDownloadButton = ({
  downloadChart,
  chartInstance,
  filename,
}: ChartDownloadButtonProps) => {
  const label = filename.replace(/[-_]/g, " ").replace(/\.[^/.]+$/, "");
  const tooltipText = `Download ${label} as PNG`;

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <button
            type='button'
            onClick={() => downloadChart(chartInstance, filename)}
            className='inline-flex items-center p-1 text-gray-400 focus:outline-none rounded-md cursor-pointer border border-solid border-gray-200 hover:bg-gray-100'
            aria-label={tooltipText}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
              role='img'
              aria-hidden='true'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='7 10 12 15 17 10' />
              <line x1='12' y1='15' x2='12' y2='3' />
            </svg>
          </button>
        </RadixTooltip.Trigger>
        <RadixTooltip.Content
          side='top'
          sideOffset={6}
          className='bg-black text-white px-2 py-1 rounded text-xs shadow-sm z-50'
        >
          {tooltipText}
          <RadixTooltip.Arrow className='fill-black' />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default ChartDownloadButton;
