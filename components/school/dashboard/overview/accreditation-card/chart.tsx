"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { StaffAccreditationStatus } from "@/types/school";
import { useMemo } from "react";

type AccreditationChartProps = {
  status: StaffAccreditationStatus | undefined;
};

const chartConfig = {
  visitors: {
    label: "Accrediatation status",
  },
  accredited: {
    label: "Accredited",
    color: "hsl(var(--chart-2))",
  },
  notAccredited: {
    label: "Safari",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const AccreditationChart = ({ status }: AccreditationChartProps) => {
  const chartData = useMemo(() => {
    const value = [
      { label: "Accredited", value: 0, fill: "#CB36CB" },
      { label: "Not accredited", value: 0, fill: "#FABEE8" },
    ];
    if (status) {
      value[0].value = status.totalAccreditedStaffs ?? 90;
      value[1].value = status.totalNonAccreditedStaffs ?? 78;
    }
    return value;
  }, [status]);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[120px] w-full p-0"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={270}
        innerRadius={50}
        outerRadius={80}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-[#FABEE8] last:fill-background"
          polarRadius={[56, 44]}
        />
        <RadialBar dataKey="value" background cornerRadius={10} width={400} />
        <ChartLegend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          content={<ChartLegendContent nameKey="label" />}
          className="w-full flex-col gap-2 text-sm font-medium text-grey-500 [&>*]:basis-1/4 [&>*]:justify-center"
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {chartData[0].value.toLocaleString()}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};
