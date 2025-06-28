import CoursesWoman from "@/public/assets/images/wo.webp";
import Image from "next/image";

export default function CoursesHeroSection() {
  return (
    <section className="animate-fade-in-up pt-40 max-md:pt-32 max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto">
      <div className="space-y-10">
        <div className="md:max-w-[80%] space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Explore our Professional Development Courses
          </h2>
          <p className="font-medium">
            Discover expertly crafted courses designed to help you advance at
            every stage of your career. Each program offers practical knowledge
            and hands-on experience, ensuring you gain the skills and confidence
            needed to succeed. With flexible learning options and supportive
            resources, you’ll be empowered to reach your professional goals.
          </p>
        </div>
        <div>
          <Image
            src={CoursesWoman}
            alt=""
            height={600}
            className="rounded-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
}
