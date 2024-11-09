"use client";

import React, { useState } from "react";
import { generateKey } from "@/utils/key";
import Typography from "../common/ui/Typography";
import courses from "./data.json";
import { ArrowRight, MedalStar, Profile2User, Video } from "iconsax-react";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function CoursesRender() {
  const [currPage, setCurrPage] = useState(1);
  const noPerPage = 12;
  const router = useRouter();
  // const allCourses = [...courses, ...courses, ...courses, ...courses];
  // const startingIndex = currPage === 1 ? 0 : currPage - 1 + noPerPage;

  return (
    <section className="grid lg:grid-cols-3 gap-6 lg:h-[80vh] sm:max-w-[90%] mx-auto">
      {courses.map((course) => (
        <div
          key={generateKey()}
          className={`rounded-lg h-full flex flex-col justify-between max-lg:gap-y-24 ${
            course.id == "1"
              ? "bg-primary-sch-course"
              : course.id === "2"
              ? "bg-high-sch-course"
              : "bg-uni-course"
          } bg-cover bg-center bg-blend-overlay px-4 sm:px-6 py-8`}
        >
          <div>
            <div className="flex gap-x-1 mt-1 items-center mb-3">
              <MedalStar
                className="w-5 h-5"
                width={10}
                height={10}
                color="#E0E0E0"
              />
              <Typography.P fontColor="light" size="small">
                Certified
              </Typography.P>
            </div>
            <Typography.H2 size="xlarge" fontColor="white" weight="semibold">
              {course.name}
            </Typography.H2>
            <div className="mt-4">
              <Typography.P fontColor="light" weight="medium">
                <strong className="text-grey-6">Topics taught:</strong>{" "}
                {course.topics
                  .map(
                    (value) => value.charAt(0).toUpperCase() + value.slice(1)
                  )
                  .join(", ")
                  .slice(0, 120) + "..."}
              </Typography.P>
            </div>
            <div className="flex items-center gap-x-4 mt-2 pb-3">
              <div className="flex items-center gap-x-1">
                <div className="w-fit">
                  <Video
                    className="w-5 h-5 text-grey-8"
                    width={10}
                    height={10}
                  />
                </div>
                <Typography.P fontColor="white" size="small">
                  {course.courseLength}
                </Typography.P>
              </div>
              <div className="flex items-center gap-x-1">
                <Profile2User
                  className="w-5 h-5 text-grey-8"
                  width={10}
                  height={10}
                />
                <Typography.P fontColor="white" size="small">
                  {course.students}
                </Typography.P>
              </div>
            </div>
          </div>
          <div>
            <Button
              size="4"
              className="!w-full btn border-2 border-red-700"
              onClick={() => router.push(`/courses/${encodeURI(course.name)}`)}
            >
              <Typography.P fontColor="white">Enroll</Typography.P>
              <ArrowRight strokeWidth={2} color="white" />
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
}
