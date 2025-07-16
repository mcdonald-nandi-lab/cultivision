"use client";

import { useEffect, useCallback } from "react";
import { CalculatedExpenses, OtherFacilityCostsSplit } from "@/types";

interface CategoryData {
  name: string;
  value: number;
  color: string;
  id: string;
  description: string;
  breakdown?: OtherFacilityCostsSplit;
}

interface CategoryInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryData: CategoryData | null;
  facilityCostsSplit?: CalculatedExpenses["chartData"]["otherFacilityCostsSplit"];
}

const CategoryInfoModal = ({
  isOpen,
  onClose,
  categoryData,
  facilityCostsSplit,
}: CategoryInfoModalProps) => {
  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const getFacilityBreakdown = useCallback(() => {
    if (!facilityCostsSplit) return [];

    return [
      {
        name: "Depreciation",
        value: facilityCostsSplit.depreciation,
      },
      {
        name: "Maintenance",
        value: facilityCostsSplit.maintenance,
      },
      {
        name: "Insurance",
        value: facilityCostsSplit.insurance,
      },
      {
        name: "Local Taxes",
        value: facilityCostsSplit.localTaxes,
      },
      {
        name: "Factory Expense",
        value: facilityCostsSplit.factoryExpense,
      },
    ];
  }, [facilityCostsSplit]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen || !categoryData) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 animate-in fade-in duration-200 rounded-lg'
      onClick={handleBackdropClick}
    >
      <div
        className='relative bg-white rounded-lg max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-3'>
              <div
                className='h-3 w-3 rounded-full'
                style={{ backgroundColor: categoryData.color }}
              />
              <h2 className='text-lg font-bold text-gray-900'>
                {categoryData.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer transition-colors'
              aria-label='Close modal'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          <div className='mb-6'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-md font-semibold text-gray-800'>
                Total Cost
              </span>
              <span className='text-md font-bold text-gray-900'>
                {formatCurrency(categoryData.value)}
              </span>
            </div>
            <div className='text-sm text-gray-600 leading-relaxed'>
              {categoryData.description}
            </div>
          </div>
          {categoryData.id === "facilityDependentCost" &&
            facilityCostsSplit && (
              <div>
                <h3 className='text-sm font-semibold text-gray-800 mb-4'>
                  Cost Breakdown
                </h3>
                <div className='space-y-2'>
                  {getFacilityBreakdown().map(
                    ({ name, value }) => (
                      <div
                        key={name}
                        className='text-sm border-l-4 border-gray-300 p-2 bg-gray-50 rounded-r-lg'
                      >
                        <div className='flex justify-between items-start mb-2'>
                          <h4 className='font-medium text-gray-900'>{name}</h4>
                          <span className='font-semibold text-gray-700'>
                            {formatCurrency(value)}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CategoryInfoModal;
