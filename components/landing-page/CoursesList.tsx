import Image from "next/image";
import React from "react";
import Typography from "../common/ui/Typography";
import { StarIcon } from "../svgs";
import { courses } from "./data";
import { generateKey } from "@/utils/key";
import {
  ArrowRight,
  MedalStar,
  Profile2User,
  SearchNormal1,
  Video,
} from "iconsax-react";
import Pill from "../common/ui/Pill";
import { Button } from "@radix-ui/themes";

export default function CoursesList() {
  return (
    <section className="responsive__section">
      <div className="flex flex-col gap-y-12">
        <div className="text-center flex flex-col gap-y-8">
          <div>
            <div className="pb-4">
              <Pill text="BROWSE OUR COURSES" />
            </div>
            <Typography.H2 weight="semibold" size="xlarge">
              Browse Through Our Top-Rated Courses
            </Typography.H2>
            <div className="flex items-center gap-x-6 mx-auto w-fit my-4">
              <div>
                <div className=" shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-3 w-[300px] border border-grey-8/50 rounded-lg">
                  <SearchNormal1 className="h-4 w-4 font-semibold text-grey-11" />
                  <input
                    type="text"
                    placeholder="Search our courses"
                    className="outline-none text-base text-grey-11"
                  />
                </div>
              </div>
              <div>
                <button className="btn primary__btn">
                  <Typography.P fontColor="white">Search</Typography.P>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 mx-auto">
          {[...courses, ...courses].map((item) => (
            <div
              key={generateKey()}
              className="bg-white p-3 relative max-w-xs course_card"
            >
              {item.isNew ? (
                <div className="rounded-md border absolute left-5 px-1 pt-[2px] top-5 bg-white border-gray-500 flex gap-x-1">
                  <StarIcon />
                  <Typography.H2 size="small">New</Typography.H2>
                </div>
              ) : null}
              <div className="flex flex-col gap-y-4">
                <div>
                  <Image
                    src={"/assets/images/course.png"}
                    alt="course image"
                    width={400}
                    height={250}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-wrap gap-x-2">
                    {item.categories.map((category) => (
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
                      <Typography.H2
                        size="large"
                        fontColor="large"
                        weight="semibold"
                      >
                        {item.title}
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
                    </div>
                    <div className="flex items-center justify-between mt-5 pb-3">
                      <div className="flex items-center gap-x-1">
                        <div className="w-fit">
                          <Video
                            className="w-5 h-5 text-grey-9"
                            width={10}
                            height={10}
                          />
                        </div>
                        <Typography.P fontColor="medium" size="small">
                          {item.courseLength}
                        </Typography.P>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <Typography.P fontColor="medium" size="small">
                          {item.students}
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
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-x-4 mx-auto w-fit">
          <Button variant="outline" className="btn !w-44">
            <p className="font-semibold text-base">My courses</p>
          </Button>
          <Button className="primary__btn btn">
            <Typography.P weight="semibold" fontColor="white">
              View all
            </Typography.P>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
