"use client";
import CertificateIcon from "@/components/svgs/cert.svg";
// import CpdIcon from "@/components/svgs/cpd.svg";
import { generateKey } from "@/utils/key";

import { PublicCourse } from "@/types/course";
import { ArrowRightIcon, ClockIcon, UsersRoundIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type CourseProps = {
  course: PublicCourse;
};
export const Course = ({ course }: CourseProps) => {
  const router = useRouter();

  const list = [
    {
      title: `${course.completionDurationDays} days`,
      icon: <ClockIcon className="text-primary size-4" />,
    },
    {
      title: "Professional certificate",
      icon: <CertificateIcon />,
    },
    {
      title: `${course._count?.CourseProgress} enrolled`,
      icon: (
        <UsersRoundIcon
          strokeWidth={2}
          className="text-primary"
          width={16}
          height={16}
        />
      ),
    },
  ];
  return (
    <div className="border border-primary-150 rounded-xl p-2.5 space-y-4 flex flex-col justify-between">
      <div className="space-y-4">
        <div>
          <Image
            src={course.imageUrl || ""} // TODO: update course image urls
            width={370}
            height={250}
            alt="course img"
            className="w-full rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg text-grey-800 font-semibold capitalize">
            {course.title?.replaceAll("_", " ").toLowerCase()}
          </h3>
          <p className="text-grey-650 text-base">
            {course.description?.slice(0, 120) + "...."}
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
          {/* <CpdIcon /> */}
        </ul>
      </div>
      <Button
        onClick={() => router.push(`/courses/${course?.slug}`)}
        className="w-full"
      >
        <p className="text-base font-semibold">More info</p>
        <ArrowRightIcon />
      </Button>
    </div>
  );
};
