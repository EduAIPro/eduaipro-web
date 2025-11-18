import { StaffRenewals } from "@/types/school";
import { CertificateRenewalChart } from "./chart";

type CertificateRenewalCardProps = {
  renewals: StaffRenewals | undefined;
};

export const CertificateRenewalCard = ({
  renewals,
}: CertificateRenewalCardProps) => {
  return (
    <div className="school_card sm:pb-0 flex flex-col justify-between space-y-14">
      <div className="">
        <p className="text-grey-500 text-base font-medium">
          Certification Renewal
        </p>
        <CertificateRenewalChart renewals={renewals} />
      </div>
    </div>
  );
};
