import React from "react";
import Typography from "../common/ui/Typography";
import Image from "next/image";

export default function CoursesHeroSection() {
  return (
    <section>
      <div className="bg-courses-hero max-sm:pt-52 sm:pt-32 pb-48 md:pb-60 bg-black/50 bg-blend-overlay px-8 md:px-14 lg:px-20 w-full bg-cover max-md:bg-right bg-top max-xs:mb-5 xs:my-10 relative">
        <div className="bg-white p-6 max-xs:hidden flex flex-col gap-y-2 max-w-3xl shadow-2xl">
          <Typography.H2 weight="semibold" fontColor="large">
            Explore our Professional Development Courses
          </Typography.H2>
          <Typography.P className="md:max-w-[80%]" weight="medium">
            Choose from our two expertly crafted courses that cater to upgrade
            your different skill levels, providing you with the tools you need
            to succeed in your professional journey.
          </Typography.P>
        </div>
        <div className="absolute top-3 left-3 xs:hidden">
          <Image
            src="/assets/images/logo-outline.png"
            alt="logo"
            width={64}
            height={56}
          />
        </div>
      </div>

      <div className="bg-white p-4 xs:hidden flex flex-col gap-y-2 mb-12">
        <Typography.H2 weight="semibold" fontColor="large">
          Explore our Professional Development Courses
        </Typography.H2>
        <Typography.P className="md:max-w-[80%]" weight="medium">
          Choose from our two expertly crafted courses that cater to upgrade
          your different skill levels, providing you with the tools you need to
          succeed in your professional journey.
        </Typography.P>
      </div>
    </section>
  );
}
