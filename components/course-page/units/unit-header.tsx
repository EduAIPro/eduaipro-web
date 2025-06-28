"use client";
import data from "@/components/common/data/courses.json";
import Typography from "@/components/common/ui/Typography";
import StickyHeader from "@/components/courses/StickyHeader";
import { CourseIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { predictUnitDuration } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { UnitBody } from "./unit-body";

type UnitHeaderProps = {
  params: { courseName: string; unitId: string };
};

export const UnitHeader = ({ params }: UnitHeaderProps) => {
  const [unitInfo, setUnitInfo] = useState<null | any>(null);
  // const { unitId, courseName } = useParams();

  useEffect(() => {
    const courseInfo = data.find(
      (course) => course.name === decodeURI(params.courseName as string)
    );

    if (courseInfo) {
      setUnitInfo(
        courseInfo.units.find(
          (unit) => params.unitId === unit.number.toString()
        ) || null
      );
    }
  }, []);

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

      <section className="">
        <div className="flex flex-col">
          <div className="pt-32 md:pt-40 bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] animate-fade-in-up">
            <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
              <div className="flex items-center justify-center">
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
                  <Button className="primary__btn btn !w-fit">
                    Enroll now
                  </Button>
                </div>
                <div className="max-lg:hidden w-full flex flex-col items-center">
                  <CourseIcon width={350} height={350} />
                </div>
              </div>
              <div className="flex pb-6 border-b-2 border-grey-3 flex-col gap-5 justify-evenly">
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
                  <Typography.H4 weight="medium">
                    Flexible schedule
                  </Typography.H4>
                  <Typography.P size="small" fontColor="grey">
                    Learn at your own pace
                  </Typography.P>
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
            <UnitBody unitInfo={unitInfo} />
          </div>
        </div>
      </section>
    </>
  );
};
