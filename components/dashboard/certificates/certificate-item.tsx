import { Button } from "@/components/ui/button";
import { Accreditation } from "@/types/certificates";
import { downloadImage } from "@/utils/dashboard";
import { format } from "date-fns";
import { CalendarDaysIcon, DownloadIcon, HashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export const CertificateItem = ({
  certificate,
}: {
  certificate: Accreditation;
}) => {
  const isExpired = certificate.expiresAt
    ? new Date(certificate.expiresAt) < new Date()
    : false;

  const status = isExpired
    ? { label: "Expired", color: "#9CA3AF", bg: "#F3F4F6" }
    : { label: "Valid", color: "#16A34A", bg: "#DCFCE7" };

  const metadata = [
    {
      title: "Issued on",
      value: format(certificate.issuedAt ?? new Date(), "dd MMM yyyy"),
      icon: CalendarDaysIcon,
    },
    {
      title: "Valid till",
      value: format(certificate.expiresAt ?? new Date(), "dd MMM yyyy"),
      icon: CalendarDaysIcon,
    },
  ];

  return (
    <div
      className="rounded-xl overflow-hidden transition-shadow hover:shadow-md"
      style={{ border: "1px solid #E5E7EB" }}
    >
      {/* Image */}
      <div className="relative w-full h-[160px] bg-gray-50">
        <Image
          fill
          src={certificate.certificateImageUrl}
          className="object-cover"
          alt="certificate img"
        />
        <div
          className="absolute top-2.5 right-2.5 text-[10px] font-semibold rounded-full px-2.5 py-1"
          style={{ color: status.color, background: status.bg }}
        >
          {status.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-[13px] font-semibold text-gray-900 truncate">
            {certificate.certificateName ??
              "Personal Development Plan Certificate"}
          </h3>
          <div className="flex items-center gap-1 text-[10.5px] text-gray-400">
            <HashIcon size={11} />
            <span className="truncate">{certificate.certificateId}</span>
          </div>
        </div>

        <div className="space-y-1">
          {metadata.map((m) => (
            <div
              key={m.title}
              className="flex items-center justify-between text-[11px]"
            >
              <span className="text-gray-400">{m.title}</span>
              <span className="font-medium text-gray-600 flex items-center gap-1">
                <m.icon size={11} />
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-[#1A56DB] hover:bg-[#1A56DB]/90"
          onClick={() => {
            if (certificate.certificateImageUrl) {
              downloadImage(certificate.certificateImageUrl);
            } else {
              toast.error(
                "An error occured on our end. Please reach out to support",
              );
            }
          }}
        >
          <DownloadIcon size={16} />
          Download certificate
        </Button>
      </div>
    </div>
  );
};
