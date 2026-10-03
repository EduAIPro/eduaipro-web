import React from "react";
import Typography from "../common/ui/Typography";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ModalTitleAndDesc({
  Icon,
  title,
  description,
  step,
  totalSteps,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
  /** 1-indexed current step, renders the progress dots when provided alongside totalSteps */
  step?: number;
  totalSteps?: number;
}) {
  return (
    <div className="border-b pb-4 border-b-grey-3">
      {!!totalSteps && (
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <i
              key={idx}
              className={cn(
                "h-1 flex-1 rounded-full",
                idx < (step ?? 0) ? "bg-primary-300" : "bg-grey-3",
              )}
            />
          ))}
        </div>
      )}
      <div className="p-2.5 w-fit rounded-full bg-primary-300/10 mb-3">
        <Icon size={20} className="text-primary-300" />
      </div>
      <Typography.H3 weight="semibold" size="large" className="mb-1">
        {title}
      </Typography.H3>
      <Typography.P size="small" fontColor="grey" className="leading-relaxed">
        {description}
      </Typography.P>
    </div>
  );
}
