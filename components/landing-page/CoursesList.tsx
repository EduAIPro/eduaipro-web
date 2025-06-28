import { generateKey } from "@/utils/key";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Pill from "../common/ui/Pill";
import courses from "../courses/data.json";
import { Button } from "../ui/button";
import { Course } from "./CourseCard";

export default function CoursesList() {
  return (
    <>
      <section className="py-20">
        <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto space-y-16">
          <div className="md:max-w-[60%] mx-auto text-center space-y-5">
            <Pill text="Our Available Courses" pillBg="#F1F5FF" />
            <h2 className="font-medium text-2xl sm:text-3xl md:text-4xl">
              Browse Through Our Top-Rated Courses
            </h2>
          </div>
          <div className="space-y-5">
            <div className="grid md:grid-cols-3 gap-5">
              {courses.slice(0, 3).map((item) => (
                <Course
                  course={{
                    ...item,
                    duration: item.overview.duration.totalHours,
                  }}
                  key={generateKey()}
                />
              ))}
            </div>
            <div className="md:w-fit mx-auto">
              <Link href="/courses">
                <Button className="max-md:w-full">
                  <p className="text-base font-semibold">View all</p>
                  <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
