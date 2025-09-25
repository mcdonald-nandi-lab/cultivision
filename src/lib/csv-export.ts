import { CalculatedExpenses, ProductionCosts } from "@/types";
import { Bioreactor } from "@/types";
import { DEFAULT_PRODUCTION_COSTS } from "@/lib/data";
import { saveAs } from "file-saver";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (num: number, fixed = 1): string => {
  return num.toLocaleString(undefined, { maximumFractionDigits: fixed });
};

export function exportToCsv(
  expenses: CalculatedExpenses,
  bioreactor: Bioreactor,
  doublingTime: string,
  density: string,
  costs: ProductionCosts,
  triggerDownload = true
): string | void {
  if (!expenses || !bioreactor) return;

  const getTotalExpense = () => {
    const chartData = expenses.chartData;
    return (
      chartData.facility +
      chartData.media +
      chartData.otherMaterials +
      chartData.utilities.total +
      chartData.labor +
      chartData.waste +
      chartData.consumables
    );
  };

  const totalExpense = getTotalExpense();
  const capex = expenses.capex;
  const capexTotal = capex.totalCapexCost;

  const otherDirectCostValue =
    capex.directFixedCapital.plantDirectCost.total -
    capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost;

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  const dateTimeString = now.toLocaleDateString("en-US", options);


  const csvSections = [
    [`Bioreactor Analysis Report: ${bioreactor.name}`],
    [""],
    [`Generated: ${dateTimeString}`],
    ["@"],
    ["Cultivision - UC Davis"],
    ["https://mcdonald-nandi-lab.github.io/cultivision/"],
    [""],
    [
      `CONFIGURATION: ${doublingTime.replace(
        "h",
        ""
      )}h Doubling Time, ${density.replace(
        "gpl",
        ""
      )} g/L Cell Harvest Density`,
    ],
    [""],
    ["EXECUTIVE SUMMARY"],
    [
      "Metric",
      "Single Facility",
      `${expenses.facilitiesNeeded} Facilities`,
      "Unit",
    ],
    [
      "Annual Production",
      formatNumber(expenses.annualProduction, 2),
      formatNumber(expenses.annualProduction * expenses.facilitiesNeeded, 2),
      "kg/yr",
    ],
    [
      "Capital Expenses",
      formatNumber(expenses.capitalExpenses),
      formatNumber(expenses.capitalExpenses * expenses.facilitiesNeeded),
      "million $",
    ],
    [
      "Operating Expenses",
      formatNumber(expenses.operatingExpenses),
      formatNumber(expenses.operatingExpenses * expenses.facilitiesNeeded),
      "million $/yr",
    ],
    [
      "COGS (with Depreciation)",
      expenses.cogsWithDepreciation.toFixed(2),
      expenses.cogsWithDepreciation.toFixed(2),
      "$/kg",
    ],
    [
      "COGS (without Depreciation)",
      expenses.cogsWithoutDepreciation.toFixed(2),
      expenses.cogsWithoutDepreciation.toFixed(2),
      "$/kg",
    ],
    [
      "Minimum Selling Price",
      expenses.minimumSellingPrice.toFixed(2),
      expenses.minimumSellingPrice.toFixed(2),
      "$/kg",
    ],
    [""],

    ["OPEX BREAKDOWN"],
    ["Category", "Cost ($)", "Percentage (%)"],
    [
      "Media",
      expenses.chartData.media.toFixed(2),
      ((expenses.chartData.media / totalExpense) * 100).toFixed(1),
    ],
    [
      "Other Raw Materials",
      expenses.chartData.otherMaterials.toFixed(2),
      ((expenses.chartData.otherMaterials / totalExpense) * 100).toFixed(1),
    ],
    [
      "Labor",
      expenses.chartData.labor.toFixed(2),
      ((expenses.chartData.labor / totalExpense) * 100).toFixed(1),
    ],
    [
      "Waste Treatment",
      expenses.chartData.waste.toFixed(2),
      ((expenses.chartData.waste / totalExpense) * 100).toFixed(1),
    ],
    [
      "Facility Dependent Cost",
      expenses.chartData.facility.toFixed(2),
      ((expenses.chartData.facility / totalExpense) * 100).toFixed(1),
    ],
    [
      "Consumables",
      expenses.chartData.consumables.toFixed(2),
      ((expenses.chartData.consumables / totalExpense) * 100).toFixed(1),
    ],
    [
      "Utilities Total",
      expenses.chartData.utilities.total.toFixed(2),
      ((expenses.chartData.utilities.total / totalExpense) * 100).toFixed(1),
    ],
    ["Total OPEX", totalExpense.toFixed(2), "100.0"],
    [""],

    ["UTILITIES BREAKDOWN"],
    ["Utility Type", "Cost ($)", "Percentage of Utilities (%)"],
    [
      "Power",
      expenses.chartData.utilities.power.toFixed(2),
      (
        (expenses.chartData.utilities.power /
          expenses.chartData.utilities.total) *
        100
      ).toFixed(1),
    ],
    [
      "Steam",
      expenses.chartData.utilities.steam.toFixed(2),
      (
        (expenses.chartData.utilities.steam /
          expenses.chartData.utilities.total) *
        100
      ).toFixed(1),
    ],
    [
      "Cooling Water",
      expenses.chartData.utilities.coolingWater.toFixed(2),
      (
        (expenses.chartData.utilities.coolingWater /
          expenses.chartData.utilities.total) *
        100
      ).toFixed(1),
    ],
    [
      "Chilled Water",
      expenses.chartData.utilities.chilledWater.toFixed(2),
      (
        (expenses.chartData.utilities.chilledWater /
          expenses.chartData.utilities.total) *
        100
      ).toFixed(1),
    ],
    ["Total Utilities", expenses.chartData.utilities.total.toFixed(2), "100.0"],
    [""],

    ["FACILITY COST BREAKDOWN"],
    ["Cost Type", "Cost ($)", "Percentage of Facility (%)"],
    [
      "Depreciation",
      expenses.chartData.otherFacilityCostsSplit.depreciation.toFixed(2),
      (
        (expenses.chartData.otherFacilityCostsSplit.depreciation /
          expenses.chartData.facility) *
        100
      ).toFixed(1),
    ],
    [
      "Maintenance",
      expenses.chartData.otherFacilityCostsSplit.maintenance.toFixed(2),
      (
        (expenses.chartData.otherFacilityCostsSplit.maintenance /
          expenses.chartData.facility) *
        100
      ).toFixed(1),
    ],
    [
      "Insurance",
      expenses.chartData.otherFacilityCostsSplit.insurance.toFixed(2),
      (
        (expenses.chartData.otherFacilityCostsSplit.insurance /
          expenses.chartData.facility) *
        100
      ).toFixed(1),
    ],
    [
      "Local Taxes",
      expenses.chartData.otherFacilityCostsSplit.localTaxes.toFixed(2),
      (
        (expenses.chartData.otherFacilityCostsSplit.localTaxes /
          expenses.chartData.facility) *
        100
      ).toFixed(1),
    ],
    [
      "Factory Expense",
      expenses.chartData.otherFacilityCostsSplit.factoryExpense.toFixed(2),
      (
        (expenses.chartData.otherFacilityCostsSplit.factoryExpense /
          expenses.chartData.facility) *
        100
      ).toFixed(1),
    ],
    ["Total Facility Cost", expenses.chartData.facility.toFixed(2), "100.0"],
    [""],

    ["CAPEX BREAKDOWN"],
    ["Category", "Cost", "Percentage"],
    [
      "Direct Fixed Capital (DFC)",
      formatCurrency(capex.directFixedCapital.totalCapital),
      ((capex.directFixedCapital.totalCapital / capexTotal) * 100).toFixed(1) +
        "%",
    ],
    [
      "  Equipment Purchase Cost (DFC)",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost
      ),
      (
        (capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost /
          capexTotal) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "  Other Direct Cost (DFC)",
      formatCurrency(otherDirectCostValue),
      ((otherDirectCostValue / capexTotal) * 100).toFixed(1) + "%",
    ],
    [
      "  Plant Indirect Cost (DFC)",
      formatCurrency(capex.directFixedCapital.plantIndirectCost.total),
      (
        (capex.directFixedCapital.plantIndirectCost.total / capexTotal) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "  Miscellaneous Cost (DFC)",
      formatCurrency(capex.directFixedCapital.miscellaneousCost.total),
      (
        (capex.directFixedCapital.miscellaneousCost.total / capexTotal) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Startup Capital",
      formatCurrency(capex.startupCapital),
      ((capex.startupCapital / capexTotal) * 100).toFixed(1) + "%",
    ],
    [
      "Working Capital",
      formatCurrency(capex.workingCapital),
      ((capex.workingCapital / capexTotal) * 100).toFixed(1) + "%",
    ],
    ["Total CAPEX", formatCurrency(capexTotal), "100%"],
    [""],

    ["OTHER DIRECT COST DETAILS"],
    ["Cost Item", "Cost", "Percentage of Other Direct"],
    [
      "Installation",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost.installation
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost.installation /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Process Piping",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost.processPiping
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost
          .processPiping /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Instrumentation",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost.instrumentation
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost
          .instrumentation /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Insulation",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost.insulation
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost.insulation /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Electrical",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost.electrical
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost.electrical /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Buildings",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost.buildings
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost.buildings /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Yard Improvement",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost.yardImprovement
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost
          .yardImprovement /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Auxiliary Facilities",
      formatCurrency(
        capex.directFixedCapital.plantDirectCost.otherDirectCost
          .auxiliaryFacilities
      ),
      (
        (capex.directFixedCapital.plantDirectCost.otherDirectCost
          .auxiliaryFacilities /
          otherDirectCostValue) *
        100
      ).toFixed(1) + "%",
    ],
    ["Total Other Direct Cost", formatCurrency(otherDirectCostValue), "100%"],
    [""],

    ["PLANT INDIRECT COST DETAILS"],
    ["Cost Item", "Cost", "Percentage of Plant Indirect"],
    [
      "Engineering",
      formatCurrency(capex.directFixedCapital.plantIndirectCost.engineering),
      (
        (capex.directFixedCapital.plantIndirectCost.engineering /
          capex.directFixedCapital.plantIndirectCost.total) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Construction",
      formatCurrency(capex.directFixedCapital.plantIndirectCost.construction),
      (
        (capex.directFixedCapital.plantIndirectCost.construction /
          capex.directFixedCapital.plantIndirectCost.total) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Total Plant Indirect Cost",
      formatCurrency(capex.directFixedCapital.plantIndirectCost.total),
      "100%",
    ],
    [""],

    ["MISCELLANEOUS COST DETAILS"],
    ["Cost Item", "Cost", "Percentage of Miscellaneous"],
    [
      "Contractor Fee",
      formatCurrency(capex.directFixedCapital.miscellaneousCost.contractorFee),
      (
        (capex.directFixedCapital.miscellaneousCost.contractorFee /
          capex.directFixedCapital.miscellaneousCost.total) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Contingency",
      formatCurrency(capex.directFixedCapital.miscellaneousCost.contingency),
      (
        (capex.directFixedCapital.miscellaneousCost.contingency /
          capex.directFixedCapital.miscellaneousCost.total) *
        100
      ).toFixed(1) + "%",
    ],
    [
      "Total Miscellaneous Cost",
      formatCurrency(capex.directFixedCapital.miscellaneousCost.total),
      "100%",
    ],
    [""],

    ["LABOR COST ANALYSIS"],
    [
      "Values",
      "USP Operator ($/hr)",
      "Operator ($/hr)",
      "DSP Operator ($/hr)",
      "Total Annual Cost",
    ],
    [
      "Default",
      DEFAULT_PRODUCTION_COSTS.uspLaborCostPerHour,
      DEFAULT_PRODUCTION_COSTS.mainLaborCostPerHour,
      DEFAULT_PRODUCTION_COSTS.dspLaborCostPerHour,
      `$${expenses.laborCostValues.baseCosts.totalCost.toLocaleString(
        undefined,
        { maximumFractionDigits: 1 }
      )}`,
    ],
    [
      "Updated",
      expenses.laborCostValues.updatedCosts.uspLaborCostPerHour,
      DEFAULT_PRODUCTION_COSTS.mainLaborCostPerHour,
      expenses.laborCostValues.updatedCosts.dspLaborCostPerHour,
      `$${expenses.laborCostValues.updatedCosts.totalCost.toLocaleString(
        undefined,
        { maximumFractionDigits: 1 }
      )}`,
    ],
    [
      "Difference",
      "",
      "",
      "",
      expenses.laborCostValues.differenceOfTotals.toFixed(2),
    ],
    [""],
    ["Labor Hours per Year"],
    [
      "USP Hours",
      expenses.laborCostValues.laborHours.upstream.toLocaleString(),
    ],
    ["Main Hours", expenses.laborCostValues.laborHours.main.toLocaleString()],
    [
      "DSP Hours",
      expenses.laborCostValues.laborHours.downstream.toLocaleString(),
    ],
    [""],

    ["INPUT PARAMETERS USED"],
    ["Parameter", "Value", "Unit"],
    ["Media Cost", costs.mediaCost.toFixed(2), "$/L"],
    ["USP Labor Cost", costs.uspLaborCostPerHour.toFixed(2), "$/hr"],
    ["Main Labor Cost", costs.mainLaborCostPerHour.toFixed(2), "$/hr"],
    ["DSP Labor Cost", costs.dspLaborCostPerHour.toFixed(2), "$/hr"],
    ["Electricity Cost", costs.electricityCost.toFixed(4), "$/kWh"],
    ["Steam Cost", costs.steamCost.toFixed(2), "$/1000 lb"],
    ["Cooling Water Cost", costs.coolingWaterCost.toFixed(4), "$/1000 gal"],
    ["Chilled Water Cost", costs.chilledWaterCost.toFixed(4), "$/1000 gal"],
    ["Tax Rate", (costs.taxRate * 100).toFixed(1), "%"],
    ["Project Duration", costs.projectDuration.toFixed(0), "years"],
    [""],

    ["NOTES"],
    ["- COGS = Cost of Goods Sold"],
    ["- All monetary values are in USD"],
    ["- Facility count represents number needed for ~100M kg/yr production"],
    [
      "- CAPEX includes direct fixed capital, working capital, and startup capital",
    ],
    ["- OPEX represents annual operating expenses"],
    [
      `- Analysis based on ${bioreactor.name} with ${doublingTime.replace(
        "h",
        ""
      )}h doubling time and ${density.replace("gpl", "")} g/L density`,
    ],
  ];

  const csvContent = csvSections
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  if (triggerDownload) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${bioreactor.name.toLowerCase().replace(/\s+/g, "-")}-comprehensive-analysis.csv`);
  } else {
    return csvContent;
  }
}