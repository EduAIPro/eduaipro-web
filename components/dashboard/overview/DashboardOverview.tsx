import Typography from "@/components/common/ui/Typography";
import React from "react";
import OverviewItem from "./OverviewItem";
import { BiTask } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import Image from "next/image";
import { greetUser } from "@/utils/dashboard";
import MediaPlayer from "./MediaPlayer";

const DashboardOverview = () => {
  const username = "Jasper";

  return (
    <div className="flex flex-col gap-2 md:px-2">
      {/* overview items */}
      <div className="grid md:grid-cols-3 w-full gap-3">
        <OverviewItem title="Tests" digits="4" Icon={BiTask} />
        <OverviewItem title="Exams" digits="2" Icon={AiOutlineFileText} />
        <OverviewItem
          title="Accreditation status"
          status="In progress"
          Icon={MdOutlinePendingActions}
        />
      </div>

      {/* active courses */}
      <div className="flex flex-col gap-2 mt-10">
        <div>
          <Typography.H3 size="large" weight="medium">
            {greetUser(username)}
          </Typography.H3>
          <Typography.P size="small" fontColor="medium">
            Resume your learning journey
          </Typography.P>
        </div>

        <ul className="flex flex-col gap-3">
          <li className="flex max-md:flex-col items-center gap-2 light_shadow bg-white rounded-lg border-2 border-blue-50">
            <div className="w-full md:w-[50%] max-md:h-40">
              <MediaPlayer
                course={{
                  title: "First course",
                  // progress: 45,
                  image: "/assets/images/course.png",
                  // author: "John Doe",
                  previewUrl: "https://www.youtube.com/watch?v=8ILww0tUSxw",
                  // description:
                  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolor cumque dolorem repellendus rem nemo odit. Sint, commodi rerum! Animi?",
                }}
              />
            </div>
            <div className="flex flex-col gap-8 flex-1 px-4 justify-between">
              <div>
                <Typography.H3 size="xl" className="font-semibold">
                  {recentCourses[0].title}
                </Typography.H3>
                <Typography.P className="text-grey-10 text-sm line-clamp-1">
                  {recentCourses[0].description}
                </Typography.P>
              </div>
              <div>
                <div className="flex flex-col gap-1">
                  <div className="bg-grey-6  h-[6px] md:h-2 rounded-full">
                    <div
                      style={{ width: `${recentCourses[0].progress}%` }}
                      className={`h-full rounded-full ${
                        recentCourses[0].progress < 30
                          ? "bg-error"
                          : recentCourses[0].progress < 75
                          ? "bg-yellow-400"
                          : "bg-success"
                      }`}
                    ></div>
                  </div>
                  <Typography.P
                    size="xl"
                    weight="medium"
                    fontColor="medium"
                    className="self-end"
                  >
                    {recentCourses[0].progress}%
                  </Typography.P>
                </div>
              </div>
            </div>
          </li>
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
    previewUrl: "https://www.youtube.com/watch?v=8ILww0tUSxw",
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
