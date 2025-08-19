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
import { StaffCourseProgress } from "@/types/school";
import { useMemo } from "react";

type CourseProgressChartProps = {
  progress: StaffCourseProgress | undefined;
};

const chartConfig = {
  totalPending: {
    label: "Total pending",
    color: "hsl(var(--chart-1))",
  },
  totalInProgress: {
    label: "Total in progress",
    color: "hsl(var(--chart-2))",
  },
  totalCompleted: {
    label: "Total completed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const CourseProgressChart = ({ progress }: CourseProgressChartProps) => {
  const chartData = useMemo(() => {
    let data = [{ totalPending: 700, totalInProgress: 0, totalCompleted: 0 }];
    if (progress) {
      data[0].totalPending =
        progress.totalPending > 0 ? progress.totalPending : 1;
      data[0].totalInProgress = progress.totalInProgress;
      data[0].totalCompleted = progress.totalCompleted;
    }
    return data;
  }, [progress]);

  const totalPercent = useMemo(() => {
    if (progress) {
      const totalStaff =
        progress.totalCompleted +
        progress.totalInProgress +
        progress.totalPending;
      const percentage = totalStaff
        ? ((progress.totalCompleted / totalStaff) * 100).toFixed(0)
        : 0;

      return percentage ? percentage : percentage;
    } else {
      return 0;
    }
  }, [progress]);

  console.log({ chartData });

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-auto w-full h-[450px] !p-0"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={180}
        outerRadius={320}
        width={45}
        className="!p-0"
      >
        <ChartTooltip cursor content={<ChartTooltipContent hideLabel />} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      {totalPercent}%
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
          dataKey="totalCompleted"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2 fill-green-600"
        />
        <RadialBar
          dataKey="totalInProgress"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2 fill-primary-300"
        />
        <RadialBar
          dataKey="totalPending"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2 fill-primary-50"
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
