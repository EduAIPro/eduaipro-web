import React from "react";
import data from "@/components/common/data/courses.json";
import Typography from "@/components/common/ui/Typography";
import { generateKey } from "@/utils/key";
import { MedalStar, TickCircle, VideoSquare } from "iconsax-react";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import Image from "next/image";
import { Button, TabNav } from "@radix-ui/themes";
import { CourseIcon } from "@/components/svgs";
import { predictCourseDuration } from "@/utils/helpers";
import { MdOutlineCheck, MdOutlineSmartphone } from "react-icons/md";
import { MdLaptop, MdOutlineTabletAndroid } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { LuClipboardList, LuLink } from "react-icons/lu";
import { HiOutlineDownload } from "react-icons/hi";
import { TbTemplate } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import StickyHeader from "@/components/courses/StickyHeader";
import ExpandableText from "@/components/courses/ExpandableText";
import { capitalizeFirstLetter } from "@/utils/text";
import CourseContentAccordion from "@/components/courses/Accordion";
import Link from "next/link";

const courseDevices = {
  desktop: <MdLaptop size={20} />,
  tablet: <MdOutlineTabletAndroid size={16} />,
  smartphone: <MdOutlineSmartphone size={16} />,
};

const detailsIcons = {
  downloadable: (
    <HiOutlineDownload
      strokeWidth={1.5}
      size={25}
      className="text-accent-800"
    />
  ),
  videos: (
    <VideoSquare strokeWidth={1.5} size={25} className="text-accent-800" />
  ),
  link: <LuLink strokeWidth={1.5} size={25} className="text-accent-800" />,
  template: (
    <TbTemplate strokeWidth={1.5} size={25} className="text-accent-800" />
  ),
  test: <CgFileDocument size={25} className="text-accent-800" />,
  certificate: <MedalStar size={30} className="text-accent-800" />,
};

export async function generateStaticParams() {
  return data.map((course: { name: string }) => ({
    courseName: course.name,
  }));
}

