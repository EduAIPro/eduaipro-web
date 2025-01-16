"use client";
import Typography from "@/components/common/ui/Typography";
import { Button } from "@radix-ui/themes";
import router from "next/router";
import React, { useState } from "react";

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
  const [filteredList, setFilteredList] = useState<ExamItemProps[]>(
    examsList.filter((item) => item.status === "past")
  );

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
                <Button variant="outline" className="btn !w-full">
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
    <div className="flex flex-col md:flex-row min-h-[100vh] justify-between">
      <div className="flex flex-col gap-5 md:w-[65%] md:border-r-2 p-2">
        <div className="flex  h-[15rem] md:h-[18rem] items-center justify-center lg:h-[25rem] w-full bg-red-500">
          In Progress
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="font-semibold text-lg">EXAMS</h5>
          <div className="flex items-center gap-5 border-b-2  md:text-lg">
            <button
              onClick={() => {
                setExamNav("past");
                setFilteredList(
                  examsList.filter((item) => item.status === "past")
                );
              }}
              className={`${
                examNav === "past"
                  ? "font-semibold border-b-2 border-brand-1001"
                  : "font-normal"
              }`}
            >
              Past
            </button>
            <button
              onClick={() => {
                setExamNav("upcoming");
                setFilteredList(
                  examsList.filter((item) => item.status === "upcoming")
                );
              }}
              className={`${
                examNav === "upcoming"
                  ? "font-semibold border-b-2 border-brand-1001"
                  : "font-normal"
              }`}
            >
              Upcoming
            </button>
          </div>

          {/* list */}
          <ul className="flex flex-col gap-2 mt-2">
            {filteredList.map((item) => (
              <ExamItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:w-[35%] p-2">
        <h4 className="font-semibold text-xl">Course Content</h4>
        <ul>
          {courseUnits.map((unit) => (
            <li key={unit.id} className="mb-4 shadow w-full">
              <div
                role="button"
                onClick={() => toggleUnit(unit.id)}
                className="flex items-center justify-between cursor-pointer p-2 border-b-2 "
              >
                <h5 className="font-semibold lg:text-lg line-clamp-1 w-[50%]">
                  {unit.title}
                </h5>
                <span className="text-xs lg:text-sm line-clamp-1 max-w-[50%]">
                  {unit.courses.length} lectures | {unit.time}
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out overflow-y-auto ${
                  activeUnit === unit.id ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <ul className="mt-2">
                  {unit.courses.map((course) => (
                    <li
                      key={course.id}
                      className="text-sm lg:text-base pl-5 py-1"
                    >
                      {course.title}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
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
