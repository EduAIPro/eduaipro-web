import { getCoursesPublicKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { GetPublicCourseList } from "@/types/course";
import { useMemo } from "react";
import useSWR from "swr";

/** courseId -> pathway title, from the public course list. */
export default function useSchoolPathways() {
  const { data } = useSWR<GetPublicCourseList>(
    getCoursesPublicKey,
    generalFetcher,
  );

  const pathways = useMemo(
    () => (data?.data ?? []).map((c) => ({ id: c.id, title: c.title })),
    [data],
  );
  const nameOf = (courseId: string | null | undefined) =>
    pathways.find((p) => p.id === courseId)?.title ?? null;

  return { pathways, nameOf };
}
