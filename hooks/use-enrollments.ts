import { getEnrollmentsKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { GetEnrollmentsResponse } from "@/types/enrollment";
import { useMemo } from "react";
import useSWR from "swr";

type UseEnrollmentsProps = {
  acceptedTermsAndConditions: boolean;
};

export default function useEnrollments({
  acceptedTermsAndConditions,
}: UseEnrollmentsProps) {
  const { data, error, isLoading, mutate } = useSWR<GetEnrollmentsResponse>(
    acceptedTermsAndConditions ? getEnrollmentsKey : null,
    generalFetcher,
  );

  const enrollments = useMemo(() => data?.enrollments ?? [], [data]);

  const activeEnrollment = useMemo(
    () =>
      enrollments.find(
        (e) => e.id === data?.activeCourseId || e.isActive,
      ) ??
      enrollments[0] ??
      null,
    [enrollments, data?.activeCourseId],
  );

  return {
    enrollments,
    activeEnrollment,
    activeCourseId: data?.activeCourseId ?? null,
    entitlement: data?.entitlement ?? null,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
    error,
  };
}