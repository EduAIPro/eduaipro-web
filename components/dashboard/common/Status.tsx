import Typography from "@/components/common/ui/Typography";
import React from "react";

export default function Status({
  text,
  status,
}: {
  text?: string;
  status: "success" | "pending" | "failed" | "warning";
}) {
  const statuses = {
    success: "border-success/50 bg-success/5",
    warning: "border-warning/50 bg-warning/5",
    failed: "border-error/50 bg-error/5",
    pending: "border-gray-500/60 bg-gray-500/10",
  };
  return (
    <div className={`${statuses[status]} border rounded-md p-1`}>
      <Typography.H1
        className={`${
          status === "success"
            ? "text-green-700"
            : status === "pending"
            ? "text-gray-700"
            : status === "warning"
            ? "text-yellow-700"
            : "text-red-700"
        }`}
        size="xsmall"
      >
        {text ?? status}
      </Typography.H1>
    </div>
  );
}
