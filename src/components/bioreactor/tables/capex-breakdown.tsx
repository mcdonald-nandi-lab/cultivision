"use client";

import TableDownloadButton from "@/components/bioreactor/tables/download-button";
import { InfoModal } from "@/components/info-modal";
import MaximizeButton from "@/components/maximize-button";
import Title from "@/components/title";
import { useCalculations } from "@/context/calculation-context";
import { CAPEX_COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/csv-export";
import cn from "classnames";
import { useMemo, useState } from "react";

interface CategoryData {
  name: string;
  value: number;
  color: string;
  id: string;
  description: string;
}

interface CategoryInfoProps {
  categoryData: CategoryData;
}

const CategoryInfo = ({ categoryData }: CategoryInfoProps) => {
  const { expenses } = useCalculations();
  const capex = expenses!.capex;

  console.log("Category Data", categoryData);

  const categoryValueDict = {
    otherDirectCost: [
      {
        name: "Installation",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost.installation,
      },
      {
        name: "Process Piping",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost
            .processPiping,
      },
      {
        name: "Instrumentation",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost
            .instrumentation,
      },
      {
        name: "Insulation",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost.insulation,
      },
      {
        name: "Electrical",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost.electrical,
      },
      {
        name: "Buildings",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost.buildings,
      },
      {
        name: "Yard Improvement",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost
            .yardImprovement,
      },
      {
        name: "Auxiliary Facilities",
        value:
          capex.directFixedCapital.plantDirectCost.otherDirectCost
            .auxiliaryFacilities,
      },
    ],
    plantIndirectCost: [
      {
        name: "Engineering",
        value: capex.directFixedCapital.plantIndirectCost.engineering,
      },
      {
        name: "Construction",
        value: capex.directFixedCapital.plantIndirectCost.construction,
      },
    ],
    miscellaneousCost: [
      {
        name: "Contractor Fee",
        value: capex.directFixedCapital.miscellaneousCost.contractorFee,
      },
      {
        name: "Contingency",
        value: capex.directFixedCapital.miscellaneousCost.contingency,
      },
    ],
  };

  const generateCategoryCSV = () => {
    if (!(categoryData.id in categoryValueDict)) {
      return {
        headers: ["Category", "Total Cost"],
        rows: [[categoryData.name, formatCurrency(categoryData.value)]],
      };
    }

    const breakdown =
      categoryValueDict[categoryData.id as keyof typeof categoryValueDict];
    const headers = ["Item", "Cost", "Percentage"];
    const rows = breakdown.map(({ name, value }) => [
      name,
      formatCurrency(value ?? 0),
      `${(((value ?? 0) / categoryData.value) * 100).toFixed(1)}%`,
    ]);

    rows.push(["Total", formatCurrency(categoryData.value), "100.0%"]);

    return { headers, rows };
  };

  const csvData = generateCategoryCSV();

  const isWithValidID =
    categoryData.id in categoryValueDict &&
    categoryValueDict[categoryData.id as keyof typeof categoryValueDict];

  return (
    <>
      <div className='mb-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 mb-4'>
          <div className='flex items-center gap-3'>
            <div
              className='h-3 w-3 rounded-full'
              style={{ backgroundColor: categoryData.color }}
            />
            <h2 className='text-lg font-bold text-gray-900'>
              {categoryData.name}
            </h2>
            {isWithValidID && (
              <TableDownloadButton
                filename={`${categoryData.name.replace(
                  /\s+/g,
                  "_"
                )}_breakdown.csv`}
                headers={csvData.headers}
                rows={csvData.rows}
              />
            )}
          </div>
          <span className='text-md font-bold text-gray-900'>
            {formatCurrency(categoryData.value)}
          </span>
        </div>
        <div className='text-sm text-gray-600 leading-relaxed'>
          {categoryData.description}
        </div>
      </div>
      {isWithValidID && (
        <div>
          <h3 className='text-sm font-semibold text-gray-800 mb-4'>
            Cost Breakdown
          </h3>
          <div className='space-y-2'>
            {categoryValueDict[
              categoryData.id as keyof typeof categoryValueDict
            ].map(({ name, value }) => (
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
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const CapexBreakdownTable = () => {
  const { expenses } = useCalculations();
  const capex = expenses!.capex;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Calculate other direct cost value
  const otherDirectCostValue =
    capex.directFixedCapital.plantDirectCost.total -
    capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost;

  const capexItems = useMemo(
    () => [
      {
        name: "Direct Fixed Capital (DFC)",
        value: capex.directFixedCapital.totalCapital,
        color: CAPEX_COLORS.directFixedCapital,
        id: "directFixedCapital",
        description:
          "Total direct fixed capital including plant direct costs, indirect costs, and miscellaneous project costs.",
        isParent: true,
        level: 0,
      },
      {
        name: "Equipment Purchase Cost (DFC)",
        value: capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost,
        color: CAPEX_COLORS.equipmentPurchaseCost,
        id: "equipmentPurchaseCost",
        description:
          "Cost of purchasing major equipment including bioreactors, pumps, heat exchangers, and other process equipment.",
        isParent: false,
        level: 2,
      },
      {
        name: "Other Direct Cost (DFC)",
        value: otherDirectCostValue,
        color: CAPEX_COLORS.otherDirectCost,
        id: "otherDirectCost",
        description:
          "Installation, piping, instrumentation, electrical, buildings, and other direct construction costs.",
        isParent: false,
        level: 2,
      },
      {
        name: "Plant Indirect Cost (DFC)",
        value: capex.directFixedCapital.plantIndirectCost.total,
        color: CAPEX_COLORS.plantIndirectCost,
        id: "plantIndirectCost",
        description:
          "Engineering design, project management, and construction supervision services.",
        isParent: false,
        level: 1,
      },
      {
        name: "Miscellaneous Cost (DFC)",
        value: capex.directFixedCapital.miscellaneousCost.total,
        color: CAPEX_COLORS.miscellaneousCost,
        id: "miscellaneousCost",
        description:
          "Contractor fees and contingency funds for project uncertainties and scope changes.",
        isParent: false,
        level: 1,
      },
      {
        name: "Startup Capital",
        value: capex.startupCapital,
        color: CAPEX_COLORS.startupCapital,
        id: "startupCapital",
        description:
          "Capital for commissioning, testing, training, and achieving steady-state production.",
        isParent: false,
        level: 0,
      },
      {
        name: "Working Capital",
        value: capex.workingCapital,
        color: CAPEX_COLORS.workingCapital,
        id: "workingCapital",
        description:
          "Capital for day-to-day operations including inventory, accounts receivable, and operational cash needs.",
        isParent: false,
        level: 0,
      },
    ],
    [capex, otherDirectCostValue]
  );

  const total = capex.totalCapexCost;

  const handleInfoClick = (categoryId: string, isParent: boolean) => {
    if (!isParent) {
      setSelectedCategory(categoryId);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const selectedCategoryData = useMemo(() => {
    return capexItems.find((item) => item.id === selectedCategory) || null;
  }, [capexItems, selectedCategory]);

  return (
    <>
      <div className='h-full flex flex-col pb-2'>
        <div className='flex items-center justify-between gap-x-4 mb-4'>
          <div className='flex items-center justify-start gap-x-2'>
            <Title title='CAPEX Breakdown' />
            <TableDownloadButton
              filename='capex-breakdown.csv'
              headers={["Category", "Cost", "Percentage"]}
              rows={[
                ...capexItems.map((item) => [
                  item.name.replace(/[├└│]/g, "").trim(),
                  formatCurrency(item.value),
                  ((item.value / total) * 100).toFixed(1) + "%",
                ]),
                ["Total", formatCurrency(total), "100%"],
              ]}
            />
          </div>
          <MaximizeButton id={"capexBreakdownTable"} title={"CAPEX Table"} />
        </div>

        <div className='overflow-scroll border border-gray-200 rounded-lg h-full'>
          <table
            className='min-w-full divide-y divide-gray-200 h-full'
            aria-label='Table showing hierarchical CAPEX breakdown by category, cost in dollars, and percentage'
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
              {capexItems.map(({ id, color, name, value, isParent, level }) => (
                <tr
                  key={id}
                  className={cn(
                    { "hover:bg-gray-50 cursor-pointer": !isParent },
                    { "bg-gray-25": level > 0 }
                  )}
                  onClick={() => handleInfoClick(id, isParent)}
                >
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-x-2'>
                      <div
                        className='h-3 w-3 rounded-full'
                        style={{ backgroundColor: color }}
                      />
                      <div
                        className={cn(
                          `text-sm`,
                          { "italic text-gray-700": level > 0 },
                          { "font-medium text-gray-900": level <= 0 }
                        )}
                      >
                        {name}
                      </div>
                      {!isParent && (
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
                      )}
                    </div>
                  </td>
                  <td
                    className={cn(
                      `px-6 py-4 whitespace-nowrap text-right text-sm`,
                      { "italic text-gray-700": level > 0 },
                      { "font-medium text-gray-900": level <= 0 }
                    )}
                  >
                    {formatCurrency(value)}
                  </td>
                  <td
                    className={cn(
                      `px-6 py-4 whitespace-nowrap text-right text-sm`,
                      { "italic text-gray-700": level > 0 },
                      { "font-medium text-gray-900": level <= 0 }
                    )}
                  >
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
        {selectedCategoryData && (
          <CategoryInfo categoryData={selectedCategoryData!} />
        )}
      </InfoModal>
    </>
  );
};

export default CapexBreakdownTable;
