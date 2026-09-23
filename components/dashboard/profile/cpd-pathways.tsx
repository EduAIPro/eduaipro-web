"use client";

import {
  getCourseWithProgress,
  getEnrollmentsKey,
  setActiveCourseKey,
} from "@/api/keys";
import { setActiveCourse } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useEnrollments from "@/hooks/use-enrollments";
import { isSchoolSeat } from "@/types/billing";
import useSubscription from "@/hooks/use-subscription";
import { Enrollment } from "@/types/enrollment";
import { format } from "date-fns";
import {
  BadgeIcon,
  GraduationCapIcon,
  HashIcon,
  LockIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type CpdPathwaysProps = {
  acceptedTermsAndConditions: boolean;
};

export const CpdPathways = ({
  acceptedTermsAndConditions,
}: CpdPathwaysProps) => {
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();
  const { subscription } = useSubscription(acceptedTermsAndConditions);
  const { enrollments, activeCourseId, entitlement, isLoading } =
    useEnrollments({ acceptedTermsAndConditions });
  const { trigger, isMutating } = useSWRMutation(
    setActiveCourseKey,
    setActiveCourse,
  );

  const seat = isSchoolSeat(subscription);

  const handleOpen = async (enrollment: Enrollment) => {
    if (enrollment.course.id === activeCourseId) {
      router.push("/dashboard");
      return;
    }
    try {
      await trigger({ courseId: enrollment.course.id });
      await Promise.all([
        globalMutate(getEnrollmentsKey),
        globalMutate(getCourseWithProgress),
      ]);
      router.push("/dashboard");
    } catch (error) {
      toast.error(error as string);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  const canAddMore = !!entitlement?.canAddPathway && !seat;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#1A56DB] bg-[#EFF6FF]">
            <GraduationCapIcon size={16} />
          </div>
          <h3 className="font-bold text-grey-800 md:text-lg">
            My CPD pathways
          </h3>
        </div>
        {seat && (
          <span className="text-xs text-gray-500">
            Your school administrator sees this same record
          </span>
        )}
      </div>

      <div className="space-y-3">
        {enrollments.map((enrollment) => {
          const isActive = enrollment.course.id === activeCourseId;
          const isCompleted = enrollment.status === "completed";

          return (
            <div
              key={enrollment.id}
              className="flex items-center gap-3 p-3.5 rounded-xl flex-wrap"
              style={{ border: "1px solid #E5E7EB" }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[#1A56DB] bg-[#EFF6FF]">
                <BadgeIcon size={16} />
              </div>

              <div className="min-w-[180px] flex-1">
                <p className="font-semibold text-sm text-grey-800 capitalize truncate">
                  {enrollment.course.title.replaceAll("_", " ").toLowerCase()}
                </p>
                <p className="text-xs text-gray-500">
                  {enrollment.course.cpdHours} CPD hours
                </p>
              </div>

              <div className="w-full sm:w-[160px] shrink-0">
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#1A56DB]"
                    style={{ width: `${Math.round(enrollment.progress)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {isCompleted
                    ? `Completed${
                        enrollment.completedAt
                          ? ` ${format(
                              new Date(enrollment.completedAt),
                              "dd MMM yyyy",
                            )}`
                          : ""
                      }`
                    : `${Math.round(enrollment.progress)}%${
                        enrollment.currentUnit
                          ? ` · Unit ${enrollment.currentUnit.index}`
                          : ""
                      }`}
                </p>
              </div>

              <div className="min-w-full sm:min-w-[140px] text-xs">
                {enrollment.certificate ? (
                  <div className="flex items-center gap-1 text-gray-600">
                    <HashIcon size={11} className="text-gray-500" />
                    <span className="truncate">
                      {enrollment.certificate.certificateId}
                    </span>
                  </div>
                ) : isCompleted ? (
                  <span
                    className="inline-flex items-center gap-1 text-[10.5px] font-semibold rounded-full px-2 py-1"
                    style={{ color: "#B45309", background: "#FEF3C7" }}
                  >
                    <LockIcon size={10} />
                    Ready to issue
                  </span>
                ) : (
                  <span className="text-gray-500">Not yet earned</span>
                )}
              </div>

              <Button
                variant={isActive ? "outline" : "default"}
                size="sm"
                disabled={isActive || (isMutating && !isActive)}
                loading={isMutating && !isActive}
                onClick={() => handleOpen(enrollment)}
              >
                {isActive ? "Active" : "Open"}
              </Button>
            </div>
          );
        })}
      </div>

      {canAddMore && (
        <Link
          href="/dashboard/pathways"
          className="flex items-center duration-300 transition-all hover:scale-95 gap-3 p-3.5 rounded-xl w-full"
          style={{ border: "1px dashed #CBD5E1" }}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-gray-500 bg-gray-100">
            <PlusIcon size={16} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-grey-800">
              Add another pathway
            </p>
            <p className="text-xs text-gray-500">
              Choose from the remaining CPD pathways available to you.
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};
