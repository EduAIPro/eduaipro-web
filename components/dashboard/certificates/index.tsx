import { listCertificates } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { ListCertificates } from "@/types/certificates";
import useSWR from "swr";
import { CertificateItem } from "./certificate-item";
import { EmptyCertificates } from "./empty";

export const Certificates = () => {
  const { data, isLoading } = useSWR<ListCertificates>(
    listCertificates,
    generalFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <section className="bg-white p-4 rounded-xl border border-grey-400 min-h-full">
      <div className="grid grid-cols-2 gap-6">
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
    </section>
  );
};

const CertificatesSkeleton = () => {
  return new Array(6)
    .fill("")
    .map((_, i) => (
      <Skeleton key={i} className="w-full h-[200px] rounded-lg" />
    ));
};
