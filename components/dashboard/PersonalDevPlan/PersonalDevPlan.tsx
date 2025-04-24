"use client";
import Typography from "@/components/common/ui/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Circle, CircleCheck } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineLock } from "react-icons/md";
import ModuleContent from "../common/ModuleContent";
import { course, coursesFiles } from "./data";

const PersonalDevPlan = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [unitIndex, setUnitIndex] = useState<number>(0);
  const [introHasPlayed, setIntroHasPlayed] = useState(false);

  const isMobile = useIsMobile();
  return (
    <div>
      {isMobile ? (
        <div className="lg:grid grid-cols-4 min-[1600px]:grid-cols-5 gap-6 w-full justify-between">
          <CourseMediaComponent
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            unitIndex={unitIndex}
            setUnitIndex={setUnitIndex}
            introHasPlayed={introHasPlayed}
          />
          <CourseContent
            selectUnit={(unit) => setUnitIndex(unit)}
            setCurrentPage={setCurrentPage}
            unitIndex={unitIndex}
            setIntroHasPlayed={setIntroHasPlayed}
          />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="space-x-5">
          <ResizablePanel defaultSize={75}>
            <CourseMediaComponent
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              unitIndex={unitIndex}
              setUnitIndex={setUnitIndex}
              introHasPlayed={introHasPlayed}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25}>
            <CourseContent
              selectUnit={(unit) => setUnitIndex(unit)}
              setCurrentPage={setCurrentPage}
              unitIndex={unitIndex}
              setIntroHasPlayed={setIntroHasPlayed}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

type CoursePageProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setUnitIndex: Dispatch<SetStateAction<number>>;
  currentPage: number;
  unitIndex: number;
  introHasPlayed: boolean;
};

function CourseMedia({
  currentPage,
  setCurrentPage,
  unitIndex,
  setUnitIndex,
  introHasPlayed,
}: CoursePageProps) {
  return (
    <div className="col-span-3 h-fit space-y-3">
      <ModuleContent
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        fileName={coursesFiles[unitIndex]}
        setUnitIndex={setUnitIndex}
        introHasPlayed={introHasPlayed}
      />
    </div>
  );
}

const CourseMediaComponent = React.memo(CourseMedia);

function CourseContent({
  setCurrentPage,
  selectUnit,
  unitIndex,
  setIntroHasPlayed,
}: {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setIntroHasPlayed: Dispatch<SetStateAction<boolean>>;
  selectUnit: (unit: number) => void;
  unitIndex: number;
}) {
  return (
    <div className="max-lg:mt-6 min-[1600px]:col-span-2">
      <Typography.H4 className="font-semibold !text-base">
        Course Units
      </Typography.H4>
      <ScrollArea className="h-full">
        <Accordion type="single">
          {course?.units.map((unit, i) => (
            <AccordionItem
              disabled={i > 1}
              value={unit.number.toString()}
              key={unit.number}
            >
              <AccordionTrigger
                onClick={() => {
                  selectUnit(i);
                  setIntroHasPlayed(true);
                  window.localStorage.setItem("hasIntroPlayed", "true");
                }}
              >
                <div className="flex items-center gap-3">
                  {i > 1 ? (
                    <div className="w-fit">
                      <MdOutlineLock size={20} className="text-gray-600" />
                    </div>
                  ) : null}
                  <div className="">
                    <h5 className="font-semibold text-sm text-grey-12/90 text-left">
                      Unit {unit.number} - {unit.title}
                    </h5>
                    <span className="text-xs lg:text-sm line-clamp-1 text-grey-10 w-full text-left">
                      {unit.modules.length} lectures
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-hidden transition-all duration-500 ease-in-out overflow-y-auto">
                  <div>
                    {/* <p className="text-sm font-medium text-grey-11 whitespace-pre-line">
                      {unit.introduction}
                    </p> */}
                    <h2 className="mt-2 font-semibold text-accent-900">
                      Modules
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    <Accordion type="single" className="w-full">
                      {unit.modules.map((course, index) => (
                        <li
                          key={course.title}
                          role="button"
                          className="text-sm lg:text-base cursor-pointer flex items-center gap-2 w-full"
                        >
                          <AccordionItem
                            value={index.toString()}
                            key={index}
                            className="w-full"
                          >
                            <AccordionTrigger>
                              <div className="text-sm lg:text-base cursor-pointer flex items-center gap-2">
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
                                <h4 className="text-sm font-semibold text-gray-600">
                                  {course.title}
                                </h4>
                              </div>
                            </AccordionTrigger>{" "}
                            <AccordionContent className="space-y-2">
                              {course?.content ? (
                                <>
                                  <h2 className="font-semibold text-sm">
                                    Contents
                                  </h2>
                                  {course.content.map((item, index) => (
                                    <div
                                      key={index + "90u"}
                                      onClick={() => {
                                        if (item.page && unitIndex === i) {
                                          setCurrentPage(item.page);
                                        } else if (item.page) {
                                          setCurrentPage(item.page);
                                          // selectUnit(i);
                                        }
                                      }}
                                      role="button"
                                      className="cursor-pointer pl-6"
                                    >
                                      <p className="hover:underline hover:text-black">
                                        - {item.title}
                                      </p>
                                    </div>
                                  ))}
                                  <div className="space-y-2 font-semibold text-sm">
                                    <h2>Case studies</h2>
                                    <h2>Practical Applications</h2>
                                  </div>
                                </>
                              ) : null}
                            </AccordionContent>
                          </AccordionItem>
                        </li>
                      ))}
                    </Accordion>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}

export default PersonalDevPlan;
