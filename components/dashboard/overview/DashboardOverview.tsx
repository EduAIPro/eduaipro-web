import Typography from "@/components/common/ui/Typography";
import React from "react";
import OverviewItem from "./OverviewItem";
import { BiTask } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import Image from "next/image";

const DashboardOverview = () => {
  return (
    <div className="flex flex-col gap-2 md:px-2">
      <Typography.H5 className="font-semibold text-lg">
        Dashboard Overview
      </Typography.H5>

      {/* overview items */}
      <div className="flex justify-between flex-wrap gap-y-3">
        <OverviewItem
          title="Tests"
          digits="4"
          Icon={<BiTask size={24} className="text-brand-1001" />}
        />
        <OverviewItem
          title="Exams"
          digits="2"
          Icon={<AiOutlineFileText size={24} className="text-brand-1001" />}
        />
        <OverviewItem title="Accreditation status" status="In progress" />
      </div>

      {/* active courses */}
      <div className="flex flex-col gap-2 mt-10">
        <Typography.H5 className="font-semibold">Recent Courses</Typography.H5>

        <ul className="flex flex-col gap-3">
          {recentCourses.map((item) => (
            <li className="flex items-center gap-2 bg-white shadow-lg p-2 rounded-md">
              <Image
                className="w-20 h-16 md:w-28 md:h-20 object-cover"
                height={200}
                width={200}
                src={item.image}
                alt={item.title}
              />
              <div className="flex flex-col gap-2 justify-around flex-1">
                <div>
                  <Typography.H5 className="font-semibold">
                    {item.title}
                  </Typography.H5>
                  <Typography.P className="text-grey-10 text-sm line-clamp-1">
                    {item.description}
                  </Typography.P>
                  <Typography.P className="text-grey-11 text-sm line-clamp-1 font-semibold">
                    Author: {item.author}
                  </Typography.P>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="bg-grey-6  h-[6px] md:h-2 rounded-full">
                    <div
                      style={{ width: `${item.progress}%` }}
                      className={`h-full rounded-full ${
                        item.progress < 30
                          ? "bg-error"
                          : item.progress < 75
                          ? "bg-yellow-400"
                          : "bg-success"
                      }`}
                    ></div>
                  </div>
                  <Typography.P className="self-end text-sm">
                    {item.progress}%
                  </Typography.P>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;

const recentCourses = [
  {
    id: "1",
    title: "First course",
    progress: 45,
    image: "/assets/images/course.png",
    author: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolor cumque dolorem repellendus rem nemo odit. Sint, commodi rerum! Animi?",
  },
  {
    id: "2",
    title: "First course",
    progress: 70,
    image: "/assets/images/course.png",
    author: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolor cumque dolorem repellendus rem nemo odit. Sint, commodi rerum! Animi?",
  },
  {
    id: "3",
    title: "First course",
    progress: 5,
    image: "/assets/images/course.png",
    author: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolor cumque dolorem repellendus rem nemo odit. Sint, commodi rerum! Animi?",
  },
  {
    id: "4",
    title: "First course",
    progress: 100,
    image: "/assets/images/course.png",
    author: "John Doe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolor cumque dolorem repellendus rem nemo odit. Sint, commodi rerum! Animi?",
  },
];
