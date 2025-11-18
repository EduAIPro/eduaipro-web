"use client";

import { generateKey } from "@/utils/key";

import { getCoursesPublicKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { GetPublicCourseList } from "@/types/course";
import useSWR from "swr";
import Pill from "../common/ui/Pill";
import { Course } from "../landing-page/CourseCard";
import { CourseLoader } from "./Loader";

export default function CoursesRender() {
  const { data, isLoading } = useSWR<GetPublicCourseList>(
    getCoursesPublicKey,
    generalFetcher
  );

  return (
    <section className="py-20 max-lg:px-5 lg:max-w-[90%] xl:max-w-[80%] mx-auto space-y-16 max-md:space-y-10">
      <div className="space-y-2 text-center">
        <Pill text="All courses" pillBg="#F1F5FF" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">
          Explore All Our Course Offerings
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <CourseLoader />
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <Course course={item} key={generateKey()} />
          ))
        ) : (
          <div className="col-span-full text-center py-40">
            <p>There are no available courses at this time</p>
          </div>
        )}
      </div>
    </section>
  );
}
