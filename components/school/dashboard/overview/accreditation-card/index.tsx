import { StaffAccreditationStatus } from "@/types/school";
import { AccreditationChart } from "./chart";

type AccredicationCardProps = {
  accreditationStatus: StaffAccreditationStatus | undefined;
};

export const AccredicationCard = ({
  accreditationStatus,
}: AccredicationCardProps) => {
  return (
    <div className="school_card sm:pb-0 flex flex-col justify-between space-y-14">
      <div className="space-y-4">
        <p className="text-grey-500 text-base font-medium">Accreditation</p>
        <AccreditationChart status={accreditationStatus} />
      </div>
    </div>
  );
};
