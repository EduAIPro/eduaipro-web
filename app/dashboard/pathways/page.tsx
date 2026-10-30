"use client";

import { enrollPathwayKey, getEnrollmentsKey } from "@/api/keys";
import { enrollInPathway } from "@/api/mutations";
import { PathwayCard } from "@/components/dashboard/pathways/pathway-card";
import {
  SubscribeModal,
  SubscribeTarget,
} from "@/components/dashboard/subscribe-modal";
import { Skeleton } from "@/components/ui/skeleton";
import usePathways from "@/hooks/use-pathways";
import { isSubscriptionRequiredError, Pathway } from "@/types/enrollment";
import { GraduationCapIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export default function PathwaysPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { pathways, entitlement, isLoading } = usePathways();
  const { trigger, isMutating } = useSWRMutation(
    enrollPathwayKey,
    enrollInPathway,
  );
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [upgradeTarget, setUpgradeTarget] = useState<SubscribeTarget | null>(
    null,
  );

  const openUpgrade = (pathway: Pathway) =>
    setUpgradeTarget({
      courseId: pathway.id,
      title: pathway.title,
      reason: "add_pathway",
    });

  const handleEnroll = async (pathway: Pathway) => {
    setEnrollingId(pathway.id);
    try {
      await trigger({ courseId: pathway.id });
      await mutate(getEnrollmentsKey);
      router.push("/dashboard");
    } catch (error) {
      if (isSubscriptionRequiredError(error)) {
        openUpgrade(pathway);
      } else {
        toast.error(error as string);
      }
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Choose your next pathway
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Your completed pathways and certificates stay exactly as they are.
          {entitlement && !entitlement.canAddPathway
            ? " Enrolling in another pathway needs an active subscription."
            : ""}
        </p>
      </div>

      <section
        className="bg-white rounded-xl overflow-hidden"
        style={{
          border: "1px solid #E5E7EB",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="flex items-center gap-2.5 px-4 py-4"
          style={{ borderBottom: "1px solid #F3F4F6" }}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#1A56DB]">
            <GraduationCapIcon size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">CPD pathways</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {pathways.length} pathway{pathways.length !== 1 ? "s" : ""}{" "}
              &middot; CPD Accredited
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <PathwaysSkeleton />
            ) : (
              pathways.map((pathway) => (
                <PathwayCard
                  key={pathway.id}
                  pathway={pathway}
                  onEnroll={handleEnroll}
                  onUpgrade={openUpgrade}
                  isEnrolling={isMutating && enrollingId === pathway.id}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <SubscribeModal
        target={upgradeTarget}
        onOpenChange={(open) => !open && setUpgradeTarget(null)}
      />
    </>
  );
}

const PathwaysSkeleton = () => {
  return new Array(6)
    .fill("")
    .map((_, i) => (
      <Skeleton key={i} className="w-full h-[280px] rounded-xl" />
    ));
};
