"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type CourseProgressChartProps = {};

const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const CourseProgressChart = ({}: CourseProgressChartProps) => {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-auto w-full h-[450px] border !p-0"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={180}
        outerRadius={320}
        width={45}
        className="border-2 border-red-800 !p-0"
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis
          className="border-2 border-red-800"
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-4xl font-bold mb-2"
                    >
                      70%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground font-medium text-base mt-2"
                    >
                      Completed course
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-desktop)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          fill="var(--color-mobile)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          fill="var(--color-mobile)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          fill="var(--color-mobile)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
        <ChartLegend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          content={<ChartLegendContent nameKey="label" />}
          className="w-full flex-col gap-2 text-right text-sm text-black capitalize [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </RadialBarChart>
    </ChartContainer>
  );
};
