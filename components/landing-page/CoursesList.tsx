import { generateKey } from "@/utils/key";
import { Button } from "@radix-ui/themes";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import Course from "../common/lib/Course";
import Pill from "../common/ui/Pill";
import Typography from "../common/ui/Typography";
import courses from "../courses/data.json";

export default function CoursesList() {
  return (
    <section className="responsive__section">
      <div className="flex flex-col gap-y-6 md:gap-y-12">
        <div className="text-center flex flex-col gap-y-8">
          <div>
            <div className="pb-4">
              <Pill text="BROWSE OUR COURSES" />
            </div>
            <Typography.H2
              weight="semibold"
              size="xlarge"
              className="max-sm:max-w-[360px] mx-auto"
            >
              Browse Through Our Top-Rated Courses
            </Typography.H2>
            {/* <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:w-full sm:items-center gap-x-6 mx-auto w-fit my-4">
              <div>
                <div className="max-sm:w-full shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-3 w-[300px] border border-grey-8/50 rounded-lg">
                  <SearchNormal1 className="h-4 w-4 font-semibold text-grey-11" />
                  <input
                    type="text"
                    placeholder="Search our courses"
                    className="outline-none text-base text-grey-11"
                  />
                </div>
              </div>
              <div className="max-sm:w-full">
                <button className="btn primary__btn max-sm:w-full">
                  <Typography.P fontColor="white">Search</Typography.P>
                </button>
              </div>
            </div> */}
          </div>
        </div>{" "}
        <div className="bg-accent-200/50 rounded-xl p-4 sm:py-12 sm:px-8 ">
          <div className="flex max-xl:flex-col justify-between gap-8">
            <div className="xl:w-1/6 xs:flex justify-between xl:flex-col gap-4 xl:justify-center">
              <div>
                <Typography.H2 size="xl" weight="semibold">
                  Explore Top Courses
                </Typography.H2>
                <Typography.P> Discover Our Best Courses</Typography.P>
              </div>

              <Button className="primary__btn btn max-xs:!mt-4">
                <Link href="/courses">
                  <Typography.P weight="semibold" fontColor="white">
                    View all
                  </Typography.P>
                </Link>
                <ArrowRight />
              </Button>
            </div>
            <div className="w-full max-md:flex-wrap flex justify-between gap-4 lg:gap-8">
              {courses.slice(0, 3).map((item) => (
                <Course courseItem={item} key={generateKey()} />
              ))}
            </div>
          </div>
        </div>
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 max-md:gap-y-4 md:gap-y-8 sm:mx-auto">
          {courses.map((item) => (
            <Course courseItem={item} key={generateKey()} />
          ))}
        </div> */}
        {/* <div className="flex max-sm:flex-col max-sm:gap-y-3 max-sm:w-full gap-x-4 sm:mx-auto w-fit">
          <Button variant="outline" className="btn sm:!w-44">
            <p className="font-semibold text-base">My courses</p>
          </Button>
          <Button className="primary__btn btn">
            <Typography.P weight="semibold" fontColor="white">
              View all courses
            </Typography.P>
            <ArrowRight />
          </Button>
        </div> */}
      </div>
    </section>
  );
}
