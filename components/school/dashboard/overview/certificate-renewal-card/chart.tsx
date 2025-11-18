"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { StaffRenewals } from "@/types/school";
import { useMemo } from "react";

type CertificateRenewalChartProps = {
  renewals: StaffRenewals | undefined;
};

const chartConfig = {
  value: {
    label: "Renewals",
  },
  overdueRenewals: {
    label: "Overdue Renewals",
    color: "#0043BE",
  },
  upcomingRenewals: {
    label: "Upcoming Renewals",
    color: "#AFCAFC",
  },
} satisfies ChartConfig;

export const CertificateRenewalChart = ({
  renewals,
}: CertificateRenewalChartProps) => {
  const chartData = useMemo(() => {
    const value = [
      { label: "overdueRenewals", value: 0, fill: "#0043BE" },
      { label: "upcomingRenewals", value: 0, fill: "#AFCAFC" },
    ];

    if (renewals) {
      value[0].value = renewals?.overdueRenewals;
      value[1].value = renewals?.upcomingRenewals;
    }
    return value;
  }, [renewals]);
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[180px] w-full"
    >
      {renewals?.overdueRenewals || renewals?.upcomingRenewals ? (
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={30}
          />
          <ChartLegend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            content={<ChartLegendContent />}
            className="w-full flex-col gap-2 font-medium text-sm text-grey-500 [&>*]:basis-1/4 [&>*]:justify-center"
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
