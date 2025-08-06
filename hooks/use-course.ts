import api from "@/api/base";
import { getCourseWithProgress } from "@/api/keys";
import { CourseWithProgress } from "@/types/course";
import { useMemo } from "react";
import useSWR from "swr";

export default function useCourse() {
  const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

  const { data, error, isLoading, mutate } = useSWR<CourseWithProgress>(
    getCourseWithProgress,
    fetcher
  );
  const { course, courseProgress } = useMemo(
    () => data ?? { course: null, courseProgress: null },
    [data]
  );
  return {
    course,
    courseProgress,
    isLoading,
    isError: !!error,
    refetch: () => mutate(data),
    error,
  };
}
