"use client";
import { retrieveCourseUnitPublicKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import Typography from "@/components/common/ui/Typography";
import { UnitBody } from "@/components/course-page/units/unit-body";
import StickyHeader from "@/components/courses/StickyHeader";
import { CourseIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { UnitDetails } from "@/types/course";
import { predictUnitDuration } from "@/utils/helpers";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function CourseUnitPage() {
  const { slug, unitId }: { slug: string; unitId: string } = useParams();
  const { data: unitInfo, isLoading } = useSWR<UnitDetails>(
    unitId ? retrieveCourseUnitPublicKey(unitId! as string) : null,
    generalFetcher
  );

  const weekDuration = predictUnitDuration(10);

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2Icon size={24} className="animate-spin text-primary" />
    </div>
  ) : unitInfo ? (
    <>
      <StickyHeader
        courseName={slug.toLowerCase()}
        sectionsData={[
          { title: "Objectives", id: "objectives" },
          { title: "Modules", id: "modules" },
        ]}
      />

      <section className="">
        <div className="flex flex-col">
          <div className="pt-32 md:pt-40 bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] animate-fade-in-up">
            <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
              <div className="flex items-center justify-center">
                <div className="w-full flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Typography.H2
                      fontColor="dark"
                      weight="semibold"
                      className="capitalize"
                    >
                      {slug.toLowerCase().replaceAll("-", " ")} -{" "}
                      {unitInfo?.title}
                    </Typography.H2>
                    {unitInfo?.description ? (
                      <Typography.P
                        fontColor="dark"
                        weight="medium"
                        className="line-clamp-3"
                      >
                        {unitInfo?.description}
                      </Typography.P>
                    ) : null}

                    <Typography.H4 size="base" fontColor="dark" weight="medium">
                      Instructor: <strong>AI</strong>
                    </Typography.H4>
                  </div>
                  <Link href="/register">
                    <Button className="!bg-brand">
                      <p>Enroll now</p>
                    </Button>
                  </Link>
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
  ) : (
    <div className="min-h-screen flex items-center justify-center text-center">
      <p className="text-lg">An error occured, please try again later</p>
      <Link href="/">
        <p className="text-primary underline">Go home</p>
      </Link>
    </div>
  );
}
