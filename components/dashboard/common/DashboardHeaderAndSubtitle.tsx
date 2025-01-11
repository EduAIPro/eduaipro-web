import Typography from "@/components/common/ui/Typography";
import React from "react";

export default function DashboardHeaderAndSubtitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="border-b pb-4 border-grey-3">
      <Typography.H2 size="xl" weight="semibold">
        {title}
      </Typography.H2>
      {subtitle ? <Typography.P>{subtitle}</Typography.P> : null}
    </header>
  );
}
