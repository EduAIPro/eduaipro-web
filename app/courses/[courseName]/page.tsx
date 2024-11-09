import React from "react";
import data from "@/components/courses/data.json";
import Typography from "@/components/common/ui/Typography";
import { generateKey } from "@/utils/key";
import {
  ArchiveBook,
  DocumentText,
  MedalStar,
  Mobile,
  TickCircle,
  VideoSquare,
} from "iconsax-react";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";

export async function generateStaticParams() {
  // Example: Fetch all product IDs for static generation
  //   const products = await fetch(data).then((res) => res.json());
  //   console.log({ products });
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
      <section className="responsive__section max-sm:!pt-0">
        <div className="bg-brand p-6 md:p-12 lg:p-20 max-lg:rounded-xl">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-y-3">
              <Typography.H2 size="xlarge" fontColor="white">
                {courseInfo?.name}
              </Typography.H2>
              <Typography.P fontColor="white">
                {courseInfo?.description}
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
                {courseInfo?.topics.map((topic) => (
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
                  {courseInfo?.courseLength}
                </Typography.P>
                <Typography.P fontColor="medium">•</Typography.P>
                <Typography.P size="small" weight="medium" fontColor="medium">
                  {courseInfo?.totalTime} total length
                </Typography.P>
              </div>
              <div className="border p-6 pt-2 rounded-lg mt-1">
                <ul className="flex flex-col divide-y-[0.5px] divide-grey-5/60">
                  {courseInfo?.courseContents.map((content) => (
                    <li key={generateKey()}>
                      <div className="text-grey-9 flex items-center justify-between py-2">
                        <div className="flex items-center gap-x-2">
                          {content.isResource ? (
                            <ArchiveBook className="w-5 h-5" />
                          ) : (
                            <VideoSquare className="w-5 h-5" />
                          )}
                          <Typography.H2 fontColor="medium" size="large">
                            {content.name}
                          </Typography.H2>
                        </div>
                        <div>
                          <Typography.P fontColor="grey">
                            {content.length}{" "}
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
                  {courseInfo?.overview}
                </Typography.P>
              </div>
            </article>
          </div>
        </div>
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}
