// src/lib/csvExport.ts

import { CalculatedExpenses } from "@/types";
import { Bioreactor } from "@/types";

export function exportToCsv(
  expenses: CalculatedExpenses,
  bioreactor: Bioreactor
): void {
  if (!expenses || !bioreactor) return;

  const getTotalExpense = () => {
    const chartData = expenses.chartData;
    return (
      chartData.facility +
      chartData.media +
      chartData.otherMaterials +
      chartData.utilities +
      chartData.labor +
      chartData.waste +
      chartData.consumables
    );
  };

  const totalExpense = getTotalExpense();

  const chartData = expenses.chartData;
  const expenseRows = [
    ["Category", "Cost ($)", "Percentage (%)"],
    [
      "Facility Dependent Cost",
      chartData.facility.toFixed(2),
      ((chartData.facility / totalExpense) * 100).toFixed(1),
    ],
    [
      "Media",
      chartData.media.toFixed(2),
      ((chartData.media / totalExpense) * 100).toFixed(1),
    ],
    [
      "Other Raw Materials",
      chartData.otherMaterials.toFixed(2),
      ((chartData.otherMaterials / totalExpense) * 100).toFixed(1),
    ],
    [
      "Utilities",
      chartData.utilities.toFixed(2),
      ((chartData.utilities / totalExpense) * 100).toFixed(1),
    ],
    [
      "Labor",
      chartData.labor.toFixed(2),
      ((chartData.labor / totalExpense) * 100).toFixed(1),
    ],
    [
      "Waste Treatment",
      chartData.waste.toFixed(2),
      ((chartData.waste / totalExpense) * 100).toFixed(1),
    ],
    [
      "Consumables",
      chartData.consumables.toFixed(2),
      ((chartData.consumables / totalExpense) * 100).toFixed(1),
    ],
    ["Total", totalExpense.toFixed(2), "100.0"],
  ];

  const metricsRows = [
    ["Metric", "Value", "Unit"],
    ["Annual Production", expenses.annualProduction, "kg/yr"],
    [
      "Facilities Needed for 100M kg/yr",
      expenses.facilitiesNeeded.toFixed(0),
      "facilities",
    ],
    ["Capital Expenses", expenses.capitalExpenses.toFixed(1), "million USD"],
    [
      "Operating Expenses",
      expenses.operatingExpenses.toFixed(1),
      "million USD/yr",
    ],
    [
      "COGS (with Depreciation)",
      expenses.cogsWithDepreciation.toFixed(2),
      "USD/kg",
    ],
    [
      "COGS (without Depreciation)",
      expenses.cogsWithoutDepreciation.toFixed(2),
      "USD/kg",
    ],
  ];

  const csvContent = [
    [`"Bioreactor: ${bioreactor.name.toString()}"`, "", ""],
    ["", "", ""],
    ["EXPENSE BREAKDOWN", "", ""],
    ...expenseRows,
    ["", "", ""],
    ["PERFORMANCE METRICS", "", ""],
    ...metricsRows,
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${bioreactor.name.replace(/\s+/g, "_")}_Expense_Report.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
