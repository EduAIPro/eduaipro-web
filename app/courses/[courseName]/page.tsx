"use client";
import data from "@/components/common/data/courses.json";
import Typography from "@/components/common/ui/Typography";
import CourseContentAccordion from "@/components/courses/Accordion";
import ExpandableText from "@/components/courses/ExpandableText";
import StickyHeader from "@/components/courses/StickyHeader";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { CourseIcon } from "@/components/svgs";
import { predictCourseDuration } from "@/utils/helpers";
import { generateKey } from "@/utils/key";
import { Button, TabNav } from "@radix-ui/themes";
import { MedalStar, TickCircle, VideoSquare } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CgFileDocument } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import { HiOutlineDownload } from "react-icons/hi";
import { LuLink } from "react-icons/lu";
import {
  MdLaptop,
  MdOutlineForum,
  MdOutlineSmartphone,
  MdOutlineTabletAndroid,
} from "react-icons/md";
import { TbTemplate } from "react-icons/tb";

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

// export async function generateStaticParams() {
//   const filePath = path.join(
//     process.cwd(),
//     "components/common/data/courses.json"
//   );
//   // Read and parse the file
//   const fileContents = fs.readFileSync(filePath, "utf-8");
//   const courses = JSON.parse(fileContents);

//   const params = courses.map((course: any) => ({
//     courseName: encodeURI(course.name),
//   }));

//   return params;
// }

export default async function CoursePage() {
  // const [showMore, setShowMore] = useState(false);

  const { courseName } = useParams();
  // const { courseName } = await params;

  const courseInfo = data.find(
    (course) => course.name === decodeURI(courseName as string)
  );
  return (
    <>
      <StickyHeader courseName={courseInfo?.name!} />
      <section className="">
        <div className="flex flex-col">
          <div className="pt-32 md:pt-40 bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] animate-fade-in-up">
            <div className="max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
              <div className="flex items-center justify-center">
                <div className="w-full pb-5 md:pb-16 flex flex-col gap-6">
                  {/* <div className="max-md:hidden">
                  <Image
                    src={"/assets/images/logo-outline.png"}
                    width={220}
                    height={80}
                    className="w-[140px] h-[48px] lg:w-[200px] lg:h-[60px]"
                    alt=""
                  />
                </div> */}

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
              <div className="flex pb-6 border-b-2 border-grey-3 flex-col gap-5 justify-evenly">
                <div>
                  <Link scroll href="#courses">
                    <Typography.H4
                      className="!text-base md:!text-lg hover:!underline"
                      weight="medium"
                    >
                      {courseInfo?.overview.duration.numberOfUnits} unit series
                    </Typography.H4>
                  </Link>
                  <Typography.P size="small" fontColor="grey">
                    Get in-depth specialization in your career
                  </Typography.P>
                </div>
                {/* <div>
                <Typography.H4
                  className="!text-base md:!text-lg"
                  weight="medium"
                >
                  Beginner level
                </Typography.H4>
                <Typography.P size="small" fontColor="grey">
                  No prior experience required
                </Typography.P>
              </div> */}
                <div>
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
              <div>
                <Typography.H3 weight="semibold">
                  Learning objectives
                </Typography.H3>
                <ul className="flex flex-col gap-2 mt-4">
                  {courseInfo?.overview.objectives.map((item, i) => (
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
                </ul>
              </div>
              <div>
                <Typography.H3 weight="semibold">
                  Skills {"you'll learn"}
                </Typography.H3>
                <ul
                  className={`flex mb-4 flex-col gap-4 sm:gap-2 h-full ease-in-out overflow-hidden transition-all duration-700 mt-4
                    // showMore
                    //   ? "max-h-[1000px]"
                    //   : "max-h-[270px] sm:max-h-[220px]"
                  `}
                >
                  {courseInfo?.skillsAndCompetencies.map((item, i) => (
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
                </Button> */}
              </div>
              <div>
                <Typography.H3 weight="semibold">Extra details</Typography.H3>
                <ul className="flex flex-wrap items-center gap-10 mt-4">
                  {[
                    {
                      title: "Globally recognized certificate",
                      Icon: MedalStar,
                    },
                    { title: "Online Forum", Icon: MdOutlineForum },
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
                    // unitCount={unit.modules.length}
                    unitLength={unit.totalDuration as number}
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
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}
