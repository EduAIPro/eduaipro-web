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
