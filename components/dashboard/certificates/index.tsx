import { listCertificates } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { SubscribeModal, SubscribeTarget } from "@/components/dashboard/subscribe-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useEnrollments from "@/hooks/use-enrollments";
import useUser from "@/hooks/use-user";
import { ListCertificates } from "@/types/certificates";
import { Enrollment } from "@/types/enrollment";
import { Staff } from "@/types/user";
import { FileBadgeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { CertificateItem } from "./certificate-item";
import { EmptyCertificates } from "./empty";
import { PendingCertificateItem } from "./pending-certificate-item";

export const Certificates = () => {
  const { data, isLoading } = useSWR<ListCertificates>(
    listCertificates,
    generalFetcher,
    {
      revalidateOnFocus: false,
    },
  );
  const { staff } = useUser();
  const { enrollments, entitlement } = useEnrollments({
    acceptedTermsAndConditions: !!(staff as Staff)?.acceptedTermsAndConditions,
  });
  const [upgradeTarget, setUpgradeTarget] = useState<SubscribeTarget | null>(
    null,
  );

  const pendingEnrollments = enrollments.filter(
    (e) => e.status === "completed" && !e.certificate,
  );

  const openIssueUpgrade = (enrollment: Enrollment) =>
    setUpgradeTarget({
      courseId: enrollment.course.id,
      title: enrollment.course.title,
      reason: "issue_certificate",
    });

  const count = data?.data?.length ?? 0;
  const hasAny = count > 0 || pendingEnrollments.length > 0;

  return (
    <section
      className="bg-white rounded-xl overflow-hidden"
      style={{
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <CertificatesSkeleton />
          ) : hasAny ? (
            <>
              {pendingEnrollments.map((enrollment) => (
                <PendingCertificateItem
                  key={enrollment.id}
                  enrollment={enrollment}
                  onSubscribe={openIssueUpgrade}
                />
              ))}
              {data?.data?.map((cert) => (
                <CertificateItem key={cert.id} certificate={cert} />
              ))}
              {entitlement?.canAddPathway && (
                <Link
                  href="/dashboard/pathways"
                  className="rounded-xl flex flex-col items-center justify-center gap-2 text-center p-6 min-h-[280px]"
                  style={{ border: "1px dashed #CBD5E1" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1A56DB]">
                    <PlusIcon size={20} />
                  </div>
                  <h3 className="text-[13px] font-semibold text-gray-900">
                    Earn another certificate
                  </h3>
                  <p className="text-[10.5px] text-gray-500 max-w-[200px]">
                    Choose from the remaining CPD pathways available to you.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 pointer-events-none"
                  >
                    Choose a pathway
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <EmptyCertificates />
          )}
        </div>
      </div>

      <SubscribeModal
        target={upgradeTarget}
        onOpenChange={(open) => !open && setUpgradeTarget(null)}
      />
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
