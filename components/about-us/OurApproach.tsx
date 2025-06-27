import OurApproachImg from "@/public/assets/images/our-approach.png";
import { generateKey } from "@/utils/key";
import Image from "next/image";

type OurApproachProps = {};

const approaches = [
  "At EduAI Pro, we believe in a personalized and flexible approach to professional development, which is enhanced through the use of cutting-edge AI technology.",
  "Our platform is designed to meet the unique needs of each learner, using artificial intelligence to create tailored learning paths and development plans.",
  "Whether you're seeking to advance your career or improve specific skills, our AI-driven approach ensures that your learning experience is relevant, efficient, and aligned with your goals.",
];

export const OurApproach = ({}: OurApproachProps) => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-lg:px-5 lg:max-w-[80%] mx-auto space-y-8 md:space-y-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium">
            Our Approach
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
          <div className="xl:col-span-2 flex flex-col justify-center">
            <Image
              src={OurApproachImg}
              height={486}
              alt="our approach"
              className="lg:max-h-[486px] w-full"
            />
          </div>
          <div className="space-y-7 flex flex-col justify-between">
            {approaches.map((a, i) => (
              <div key={generateKey()}>
                <h2 className="font-semibold text-4xl">0{i + 1}</h2>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
