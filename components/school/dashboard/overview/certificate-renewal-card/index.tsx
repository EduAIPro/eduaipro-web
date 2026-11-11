import { StaffRenewals } from "@/types/school";
import { LoaderIcon } from "lucide-react";
import { CertificateRenewalChart } from "./chart";

type CertificateRenewalCardProps = {
  renewals: StaffRenewals | undefined;
  isLoading?: boolean;
  hasError?: boolean;
};

export const CertificateRenewalCard = ({
  renewals,
  isLoading = false,
  hasError = false,
}: CertificateRenewalCardProps) => {
  return (
    <div className="school_card sm:pb-0 flex flex-col justify-between space-y-14">
      <div className="">
        <p className="text-grey-500 text-base font-medium">
          Certification Renewal
        </p>
        {isLoading || hasError ? (
          <div className="flex h-[180px] items-center justify-center">
            {isLoading ? (
              <LoaderIcon className="animate-spin size-5" />
            ) : (
              <p className="text-center text-base">—</p>
            )}
          </div>
        ) : (
          <CertificateRenewalChart renewals={renewals} />
        )}
      </div>
    </div>
  );
};
