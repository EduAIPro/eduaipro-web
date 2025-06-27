import { generateKey } from "@/utils/key";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Pill from "../common/ui/Pill";
import { testimonials } from "./data";

export default function Testimonials() {
  return (
    <section className="responsive__section">
      <div className="space-y-16">
        <div className="sm:max-w-[40%] mx-auto text-center gap-y-4 flex flex-col mb-12">
          <Pill text="Testimonials" pillBg="#F1F5FF" />
          <h2 className="font-medium text-4xl">
            What Educators and Institutions Are Saying About EduAiPro
          </h2>
        </div>
        <div className="space-y-7">
          <Marquee className="flex gap-x-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={generateKey()} item={testimonial} />
            ))}
          </Marquee>
          <Marquee className="flex gap-x-4" direction="right">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={generateKey()} item={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  item: {
    name: string;
    position: string;
    talk: string;
  };
};

import Quote from "@/components/svgs/quote.svg";

const TestimonialCard = ({ item }: TestimonialCardProps) => {
  return (
    <div className="border border-primary-150 mr-7 h-[290px] rounded-xl p-5 space-y-5 sm:max-w-[450px]">
      <div>
        <Quote width={32} height={32} className="w-fit" />
      </div>
      <div>
        <p>"{item.talk}"</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-fit flex-shrink-0">
          <Image
            width={45}
            height={45}
            src="/assets/images/testimonial.jpg"
            className="size-10 rounded-full"
            alt=""
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-medium text-base">{item.name}</h4>
          <p>{item.position}</p>
        </div>
      </div>
    </div>
  );
};
