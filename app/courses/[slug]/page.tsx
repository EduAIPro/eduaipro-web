"use client";
import { retrieveCoursePublicKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import Typography from "@/components/common/ui/Typography";
import ExpandableText from "@/components/courses/ExpandableText";
import StickyHeader from "@/components/courses/StickyHeader";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { CourseIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/course";
import { generateKey } from "@/utils/key";
import { TabNav } from "@radix-ui/themes";
import {
  ChevronRightIcon,
  GlobeIcon,
  LaptopIcon,
  Loader2Icon,
  MessageSquareTextIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import useSWR from "swr";

const courseDevices = {
  desktop: <LaptopIcon size={20} />,
  tablet: <TabletIcon size={16} />,
  smartphone: <SmartphoneIcon size={16} />,
};

const courseBenefits = [
  "Enhance professional portfolio",
  "Support career progression",
  "Share on LinkedIn",
  "Use for school accreditation",
];

const availablePlatforms = ["Desktop", "Tablet", "Mobile"];

export default function CoursePage() {
  const { slug } = useParams();

  const { data: courseInfo, isLoading } = useSWR<Course>(
    slug ? retrieveCoursePublicKey(slug! as string) : null,
    generalFetcher
  );

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2Icon size={24} className="animate-spin text-primary" />
    </div>
  ) : courseInfo ? (
    <>
      <StickyHeader courseName={courseInfo.title.toLowerCase()} />
      <section className="">
        <div className="flex flex-col">
          <div className="pt-32 md:pt-40 bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] animate-fade-in-up">
            <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
              <div className="flex items-center justify-center">
                <div className="w-full pb-5 md:pb-16 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Typography.H2
                      className="capitalize"
                      fontColor="dark"
                      weight="semibold"
                    >
                      {courseInfo?.title.toLowerCase()}
                    </Typography.H2>
                    <Typography.P
                      fontColor="dark"
                      weight="medium"
                      className="line-clamp-3"
                    >
                      {courseInfo?.description}
                    </Typography.P>

                    <div className="flex items-center gap-3">
                      <Typography.H3 size="small" weight="medium">
                        Available on:
                      </Typography.H3>
                      {availablePlatforms.map((item) => (
                        <div
                          className="flex items-center gap-1"
                          key={generateKey()}
                        >
                          {
                            courseDevices[
                              item.toLowerCase() as keyof typeof courseDevices
                            ]
                          }
                          <Typography.P>{item}</Typography.P>
                        </div>
                      ))}
                    </div>
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
                  <Link scroll href="#courses">
                    <Typography.H4
                      className="!text-base md:!text-lg hover:!underline"
                      weight="medium"
                    >
                      {courseInfo?.units?.length} unit series
                    </Typography.H4>
                  </Link>
                  <Typography.P size="small" fontColor="grey">
                    Get in-depth specialization in your career
                  </Typography.P>
                </div>
                <div>
                  <Typography.H4
                    className="!text-base md:!text-lg"
                    weight="medium"
                  >
                    {courseInfo?.completionDurationDays / 60} months
                  </Typography.H4>
                  <Typography.P size="small" fontColor="grey">
                    At 8 hours per week
                  </Typography.P>
                </div>
                <div>
                  <Typography.H4
                    className="!text-base md:!text-lg"
                    weight="medium"
                  >
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
            <div className="lg:w-3/4">
              <TabNav.Root size="2">
                <TabNav.Link href="#objectives" active>
                  Objectives
                </TabNav.Link>
                <TabNav.Link href="#outcomes">Outcomes</TabNav.Link>
                <TabNav.Link href="#courses">Courses</TabNav.Link>
              </TabNav.Root>
            </div>
            <div
              id="objectives"
              className="max-lg:px-4 py-8 flex flex-col gap-8 lg:w-3/4"
            >
              <div className="space-y-4">
                <Typography.H3 weight="semibold">
                  Learning objectives
                </Typography.H3>
                <div
                  className="text-sm list"
                  dangerouslySetInnerHTML={{
                    __html: courseInfo?.learningObjectives,
                  }}
                ></div>
                {/* <ul className="flex flex-col gap-2 mt-4">
                  {courseInfo?.overview?.objectives?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-fit">
                        <TickCircle className="text-green-600" size={20} />
                      </div>
                      <Typography.P fontColor="medium">
                        <strong>{item.split(":")[0]}:</strong>{" "}
                        {item.split(":")[1]}
                      </Typography.P>
                    </li>
                  ))}
                </ul> */}
              </div>
              {/* <div>
                <Typography.H3 weight="semibold">
                  Skills {"you'll learn"}
                </Typography.H3>
                <ul
                  className={`flex mb-4 flex-col gap-4 sm:gap-2 h-full ease-in-out overflow-hidden transition-all duration-700 mt-4`}
                >
                  {courseInfo?.skillsAndCompetencies?.map((item, i) => (
                    <li key={i} className="gap-4 flex xl:items-center">
                      <div className="w-fit max-xl:hidden">
                        <GoDotFill size={15} />
                      </div>
                      <Typography.P fontColor="medium">
                        <strong>{item.title}:</strong> {item.description}
                      </Typography.P>
                    </li>
                  ))}
                </ul>
                {/* <Button
                  className="mt-4 !duration-500 !cursor-pointer"
                  // onClick={() => setShowMore(!showMore)}
                  variant="ghost"
                >
                  <span className="sm:p-2 text-base font-medium">
                    {/* Show {showMore ? "less" : "more"} 
                  </span>
                </Button>
              </div> */}
              <div>
                <Typography.H3 weight="semibold">Extra details</Typography.H3>
                <ul className="flex flex-wrap items-center gap-10 mt-4">
                  {[
                    {
                      title: "Globally recognized certificate",
                      Icon: GlobeIcon,
                    },
                    { title: "Online Forum", Icon: MessageSquareTextIcon },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex flex-col gap-2 lg:hover:-translate-y-2 cursor-pointer detail_card sm:p-5 rounded-lg duration-500 w-full xs:w-1/2 sm:w-1/3"
                    >
                      <item.Icon size={30} className="text-accent-800" />
                      <Typography.P
                        weight="medium"
                        fontColor="medium"
                        className="!text-md"
                      >
                        {item.title}
                      </Typography.P>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div id="outcomes" className="lg:py-8 flex flex-col gap-8">
              <div className="w-full px-4 relative py-12">
                <div className="relative bg-accent-100/40 p-6 md:px-8 md:py-12 rounded-xl">
                  <div className="flex justify-between flex-col md:flex-row-reverse md:items-center gap-4 md:gap-8">
                    {/* Left content */}
                    <Image
                      width={200}
                      height={200}
                      src="/assets/images/teaching-assistant.png"
                      alt="Certificate preview"
                      className="h-full w-full md:w-1/3 object-contain hover:-translate-y-2 hover:-translate-x-4 hover:shadow-xl shadow-black hover:scale-105 duration-500 rounded-xl"
                    />
                    <div className="md:w-1/2">
                      <div className="flex flex-col gap-2">
                        <Typography.H2 size="xl" weight="semibold">
                          Receive a CPD Accredited Certificate upon completion
                        </Typography.H2>
                        <Typography.P>
                          Upon completing all units and assessents, you receive
                          a certificate which certifies your knowledge. The
                          certificate also:
                        </Typography.P>
                      </div>
                      <div className="space-y-2 mt-4">
                        {courseBenefits.map((benefit) => (
                          <div
                            key={generateKey()}
                            className="flex items-center gap-1"
                          >
                            <GoDotFill size={14} />
                            <Typography.P fontColor="medium">
                              {benefit}
                            </Typography.P>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="courses" className="py-8 flex flex-col gap-8">
              <div className="max-lg:px-5">
                <Typography.H3
                  size="basePro"
                  className="lg:!text-2xl !text-xl"
                  weight="semibold"
                >
                  Course content - {courseInfo?.units.length} unit series
                </Typography.H3>
                <ExpandableText text={courseInfo?.description!} />
              </div>
              <div>
                {courseInfo?.units.map((unit, i) => {
                  const unitLength =
                    courseInfo?.completionPeriod / courseInfo?.units?.length ||
                    12;
                  const title = unit.title;
                  return (
                    <div
                      key={generateKey()}
                      className="border-b border-gray-200/50 w-full"
                    >
                      <Link href={`/courses/${courseInfo?.slug}/${unit.id}`}>
                        <div className="w-full flex justify-between items-center py-2 px-5 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
                          <div>
                            <Typography.H2
                              weight="semibold"
                              className="!text-base lg:!text-[20px] hover:underline hover:!text-black"
                            >
                              {title}
                            </Typography.H2>
                            <div>
                              <Typography.P fontColor="grey" weight="medium">
                                {unitLength} total hours
                              </Typography.P>
                            </div>
                          </div>
                          <ChevronRightIcon />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
      <Footer />
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
