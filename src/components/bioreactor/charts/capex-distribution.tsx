 "use client";

 import { useEffect, useRef, useState } from "react";
 import * as d3 from "d3";
 import { CalculatedExpenses } from "@/types";
 import Title from "@/components/title";

 interface CapexSunburstChartProps {
   expenses: CalculatedExpenses;
 }

 interface HierarchyNode {
   name: string;
   value?: number;
   children?: HierarchyNode[];
 }

 const CapexSunburstChart = ({ expenses }: CapexSunburstChartProps) => {
   const svgRef = useRef<SVGSVGElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

   const formatCurrency = (value: number): string => {
     return new Intl.NumberFormat("en-US", {
       style: "currency",
       currency: "USD",
       minimumFractionDigits: 0,
       maximumFractionDigits: 0,
     }).format(value);
   };

   const prepareSunburstData = (
     capex: CalculatedExpenses["capex"]
   ): HierarchyNode => {
     return {
       name: "Total CAPEX",
       children: [
         {
           name: "A - Direct Fixed Capital",
           children: [
             {
               name: "A.1 - Equipment Purchase",
               value:
                 capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost,
             },
             {
               name: "A.2 - Other Direct Cost",
               value:
                 capex.directFixedCapital.plantDirectCost.total -
                 capex.directFixedCapital.plantDirectCost.equipmentPurchaseCost,
             },
             {
               name: "A.3 - Plant Indirect",
               value: capex.directFixedCapital.plantIndirectCost.total,
             },
             {
               name: "A.4 - Miscellaneous",
               value: capex.directFixedCapital.miscellaneousCost.total,
             },
           ],
         },
         {
           name: "B - Working Capital",
           value: capex.workingCapital,
         },
         {
           name: "C - Startup Capital",
           value: capex.startupCapital,
         },
       ],
     };
   };

   // Responsive resize handler
   useEffect(() => {
     const handleResize = () => {
       if (containerRef.current) {
         const { width } = containerRef.current.getBoundingClientRect();
         const height = Math.min(width, 500); // Max height of 500px
         setDimensions({ width, height });
       }
     };

     handleResize();
     window.addEventListener("resize", handleResize);
     return () => window.removeEventListener("resize", handleResize);
   }, []);

   const handleDownload = () => {
     if (!svgRef.current) return;

     const svgElement = svgRef.current;
     const serializer = new XMLSerializer();
     const svgString = serializer.serializeToString(svgElement);

     const canvas = document.createElement("canvas");
     const ctx = canvas.getContext("2d");
     const img = new Image();

     canvas.width = 600;
     canvas.height = 600;

     img.onload = () => {
       if (ctx) {
         ctx.fillStyle = "white";
         ctx.fillRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

         const link = document.createElement("a");
         link.download = "capex-sunburst-chart.png";
         link.href = canvas.toDataURL();
         link.click();
       }
     };

     const svgBlob = new Blob([svgString], {
       type: "image/svg+xml;charset=utf-8",
     });
     const url = URL.createObjectURL(svgBlob);
     img.src = url;
   };

   useEffect(() => {
     if (!svgRef.current || !expenses?.capex) return;

     const svg = d3.select(svgRef.current);
     svg.selectAll("*").remove();

     // Responsive dimensions
     const containerWidth = dimensions.width;
     const containerHeight = dimensions.height;
     const chartHeight = containerHeight * 0.8; // 70% for chart, 30% for legend
     const radius = Math.min(containerWidth, chartHeight) / 2 - 20;

     svg.attr("width", containerWidth).attr("height", containerHeight);

     const g = svg
       .append("g")
       .attr(
         "transform",
         `translate(${containerWidth / 2},${chartHeight / 2 + 10})`
       );

     // Create hierarchy
     const data = prepareSunburstData(expenses.capex);
     const root = d3
       .hierarchy(data)
       .sum((d) => d.value || 0)
       .sort((a, b) => (b.value || 0) - (a.value || 0));

     // Create partition layout
     const partition = d3
       .partition<HierarchyNode>()
       .size([2 * Math.PI, radius]);

     partition(root);

     // Color scheme with distinct shades
     const baseColors: Record<string, string> = {
       "A - Direct Fixed Capital": "#1f77b4",
       "B - Working Capital": "#ff7f0e",
       "C - Startup Capital": "#2ca02c",
     };

     const getColor = (
       d: d3.HierarchyRectangularNode<HierarchyNode>
     ): string => {
       if (d.depth === 1) {
         return baseColors[d.data.name] || "#666";
       } else if (d.depth === 2 && d.parent) {
         const parentName = d.parent.data.name;
         if (parentName === "A - Direct Fixed Capital") {
           const shades = ["#0d47a1", "#1565c0", "#42a5f5", "#90caf9"];
           const siblings = d.parent.children || [];
           const index = siblings.indexOf(d);
           return shades[index % shades.length] || "#1f77b4";
         }
       }
       return "#666";
     };

     // Create arcs
     const arc = d3
       .arc<d3.HierarchyRectangularNode<HierarchyNode>>()
       .startAngle((d) => d.x0 || 0)
       .endAngle((d) => d.x1 || 0)
       .innerRadius((d) => d.y0 || 0)
       .outerRadius((d) => d.y1 || 0);

     // Create tooltip
     const tooltip = d3
       .select("body")
       .append("div")
       .attr("class", "capex-tooltip")
       .style("position", "absolute")
       .style("background", "rgba(0, 0, 0, 0.9)")
       .style("color", "white")
       .style("padding", "10px")
       .style("border-radius", "6px")
       .style("font-size", "13px")
       .style("font-family", "system-ui")
       .style("pointer-events", "none")
       .style("opacity", 0)
       .style("z-index", 1000)
       .style("box-shadow", "0 4px 12px rgba(0,0,0,0.3)");

     // Draw sunburst segments
     g.selectAll("path")
       .data(root.descendants().filter((d) => d.depth > 0))
       .enter()
       .append("path")
       .attr("d", arc)
       .style("fill", (d) => getColor(d))
       .style("stroke", "#fff")
       .style("stroke-width", 2)
       .style("cursor", "pointer")
       .on("mouseover", function (event, d) {
         const target = event.target as SVGPathElement;
         const percentage = (
           ((d.value || 0) / (root.value || 1)) *
           100
         ).toFixed(1);

         d3.select(target).style("opacity", 0.8).style("stroke-width", 3);

         tooltip.transition().duration(200).style("opacity", 1);

         tooltip
           .html(
             `
          <div style="font-weight: bold; margin-bottom: 4px;">${
            d.data.name
          }</div>
          <div>Value: ${formatCurrency(d.value || 0)}</div>
          <div>Share: ${percentage}%</div>
        `
           )
           .style("left", event.pageX + 15 + "px")
           .style("top", event.pageY - 10 + "px");
       })
       .on("mouseout", function (event) {
         const target = event.target as SVGPathElement;
         d3.select(target).style("opacity", 1).style("stroke-width", 2);

         tooltip.transition().duration(300).style("opacity", 0);
       })
       .on("click", function (event, d) {
         console.log(
           `Clicked on: ${d.data.name}, Value: ${formatCurrency(d.value || 0)}`
         );
       });

     // Add text labels
     g.selectAll("text")
       .data(
         root.descendants().filter((d) => {
           if (d.depth === 0) return false;
           const angle = (d.x1 || 0) - (d.x0 || 0);
           const minAngle = d.depth === 1 ? 0.2 : 0.1;
           return angle > minAngle;
         })
       )
       .enter()
       .append("text")
       .attr("transform", (d) => {
         const angle = ((d.x0 || 0) + (d.x1 || 0)) / 2;
         const radius = ((d.y0 || 0) + (d.y1 || 0)) / 2;
         return `rotate(${
           (angle * 180) / Math.PI - 90
         }) translate(${radius},0)`;
       })
       .attr("dy", "0.35em")
       .style("text-anchor", "middle")
       .style("font-size", (d) => (d.depth === 1 ? "12px" : "10px"))
       .style("font-weight", "600")
       .style("font-family", "system-ui")
       .style("fill", "#fff")
       .style("pointer-events", "none")
       .text((d) => {
         const parts = d.data.name.split(" - ");
         return parts[0];
       });

     // Legend below chart
     const legendContainer = svg
       .append("g")
       .attr("class", "legend")
       .attr("transform", `translate(50, ${chartHeight + 20})`);

     const legendData = root
       .descendants()
       .filter((d) => d.depth > 0)
       .map((d) => ({
         name: d.data.name,
         color: getColor(d),
         value: d.value || 0,
         depth: d.depth,
       }));

     // Responsive legend layout
     const maxItemsPerColumn = 4;
     const itemsPerColumn = Math.min(
       maxItemsPerColumn,
       Math.ceil(legendData.length / 2)
     );
     const columnWidth = (containerWidth - 40) / 2;

     legendData.forEach((item, i) => {
       const column = Math.floor(i / itemsPerColumn);
       const row = i % itemsPerColumn;

       const legendItem = legendContainer
         .append("g")
         .attr("class", "legend-item")
         .attr("transform", `translate(${column * columnWidth}, ${row * 18})`);

       legendItem
         .append("rect")
         .attr("width", 12)
         .attr("height", 12)
         .attr("fill", item.color)
         .attr("stroke", "#fff")
         .attr("stroke-width", 1);

       legendItem
         .append("text")
         .attr("x", 18)
         .attr("y", 6)
         .attr("dy", "0.35em")
         .style("font-size", "11px")
         .style("font-family", "system-ui")
         .style("fill", "#333")
         .style("font-weight", item.depth === 1 ? "600" : "400")
         .text(() => {
           const percentage = (
             ((item.value || 0) / expenses.capex.totalCapexCost) *
             100
           ).toFixed(1);
           const shortName = item.name.replace(/^[A-C]\.?[0-9]?\s*-\s*/, "");
           return `${shortName} (${percentage}%)`;
         });
     });

     return () => {
       tooltip.remove();
     };
   }, [expenses, dimensions]);

   return (
     <div className='h-full flex flex-col pb-2'>
       <div className='flex justify-between items-start w-full'>
         <div className='flex gap-x-2'>
           <Title title={"CAPEX Distribution"} />
           <button
             onClick={handleDownload}
             className='flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-blue-600 transition-colors border border-gray-300 rounded hover:border-blue-300'
             aria-label='Download chart as PNG'
           >
             <svg
               width='12'
               height='12'
               viewBox='0 0 24 24'
               fill='currentColor'
             >
               <path d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' />
             </svg>
             PNG
           </button>
         </div>
       </div>

       <div
         ref={containerRef}
         className='flex-1 relative h-full flex items-center justify-center'
         aria-label='Sunburst chart showing hierarchical distribution of capital expenses'
         style={{ minHeight: "400px" }}
       >
         <svg ref={svgRef} className='max-w-full max-h-full'></svg>
       </div>
     </div>
   );
 };

 export default CapexSunburstChart;