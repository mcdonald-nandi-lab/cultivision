"use client";

import TableDownloadButton from "@/components/bioreactor/tables/download-button";
import { InfoModal } from "@/components/info-modal";
import Title from "@/components/title";
import { useCalculations } from "@/context/calculation-context";
import { BRAND_COLORS } from "@/lib/constants";
import { OtherFacilityCostsSplit } from "@/types";
import { useMemo, useState } from "react";

interface CategoryData {
  name: string;
  value: number;
  color: string;
  id: string;
  description: string;
  breakdown?: OtherFacilityCostsSplit;
}

type CategoryKeys = "labor" | "utilities" | "facilityDependentCost";

interface CategoryInfoProps {
  categoryData: CategoryData;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CategoryInfo = ({
  categoryData,
}: CategoryInfoProps) => {
  const { expenses } = useCalculations();
  const data = expenses!.chartData

  const categoryValueDict = {
    labor: [
      {
        name: "Upstream Operator",
        value: expenses?.laborCostValues.updatedCosts.upstream,
      },
      {
        name: "Operator",
        value: expenses?.laborCostValues.updatedCosts.main,
      },
      {
        name: "Downstream Operator",
        value: expenses?.laborCostValues.updatedCosts.downstream,
      },
    ],
    utilities: [
      {
        name: "Power",
        value: data.utilities.power,
      },
      {
        name: "Steam",
        value: data.utilities.steam,
      },
      {
        name: "Cooling Water",
        value: data.utilities.coolingWater,
      },
      {
        name: "Chilled Water",
        value: data.utilities.chilledWater,
      },
    ],
    facilityDependentCost: [
      {
        name: "Depreciation",
        value: data.otherFacilityCostsSplit.depreciation,
      },
      {
        name: "Maintenance",
        value: data.otherFacilityCostsSplit.maintenance,
      },
      {
        name: "Insurance",
        value: data.otherFacilityCostsSplit.insurance,
      },
      {
        name: "Local Taxes",
        value: data.otherFacilityCostsSplit.localTaxes,
      },
      {
        name: "Factory Expense",
        value: data.otherFacilityCostsSplit.factoryExpense,
      },
    ],
  };

  return (
    <>
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-3'>
            <div
              className='h-3 w-3 rounded-full'
              style={{ backgroundColor: categoryData.color }}
            />
            <h2 className='text-lg font-bold text-gray-900'>
              {categoryData.name}
            </h2>
          </div>
          <span className='text-md font-bold text-gray-900'>
            {formatCurrency(categoryData.value)}
          </span>
        </div>
        <div className='text-sm text-gray-600 leading-relaxed'>
          {categoryData.description}
        </div>
      </div>
      {categoryData.id in categoryValueDict &&
        categoryValueDict[categoryData.id as CategoryKeys] && (
          <div>
            <h3 className='text-sm font-semibold text-gray-800 mb-4'>
              Cost Breakdown
            </h3>
            <div className='space-y-2'>
              {categoryValueDict[categoryData.id as CategoryKeys].map(
                ({ name, value }) => (
                  <div
                    key={name}
                    className='text-sm border-l-4 border-gray-300 p-2 bg-gray-50 rounded-r-lg'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <h4 className='font-medium text-gray-900'>{name}</h4>
                      <span className='font-semibold text-gray-700'>
                        {formatCurrency(value ?? 0)}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </>
  );
};

const ExpenseTable = () => {
  const { expenses } = useCalculations();
  const chartData = expenses!.chartData;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const expenseItems = useMemo(
    () => [
      {
        name: "Media",
        value: chartData.media,
        color: BRAND_COLORS.media,
        id: "media",
        description:
          "Culture media and growth medium required for cell cultivation, including nutrients, vitamins, and growth factors essential for optimal cell growth and product formation.",
      },
      {
        name: "Other Raw Materials",
        value: chartData.otherMaterials,
        color: BRAND_COLORS.rawMaterials,
        id: "otherRawMaterials",
        description:
          "Additional raw materials used in production including buffers, chemicals, reagents, and process-related consumables required for upstream and downstream processing.",
      },
      {
        name: "Labor",
        value: chartData.labor,
        color: BRAND_COLORS.labor,
        id: "labor",
        description:
          "Direct labor costs including operators, technicians, and personnel involved in upstream processing, downstream processing, and overall facility operations.",
      },
      {
        name: "Waste Treatment",
        value: chartData.waste,
        color: BRAND_COLORS.waste,
        id: "wasteTreatment",
        description:
          "Costs associated with treating and disposing of waste streams, including wastewater treatment, solid waste disposal, and environmental compliance measures.",
      },
      {
        name: "Facility Dependent Cost",
        value: chartData.facility,
        color: BRAND_COLORS.facility,
        id: "facilityDependentCost",
        description:
          "Fixed costs related to facility operations including depreciation, maintenance, insurance, taxes, and factory overhead expenses.",
      },
      {
        name: "Consumables",
        value: chartData.consumables,
        color: BRAND_COLORS.consumables,
        id: "consumables",
        description:
          "Single-use items and disposable materials such as filters, tubing, bags, disposable bioreactors, and other process consumables required for sterile operations.",
      },
      {
        name: "Utilities",
        value: chartData.utilities.total,
        color: BRAND_COLORS.utilities,
        id: "utilities",
        description:
          "Energy and utility costs including electricity for equipment operation, steam for sterilization, cooling water for temperature control, and chilled water for process cooling.",
      },
    ],
    [chartData]
  );

  const sortedExpenseItems = useMemo(() => {
    return [...expenseItems].sort((a, b) => b.value - a.value);
  }, [expenseItems]);

  const total = useMemo(() => {
    return expenseItems.reduce((sum, item) => sum + item.value, 0);
  }, [expenseItems]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleInfoClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const selectedCategoryData = useMemo(() => {
    return expenseItems.find((item) => item.id === selectedCategory) || null;
  }, [expenseItems, selectedCategory]);

  return (
    <>
      <div className='h-full flex flex-col pb-2'>
        <div className='flex items-center justify-start gap-x-2 mb-4'>
          <Title title='Cost Breakdown' />
          <TableDownloadButton
            filename='expense-breakdown.csv'
            headers={["Category", "Cost", "Percentage"]}
            rows={[
              ...sortedExpenseItems.map((item) => [
                item.name,
                formatCurrency(item.value),
                ((item.value / total) * 100).toFixed(1) + "%",
              ]),
              ["Total", formatCurrency(total), "100%"],
            ]}
          />
        </div>

        <div className='overflow-scroll border border-gray-200 rounded-lg h-full'>
          <table
            className='min-w-full divide-y divide-gray-200 h-full'
            aria-label='Table showing detailed cost breakdown by category, cost in dollars, and percentage'
          >
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Category
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center'
                >
                  Cost
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {sortedExpenseItems.map(({ id, color, name, value }) => (
                <tr
                  key={id}
                  className='hover:bg-gray-50 cursor-pointer'
                  onClick={() => handleInfoClick(id)}
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-x-2'>
                      <div
                        className='h-3 w-3 rounded-full'
                        style={{ backgroundColor: color }}
                      />
                      <div className='text-sm font-medium text-gray-900'>
                        {name}
                      </div>
                      <button
                        className='text-gray-400 hover:text-blue-600 cursor-pointer transition-colors'
                        aria-label={`More information about ${name}`}
                      >
                        <svg
                          width='10'
                          height='10'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='font-bold'
                        >
                          <circle
                            cx='12'
                            cy='12'
                            r='10'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <line
                            x1='12'
                            y1='16'
                            x2='12'
                            y2='12'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <circle cx='12' cy='9' r='1' fill='currentColor' />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium'>
                    {formatCurrency(value)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900'>
                    {((value / total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
              <tr className='bg-gray-50 max-h-12'>
                <td className='px-6 py-2 whitespace-nowrap'>
                  <div className='text-sm font-bold text-gray-900'>Total</div>
                </td>
                <td className='px-6 whitespace-nowrap text-right text-sm text-gray-900 font-bold'>
                  {formatCurrency(total)}
                </td>
                <td className='px-6 whitespace-nowrap text-right text-sm text-gray-900 font-bold'>
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <InfoModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CategoryInfo categoryData={selectedCategoryData!} />
      </InfoModal>
    </>
  );
};

export default ExpenseTable;
