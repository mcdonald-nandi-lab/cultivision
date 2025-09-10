"use client";

import { MaximizeIdTypes, useMaximize } from "@/context/maximize-context";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import cn from "classnames";


interface MaximizeButtonProps {
  id: MaximizeIdTypes;
  title: string;
}

const MaximizeButton = ({
  id,
  title,
}: MaximizeButtonProps) => {
  const { isMaxModalOpen, openMaxModal } = useMaximize();

  const tooltipText = `Maximize ${title ?? "Screen"}`;
  return (
    <>
      {!isMaxModalOpen && (
        <RadixTooltip.Provider>
          <RadixTooltip.Root>
            <RadixTooltip.Trigger asChild>
              <div
                className={cn("cursor-pointer text-gray-600 hover:text-green-600")}
                onClick={() => openMaxModal(id)}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18 6l-2.12 2.12-1.41-1.41L16.59 4.59H14V3h6v6h-1.59v-2.59z'
                    fill='currentColor'
                  />
                  <path
                    d='M6 6l2.12 2.12 1.41-1.41L7.41 4.59H10V3H4v6h1.59V6.41z'
                    fill='currentColor'
                  />
                  <path
                    d='M18 18l-2.12-2.12-1.41 1.41 2.12 2.12H14V21h6v-6h-1.59v2.59z'
                    fill='currentColor'
                  />
                  <path
                    d='M6 18l2.12-2.12 1.41 1.41-2.12 2.12H10V21H4v-6h1.59v2.59z'
                    fill='currentColor'
                  />
                </svg>
              </div>
            </RadixTooltip.Trigger>
            <RadixTooltip.Content
              side='top'
              sideOffset={6}
              className='bg-white text-gray-600 px-2 py-1 rounded-md text-xs shadow-md border border-gray-200 z-50'
            >
              {tooltipText}
              <RadixTooltip.Arrow className='fill-white' />
            </RadixTooltip.Content>
          </RadixTooltip.Root>
        </RadixTooltip.Provider>
      )}
    </>
  );
};

export default MaximizeButton;
