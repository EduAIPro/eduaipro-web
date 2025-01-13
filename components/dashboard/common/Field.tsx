import Typography from "@/components/common/ui/Typography";
import React from "react";

export default function Field({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex p-2 items-center justify-between border rounded-lg">
      <Typography.H4 size="base" weight="medium">
        {title}
      </Typography.H4>
      <Typography.P size="small">{value}</Typography.P>
    </div>
  );
}
