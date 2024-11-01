import { StarIcon } from "@/components/svgs";
import { Course as CourseType } from "@/types/app";
import Image from "next/image";
import React from "react";
import Typography from "../ui/Typography";
import { generateKey } from "@/utils/key";
import { MedalStar, Profile2User, Video } from "iconsax-react";

export default function Course({
  courseItem,
  coursesPage,
}: {
  courseItem: CourseType;
  coursesPage?: boolean;
}) {
  return (
    <div
      className={`bg-white p-3 relative w-full ${
        !coursesPage ? "sm:max-w-xs" : ""
      } course_card`}
    >
      {courseItem.isNew ? (
        <div className="rounded-md border absolute left-5 px-1 pt-[2px] top-5 bg-white border-gray-500 flex gap-x-1">
          <StarIcon />
          <Typography.H2 size="small">New</Typography.H2>
        </div>
      ) : null}
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-y-4">
          <div>
            <Image
              src={"/assets/images/course.png"}
              alt="course image"
              width={400}
              height={250}
              className="rounded-lg max-sm:w-full"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-wrap gap-2">
              {courseItem.categories.map((category) => (
                <div
                  key={generateKey()}
                  className="w-fit py-1 px-2 rounded-md bg-brand-1001/80"
                >
                  <Typography.P
                    className="capitalize"
                    fontColor="white"
                    size="small"
                  >
                    {category}
                  </Typography.P>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-4">
              <div>
                <Typography.H2 size="large" fontColor="large" weight="semibold">
                  {courseItem.title}
                </Typography.H2>
                <div className="flex gap-x-1 mt-1 items-center">
                  <MedalStar
                    className="w-5 h-5"
                    width={10}
                    height={10}
                    color="#000080"
                  />
                  <Typography.P fontColor="brand" size="small">
                    Certified
                  </Typography.P>
                </div>
                {coursesPage ? (
                  <div className="mt-4">
                    <Typography.P fontColor="grey" weight="medium" size="small">
                      <strong className="text-grey-11">Topics taught:</strong>{" "}
                      {courseItem.topics
                        .map(
                          (value) =>
                            value.charAt(0).toUpperCase() + value.slice(1)
                        )
                        .join(", ")
                        .slice(0, 100) + "..."}
                    </Typography.P>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-9 pb-3">
          <div className="flex items-center gap-x-1">
            <div className="w-fit">
              <Video className="w-5 h-5 text-grey-9" width={10} height={10} />
            </div>
            <Typography.P fontColor="medium" size="small">
              {courseItem.courseLength}
            </Typography.P>
          </div>
          <div className="flex items-center gap-x-1">
            <Typography.P fontColor="medium" size="small">
              {courseItem.students}
            </Typography.P>
            <div className="w-fit">
              <Profile2User
                className="w-5 h-5 text-grey-9"
                width={10}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
