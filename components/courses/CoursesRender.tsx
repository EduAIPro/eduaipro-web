"use client";

import { generateKey } from "@/utils/key";
import { Button } from "@radix-ui/themes";
import { ArrowRight, Profile2User, Video } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import courses from "../common/data/courses.json";
import Typography from "../common/ui/Typography";

import Image from "next/image";

// ${
//   course.id == "1"
//     ? "bg-primary-sch-course"
//     : course.id === "2"
//     ? "bg-high-sch-course"
//     : course.id === "3"
//     ? "bg-uni-course"
//     : course.id === "5"
//     ? "bg-assistant-course"
//     : "bg-auth-mentor"
// }

export default function CoursesRender() {
  const [currPage, setCurrPage] = useState(1);
  const noPerPage = 12;
  const router = useRouter();
  // const allCourses = [...courses, ...courses, ...courses, ...courses];
  // const startingIndex = currPage === 1 ? 0 : currPage - 1 + noPerPage;

  return (
    <section className="flex items-center flex-wrap justify-center gap-4 mx-auto">
      {courses.map((course) => (
        <div
          key={generateKey()}
          className="rounded-lg min-h-[500px] border-2 border-blue-900 sm:w-[48%] hover:scale-105 duration-500 lg:w-[30%] flex flex-col justify-between max-lg:gap-y-24 bg-gradient-to-b from-black/40 to-black/60"
        >
          <div className="w-full h-[300px]">
            <Image
              src={course.img}
              width={500}
              height={250}
              className="rounded-t-lg"
              alt=""
            />
          </div>
          <div className="px-4 sm:px-6 pb-8">
            <div>
              <div className="flex mb-2 items-center -ml-3">
                <Image
                  className="w-12 h-6"
                  width={40}
                  height={40}
                  src="/assets/images/cpd_certified.png"
                  alt="Certification"
                />
                <Typography.P fontColor="white" size="small" className="-ml-1">
                  Certified
                </Typography.P>
              </div>
              <Typography.H2 size="xl" fontColor="white" weight="semibold">
                {course.name}
              </Typography.H2>
              <div className="mt-4">
                <Typography.P
                  fontColor="light"
                  weight="medium"
                  className="line-clamp-4"
                >
                  <strong className="text-grey-6">Skills taught:</strong>{" "}
                  {course.skillsAndCompetencies
                    .map((value) => value.title)
                    .join(", ")}
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
                    {course.overview.duration.totalHours} hours
                  </Typography.P>
                </div>
                <div className="flex items-center gap-x-1">
                  <Profile2User
                    className="w-5 h-5 text-grey-8"
                    width={10}
                    height={10}
                  />
                  <Typography.P fontColor="white" size="small">
                    400
                  </Typography.P>
                </div>
              </div>
            </div>
            <div>
              <Button
                size="4"
                className="!w-full btn border-2 border-red-700"
                onClick={() =>
                  router.push(`/courses/${encodeURI(course.name)}`)
                }
              >
                <Typography.P fontColor="white">Enroll</Typography.P>
                <ArrowRight strokeWidth={2} color="white" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
