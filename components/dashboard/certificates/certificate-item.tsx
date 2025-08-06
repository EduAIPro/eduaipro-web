import { Button } from "@/components/ui/button";
import { Certificate } from "@/types/certificates";
import { downloadImage } from "@/utils/dashboard";
import { format } from "date-fns";
import { CalendarDaysIcon, DownloadIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export const CertificateItem = ({
  certificate,
}: {
  certificate: Certificate;
}) => {
  const metadata = [
    {
      title: "Certificate ID",
      value: certificate.certificateId,
    },
    {
      title: "Issued on",
      value: format(certificate.issuedAt ?? new Date(), "dd-MM-yyyy"),
    },
    {
      title: "Valid till",
      value: format(certificate.expiresAt ?? new Date(), "dd-MM-yyyy"),
    },
  ];
  return (
    <div className="border border-grey-400 rounded-lg p-2.5 flex items-center gap-5">
      <div className="shrink-0">
        <Image
          width={250}
          height={200}
          src={certificate.certificateImageUrl}
          className="rounded-lg"
          alt="certificate img"
        />
      </div>
      <div className="flex flex-col justify-between gap-5">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">
            {certificate.certificateName ??
              "Personal Development Plan Certificate"}
          </h3>
          <ul>
            {metadata.map((m, i) => (
              <li key={m.title} className="flex items-center gap-5 font-medium">
                <p className="text-grey-650">{m.title}:</p>
                <div className="flex items-center gap-1 text-grey-500">
                  {i > 0 ? <CalendarDaysIcon size={16} /> : null}
                  <p>{m.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Button
            onClick={() => {
              if (certificate.certificateImageUrl) {
                downloadImage(certificate.certificateImageUrl);
              } else {
                toast.error(
                  "An error occured on our end. Please reach out to support"
                );
              }
            }}
          >
            <DownloadIcon size={16} />
            <p>Download certificate</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
