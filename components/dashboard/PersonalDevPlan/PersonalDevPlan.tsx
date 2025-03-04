"use client";
import data from "@/components/common/data/courses.json";
import Typography from "@/components/common/ui/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@radix-ui/themes";
import { Circle, CircleCheck } from "lucide-react";
import React, { useState } from "react";
import CourseMedia from "./CourseMedia";

type ExamItemProps = {
  id: string;
  title: string;
  unitTitle: string;
  startDate: string;
  score: number;
  completed: boolean;
  status: string;
};

const PersonalDevPlan = () => {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const [examNav, setExamNav] = useState<"past" | "upcoming">("past");
  const [mediaType, setMediaType] = useState<"video" | "reading" | "quiz">(
    "video"
  );
  const [filteredList, setFilteredList] = useState<ExamItemProps[]>(
    examsList.filter((item) => item.status === "past")
  );
  const course = data.find((item) => item.id === "1");
  const toggleUnit = (unitId: string) => {
    setActiveUnit((prev) => (prev === unitId ? null : unitId));
  };

  const ExamItem: React.FC<{ item: ExamItemProps }> = ({ item }) => {
    return (
      <div className="flex items-center justify-between gap-2 p-2 light_shadow rounded-md">
        <div className="flex flex-col gap-[2px] md:gap-1">
          <h5 className="font-semibold md:text-lg line-clamp-1">
            {item.title}
          </h5>
          <span className="text-sm line-clamp-1">{item.unitTitle}</span>
          <span className="line-clamp-1">{item.startDate}</span>
        </div>
        {item.completed ? (
          <div className="flex flex-col items-center">
            <p>Score</p>
            <h5 className="text-lg md:text-xl font-semibold">{item.score}%</h5>
          </div>
        ) : (
          <>
            {item.status === "past" ? (
              <div className="w-48">
                <Button className="primary__btn btn !w-full">
                  <Typography.P weight="semibold" fontColor="white">
                    Start
                  </Typography.P>
                </Button>
              </div>
            ) : (
              <div className="w-48 self-end">
                <Button variant="outline" className="btn !w-full" disabled>
                  <Typography.P weight="semibold">Coming Soon</Typography.P>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <div className="lg:grid grid-cols-3 xl:grid-cols-4 gap-6 w-full justify-between">
        <div className="col-span-2 xl:col-span-3 h-fit space-y-3">
          <Typography.H3
            className="text-gray-800/90 max-sm:!text-lg"
            weight="semibold"
            size="xl"
          >
            {course?.name}
          </Typography.H3>
          <CourseMedia mediaType={mediaType} />
        </div>
        <div className="max-lg:mt-6">
          <Typography.H4 className="font-semibold !text-base">
            Course Units
          </Typography.H4>
          <ScrollArea className="h-screen">
            <Accordion type="multiple">
              {course?.units.map((unit, i) => (
                <AccordionItem value={unit.number.toString()} key={unit.number}>
                  <AccordionTrigger>
                    <div className="">
                      <h5 className="font-semibold text-sm text-grey-12/90 text-left">
                        {unit.title}
                      </h5>
                      <span className="text-xs lg:text-sm line-clamp-1 text-grey-10 w-full text-left">
                        {unit.modules.length} lectures | {unit.totalDuration}{" "}
                        hours
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-hidden transition-all duration-500 ease-in-out overflow-y-auto">
                      <div>
                        <p className="text-sm font-medium text-grey-11">
                          {unit.introduction}
                        </p>
                        <h2 className="mt-2 font-semibold text-accent-900">
                          Modules
                        </h2>
                      </div>
                      <ul className="mt-2 space-y-2">
                        {unit.modules.map((course, index) => (
                          <li
                            key={course.title}
                            role="button"
                            onClick={() => {
                              if (index === 0) {
                                setMediaType("video");
                              } else if (index === 1) {
                                setMediaType("reading");
                              } else {
                                setMediaType("quiz");
                              }
                            }}
                            className="text-sm lg:text-base pl-3 cursor-pointer flex items-center gap-2"
                          >
                            {i === 0 ? (
                              <CircleCheck
                                size={17}
                                className="text-[#009439]"
                              />
                            ) : (
                              <Circle
                                size={17}
                                className="text-black/70"
                                strokeWidth={2}
                              />
                            )}

                            <h4 className="text-sm font-medium text-gray-600">
                              {course.title}
                            </h4>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default PersonalDevPlan;

const courseUnits = [
  {
    id: "1",
    title: "Class 1",
    time: "1hr 30mins",
    courses: [
      { id: "1", title: "Section Intro" },
      { id: "2", title: "First Topic" },
      { id: "3", title: "Second Topic" },
    ],
  },
  {
    id: "2",
    title: "Class 2",
    time: "1hr 30mins",
    courses: [
      { id: "1", title: "Section Intro" },
      { id: "2", title: "First Topic" },
      { id: "3", title: "Second Topic" },
    ],
  },
  {
    id: "3",
    title: "Class 3",
    time: "1hr 30mins",
    courses: [
      { id: "1", title: "Section Intro" },
      { id: "2", title: "First Topic" },
      { id: "3", title: "Second Topic" },
    ],
  },
  {
    id: "4",
    title: "Class 4",
    time: "1hr 30mins",
    courses: [
      { id: "1", title: "Section Intro" },
      { id: "2", title: "First Topic" },
      { id: "3", title: "Second Topic" },
    ],
  },
];

const examsList = [
  {
    id: "1",
    title: "Exam on classroom behaviour 1",
    unitTitle: "Unit: Classroom Behaviour 1",
    startDate: "17th June, 2025",
    score: 70,
    completed: true,
    status: "past",
  },
  {
    id: "2",
    title: "Exam on classroom behaviour 2",
    unitTitle: "Unit: Classroom Behaviour 2",
    startDate: "17th June, 2025",
    score: 0,
    completed: false,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Exam on classroom behaviour 3",
    unitTitle: "Unit: Classroom Behaviour 3",
    startDate: "17th June, 2025",
    score: 0,
    completed: false,
    status: "past",
  },
  {
    id: "4",
    title: "Exam on classroom behaviour 4",
    unitTitle: "Unit: Classroom Behaviour 4",
    startDate: "17th June, 2025",
    score: 0,
    completed: false,
    status: "upcoming",
  },
];
