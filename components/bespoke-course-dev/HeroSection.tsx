import BespokeImg from "@/public/assets/images/bespoke.webp";
import Image from "next/image";
import { Button } from "../ui/button";

export const HeroSection = () => {
  return (
    <section className="pt-32 sm:pt-40 pb-20 max-md:px-5 md:max-w-[90%] lg:max-w-[80%] mx-auto space-y-12 animate-fade-in-up">
      <div className="md:max-w-[80%] xl:max-w-[60%] space-y-5">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
          Smarter CPD Solutions Tailored for Your Teachers
        </h1>
        <p className="text-base font-medium text-grey-650">
          In today’s dynamic education landscape, one-size-fits-all training
          doesn’t work. That’s why EduAI Pro partners with schools, colleges,
          and educational organizations to create bespoke CPD programs tailored
          to their specific goals, challenges, and values. Empower your
          educators with targeted CPD designed to meet your school’s exact
          needs—efficient, flexible, and certified.
        </p>
        <Button>
          <p className="font-medium">Start customizing your program</p>
        </Button>
      </div>
      <div>
        <Image src={BespokeImg} alt="Bespoke" />
      </div>
    </section>
  );
};
