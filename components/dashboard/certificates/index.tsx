import { listCertificates } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { ListCertificates } from "@/types/certificates";
import { FileBadgeIcon } from "lucide-react";
import useSWR from "swr";
import { CertificateItem } from "./certificate-item";
import { EmptyCertificates } from "./empty";

export const Certificates = () => {
  const { data, isLoading } = useSWR<ListCertificates>(
    listCertificates,
    generalFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const count = data?.data?.length ?? 0;

  return (
    <section
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: "1px solid #E5E7EB", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-4"
        style={{ borderBottom: "1px solid #F3F4F6" }}
      >
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#1A56DB]">
          <FileBadgeIcon size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">
            Earned certificates
          </h4>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {isLoading
              ? "Loading…"
              : `${count} certificate${count !== 1 ? "s" : ""} earned`}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <CertificatesSkeleton />
          ) : data?.data?.length ? (
            data.data.map((cert) => (
              <CertificateItem key={cert.id} certificate={cert} />
            ))
          ) : (
            <EmptyCertificates />
          )}
        </div>
      </div>
    </section>
  );
};

const CertificatesSkeleton = () => {
  return new Array(4)
    .fill("")
    .map((_, i) => (
      <Skeleton key={i} className="w-full h-[280px] rounded-xl" />
    ));
};
