import { generateKey } from "@/utils/key";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import Pill from "../common/ui/Pill";
import courses from "../courses/data.json";
import { Button } from "../ui/button";

export default function CoursesList() {
  return (
    <>
      <section className="py-20">
        <div className="max-w-[80%] mx-auto space-y-16">
          <div className="max-w-[60%] mx-auto text-center space-y-5">
            <Pill text="Our Available Courses" pillBg="#F1F5FF" />
            <h2 className="font-medium text-4xl">
              Browse Through Our Top-Rated Courses
            </h2>
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-5">
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
            <div className="w-fit mx-auto">
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

import Community from "@/components/svgs/community.svg";
import CpdIcon from "@/components/svgs/cpd.svg";
import Link from "next/link";

type CourseProps = {
  course: {
    name: string;
    img: string;
    description: string;
    students: string;
    duration: number;
  };
};
const Course = ({ course }: CourseProps) => {
  const list = [
    {
      title: `${course.duration} hours`,
      icon: <ClockIcon className="text-primary size-4" />,
    },
    {
      title: "Professional certificate",
      icon: <CpdIcon width={16} height={16} />,
    },
    {
      title: `${course.students} enrolled`,
      icon: <Community width={16} height={16} />,
    },
  ];
  return (
    <div className="border border-primary-150 rounded-xl p-2.5 space-y-4">
      <div>
        <Image
          src={course.img}
          width={370}
          height={250}
          alt="course img"
          className="w-full rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg text-grey-800 font-semibold">{course.name}</h3>
        <p className="text-grey-650 text-base">
          {course.description.slice(0, 120) + "...."}
        </p>
      </div>
      <ul className="flex items-center flex-wrap gap-2.5">
        {list.map((l) => (
          <li
            key={generateKey()}
            className="rounded-full w-fit flex items-center gap-2 bg-primary-100 px-2 py-1"
          >
            {l.icon}
            <p className="text-base text-primary font-medium">{l.title}</p>
          </li>
        ))}
      </ul>
      <Button className="w-full">
        <p className="text-base font-semibold">Enroll now</p>
        <ArrowRightIcon />
      </Button>
    </div>
  );
};
