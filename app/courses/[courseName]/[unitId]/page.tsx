"use client";

import data from "@/components/common/data/courses.json";
import Typography from "@/components/common/ui/Typography";
import CourseContentAccordion from "@/components/courses/Accordion";
import ExpandableText from "@/components/courses/ExpandableText";
import StickyHeader from "@/components/courses/StickyHeader";
import { CourseIcon } from "@/components/svgs";
import { predictUnitDuration } from "@/utils/helpers";
import { generateKey } from "@/utils/key";
import { capitalizeFirstLetter } from "@/utils/text";
import { Button, TabNav } from "@radix-ui/themes";
import { Icon, TickCircle, Video } from "iconsax-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { CgFileDocument } from "react-icons/cg";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { VscBook } from "react-icons/vsc";

type Unit = {
  number: number;
  title: string;
  introduction: string;
  objectives: string[];
  modules: {
    title: string;
    duration: number;
  }[];
  totalDuration: number;
};

const details = [
  {
    label: "Assessments",
    description: "4 Assessments",
    icon: CgFileDocument,
  },
];

const moduleContents = [
  {
    title: "7 videos",
    icon: Video,
  },
  {
    title: "4 readings",
    icon: VscBook,
  },
  {
    title: "3 assignments",
    icon: MdOutlineLibraryBooks,
  },
];

const videos = [
  {
    title: "Course Introduction",
    duration: 10,
  },
  {
    title: "What Is a Prompt?",
    duration: 12,
  },
  {
    title: "What Is Prompt Engineering?",
    duration: 8,
  },
  {
    title: "Best Practices for Prompt Creation",
    duration: 5,
  },
];

const readings = [
  {
    title: "Course Overview",
    duration: 4,
  },
  {
    title: "Specialization Overview",
    duration: 17,
  },
  {
    title: "Helpful Tips for Course Completion",
    duration: 2,
  },
  {
    title: "Lesson Summary",
    duration: 5,
  },
];

const assignments = [
  {
    title: "Graded Quiz: Prompt Engineering for Generative AI",
    duration: 14,
  },
  {
    title: "Practice Quiz: Concept of Prompt Engineering",
    duration: 8,
  },
  {
    title: "Exam: Concept of Prompt Engineering",
    duration: 20,
  },
];

