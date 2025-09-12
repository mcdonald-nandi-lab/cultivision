"use client";

import { useToast } from "@/context/toast";
import cn from "classnames";
import { JSX } from "react";

type NotificationType = "success" | "error" | "info";

type IconMapping = Record<NotificationType, JSX.Element>;

const typeToBgColor: Record<NotificationType, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const typeToIcon: IconMapping = {
  success: (
    <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
      <path
        fillRule='evenodd'
        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
        clipRule='evenodd'
      />
    </svg>
  ),
  error: (
    <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
      <path
        fillRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
        clipRule='evenodd'
      />
    </svg>
  ),
  info: (
    <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
      <path
        fillRule='evenodd'
        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z'
        clipRule='evenodd'
      />
    </svg>
  ),
};

const Toast = () => {
  const { toastMessage, toastType, showToast, deactivateToast } = useToast();

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 transform transition-all duration-300",
        {
          "translate-y-0 opacity-100": showToast,
        },
        { "translate-y-12 opacity-0": !showToast }
      )}
      role='status'
      aria-live='polite'
    >
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg ${typeToBgColor[toastType]}`}
      >
        <div className='flex-shrink-0'>{typeToIcon[toastType]}</div>
        <div className='ml-3 text-white font-medium'>{toastMessage}</div>
        <button
          type='button'
          className='ml-5 bg-transparent text-white focus:outline-none cursor-pointer'
          onClick={deactivateToast}
        >
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
