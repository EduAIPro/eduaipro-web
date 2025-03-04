import Typography from "@/components/common/ui/Typography";
import { ReactNode } from "react";

export default function DashboardHeaderAndSubtitle({
  title,
  subtitle,
  rightElement,
}: {
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
}) {
  return (
    <header className="border-b pb-4 border-grey-3 flex sm:items-center max-sm:flex-col max-sm:gap-5 justify-between">
      <div>
        <Typography.H2 size="xl" weight="semibold">
          {title}
        </Typography.H2>
        {subtitle ? <Typography.P>{subtitle}</Typography.P> : null}
      </div>
      {rightElement ?? null}
    </header>
  );
}
