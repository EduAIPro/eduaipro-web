// import CertificateIcon from "@/components/svgs/school/certificate.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Accreditation } from "@/types/certificates";
import { format } from "date-fns";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

type ProfileSheetProps = {
  certificate: Accreditation;
  progress: number;
  emailVerifiedAt: string;
  onBack: VoidFunction;
};

export const CertificateSheet = ({
  certificate,
  onBack,
  progress,
  emailVerifiedAt,
}: ProfileSheetProps) => {
  const certificateInfo = [
    {
      label: "Certificate name",
      value: certificate.certificateName,
    },
    {
      label: "Issuing Body",
      value: certificate.issuingBodyName,
    },
    {
      label: "Certificate ID",
      value: certificate.certificateId,
    },
  ];

  const timelineInfo = [
    {
      label: "Start date",
      value: emailVerifiedAt,
    },
    {
      label: "Deadline",
      value: certificate.issuedAt,
    },
  ];

  const progressInfo = [
    {
      label: "Accreditation status",
      value: progress === 100 ? "Accredited" : "Not accredited",
    },
    {
      label: "Compeletion status",
      value: progress,
    },
  ];

  const validityInfo = [
    {
      label: "Issue Date",
      value: certificate.createdAt,
    },
    {
      label: "Expiry Date",
      value: certificate.expiresAt,
    },
  ];

  return (
    <Fragment>
      <div className="space-y-4 -mt-10 animate-in">
        <div className="border-[2.5px] border-white rounded-xl size-[100px] flex items-center justify-center bg-[#F6F6F6]">
          <Image
            alt="Certificate image"
            src={certificate.certificateImageUrl}
            width={72}
            height={72}
            className="size-[72px]"
          />
          {/* <CertificateIcon
            strokeWidth={1}
            color="black"
            className="size-[72px]"
          /> */}
        </div>
        <div className="flex md:items-center justify-between max-md:flex-col gap-5">
          <div>
            <h2 className="text-grey-800 font-medium text-lg">
              {certificate.certificateName}
            </h2>
            <p className="text-sm font-medium text-grey-500">
              Certificate ID: {certificate.certificateId}
            </p>
          </div>
          <Button>
            <DownloadIcon />
            Download certificate
          </Button>
        </div>
      </div>
      <div className="pt-6 space-y-8">
        {/* certificate info  */}
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            Certificate information
          </h2>
          <ul className="space-y-2">
            {certificateInfo.map((p) => (
              <li key={p.label} className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-grey-500">{p.label}</h3>
                <p className="text-sm font-medium text-grey-800 text-left">
                  {p.value}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* course timeline  */}
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            Course timeline
          </h2>
          <ul className="space-y-2">
            {timelineInfo.map((p) => (
              <li key={p.label} className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-grey-500">{p.label}</h3>
                <p className="text-sm font-medium text-grey-800 text-left">
                  {typeof p.value !== "string"
                    ? format(p.value, "do MMMM, yyyy")
                    : p.value}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* progress  */}
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">Progress</h2>
          <ul className="space-y-2">
            {progressInfo.map((p, i) => (
              <li key={p.label} className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-grey-500">{p.label}</h3>
                {i === 0 ? (
                  <p
                    className={cn(
                      "text-sm font-medium text-left",
                      progress === 100 ? "text-green-700" : "text-amber-500"
                    )}
                  >
                    {p.value}
                  </p>
                ) : (
                  <div className="flex items-center gap-3 max-sm:w-1/2">
                    <div className="relative w-full sm:w-[220px] h-2 bg-grey-4 rounded-full">
                      <div
                        style={{ width: `${progress}%` }}
                        className={cn(
                          "absolute h-full rounded-full",
                          progress <= 50
                            ? "bg-amber-600"
                            : progress < 80
                            ? "bg-amber-400"
                            : "bg-green-700"
                        )}
                      ></div>
                    </div>

                    <p className="font-medium text-sm text-grey-500">
                      {progress}%
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* validity  */}
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">Validity</h2>
          <ul className="space-y-2">
            {validityInfo.map((p) => (
              <li key={p.label} className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-grey-500">{p.label}</h3>
                <p className="text-sm font-medium text-grey-800 text-left">
                  {format(p.value, "do MMMM, yyyy")}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex items-center sm:justify-end">
          <Button variant="outline" className="max-sm:w-full" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
