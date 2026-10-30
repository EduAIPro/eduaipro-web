"use client";

import {
  getCourseWithProgress,
  getEnrollmentsKey,
  setActiveCourseKey,
} from "@/api/keys";
import { setActiveCourse } from "@/api/mutations";
import { cn } from "@/lib/utils";
import { Enrollment } from "@/types/enrollment";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type PathwaySwitcherProps = {
  enrollments: Enrollment[];
  activeCourseId: string | null;
  onSwitched?: () => void;
};

export function PathwaySwitcher({
  enrollments,
  activeCourseId,
  onSwitched,
}: PathwaySwitcherProps) {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    setActiveCourseKey,
    setActiveCourse,
  );
  const [pendingId, setPendingId] = useState<string | null>(null);

  if (enrollments.length <= 1) return null;

  const handleSwitch = async (enrollment: Enrollment) => {
    if (enrollment.course.id === activeCourseId || isMutating) return;

    setPendingId(enrollment.id);
    try {
      await trigger({ courseId: enrollment.course.id });
      await Promise.all([
        mutate(getEnrollmentsKey),
        mutate(getCourseWithProgress),
      ]);
      onSwitched?.();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1" id="pathway-switcher">
      {enrollments.map((enrollment) => {
        const isActive = enrollment.course.id === activeCourseId;
        return (
          <button
            key={enrollment.id}
            type="button"
            onClick={() => handleSwitch(enrollment)}
            disabled={isMutating}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-medium transition-colors disabled:opacity-60",
              isActive
                ? "border-[#1A56DB] bg-[#1A56DB] text-white"
                : "border-[#E5E7EB] bg-white text-gray-600 hover:bg-gray-50",
            )}
          >
            {isActive && <CheckIcon size={12} />}
            <span className="capitalize">
              {enrollment.course.title.replaceAll("_", " ").toLowerCase()}
            </span>
            <span
              className={cn(
                "text-[10px]",
                isActive ? "text-white/75" : "text-gray-400",
              )}
            >
              {enrollment.status === "completed"
                ? "Completed"
                : `${Math.round(enrollment.progress)}%`}
            </span>
            {pendingId === enrollment.id && isMutating && (
              <span className="text-[10px] italic">Switching…</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
