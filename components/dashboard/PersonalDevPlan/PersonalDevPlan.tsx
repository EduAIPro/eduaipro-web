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
import { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineLock } from "react-icons/md";
import ModuleContent from "../common/ModuleContent";
import { course } from "./data";

const PersonalDevPlan = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isMobile = useIsMobile();
  return (
    <div>
      {isMobile ? (
        <div className="lg:grid grid-cols-4 min-[1600px]:grid-cols-5 gap-6 w-full justify-between">
          <CourseMedia
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <CourseContent setCurrentPage={setCurrentPage} />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="space-x-5">
          <ResizablePanel defaultSize={75}>
            <CourseMedia
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25}>
            <CourseContent setCurrentPage={setCurrentPage} />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

type CoursePageProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

function CourseMedia({ currentPage, setCurrentPage }: CoursePageProps) {
  return (
    <div className="col-span-3 h-fit space-y-3">
      <Typography.H3
        className="text-gray-800/90 max-sm:!text-lg"
        weight="semibold"
        size="xl"
      >
        {course?.name}
      </Typography.H3>
      <ModuleContent
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

function CourseContent({
  setCurrentPage,
}: {
  setCurrentPage: Dispatch<SetStateAction<number>>;
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
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  {i > 1 ? (
                    <div className="w-fit">
                      <MdOutlineLock size={20} className="text-gray-600" />
                    </div>
                  ) : null}
                  <div className="">
                    <h5 className="font-semibold text-sm text-grey-12/90 text-left">
                      {unit.title}
                    </h5>
                    <span className="text-xs lg:text-sm line-clamp-1 text-grey-10 w-full text-left">
                      {unit.modules.length} lectures | {unit.totalDuration}{" "}
                      hours
                    </span>
                  </div>
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
                                <h4 className="text-sm font-medium text-gray-600">
                                  {course.title}
                                </h4>
                              </div>
                            </AccordionTrigger>{" "}
                            <AccordionContent className="space-y-2">
                              {course?.content ? (
                                <>
                                  {course.content.map((item, index) => (
                                    <div
                                      key={index + "90u"}
                                      onClick={() => {
                                        if (i !== 0) {
                                          setCurrentPage((prev) =>
                                            prev !== 8 ? prev + 1 : 1
                                          );
                                        }
                                      }}
                                      role="button"
                                      className="cursor-pointer"
                                    >
                                      <p>{item.title}</p>
                                    </div>
                                  ))}
                                  <p>Case study</p>
                                  <p>Practical Applications</p>
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

function DottedOrSolidList({ stepsData }: { stepsData: string[] }) {
  // Track clicked state for each item
  const [clicked, setClicked] = useState<boolean[]>(
    Array(stepsData.length).fill(false)
  );

  const toggleClick = (index: number) => {
    const newClicked = [...clicked];
    newClicked[index] = !newClicked[index];
    setClicked(newClicked);
  };

  return (
    <div className="max-w-md mx-auto py-6">
      {stepsData.map((step, index) => {
        const isLast = index === stepsData.length - 1;
        // Check if the next item is clicked
        const isNextClicked = !isLast && clicked[index + 1];
        console.log({ isLast });
        console.log({ isNextClicked });
        return (
          <div key={index} className="relative flex items-start mb-6">
            {/* Circle / bullet */}
            <div className="mr-2 flex flex-col items-center">
              {/* The small circle for the current item */}
              <div className="w-3 h-3 bg-blue-600 rounded-full" />

              {/* Vertical line extending to the next item */}
              {!isLast && (
                <div
                  className={
                    isNextClicked
                      ? // Solid line if the next item is clicked
                        "w-px flex-1 bg-blue-600"
                      : // Dotted line if the next item is NOT clicked
                        "w-px flex-1 border-l-2 bg-white border-blue-600 border-dotted"
                  }
                />
              )}
            </div>

            {/* Clickable text */}
            <button
              onClick={() => toggleClick(index)}
              className="text-left focus:outline-none border-2"
            >
              {step}
            </button>
          </div>
        );
      })}
    </div>
  );
}
