import React from "react";
import Marquee from "react-fast-marquee";
import { testimonials } from "./data";
import { generateKey } from "@/utils/key";
import Image from "next/image";
import Typography from "../common/ui/Typography";
import Pill from "../common/ui/Pill";

export default function Testimonials() {
  return (
    <section className="responsive__section">
      <div className="sm:max-w-[60%] mx-auto text-center gap-y-4 flex flex-col mb-12">
        <Pill text="TESTIMONIALS" />
        <Typography.H2 weight="semibold" size="xlarge">
          What Educators and Institutions Are Saying About EduAiPro
        </Typography.H2>
      </div>
      <div>
        <Marquee className="flex gap-x-4">
          {testimonials.map((testimonial) => (
            <div
              key={generateKey()}
              className="flex flex-col px-10 md:mx-20 gap-y-6 items-center "
            >
              <div className="text-center max-sm:max-w-[400px] sm:max-w-[500px] mx-auto">
                <Typography.P size="large">
                  &quot;{testimonial.talk}&quot;
                </Typography.P>
              </div>
              <div className="mt-4">
                <Image
                  width={140}
                  height={140}
                  src="/assets/images/testimonial.jpg"
                  className="w-16 h-16 rounded-full mx-auto"
                  alt=""
                />
                <div className="flex flex-col text-center items-center mt-3">
                  <Typography.H2 size="base">{testimonial.name}</Typography.H2>
                  <Typography.P className="max-w-[300px] mx-auto">
                    {testimonial.position}
                  </Typography.P>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
