"use client";

import React, { useState, useEffect } from "react";
import data from "@/components/common/data/courses.json";
import { useParams } from "next/navigation";
import Typography from "@/components/common/ui/Typography";
import ExpandableText from "@/components/courses/ExpandableText";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/utils/text";
import { Button, TabNav } from "@radix-ui/themes";
import { predictCourseDuration, predictUnitDuration } from "@/utils/helpers";
import { CourseIcon } from "@/components/svgs";
import StickyHeader from "@/components/courses/StickyHeader";
import { TickCircle } from "iconsax-react";
import CourseContentAccordion from "@/components/courses/Accordion";
import { generateKey } from "@/utils/key";
import { CgFileDocument } from "react-icons/cg";

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

export default function CourseUnitPage() {
  const [unitInfo, setUnitInfo] = useState<null | Unit>(null);
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
  }, [courseName]);

  const weekDuration = predictUnitDuration(unitInfo?.totalDuration!);
  return (
    <>
      <StickyHeader courseName={unitInfo?.title!} />
      <section className="max-sm:!pt-0">
        <div className="flex flex-col">
          <div className="">
            <div className="p-8 py-16 flex items-center justify-center bg-accent-200/50">
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
              <div className="w-full flex flex-col items-center">
                <CourseIcon width={350} height={350} />
              </div>
            </div>
            <div className="bg-white flex px-4 py-6 border-b-2 border-grey-3 flex-col gap-5 justify-evenly shadow-grey-5/30">
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
            <div className="">
              <TabNav.Root size="2">
                <TabNav.Link href="#objectives" active>
                  Objectives
                </TabNav.Link>
                {/* <TabNav.Link href="#outcomes">Outcomes</TabNav.Link> */}
                <TabNav.Link href="#modules">Modules</TabNav.Link>
              </TabNav.Root>
            </div>
            <div id="objectives" className="py-8 flex flex-col gap-8 ">
              <div>
                <Typography.H3 weight="semibold">
                  Learning objectives
                </Typography.H3>
                <div className="flex flex-col gap-2 mt-4">
                  {unitInfo?.objectives.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <TickCircle className="text-green-600" size={20} />
                      <Typography.P>{item}</Typography.P>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Typography.H3 weight="semibold">Extra details</Typography.H3>
                <div className="grid grid-cols-3 gap-6 mt-4">
                  {details.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 hover:-translate-y-2 cursor-pointer detail_card p-5 rounded-lg duration-500"
                    >
                      <item.icon className="text-accent-800" />
                      <Typography.H2
                        weight="medium"
                        fontColor="medium"
                        className="!text-md"
                      >
                        {capitalizeFirstLetter(item.label)}
                      </Typography.H2>
                      <Typography.P
                        weight="medium"
                        fontColor="medium"
                        className="!text-md"
                      >
                        {item.description}
                      </Typography.P>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="modules" className="py-8 flex flex-col gap-8">
              <div>
                <Typography.H3 size="xl" className="mb-2" weight="semibold">
                  There are {unitInfo?.modules.length} modules in this unit
                </Typography.H3>
                <ExpandableText text={unitInfo?.introduction!} />
              </div>
              <div>
                {unitInfo?.modules.map((module) => (
                  <CourseContentAccordion
                    unitCount={module.duration}
                    unitLength={module.duration}
                    title={module.title}
                    key={generateKey()}
                    isModule={true}
                  >
                    <div className="flex flex-col gap-4 px-5">
                      <div>
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
                      </div>
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
