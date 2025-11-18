import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import { TotalAccreditedAggregate } from "@/types/admin";
import { AccreditationChart } from "./chart";

type AccreditationCardProps = {
  isLoading: boolean;
  status: TotalAccreditedAggregate | undefined;
};

export const AccreditationCard = ({
  isLoading,
  status,
}: AccreditationCardProps) => {
  return (
    <div className="school_card">
      <p className="text-grey-500 text-base font-medium">Accreditation</p>
      {isLoading ? <ChartSkeleton /> : <AccreditationChart status={status} />}
    </div>
  );
};
