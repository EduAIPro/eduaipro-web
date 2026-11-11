import { StaffAccreditationStatus } from "@/types/school";
import { LoaderIcon } from "lucide-react";
import { AccreditationChart } from "./chart";

type AccredicationCardProps = {
  accreditationStatus: StaffAccreditationStatus | undefined;
  isLoading?: boolean;
  hasError?: boolean;
};

export const AccredicationCard = ({
  accreditationStatus,
  isLoading = false,
  hasError = false,
}: AccredicationCardProps) => {
  return (
    <div className="school_card sm:pb-0 flex flex-col justify-between space-y-14">
      <div className="space-y-4">
        <p className="text-grey-500 text-base font-medium">Accreditation</p>
        {isLoading || hasError ? (
          <div className="flex h-[150px] items-center justify-center">
            {isLoading ? (
              <LoaderIcon className="animate-spin size-5" />
            ) : (
              <p className="text-center text-base">—</p>
            )}
          </div>
        ) : (
          <AccreditationChart status={accreditationStatus} />
        )}
      </div>
    </div>
  );
};
