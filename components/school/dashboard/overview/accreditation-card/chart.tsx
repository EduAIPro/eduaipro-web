"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { StaffAccreditationStatus } from "@/types/school";
import { useMemo } from "react";
import { Pie, PieChart } from "recharts";

type AccreditationChartProps = {
  status: StaffAccreditationStatus | undefined;
};

export const AccreditationChart = ({ status }: AccreditationChartProps) => {
  const chartData = useMemo(() => {
    const value = [
      { label: "accredited", value: 0, fill: "#CB36CB" },
      { label: "notAccredited", value: 0, fill: "#FABEE8" },
    ];
    if (status) {
      value[0].value = status.totalAccreditedStaffs ?? 0;
      value[1].value = status.totalNonAccreditedStaffs ?? 0;
    }
    return value;
  }, [status]);

  console.log({ chartData });

  const chartConfig = {
    value: {
      label: "Accreditation",
    },
    accredited: {
      label: "Accredited",
      color: "#CB36CB",
    },
    notAccredited: {
      label: "Not accredited",
      color: "#FABEE8",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[150px] w-full !p-0"
    >
      {status?.totalAccreditedStaffs || status?.totalNonAccreditedStaffs ? (
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={25}
          />
          <ChartLegend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            content={<ChartLegendContent />}
            className="w-full flex-col gap-2 text-sm font-medium text-grey-500 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-base">No data available</p>
        </div>
      )}
    </ChartContainer>
  );
};
// export const AccreditationChart = ({ status }: AccreditationChartProps) => {
//   const chartData = useMemo(() => {
//     const value = [
//       { label: "Accredited", value: 0, fill: "#CB36CB" },
//       { label: "Not accredited", value: 0, fill: "#FABEE8" },
//     ];
//     if (status) {
//       value[0].value = status.totalAccreditedStaffs ?? 90;
//       value[1].value = status.totalNonAccreditedStaffs ?? 78;
//     }
//     return value;
//   }, [status]);

//   return (
//     <ChartContainer
//       config={chartConfig}
//       className="aspect-square max-h-[120px] w-full p-0"
//     >
//       <RadialBarChart
//         data={chartData}
//         startAngle={0}
//         endAngle={270}
//         innerRadius={50}
//         outerRadius={80}
//       >
//         <PolarGrid
//           gridType="circle"
//           radialLines={false}
//           stroke="none"
//           className="first:fill-[#FABEE8] last:fill-background"
//           polarRadius={[56, 44]}
//         />
//         <RadialBar dataKey="value" background cornerRadius={10} width={400} />
//         <ChartLegend
//           layout="vertical"
//           verticalAlign="middle"
//           align="right"
//           content={<ChartLegendContent nameKey="label" />}
//           className="w-full flex-col gap-2 text-sm font-medium text-grey-500 [&>*]:basis-1/4 [&>*]:justify-center"
//         />
//         <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
//           <Label
//             content={({ viewBox }) => {
//               if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                 return (
//                   <text
//                     x={viewBox.cx}
//                     y={viewBox.cy}
//                     textAnchor="middle"
//                     dominantBaseline="middle"
//                   >
//                     <tspan
//                       x={viewBox.cx}
//                       y={viewBox.cy}
//                       className="fill-foreground text-2xl font-bold"
//                     >
//                       {chartData[0].value.toLocaleString()}
//                     </tspan>
//                   </text>
//                 );
//               }
//             }}
//           />
//         </PolarRadiusAxis>
//       </RadialBarChart>
//     </ChartContainer>
//   );
// };
