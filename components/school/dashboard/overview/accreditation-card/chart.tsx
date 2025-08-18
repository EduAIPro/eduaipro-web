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
const chartData = [{ browser: "safari", visitors: 200, fill: "#CB36CB" }];

type AccreditationChartProps = {};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const AccreditationChart = () => {
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
        <RadialBar dataKey="visitors" background cornerRadius={10} />
        <ChartLegend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          content={<ChartLegendContent nameKey="browser" />}
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
                      {chartData[0].visitors.toLocaleString()}
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
