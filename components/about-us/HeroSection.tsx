import AboutUs from "@/public/assets/images/about-us.webp";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="pt-32 sm:pt-40 pb-20 max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto animate-fade-in-up">
      <div className="space-y-10 md:space-y-20">
        <div className="text-center md:max-w-[70%] mx-auto">
          <h2 className="font-semibold text-2xl md:text-3xl">
            Our mission is to empower educators and professionals by providing
            high-quality, accessible Continued Professional Development (CPD)
            opportunities.
          </h2>
        </div>
        <div>
          <Image src={AboutUs} alt="" className="w-full" />
        </div>
        <div className="md:max-w-[70%] mx-auto font-medium grid sm:grid-cols-2 gap-5 sm:gap-10">
          <div>
            <p>
              We are committed to fostering a culture of lifelong learning,
              helping individuals enhance their skills, achieve their career
              goals, and stay ahead in a rapidly evolving professional
              landscape.
            </p>
          </div>
          <div>
            <p>
              Our platform offers a range of courses, tailored development
              programs, and accreditation services, all designed to ensure that
              every learner has the tools and support they need to succeed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
