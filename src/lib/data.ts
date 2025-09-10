import { Bioreactor, ProductionCosts } from "@/types";

export const BIOREACTORS: Bioreactor[] = [
  {
    id: "105K_STR",
    name: "105,000 L Stirred",
    reactors: {
      "17h": {
        "80gpl": {
          image: "/images/105K_STR_17h_80gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 803319000,
          otherFacilityCostsSplit: {
            depreciation: 71164000,
            maintenance: 9623000,
            insurance: 7491000,
            localTaxes: 14982000,
            factoryExpense: 37455000,
          },
          otherFacilityCosts: 140714000,
          mediaVolume: 126924956,
          otherMaterialsCost: 54157097,
          powerUsage: 4052918,
          steamUsage: 17710,
          coolingWaterUsage: 1004714,
          chilledWaterUsage: 44335,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
          consumableCosts: 131000,
          wasteTreatmentCost: 1701000,
        },
        "90gpl": {
          image: "/images/105K_STR_17h_90gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 731037000,
          otherFacilityCostsSplit: {
            depreciation: 64789000,
            maintenance: 8760000,
            insurance: 6820000,
            localTaxes: 13640000,
            factoryExpense: 34100000,
          },
          otherFacilityCosts: 128109000,
          mediaVolume: 112955275,
          otherMaterialsCost: 48322920,
          powerUsage: 3613157,
          steamUsage: 15865,
          coolingWaterUsage: 895906,
          chilledWaterUsage: 44342,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
          consumableCosts: 131000,
          wasteTreatmentCost: 1519000,
        },
        "100gpl": {
          image: "/images/105K_STR_17h_100gpl.jpg",
          annualProduction: 10000280,
          capitalExpense: 677033000,
          otherFacilityCostsSplit: {
            depreciation: 60037000,
            maintenance: 8119000,
            insurance: 6320000,
            localTaxes: 12639000,
            factoryExpense: 31599000,
          },
          otherFacilityCosts: 118714000,
          mediaVolume: 101652504,
          otherMaterialsCost: 43539072,
          powerUsage: 3257033,
          steamUsage: 14626,
          coolingWaterUsage: 807867,
          chilledWaterUsage: 44348,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
          consumableCosts: 131000,
          wasteTreatmentCost: 1362000,
        },
      },
      "20h": {
        "80gpl": {
          image: "/images/105K_STR_20h_80gpl.jpg",
          annualProduction: 10000010,
          capitalExpense: 863330000,
          otherFacilityCostsSplit: {
            depreciation: 76591000,
            maintenance: 10359000,
            insurance: 8062000,
            localTaxes: 16124000,
            factoryExpense: 40311000,
          },
          otherFacilityCosts: 151447000,
          mediaVolume: 126945755,
          otherMaterialsCost: 54297530,
          powerUsage: 4750037,
          steamUsage: 18141,
          coolingWaterUsage: 1100616,
          chilledWaterUsage: 44335,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
          consumableCosts: 254000,
          wasteTreatmentCost: 1719000,
        },
        "90gpl": {
          image: "/images/105K_STR_20h_90gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 748216000,
          otherFacilityCostsSplit: {
            depreciation: 66344000,
            maintenance: 8970000,
            insurance: 6984000,
            localTaxes: 13967000,
            factoryExpense: 34918000,
          },
          otherFacilityCosts: 131182000,
          mediaVolume: 112913997,
          otherMaterialsCost: 48252431,
          powerUsage: 4230932,
          steamUsage: 15931,
          coolingWaterUsage: 980711,
          chilledWaterUsage: 44342,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
          consumableCosts: 127000,
          wasteTreatmentCost: 1512000,
        },
        "100gpl": {
          image: "/images/105K_STR_20h_100gpl.jpg",
          annualProduction: 9683238,
          capitalExpense: 676635000,
          otherFacilityCostsSplit: {
            depreciation: 60037000,
            maintenance: 8119000,
            insurance: 6320000,
            localTaxes: 12639000,
            factoryExpense: 31599000,
          },
          otherFacilityCosts: 118714000,
          mediaVolume: 98548611,
          otherMaterialsCost: 42209634,
          powerUsage: 3699538,
          steamUsage: 14180,
          coolingWaterUsage: 857446,
          chilledWaterUsage: 42942,
          laborHours: {
            main: 1490,
            upstream: 19887,
            downstream: 270,
          },
          consumableCosts: 127000,
          wasteTreatmentCost: 1321000,
        },
      },
      "23h": {
        "80gpl": {
          image: "/images/105K_STR_23h_80gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 836450000,
          otherFacilityCostsSplit: {
            depreciation: 74159000,
            maintenance: 10026000,
            insurance: 7806000,
            localTaxes: 15612000,
            factoryExpense: 39031000,
          },
          otherFacilityCosts: 146634000,
          mediaVolume: 126960729,
          otherMaterialsCost: 54121514,
          powerUsage: 5472059,
          steamUsage: 17715,
          coolingWaterUsage: 1199927,
          chilledWaterUsage: 44335,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
          consumableCosts: 246000,
          wasteTreatmentCost: 1695000,
        },
        "90gpl": {
          image: "/images/105K_STR_23h_90gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 753938000,
          otherFacilityCostsSplit: {
            depreciation: 66860000,
            maintenance: 9039000,
            insurance: 7038000,
            localTaxes: 14076000,
            factoryExpense: 35189000,
          },
          otherFacilityCosts: 132203000,
          mediaVolume: 112960869,
          otherMaterialsCost: 48180043,
          powerUsage: 4874172,
          steamUsage: 15772,
          coolingWaterUsage: 1069318,
          chilledWaterUsage: 44342,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
          consumableCosts: 123000,
          wasteTreatmentCost: 1500000,
        },
        "100gpl": {
          image: "/images/105K_STR_23h_100gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 684933000,
          otherFacilityCostsSplit: {
            depreciation: 60750000,
            maintenance: 8212000,
            insurance: 6395000,
            localTaxes: 12789000,
            factoryExpense: 31974000,
          },
          otherFacilityCosts: 120120000,
          mediaVolume: 101744615,
          otherMaterialsCost: 43464547,
          powerUsage: 4394864,
          steamUsage: 14215,
          coolingWaterUsage: 964678,
          chilledWaterUsage: 44347,
          laborHours: {
            main: 1443,
            upstream: 20301,
            downstream: 261,
          },
          consumableCosts: 123000,
          wasteTreatmentCost: 1349000,
        },
      },
      "26h": {
        "80gpl": {
          image: "/images/105K_STR_26h_80gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 931152000,
          otherFacilityCostsSplit: {
            depreciation: 82726000,
            maintenance: 11187000,
            insurance: 8708000,
            localTaxes: 17416000,
            factoryExpense: 43540000,
          },
          otherFacilityCosts: 163576000,
          mediaVolume: 126816769,
          otherMaterialsCost: 54101572,
          powerUsage: 6122629,
          steamUsage: 17695,
          coolingWaterUsage: 1289450,
          chilledWaterUsage: 44335,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
          consumableCosts: 224000,
          wasteTreatmentCost: 1698000,
        },
        "90gpl": {
          image: "/images/105K_STR_26h_90gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 821700000,
          otherFacilityCostsSplit: {
            depreciation: 72988000,
            maintenance: 9869000,
            insurance: 7683000,
            localTaxes: 15366000,
            factoryExpense: 38415000,
          },
          otherFacilityCosts: 144322000,
          mediaVolume: 112994399,
          otherMaterialsCost: 48133038,
          powerUsage: 5460097,
          steamUsage: 15784,
          coolingWaterUsage: 1150560,
          chilledWaterUsage: 44342,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
          consumableCosts: 224000,
          wasteTreatmentCost: 1492000,
        },
        "100gpl": {
          image: "/images/105K_STR_26h_100gpl.jpg",
          annualProduction: 8812816,
          capitalExpense: 678486000,
          otherFacilityCostsSplit: {
            depreciation: 60308000,
            maintenance: 8155000,
            insurance: 6348000,
            localTaxes: 12696000,
            factoryExpense: 31741000,
          },
          otherFacilityCosts: 119249000,
          mediaVolume: 89665634,
          otherMaterialsCost: 38326335,
          powerUsage: 4343408,
          steamUsage: 12734,
          coolingWaterUsage: 914343,
          chilledWaterUsage: 39082,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
          consumableCosts: 112000,
          wasteTreatmentCost: 1191000,
        },
      },
      "29h": {
        "80gpl": {
          image: "/images/105K_STR_29h_80gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 1024734000,
          otherFacilityCostsSplit: {
            depreciation: 91184000,
            maintenance: 12329000,
            insurance: 9598000,
            localTaxes: 19197000,
            factoryExpense: 47992000,
          },
          otherFacilityCosts: 180300000,
          mediaVolume: 126948570,
          otherMaterialsCost: 54077369,
          powerUsage: 6820413,
          steamUsage: 17713,
          coolingWaterUsage: 1386523,
          chilledWaterUsage: 44335,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 200000,
          wasteTreatmentCost: 1690000,
        },
        "90gpl": {
          image: "/images/105K_STR_29h_90gpl.jpg",
          annualProduction: 10000000,
          capitalExpense: 904305000,
          otherFacilityCostsSplit: {
            depreciation: 80458000,
            maintenance: 10879000,
            insurance: 8469000,
            localTaxes: 16938000,
            factoryExpense: 42346000,
          },
          otherFacilityCosts: 159090000,
          mediaVolume: 112858561,
          otherMaterialsCost: 48046483,
          powerUsage: 6067581,
          steamUsage: 15757,
          coolingWaterUsage: 1234281,
          chilledWaterUsage: 44342,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 200000,
          wasteTreatmentCost: 1486000,
        },
        // ! DO NOT DELETE THE COMMENTS IN THE BELOW OBJECT THEY'RE FOR REFERENCE
        "100gpl": {
          image: "/images/105K_STR_29h_100gpl.jpg",
          // 1. EXECUTIVE SUMMARY (2021 prices) - Cost Basis Annual Rate
          annualProduction: 10000000,
          // 1. EXECUTIVE SUMMARY (2021 prices) - Total Capital Investment
          capitalExpense: 823155000,
          // 4. FACILITY-DEPENDENT COST - PROCESS SUMMARY - Annual Amount ($) Individual of all Cost Items
          otherFacilityCostsSplit: {
            depreciation: 73250000,
            maintenance: 9904000,
            insurance: 7711000,
            localTaxes: 15421000,
            factoryExpense: 38553000,
          },
          // 4. FACILITY-DEPENDENT COST - PROCESS SUMMARY - TOTAL - Annual Cost ($)
          otherFacilityCosts: 144839000,
          // 5. MATERIALS COST - PROCESS SUMMARY - Annual Amount - Beefy R Enhance
          mediaVolume: 101592461,
          // 5. MATERIALS COST - PROCESS SUMMARY - (Annual Cost ($) minus Beefy R Enhance Annual Cost ($))
          otherMaterialsCost: 43262553,
          // 6. UTILITY - Annual Amount- Std Power
          powerUsage: 5465367,
          // 6. UTILITY - Annual Amount - Steam
          steamUsage: 14194,
          // 6. UTILITY - Annual Amount - Cooling Water
          coolingWaterUsage: 1112551,
          // 6. UTILITY -  Annual Amount - Chilled Water
          chilledWaterUsage: 44347,
          // 7. LABOR COST - PROCESS SUMMARY - "Unit Cost ($/h)" * "Annual Amount(h)"
          // Operator (Annual Amount * Unit Cost) + USP Operator (Annual Amount * Unit Cost)  + DSP Operator (Annual Amount * Unit Cost)
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          // 10. ANNUAL OPERATING COST (2021 prices) - PROCESS SUMMARY - Consumables - $
          consumableCosts: 200000,
          // 10. ANNUAL OPERATING COST (2021 prices) - PROCESS SUMMARY - Waste Treatment/Disposal - $
          wasteTreatmentCost: 1329000,
        },
      },
    },
  },
  {
    id: "150K_STR",
    name: "150,000 L Stirred",
    reactors: {
      "17h": {
        "80gpl": {
          image: "/images/150K_STR_17h_80gpl.jpg",
          annualProduction: 14285717,
          capitalExpense: 1016771000,
          otherFacilityCostsSplit: {
            depreciation: 89836000,
            maintenance: 12143000,
            insurance: 9456000,
            localTaxes: 18913000,
            factoryExpense: 47282000,
          },
          otherFacilityCosts: 177630000,
          mediaVolume: 181404936,
          otherMaterialsCost: 76584533,
          powerUsage: 5759218,
          steamUsage: 25504,
          coolingWaterUsage: 1435953,
          chilledWaterUsage: 63336,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
          consumableCosts: 262000,
          wasteTreatmentCost: 2327000,
        },
        "90gpl": {
          image: "/images/150K_STR_17h_90gpl.jpg",
          annualProduction: 14285720,
          capitalExpense: 940518000,
          otherFacilityCostsSplit: {
            depreciation: 83173000,
            maintenance: 11242000,
            insurance: 8755000,
            localTaxes: 17510000,
            factoryExpense: 43775000,
          },
          otherFacilityCosts: 164455000,
          mediaVolume: 161360617,
          otherMaterialsCost: 68328344,
          powerUsage: 5129770,
          steamUsage: 23199,
          coolingWaterUsage: 1279827,
          chilledWaterUsage: 63345,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
          consumableCosts: 262000,
          wasteTreatmentCost: 2081000,
        },
        "100gpl": {
          image: "/images/150K_STR_17h_100gpl.jpg",
          annualProduction: 14297557,
          capitalExpense: 851381000,
          otherFacilityCosts: 148886000,
          otherFacilityCostsSplit: {
            depreciation: 75298000,
            maintenance: 10179000,
            insurance: 7926000,
            localTaxes: 15852000,
            factoryExpense: 39631000,
          },
          mediaVolume: 145319641,
          otherMaterialsCost: 61554759,
          powerUsage: 4625659,
          steamUsage: 20934,
          coolingWaterUsage: 1154907,
          chilledWaterUsage: 63405,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
          consumableCosts: 262000,
          wasteTreatmentCost: 1860000,
        },
      },
      "20h": {
        "80gpl": {
          image: "/images/150K_STR_20h_80gpl.jpg",
          annualProduction: 14285417,
          capitalExpense: 1027075000,
          otherFacilityCostsSplit: {
            depreciation: 90768000,
            maintenance: 12268000,
            insurance: 9555000,
            localTaxes: 19109000,
            factoryExpense: 47773000,
          },
          otherFacilityCosts: 179472000,
          mediaVolume: 181425912,
          otherMaterialsCost: 76484821,
          powerUsage: 6755852,
          steamUsage: 25314,
          coolingWaterUsage: 1572956,
          chilledWaterUsage: 63335,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
          consumableCosts: 254000,
          wasteTreatmentCost: 2313000,
        },
        "90gpl": {
          image: "/images/150K_STR_20h_90gpl.jpg",
          annualProduction: 14285718,
          capitalExpense: 943124000,
          otherFacilityCostsSplit: {
            depreciation: 83410000,
            maintenance: 11273000,
            insurance: 8780000,
            localTaxes: 17560000,
            factoryExpense: 43900000,
          },
          otherFacilityCosts: 164923000,
          mediaVolume: 161251381,
          otherMaterialsCost: 68163243,
          powerUsage: 6011020,
          steamUsage: 22858,
          coolingWaterUsage: 1400550,
          chilledWaterUsage: 63345,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
          consumableCosts: 254000,
          wasteTreatmentCost: 2063000,
        },
        "100gpl": {
          image: "/images/150K_STR_20h_100gpl.jpg",
          annualProduction: 14286170,
          capitalExpense: 853753000,
          otherFacilityCostsSplit: {
            depreciation: 75514000,
            maintenance: 10207000,
            insurance: 7949000,
            localTaxes: 15898000,
            factoryExpense: 39744000,
          },
          otherFacilityCosts: 149311000,
          mediaVolume: 145233209,
          otherMaterialsCost: 61410110,
          powerUsage: 5419280,
          steamUsage: 20627,
          coolingWaterUsage: 1263666,
          chilledWaterUsage: 63354,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
          consumableCosts: 254000,
          wasteTreatmentCost: 1844000,
        },
      },
      "23h": {
        "80gpl": {
          image: "/images/150K_STR_23h_80gpl.jpg",
          annualProduction: 14285417,
          capitalExpense: 1046283000,
          otherFacilityCostsSplit: {
            depreciation: 92505000,
            maintenance: 12503000,
            insurance: 9737000,
            localTaxes: 19475000,
            factoryExpense: 48687000,
          },
          otherFacilityCosts: 182906000,
          mediaVolume: 181368700,
          otherMaterialsCost: 76378585,
          powerUsage: 7785014,
          steamUsage: 25306,
          coolingWaterUsage: 1714146,
          chilledWaterUsage: 63335,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
          consumableCosts: 246000,
          wasteTreatmentCost: 2301000,
        },
        "90gpl": {
          image: "/images/150K_STR_23h_90gpl.jpg",
          annualProduction: 14285714,
          capitalExpense: 946107000,
          otherFacilityCostsSplit: {
            depreciation: 83677000,
            maintenance: 11308000,
            insurance: 8808000,
            localTaxes: 17616000,
            factoryExpense: 44041000,
          },
          otherFacilityCosts: 165450000,
          mediaVolume: 161372671,
          otherMaterialsCost: 68089250,
          powerUsage: 6932526,
          steamUsage: 22531,
          coolingWaterUsage: 1527597,
          chilledWaterUsage: 63345,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
          consumableCosts: 248000,
          wasteTreatmentCost: 2048000,
        },
        "100gpl": {
          image: "/images/150K_STR_23h_100gpl.jpg",
          annualProduction: 14285715,
          capitalExpense: 855216000,
          otherFacilityCostsSplit: {
            depreciation: 75644000,
            maintenance: 10223000,
            insurance: 7962000,
            localTaxes: 15925000,
            factoryExpense: 39812000,
          },
          otherFacilityCosts: 149567000,
          mediaVolume: 145349457,
          otherMaterialsCost: 61342118,
          powerUsage: 6249066,
          steamUsage: 20307,
          coolingWaterUsage: 1378112,
          chilledWaterUsage: 63352,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
          consumableCosts: 246000,
          wasteTreatmentCost: 1830000,
        },
      },
      "26h": {
        "80gpl": {
          image: "/images/150K_STR_26h_80gpl.jpg",
          annualProduction: 14285714,
          capitalExpense: 1168957000,
          otherFacilityCostsSplit: {
            depreciation: 103601000,
            maintenance: 14003000,
            insurance: 10905000,
            localTaxes: 21811000,
            factoryExpense: 54527000,
          },
          otherFacilityCosts: 204847000,
          mediaVolume: 181166815,
          otherMaterialsCost: 76404821,
          powerUsage: 8716325,
          steamUsage: 25278,
          coolingWaterUsage: 1842072,
          chilledWaterUsage: 63336,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
          consumableCosts: 2240000,
          wasteTreatmentCost: 2314000,
        },
        "90gpl": {
          image: "/images/150K_STR_26h_90gpl.jpg",
          annualProduction: 14285714,
          capitalExpense: 1029704000,
          otherFacilityCostsSplit: {
            depreciation: 91237000,
            maintenance: 12331000,
            insurance: 9604000,
            localTaxes: 19208000,
            factoryExpense: 48019000,
          },
          otherFacilityCosts: 180400000,
          mediaVolume: 161424650,
          otherMaterialsCost: 68031887,
          powerUsage: 7771425,
          steamUsage: 22538,
          coolingWaterUsage: 1643698,
          chilledWaterUsage: 63345,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
          consumableCosts: 224000,
          wasteTreatmentCost: 2038000,
        },
        "100gpl": {
          image: "/images/150K_STR_26h_100gpl.jpg",
          annualProduction: 14285715,
          capitalExpense: 937611000,
          otherFacilityCostsSplit: {
            depreciation: 83096000,
            maintenance: 11230000,
            insurance: 8747000,
            localTaxes: 17494000,
            factoryExpense: 43735000,
          },
          otherFacilityCosts: 164301000,
          mediaVolume: 145290748,
          otherMaterialsCost: 61327685,
          powerUsage: 6998889,
          steamUsage: 20299,
          coolingWaterUsage: 1481580,
          chilledWaterUsage: 63352,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
          consumableCosts: 224000,
          wasteTreatmentCost: 1831000,
        },
      },
      "29h": {
        "80gpl": {
          image: "/images/150K_STR_29h_80gpl.jpg",
          annualProduction: 14285714,
          capitalExpense: 1280713000,
          otherFacilityCostsSplit: {
            depreciation: 113700000,
            maintenance: 15369000,
            insurance: 11968000,
            localTaxes: 23937000,
            factoryExpense: 59842000,
          },
          otherFacilityCosts: 224818000,
          mediaVolume: 181355101,
          otherMaterialsCost: 76316660,
          powerUsage: 9715139,
          steamUsage: 25305,
          coolingWaterUsage: 1980747,
          chilledWaterUsage: 63336,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 200000,
          wasteTreatmentCost: 2294000,
        },
        "90gpl": {
          image: "/images/150K_STR_29h_90gpl.jpg",
          annualProduction: 14285714,
          capitalExpense: 1163726000,
          otherFacilityCostsSplit: {
            depreciation: 103355000,
            maintenance: 13970000,
            insurance: 10879000,
            localTaxes: 21759000,
            factoryExpense: 54397000,
          },
          otherFacilityCosts: 204361000,
          mediaVolume: 161226516,
          otherMaterialsCost: 68002692,
          powerUsage: 8640978,
          steamUsage: 22511,
          coolingWaterUsage: 1763258,
          chilledWaterUsage: 63345,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 200000,
          wasteTreatmentCost: 2043000,
        },
        "100gpl": {
          image: "/images/150K_STR_29h_100gpl.jpg",
          annualProduction: 14285715,
          capitalExpense: 1031740000,
          otherFacilityCostsSplit: {
            depreciation: 91606000,
            maintenance: 12381000,
            insurance: 9643000,
            localTaxes: 19286000,
            factoryExpense: 48214000,
          },
          otherFacilityCosts: 181130000,
          mediaVolume: 145132095,
          otherMaterialsCost: 61150809,
          powerUsage: 7781796,
          steamUsage: 20277,
          coolingWaterUsage: 1589359,
          chilledWaterUsage: 63352,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 200000,
          wasteTreatmentCost: 1815000,
        },
      },
    },
  },
  {
    id: "210K_STR",
    name: "210,000 L Stirred",
    reactors: {
      "17h": {
        "80gpl": {
          image: "/images/210K_STR_17h_100gpl.jpg",
          annualProduction: 20000001,
          capitalExpense: 1277553000,
          otherFacilityCostsSplit: {
            depreciation: 112582000,
            maintenance: 15214000,
            insurance: 11851000,
            localTaxes: 23701000,
            factoryExpense: 59254000,
          },
          otherFacilityCosts: 222602000,
          mediaVolume: 253865093,
          otherMaterialsCost: 106151048,
          powerUsage: 8024012,
          steamUsage: 35863,
          coolingWaterUsage: 2009540,
          chilledWaterUsage: 88671,
          laborHours: {
            main: 1573,
            upstream: 19445,
            downstream: 278,
          },
          consumableCosts: 262000,
          wasteTreatmentCost: 3125000,
        },
        "90gpl": {
          image: "/images/210K_STR_17h_90gpl.jpg",
          annualProduction: 20000010,
          capitalExpense: 1078488000,
          otherFacilityCostsSplit: {
            depreciation: 94904000,
            maintenance: 12819000,
            insurance: 9990000,
            localTaxes: 19980000,
            factoryExpense: 49949000,
          },
          otherFacilityCosts: 187642000,
          mediaVolume: 225783293,
          otherMaterialsCost: 94306545,
          powerUsage: 7143815,
          steamUsage: 31189,
          coolingWaterUsage: 1790829,
          chilledWaterUsage: 88683,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
          consumableCosts: 262000,
          wasteTreatmentCost: 2741000,
        },
        "100gpl": {
          image: "/images/210K_STR_17h_100gpl.jpg",
          annualProduction: 20000664,
          capitalExpense: 1052455000,
          otherFacilityCosts: 183510000,
          otherFacilityCostsSplit: {
            depreciation: 92811000,
            maintenance: 12542000,
            insurance: 9770000,
            localTaxes: 19539000,
            factoryExpense: 48848000,
          },
          mediaVolume: 203278987,
          otherMaterialsCost: 85235082,
          powerUsage: 6438012,
          steamUsage: 29295,
          coolingWaterUsage: 1615531,
          chilledWaterUsage: 88696,
          consumableCosts: 262000,
          wasteTreatmentCost: 2491000,
          laborHours: {
            main: 1537,
            upstream: 19444,
            downstream: 278,
          },
        },
      },
      "20h": {
        "80gpl": {
          image: "/images/210K_STR_20h_80gpl.jpg",
          annualProduction: 20000003,
          capitalExpense: 1285026000,
          otherFacilityCostsSplit: {
            depreciation: 113256000,
            maintenance: 15304000,
            insurance: 11922000,
            localTaxes: 23843000,
            factoryExpense: 59608000,
          },
          otherFacilityCosts: 223933000,
          mediaVolume: 253999250,
          otherMaterialsCost: 106060427,
          powerUsage: 9423254,
          steamUsage: 35445,
          coolingWaterUsage: 2202165,
          chilledWaterUsage: 88671,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
          consumableCosts: 381000,
          wasteTreatmentCost: 3106000,
        },
        "90gpl": {
          image: "/images/210K_STR_20h_90gpl.jpg",
          annualProduction: 20000844,
          capitalExpense: 1161771000,
          otherFacilityCostsSplit: {
            depreciation: 102435000,
            maintenance: 13841000,
            insurance: 10783000,
            localTaxes: 21565000,
            factoryExpense: 53913000,
          },
          otherFacilityCosts: 202537000,
          mediaVolume: 225813032,
          otherMaterialsCost: 94492339,
          powerUsage: 8384258,
          steamUsage: 31909,
          coolingWaterUsage: 1961295,
          chilledWaterUsage: 88687,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
          consumableCosts: 254000,
          wasteTreatmentCost: 2765000,
        },
        "100gpl": {
          image: "/images/210K_STR_20h_100gpl.jpg",
          annualProduction: 20000664,
          capitalExpense: 1055726000,
          otherFacilityCosts: 184092000,
          otherFacilityCostsSplit: {
            depreciation: 93106000,
            maintenance: 12581000,
            insurance: 9801000,
            localTaxes: 19601000,
            factoryExpense: 49003000,
          },
          mediaVolume: 203326673,
          otherMaterialsCost: 85125016,
          powerUsage: 7554962,
          steamUsage: 28878,
          coolingWaterUsage: 1769135,
          chilledWaterUsage: 88696,
          consumableCosts: 254000,
          wasteTreatmentCost: 2473000,
          laborHours: {
            main: 1490,
            upstream: 19888,
            downstream: 270,
          },
        },
      },
      "23h": {
        "80gpl": {
          image: "/images/210K_STR_23h_80gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1316659000,
          otherFacilityCostsSplit: {
            depreciation: 116114000,
            maintenance: 15686000,
            insurance: 12223000,
            localTaxes: 24445000,
            factoryExpense: 61113000,
          },
          otherFacilityCosts: 229581000,
          mediaVolume: 253921458,
          otherMaterialsCost: 106105454,
          powerUsage: 10864865,
          steamUsage: 35430,
          coolingWaterUsage: 2399855,
          chilledWaterUsage: 88671,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
          consumableCosts: 369000,
          wasteTreatmentCost: 3117000,
        },
        "90gpl": {
          image: "/images/210K_STR_17h_90gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1183485000,
          otherFacilityCostsSplit: {
            depreciation: 104397000,
            maintenance: 14105000,
            insurance: 10989000,
            localTaxes: 21978000,
            factoryExpense: 54946000,
          },
          otherFacilityCosts: 206415000,
          mediaVolume: 225921739,
          otherMaterialsCost: 94404059,
          powerUsage: 9672742,
          steamUsage: 31543,
          coolingWaterUsage: 2138636,
          chilledWaterUsage: 88683,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
          consumableCosts: 246000,
          wasteTreatmentCost: 2748000,
        },
        "100gpl": {
          image: "/images/210K_STR_23h_100gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1062062000,
          otherFacilityCosts: 185214000,
          otherFacilityCostsSplit: {
            depreciation: 93675000,
            maintenance: 12654000,
            insurance: 9861000,
            localTaxes: 19721000,
            factoryExpense: 49303000,
          },
          mediaVolume: 203489229,
          otherMaterialsCost: 85130545,
          powerUsage: 8717255,
          steamUsage: 28429,
          coolingWaterUsage: 1929357,
          chilledWaterUsage: 88693,
          consumableCosts: 246000,
          wasteTreatmentCost: 2468000,
          laborHours: {
            main: 1443,
            upstream: 20302,
            downstream: 261,
          },
        },
      },
      "26h": {
        "80gpl": {
          image: "/images/210K_STR_26h_80gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1463284000,
          otherFacilityCostsSplit: {
            depreciation: 129378000,
            maintenance: 17482000,
            insurance: 13619000,
            localTaxes: 27237000,
            factoryExpense: 68093000,
          },
          otherFacilityCosts: 255809000,
          mediaVolume: 253633540,
          otherMaterialsCost: 106020325,
          powerUsage: 12170371,
          steamUsage: 35390,
          coolingWaterUsage: 2578901,
          chilledWaterUsage: 88671,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 233,
          },
          consumableCosts: 336000,
          wasteTreatmentCost: 3117000,
        },
        "90gpl": {
          image: "/images/210K_STR_26h_90gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1292430000,
          otherFacilityCostsSplit: {
            depreciation: 114248000,
            maintenance: 15436000,
            insurance: 12026000,
            localTaxes: 24052000,
            factoryExpense: 60130000,
          },
          otherFacilityCosts: 225892000,
          mediaVolume: 225994510,
          otherMaterialsCost: 94410754,
          powerUsage: 10848989,
          steamUsage: 31553,
          coolingWaterUsage: 2301177,
          chilledWaterUsage: 88683,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
          consumableCosts: 336000,
          wasteTreatmentCost: 2747000,
        },
        "100gpl": {
          image: "/images/210K_STR_26h_100gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1158191000,
          otherFacilityCosts: 202406000,
          otherFacilityCostsSplit: {
            depreciation: 102370000,
            maintenance: 13831000,
            insurance: 10776000,
            localTaxes: 21552000,
            factoryExpense: 53879000,
          },
          mediaVolume: 203407037,
          otherMaterialsCost: 85023210,
          powerUsage: 9768730,
          steamUsage: 28418,
          coolingWaterUsage: 2074212,
          chilledWaterUsage: 88693,
          consumableCosts: 224000,
          wasteTreatmentCost: 2456000,
          laborHours: {
            main: 1314,
            upstream: 19355,
            downstream: 238,
          },
        },
      },
      "29h": {
        "80gpl": {
          image: "/images/210K_STR_29h_80gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1607480000,
          otherFacilityCostsSplit: {
            depreciation: 142406000,
            maintenance: 19242000,
            insurance: 14990000,
            localTaxes: 29980000,
            factoryExpense: 74951000,
          },
          otherFacilityCosts: 281569000,
          mediaVolume: 253897141,
          otherMaterialsCost: 105995076,
          powerUsage: 13570833,
          steamUsage: 35426,
          coolingWaterUsage: 2773046,
          chilledWaterUsage: 88671,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 300000,
          wasteTreatmentCost: 3103000,
        },
        "90gpl": {
          image: "/images/210K_STR_29h_90gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1421605000,
          otherFacilityCostsSplit: {
            depreciation: 125925000,
            maintenance: 17013000,
            insurance: 13255000,
            localTaxes: 26511000,
            factoryExpense: 66276000,
          },
          otherFacilityCosts: 248981000,
          mediaVolume: 225717122,
          otherMaterialsCost: 94225125,
          powerUsage: 12068415,
          steamUsage: 31515,
          coolingWaterUsage: 2468561,
          chilledWaterUsage: 88683,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 300000,
          wasteTreatmentCost: 2734000,
        },
        "100gpl": {
          image: "/images/210K_STR_29h_100gpl.jpg",
          annualProduction: 20000000,
          capitalExpense: 1294860000,
          otherFacilityCosts: 226837000,
          otherFacilityCostsSplit: {
            depreciation: 114726000,
            maintenance: 15500000,
            insurance: 12076000,
            localTaxes: 24153000,
            factoryExpense: 60382000,
          },
          mediaVolume: 203184922,
          otherMaterialsCost: 84865004,
          powerUsage: 10866766,
          steamUsage: 28387,
          coolingWaterUsage: 2225103,
          chilledWaterUsage: 88693,
          laborHours: {
            main: 1173,
            upstream: 18098,
            downstream: 213,
          },
          consumableCosts: 300000,
          wasteTreatmentCost: 2446000,
        },
      },
    },
  },
  {
    id: "260K_ALR",
    name: "262,000 L Airlift",
    reactors: {
      "17h": {
        "80gpl": {
          image: "/images/260K_ALR_17h_80gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 419980000,
          capex: {
            directFixedCapital: {
              plantDirectCost: {
                equipmentPurchaseCost: 57001000,
                otherDirectCost: {
                  installation: 23292000,
                  processPiping: 19950000,
                  instrumentation: 22800000,
                  insulation: 1710000,
                  electrical: 5700000,
                  buildings: 34200000,
                  yardImprovement: 8550000,
                  auxiliaryFacilities: 22800000,
                },
                total: 196004000,
              },
              plantIndirectCost: {
                engineering: 49001000,
                construction: 68601000,
                total: 117602000,
              },
              totalPlantCost: 313606000,
              miscellaneousCost: {
                contractorFee: 15680000,
                contingency: 31361000,
                total: 47041000,
              },
              totalCapital: 360647000,
            },
            workingCapital: 41300000,
            startupCapital: 18032000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            totalCapexCost: 419980000,
          },
          otherFacilityCostsSplit: {
            depreciation: 34262000,
            maintenance: 4560000,
            insurance: 3606000,
            localTaxes: 7213000,
            factoryExpense: 18032000,
          },
          otherFacilityCosts: 67673000,
          mediaVolume: 316336921,
          otherMaterialsCost: 6840928,
          powerUsage: 2889620,
          steamUsage: 44382,
          coolingWaterUsage: 1442092,
          chilledWaterUsage: 110499,
          laborHours: {
            main: 2934,
            upstream: 19499,
            downstream: 273,
          },
          consumableCosts: 262000,
          wasteTreatmentCost: 3855000,
        },
        "90gpl": {
          image: "/images/260K_ALR_17h_90gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 354670000,
          capex: {
            directFixedCapital: {
              plantDirectCost: {
                equipmentPurchaseCost: 47787000,
                otherDirectCost: {
                  installation: 19756000,
                  processPiping: 16725000,
                  instrumentation: 19115000,
                  insulation: 1434000,
                  electrical: 4779000,
                  buildings: 28672000,
                  yardImprovement: 7168000,
                  auxiliaryFacilities: 19115000,
                },
                total: 164550000,
              },
              plantIndirectCost: {
                engineering: 41137000,
                construction: 57592000,
                total: 98730000,
              },
              totalPlantCost: 263280000,
              miscellaneousCost: {
                contractorFee: 13164000,
                contingency: 26328000,
                total: 39492000,
              },
              totalCapital: 302772000,
            },
            workingCapital: 36760000,
            startupCapital: 15139000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            totalCapexCost: 354670000,
          },
          otherFacilityCostsSplit: {
            depreciation: 28763000,
            maintenance: 3823000,
            insurance: 3028000,
            localTaxes: 6055000,
            factoryExpense: 15139000,
          },
          otherFacilityCosts: 56808000,
          mediaVolume: 281687968,
          otherMaterialsCost: 5868221,
          powerUsage: 2583021,
          steamUsage: 38395,
          coolingWaterUsage: 1291893,
          chilledWaterUsage: 110515,
          laborHours: {
            main: 2934,
            upstream: 19499,
            downstream: 278,
          },
          consumableCosts: 262000,
          wasteTreatmentCost: 3371000,
        },
        "100gpl": {
          image: "/images/260K_ALR_17h_100gpl.jpg",
          annualProduction: 25000024,
          capitalExpense: 327992000,
          capex: {
            directFixedCapital: {
              plantDirectCost: {
                equipmentPurchaseCost: 44384000,
                otherDirectCost: {
                  installation: 18156000,
                  processPiping: 15535000,
                  instrumentation: 17754000,
                  insulation: 1332000,
                  electrical: 4438000,
                  buildings: 26631000,
                  yardImprovement: 6658000,
                  auxiliaryFacilities: 17754000,
                },
                total: 152640000,
              },
              plantIndirectCost: {
                engineering: 38160000,
                construction: 53424000,
                total: 91584000,
              },
              totalPlantCost: 244224000,
              miscellaneousCost: {
                contractorFee: 12211000,
                contingency: 24422000,
                total: 36634000,
              },
              totalCapital: 280858000,
            },
            workingCapital: 33091000,
            startupCapital: 14043000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            totalCapexCost: 327992000,
          },
          mediaVolume: 253319331,
          otherMaterialsCost: 5510541,
          powerUsage: 2331567,
          steamUsage: 36118,
          coolingWaterUsage: 1168883,
          chilledWaterUsage: 110528,
          consumableCosts: 131000,
          wasteTreatmentCost: 3039000,
          otherFacilityCosts: 52701000,
          otherFacilityCostsSplit: {
            depreciation: 26682000,
            maintenance: 3551000,
            insurance: 2809000,
            localTaxes: 5617000,
            factoryExpense: 14043000,
          },
          laborHours: {
            main: 2934,
            upstream: 19499,
            downstream: 278,
          },
        },
      },
      "20h": {
        "80gpl": {
          image: "/images/260K_ALR_20h_80gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 425328000,
          capex: {
            directFixedCapital: {
              plantDirectCost: {
                equipmentPurchaseCost: 57788000,
                otherDirectCost: {
                  installation: 23650000,
                  processPiping: 20226000,
                  instrumentation: 23115000,
                  insulation: 1734000,
                  electrical: 5779000,
                  buildings: 34673000,
                  yardImprovement: 8668000,
                  auxiliaryFacilities: 23115000,
                },
                total: 198748000,
              },
              plantIndirectCost: {
                engineering: 49687000,
                construction: 69562000,
                total: 119249000,
              },
              totalPlantCost: 317997000,
              miscellaneousCost: {
                contractorFee: 15900000,
                contingency: 31800000,
                total: 47700000,
              },
              totalCapital: 365697000,
            },
            workingCapital: 41346000,
            startupCapital: 18285000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            totalCapexCost: 425328000,
          },
          otherFacilityCostsSplit: {
            depreciation: 34741000,
            maintenance: 4623000,
            insurance: 3657000,
            localTaxes: 7314000,
            factoryExpense: 18285000,
          },
          otherFacilityCosts: 68620000,
          mediaVolume: 316723215,
          otherMaterialsCost: 6661371,
          powerUsage: 3374845,
          steamUsage: 43702,
          coolingWaterUsage: 1491632,
          chilledWaterUsage: 110499,
          laborHours: {
            main: 2845,
            upstream: 19941,
            downstream: 270,
          },
          consumableCosts: 254000,
          wasteTreatmentCost: 3834000,
        },
        "90gpl": {
          image: "/images/260K_ALR_20h_90gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 358891000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000, // Cell - P62
                otherDirectCost: {
                  installation: 20795000, // Cell - P63
                  processPiping: 17664000, // Cell - P64
                  instrumentation: 20188000, // Cell - P65
                  insulation: 1514000, // Cell - P66
                  electrical: 5047000, // Cell - P67
                  buildings: 30282000, // Cell - P68
                  yardImprovement: 7570000, // Cell - P69
                  auxiliaryFacilities: 20188000, // Cell - P70
                },
                // TPDC
                total: 173717000, // Cell - P71
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000, // Cell - P74
                construction: 60801000, // Cell - P75
                // TPIC
                total: 104230000, // Cell - P76
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000, // Cell - P79
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000, // Cell - P82
                contingency: 27795000, // Cell - P83
                // CFC = 12+13
                total: 41692000, // Cell - P84
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000, // Cell - P87
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000, // Cell - M219
            startupCapital: 15982000, // Cell - M220
            upfrontRandDCapital: 0, // Cell - M221
            upfrontRoyaltiesCapital: 0, // Cell - M222
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000, // Cell - M22
          },
          otherFacilityCostsSplit: {
            depreciation: 29147000,
            maintenance: 3873000,
            insurance: 3068000,
            localTaxes: 6136000,
            factoryExpense: 15341000,
          },
          otherFacilityCosts: 57565000,
          mediaVolume: 281547767,
          otherMaterialsCost: 117206798, // Cell O111 Minus O103
          powerUsage: 3009928,
          steamUsage: 37763,
          coolingWaterUsage: 1330862,
          chilledWaterUsage: 110515,
          laborHours: {
            main: 2845,
            upstream: 19941,
            downstream: 270,
          },
          consumableCosts: 254000,
          wasteTreatmentCost: 3349000,
        },
        "100gpl": {
          image: "/images/260K_ALR_20h_100gpl.jpg",
          annualProduction: 25000008,
          capitalExpense: 331912000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          mediaVolume: 253484625,
          otherMaterialsCost: 105744013,
          powerUsage: 2716262,
          steamUsage: 35625,
          coolingWaterUsage: 1216130,
          chilledWaterUsage: 110527,
          consumableCosts: 127000,
          wasteTreatmentCost: 3020000,
          otherFacilityCosts: 53397000,
          otherFacilityCostsSplit: {
            depreciation: 27035000,
            maintenance: 3597000,
            insurance: 2846000,
            localTaxes: 5691000,
            factoryExpense: 14229000,
          },
          laborHours: {
            main: 2845,
            upstream: 19941,
            downstream: 270,
          },
        },
      },
      "23h": {
        "80gpl": {
          image: "/images/260K_ALR_23h_80gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 432919000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCostsSplit: {
            depreciation: 35430000,
            maintenance: 4715000,
            insurance: 3730000,
            localTaxes: 7459000,
            factoryExpense: 18648000,
          },
          otherFacilityCosts: 69981000,
          mediaVolume: 316350916,
          otherMaterialsCost: 131819705,
          powerUsage: 3865402,
          steamUsage: 43724,
          coolingWaterUsage: 1555294,
          chilledWaterUsage: 110499,
          laborHours: {
            main: 2755,
            upstream: 20353,
            downstream: 261,
          },
          consumableCosts: 246000,
          wasteTreatmentCost: 3816000,
        },
        "90gpl": {
          image: "/images/260K_ALR_23h_90gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 374954000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCostsSplit: {
            depreciation: 30595000,
            maintenance: 4068000,
            insurance: 3221000,
            localTaxes: 6441000,
            factoryExpense: 16103000,
          },
          otherFacilityCosts: 60427000,
          mediaVolume: 281614690,
          otherMaterialsCost: 117429036,
          powerUsage: 3450050,
          steamUsage: 38993,
          coolingWaterUsage: 1394166,
          chilledWaterUsage: 110515,
          laborHours: {
            main: 2755,
            upstream: 20353,
            downstream: 261,
          },
          consumableCosts: 246000,
          wasteTreatmentCost: 3378000,
        },
        "100gpl": {
          image: "/images/260K_ALR_23h_100gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 345079000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCosts: 59461000,
          otherFacilityCostsSplit: {
            depreciation: 28220000,
            maintenance: 3752000,
            insurance: 2971000,
            localTaxes: 5941000,
            factoryExpense: 14853000,
          },
          mediaVolume: 253758783,
          otherMaterialsCost: 105953161,
          powerUsage: 3116542,
          steamUsage: 35198,
          coolingWaterUsage: 1264953,
          chilledWaterUsage: 110527,
          consumableCosts: 246000,
          wasteTreatmentCost: 3034000,
          laborHours: {
            main: 2755,
            upstream: 20353,
            downstream: 261,
          },
        },
      },
      "26h": {
        "80gpl": {
          image: "/images/260K_ALR_26h_80gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 471611000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCostsSplit: {
            depreciation: 38923000,
            maintenance: 5180000,
            insurance: 4097000,
            localTaxes: 8194000,
            factoryExpense: 20486000,
          },
          otherFacilityCosts: 76881000,
          mediaVolume: 316350023,
          otherMaterialsCost: 131935081,
          powerUsage: 4314586,
          steamUsage: 43665,
          coolingWaterUsage: 1601810,
          chilledWaterUsage: 110499,
          laborHours: {
            main: 2509,
            upstream: 19402,
            downstream: 238,
          },
          consumableCosts: 224000,
          wasteTreatmentCost: 3830000,
        },
        "90gpl": {
          image: "/images/260K_ALR_26h_90gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 427189000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCostsSplit: {
            depreciation: 35315000,
            maintenance: 4701000,
            insurance: 3717000,
            localTaxes: 7435000,
            factoryExpense: 18587000,
          },
          otherFacilityCosts: 69755000,
          mediaVolume: 281478750,
          otherMaterialsCost: 117516180,
          powerUsage: 3847309,
          steamUsage: 38923,
          coolingWaterUsage: 1435122,
          chilledWaterUsage: 110515,
          laborHours: {
            main: 2509,
            upstream: 19402,
            downstream: 238,
          },
          consumableCosts: 224000,
          wasteTreatmentCost: 3394000,
        },
        "100gpl": {
          image: "/images/260K_ALR_26h_100gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 368828000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          mediaVolume: 253591939,
          otherMaterialsCost: 5353190,
          powerUsage: 3473221,
          steamUsage: 35131,
          coolingWaterUsage: 1301813,
          chilledWaterUsage: 110527,
          consumableCosts: 224000,
          wasteTreatmentCost: 3019000,
          otherFacilityCosts: 59975000,
          otherFacilityCostsSplit: {
            depreciation: 30366000,
            maintenance: 4038000,
            insurance: 3196000,
            localTaxes: 6393000,
            factoryExpense: 15982000,
          },
          laborHours: {
            main: 2509,
            upstream: 19402,
            downstream: 238,
          },
        },
      },
      "29h": {
        "80gpl": {
          image: "/images/260K_ALR_29h_80gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 509710000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCostsSplit: {
            depreciation: 42357000,
            maintenance: 5636000,
            insurance: 4459000,
            localTaxes: 8917000,
            factoryExpense: 22293000,
          },
          otherFacilityCosts: 83662000,
          mediaVolume: 316372145,
          otherMaterialsCost: 131726963,
          powerUsage: 4787002,
          steamUsage: 43291,
          coolingWaterUsage: 1648623,
          chilledWaterUsage: 110499,
          laborHours: {
            main: 2240,
            upstream: 11410,
            downstream: 213,
          },
          consumableCosts: 200000,
          wasteTreatmentCost: 3802000,
        },
        "90gpl": {
          image: "/images/260K_ALR_29h_90gpl.jpg",
          annualProduction: 25000000,
          capitalExpense: 456715000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCostsSplit: {
            depreciation: 37977000,
            maintenance: 5052000,
            insurance: 3998000,
            localTaxes: 7995000,
            factoryExpense: 19988000,
          },
          otherFacilityCosts: 75009000,
          mediaVolume: 281446524,
          otherMaterialsCost: 117151640,
          powerUsage: 4265996,
          steamUsage: 37938,
          coolingWaterUsage: 1476463,
          chilledWaterUsage: 110515,
          laborHours: {
            main: 2240,
            upstream: 11410,
            downstream: 213,
          },
          consumableCosts: 200000,
          wasteTreatmentCost: 3346000,
        },
        "100gpl": {
          image: "/images/260K_ALR_29h_100gpl.jpg",
          annualProduction: 25000007,
          capitalExpense: 430281000,
          capex: {
            // 3. FIXED CAPITAL ESTIMATE SUMMARY
            directFixedCapital: {
              // 3A. Total Plant Direct Cost (TPDC) (physical cost) - All values to be added as in the csv for 3A.
              plantDirectCost: {
                equipmentPurchaseCost: 50469000,
                otherDirectCost: {
                  installation: 20795000,
                  processPiping: 17664000,
                  instrumentation: 20188000,
                  insulation: 1514000,
                  electrical: 5047000,
                  buildings: 30282000,
                  yardImprovement: 7570000,
                  auxiliaryFacilities: 20188000,
                },
                // TPDC
                total: 173717000,
              },
              // 3B. Total Plant Indirect Cost (TPIC)
              plantIndirectCost: {
                engineering: 43429000,
                construction: 60801000,
                // TPIC
                total: 104230000,
              },
              // 3C. Total Plant Cost (TPC = TPDC+TPIC)
              totalPlantCost: 277948000,
              // 3D. Contractor's Fee & Contingency (CFC)
              miscellaneousCost: {
                contractorFee: 13897000,
                contingency: 27795000,
                // CFC = 12+13
                total: 41692000,
              },
              // 3E. Direct Fixed Capital Cost (DFC = TPC+CFC)
              totalCapital: 319640000,
            },
            // 11. PROFITABILITY ANALYSIS - Don't Add A. As that's already added above from 3E. Add the rest.
            workingCapital: 33206000,
            startupCapital: 15982000,
            upfrontRandDCapital: 0,
            upfrontRoyaltiesCapital: 0,
            // G. Investment Charged to This Project (Ignore F. as the value is just G.). Also, this should be the same value as capitalExpense
            totalCapexCost: 368828000,
          },
          otherFacilityCosts: 70935000,
          otherFacilityCostsSplit: {
            depreciation: 35912000,
            maintenance: 4781000,
            insurance: 3780000,
            localTaxes: 7560000,
            factoryExpense: 18901000,
          },
          mediaVolume: 253396983,
          otherMaterialsCost: 105862734,
          powerUsage: 3847186,
          steamUsage: 35908,
          coolingWaterUsage: 1338196,
          chilledWaterUsage: 110527,
          consumableCosts: 200000,
          wasteTreatmentCost: 3040000,
          laborHours: {
            main: 2240,
            upstream: 18140,
            downstream: 213,
          },
        },
      },
    },
  },
];

export const DEFAULT_PRODUCTION_COSTS: ProductionCosts = {
  mediaCost: 1.4,
  uspLaborCostPerHour: 46.0,
  mainLaborCostPerHour: 34.5,
  dspLaborCostPerHour: 57.5,
  electricityCost: 0.1,
  steamCost: 12,
  coolingWaterCost: 0.05,
  chilledWaterCost: 0.4,
  taxRate: 36,
  projectDuration: 25,
};