export default function CourseUnitPage() {
  const [unitInfo, setUnitInfo] = useState<null | any>(null);
  const { unitId, courseName } = useParams();

  useEffect(() => {
    const courseInfo = data.find(
      (course) => course.name === decodeURI(courseName as string)
    );

    if (courseInfo) {
      setUnitInfo(
        courseInfo.units.find(
          (unit) => unit.number === Number(unitId as string)
        ) || null
      );
    }
  }, [courseName, unitId]);

  const weekDuration = predictUnitDuration(unitInfo?.totalDuration!);
  return (
    <>
      <StickyHeader
        sectionsData={[
          { title: "Objectives", id: "objectives" },
          { title: "Modules", id: "modules" },
        ]}
        courseName={unitInfo?.title!}
      />
      <section className="max-sm:!pt-0 max-sm:-mx-4 max-md:-mx-6 max-lg:-mx-[56px]">
        <div className="flex flex-col">
          <div>
            <div className="p-4 py-8 md:p-8 md:py-16 flex items-center justify-center bg-accent-200/50">
              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <Typography.H2 fontColor="dark" weight="semibold">
                    {unitInfo?.title}
                  </Typography.H2>
                  <Typography.P
                    fontColor="dark"
                    weight="medium"
                    className="line-clamp-3"
                  >
                    {unitInfo?.introduction}
                  </Typography.P>

                  <Typography.H4 size="base" fontColor="dark" weight="medium">
                    Instructor: <strong>AI</strong>
                  </Typography.H4>
                </div>
                <Button className="primary__btn btn !w-fit" variant="solid">
                  Enroll now
                </Button>
              </div>
              <div className="max-lg:hidden w-full flex flex-col items-center">
                <CourseIcon width={350} height={350} />
              </div>
            </div>
            <div className="flex px-4 py-6 border-b-2 border-grey-3 flex-col gap-5 justify-evenly">
              <div>
                <Typography.H4 weight="medium">
                  {unitInfo?.modules.length} modules
                </Typography.H4>
                <Typography.P size="small" fontColor="grey">
                  Explore the basics
                </Typography.P>
              </div>
              <div>
                <Typography.H4 weight="medium">
                  {weekDuration} week{weekDuration > 1 ? "s" : ""}
                </Typography.H4>
                <Typography.P size="small" fontColor="grey">
                  At 3 hours per day
                </Typography.P>
              </div>
              <div>
                <Typography.H4 weight="medium">Flexible schedule</Typography.H4>
                <Typography.P size="small" fontColor="grey">
                  Learn at your own pace
                </Typography.P>
              </div>
            </div>
          </div>
          <div>
            <div>
              <TabNav.Root size="2">
                <TabNav.Link href="#objectives" active>
                  Objectives
                </TabNav.Link>
                {/* <TabNav.Link href="#outcomes">Outcomes</TabNav.Link> */}
                <TabNav.Link href="#modules">Modules</TabNav.Link>
              </TabNav.Root>
            </div>
            <div
              id="objectives"
              className="max-lg:px-4 py-8 flex flex-col gap-8"
            >
              <div>
                <Typography.H3 weight="semibold">
                  Learning objectives
                </Typography.H3>
                <ul className="flex flex-col gap-2 mt-4">
                  {unitInfo?.objectives.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <TickCircle className="text-green-600" size={20} />
                      <Typography.P>{item}</Typography.P>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography.H3 weight="semibold">Extra details</Typography.H3>
                <ul className="grid grid-cols-3 gap-6 mt-4">
                  {details.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 hover:-translate-y-2 cursor-pointer detail_card xs:p-5 rounded-lg duration-500"
                    >
                      <div className="w-fit">
                        <item.icon size={30} className="text-accent-800" />
                      </div>
                      <div>
                        <Typography.H2
                          weight="semibold"
                          fontColor="dark"
                          size="base"
                        >
                          {capitalizeFirstLetter(item.label)}
                        </Typography.H2>
                        <Typography.P
                          weight="medium"
                          fontColor="medium"
                          className="opacity-80"
                        >
                          {item.description}
                        </Typography.P>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div id="modules" className="max-lg:px-4 py-8 flex flex-col gap-8">
              <div>
                <Typography.H3 size="xl" className="mb-2" weight="semibold">
                  There are {unitInfo?.modules.length} modules in this unit
                </Typography.H3>
                <ExpandableText text={unitInfo?.introduction!} />
              </div>
              <div>
                {unitInfo?.modules.map((module: any, index: number) => (
                  <CourseContentAccordion
                    unitId={index + 1}
                    unitLength={module.duration}
                    title={module.title}
                    key={generateKey()}
                    isModule={true}
                  >
                    <div className="flex flex-col gap-4 px-5">
                      <div>
                        <Typography.P>
                          In this module, you will learn the concept of prompt
                          engineering in generative AI. You will also learn the
                          best practices for writing effective prompts and
                          assess common prompt engineering tools.
                        </Typography.P>
                      </div>
                      <div>
                        <Typography.H4 weight="semibold" className="opacity-85">
                          Module contents
                        </Typography.H4>
                        {/* <ul className="flex gap-6 items-center max-xs:flex-wrap mt-3">
                          {moduleContents.map((item) => (
                            <ModuleCategory
                              key={item.title}
                              title={item.title}
                              Icon={item.icon}
                              index={index}
                              isSmall
                            />
                          ))}
                        </ul> */}
                        <div className={`space-y-5 mt-4`}>
                          {/* videos */}
                          <ModuleCategoryContent section={videos} index={0} />

                          {/* readings */}
                          <ModuleCategoryContent section={readings} index={1} />

                          {/* assignments */}
                          <ModuleCategoryContent
                            section={assignments}
                            index={2}
                          />
                        </div>
                      </div>
                      {/* <div>
                        <Typography.H2
                          weight="semibold"
                          size="base"
                          className="mb-2"
                          fontColor="dark"
                        >
                          Learning Objectives
                        </Typography.H2>
                        {unitInfo.objectives.map((objective, i) => (
                          <div
                            key={generateKey()}
                            className="flex items-center gap-2"
                          >
                            <TickCircle className="text-green-600" size={16} />
                            <Typography.P weight="medium" fontColor="medium">
                              {objective}
                            </Typography.P>
                          </div>
                        ))}
                      </div> */}
                    </div>
                  </CourseContentAccordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type Section = {
  title: string;
  duration: number;
}[];

function getCategoryDuration(section: Section) {
  const totalDuration = section
    .map((item) => item.duration)
    .reduce((prev, curr) => prev + curr, 0);
  return `${totalDuration} minutes total`;
}

function ModuleCategory({
  Icon,
  index,
  title,
  isSmall = false,
}: {
  Icon: Icon | IconType;
  index: number;
  title: string;
  isSmall?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <div className="rounded-full p-[6px] bg-accent-100">
        <div className="w-fit">
          <Icon size={index === 0 ? 20 : 24} className="opacity-85" />
        </div>
      </div>
      <Typography.P
        size={isSmall ? "small" : "base"}
        weight="medium"
        fontColor="medium"
      >
        {title}
      </Typography.P>
    </li>
  );
}

function ModuleCategoryContent({
  index,
  section,
}: {
  section: Section;
  index: number;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div>
          <ModuleCategory
            key={moduleContents[index].title}
            title={moduleContents[index].title}
            Icon={moduleContents[index].icon}
            index={index}
          />
        </div>
        <span>•</span>
        <Typography.P>{getCategoryDuration(section)}</Typography.P>
      </div>
      <ul className="space-y-2">
        {section.map((item) => (
          <li
            key={item.duration}
            className="flex items-center gap-2 opacity-75"
          >
            <Typography.P>
              {item.title} <span className="px-2">•</span>{" "}
              <Typography.P fontColor="medium" className="inline-flex">
                {item.duration} minutes
              </Typography.P>
            </Typography.P>
          </li>
        ))}
      </ul>
    </div>
  );
}