export default async function CoursePage({
  params,
}: {
  params: { courseName: string };
}) {
  const courseName = params.courseName;
  const courseInfo = data.find(
    (course) => course.name === decodeURI(courseName)
  );

  return (
    <>
      <StickyHeader courseName={courseInfo?.name!} />
      <section className="max-sm:!pt-0 max-sm:-mx-4 max-md:-mx-6 max-lg:-mx-[56px]">
        <div className="flex flex-col lg:gap-28 lg:mb-40">
          <div className="relative lg:flex items-center justify-center">
            <div className="p-4 py-8 md:p-8 md:py-12 bg-accent-200/50 flex items-center justify-center">
              <div className="w-full pb-5 md:pb-16 flex flex-col gap-6">
                <div className="max-md:hidden">
                  <Image
                    src={"/assets/images/logo-outline.png"}
                    width={220}
                    height={80}
                    className="w-[140px] h-[48px] lg:w-[200px] lg:h-[60px]"
                    alt=""
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Typography.H2 fontColor="dark" weight="semibold">
                    {courseInfo?.name}
                  </Typography.H2>
                  <Typography.P
                    fontColor="dark"
                    weight="medium"
                    className="line-clamp-3"
                  >
                    {courseInfo?.overview.introduction}
                  </Typography.P>

                  <div className="flex items-center gap-3">
                    <Typography.H3 size="small" weight="medium">
                      Available on:
                    </Typography.H3>
                    {courseInfo?.accessibility.platforms.map((item) => (
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
                  <Button className="primary__btn btn !w-fit" variant="solid">
                    <Typography.P fontColor="white">Enroll now</Typography.P>
                  </Button>
                </Link>
              </div>
              <div className="max-lg:hidden w-full flex flex-col items-center">
                <CourseIcon width={350} height={350} />
              </div>
            </div>
            <div className="bg-white lg:absolute lg:-bottom-12 flex max-lg:mb-5 px-4 py-6 md:px-8 lg:rounded-xl lg:space-x-8 border-b-2 border-grey-3 lg:divide-x divide-grey-4 lg:items-center max-lg:flex-col max-lg:gap-5 justify-evenly lg:shadow-lg shadow-grey-5/30">
              <div className="lg:pr-5">
                <Typography.H4
                  className="!text-base md:!text-lg"
                  weight="medium"
                >
                  {courseInfo?.overview.duration.numberOfUnits} unit series
                </Typography.H4>
                <Typography.P size="small" fontColor="grey">
                  Get in-depth specialization in your career
                </Typography.P>
              </div>
              <div className="lg:px-5">
                <Typography.H4
                  className="!text-base md:!text-lg"
                  weight="medium"
                >
                  Beginner level
                </Typography.H4>
                <Typography.P size="small" fontColor="grey">
                  No prior experience required
                </Typography.P>
              </div>
              <div className="lg:px-5">
                <Typography.H4
                  className="!text-base md:!text-lg"
                  weight="medium"
                >
                  {predictCourseDuration(
                    courseInfo?.overview.duration.totalHours!
                  )}{" "}
                  months
                </Typography.H4>
                <Typography.P size="small" fontColor="grey">
                  At 3 hours per week
                </Typography.P>
              </div>
              <div className="lg:pl-5">
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
          <div>
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
              <div>
                <Typography.H3 weight="semibold">
                  Learning objectives
                </Typography.H3>
                <div className="flex flex-col gap-2 mt-4">
                  {courseInfo?.overview.objectives.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <TickCircle className="text-green-600" size={20} />
                      <Typography.P>{item}</Typography.P>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Typography.H3 weight="semibold">
                  Skills {"you'll learn"}
                </Typography.H3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {courseInfo?.skillsAndCompetencies.map((item, i) => (
                    <div
                      key={i}
                      className="bg-accent-100 py-1 px-3 rounded-md flex items-center gap-1"
                    >
                      <MdOutlineCheck size={15} />
                      <Typography.P size="small">{item}</Typography.P>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Typography.H3 weight="semibold">Extra details</Typography.H3>
                <div className="grid min-[350px]:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {[
                    "Globally recognized certificate",
                    ...courseInfo?.structure.resources!,
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 lg:hover:-translate-y-2 cursor-pointer detail_card sm:p-5 rounded-lg duration-500"
                    >
                      {Object.keys(detailsIcons).find((value) =>
                        item.toLowerCase().includes(value.toLowerCase())
                      ) ? (
                        detailsIcons[
                          Object.keys(detailsIcons).find((value) =>
                            item.toLowerCase().includes(value.toLowerCase())
                          ) as keyof typeof detailsIcons
                        ]
                      ) : (
                        <LuClipboardList
                          size={30}
                          strokeWidth={1.5}
                          className="text-accent-800"
                        />
                      )}
                      <Typography.P
                        weight="medium"
                        fontColor="medium"
                        className="!text-md"
                      >
                        {capitalizeFirstLetter(item)}
                      </Typography.P>
                    </div>
                  ))}
                </div>
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
                          Receive a {courseInfo?.certification.type} upon
                          completion
                        </Typography.H2>
                        <Typography.P>
                          Upon completing all units and assessents, you receive
                          a certificate which certifies your knowledge. The
                          certificate also:
                        </Typography.P>
                      </div>
                      <div className="space-y-2 mt-4">
                        {courseInfo?.certification.benefits.map((benefit) => (
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
                  Course content - {courseInfo?.overview.duration.numberOfUnits}{" "}
                  unit series
                </Typography.H3>
                <ExpandableText text={courseInfo?.description!} />
              </div>
              <div>
                {courseInfo?.units.map((unit) => (
                  <CourseContentAccordion
                    unitCount={unit.modules.length}
                    unitLength={unit.totalDuration}
                    title={unit.title}
                    key={generateKey()}
                    courseName={courseInfo?.name}
                    unitId={unit.number}
                  >
                    <div className="flex flex-col gap-4 px-5">
                      <div>
                        <Typography.H2
                          weight="semibold"
                          size="base"
                          className="mb-2 max-sm:text-sm"
                          fontColor="dark"
                        >
                          Learning Objectives
                        </Typography.H2>
                        <div className="flex flex-col gap-1 md:gap-2">
                          {unit.objectives.map((objective, i) => (
                            <div
                              key={generateKey()}
                              className="flex items-center gap-2"
                            >
                              <TickCircle
                                className="text-green-600"
                                size={16}
                              />
                              <Typography.P
                                weight="medium"
                                fontColor="medium"
                                className="!text-sm"
                              >
                                {objective}
                              </Typography.P>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Typography.H2
                          weight="semibold"
                          size="base"
                          className="mb-2 max-sm:text-sm"
                          fontColor="dark"
                        >
                          Modules
                        </Typography.H2>
                        {unit.modules.map((module, i) => (
                          <div
                            key={generateKey()}
                            className="flex items-center gap-2"
                          >
                            <Typography.P
                              weight="medium"
                              className="max-sm:text-sm"
                            >
                              {module.title}
                            </Typography.P>

                            <span className="text-grey-10 font-medium text-xl">
                              •
                            </span>

                            <span className="text-grey-10 font-medium text-sm">
                              {module.duration * 60} minutes
                            </span>
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
        {/* <div className="bg-brand p-6 md:p-12 lg:p-20 max-lg:rounded-xl">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-y-3">
              <Typography.H2 size="xlarge" fontColor="white">
                {courseInfo?.name}
              </Typography.H2>
              <Typography.P fontColor="white">
                {courseInfo?.overview.introduction}
              </Typography.P>
              <div className="flex flex-col gap-y-1 mt-4">
                <Typography.H4 weight="medium" size="base" fontColor="light">
                  This course includes:
                </Typography.H4>
                <div className="flex max-md:flex-col gap-y-2 md:items-center gap-x-4">
                  <article className="flex items-center gap-x-2 text-grey-6/60">
                    <DocumentText className="w-5 h-5" />
                    <Typography.P fontColor="light">3 resources</Typography.P>
                  </article>
                  <article className="flex items-center gap-x-1 text-grey-6/60">
                    <Mobile className="w-5 h-5" />
                    <Typography.P fontColor="light">
                      Available on mobile
                    </Typography.P>
                  </article>
                  <article className="flex items-center gap-x-1 text-grey-6/60">
                    <MedalStar className="w-5 h-5" />
                    <Typography.P fontColor="light">
                      Certificate of completion
                    </Typography.P>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-x-6 justify-between mt-6 xs:mt-12 max-md:flex-col-reverse max-md:gap-y-4">
          <div className="w-full flex flex-col gap-y-6">
            <article className="border rounded-lg border-grey-9/60 p-4 lg:p-6">
              <Typography.H3 weight="semibold" size="large">
                What {"you'll"} learn
              </Typography.H3>
              <ol className="grid xs:grid-cols-2 md:grid-cols-none lg:grid-cols-2 gap-2 mt-2 lg:mt-4">
                {courseInfo?.skillsAndCompetencies.map((topic) => (
                  <li key={generateKey()} className="flex items-center gap-x-2">
                    <TickCircle className="text-green-700" />
                    <Typography.P className="capitalize">{topic}</Typography.P>
                  </li>
                ))}
              </ol>
            </article>
            <article>
              <Typography.H2 weight="semibold" size="basePro">
                Course Content
              </Typography.H2>
              <div className="flex items-center gap-x-1 text-sm mt-2">
                <Typography.P size="small" weight="medium" fontColor="medium">
                  {courseInfo?.overview.duration.numberOfUnits} units
                </Typography.P>
                <Typography.P fontColor="medium">•</Typography.P>
                <Typography.P size="small" weight="medium" fontColor="medium">
                  {courseInfo?.overview.duration.totalHours} total length
                </Typography.P>
              </div>
              <div className="border p-6 pt-2 rounded-lg mt-1">
                <ul className="flex flex-col divide-y-[0.5px] divide-grey-5/60">
                  {courseInfo?.units.map((content) => (
                    <li key={generateKey()}>
                      <div className="text-grey-9 flex items-center justify-between py-2">
                        <div className="flex items-center gap-x-2">
                          {/* {content.isResource ? (
                            <ArchiveBook className="w-5 h-5" />
                          ) : ( */}
        {/* <VideoSquare className="w-5 h-5" /> */}
        {/* // )} 
                          <Typography.H2 fontColor="medium" size="large">
                            {content.title}
                          </Typography.H2>
                        </div>
                        <div>
                          {/* <Typography.P fontColor="grey">
                            {/* {content.length}{" "} 
                          </Typography.P> 
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <div className="w-full">
            <article>
              <Typography.H3 weight="semibold" size="large">
                Course Overview
              </Typography.H3>
              <div className="mt-2">
                <Typography.P className="leading-[30px]">
                  {courseInfo?.overview.introduction}
                </Typography.P>
              </div>
            </article>
          </div>
        </div> */}
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}
