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

type CertificateRenewalChartProps = {};
const chartData = [
  { label: "overdueRenewals", value: 52, fill: "#0043BE" },
  { label: "upcomingRenewals", value: 28, fill: "#AFCAFC" },
];

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

export const CertificateRenewalChart = ({}: CertificateRenewalChartProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-[180px] w-full"
    >
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
    </ChartContainer>
  );
};
