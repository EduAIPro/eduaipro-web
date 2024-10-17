import React from "react";
import Pill from "../common/ui/Pill";
import Typography from "../common/ui/Typography";
import { UnderlineOneIcon } from "../svgs";
import Image from "next/image";
import { categories } from "./data";
import { generateKey } from "@/utils/key";

export default function BoostCareer() {
  return (
    <section className="responsive__section">
      <div className="rounded-2xl lg:rounded-3xl bg-brand max-md:py-8 max-sm:px-4 sm:px-6 md:p-10 lg:p-12 xl:p-20 bg-boost-career-pattern">
        <div className="flex items-center max-xl:flex-col-reverse justify-between gap-x-12">
          <div className="w-full">
            <div className="border-8 border-grey-7/40 rounded-2xl xl:w-fit xl:mx-auto">
              <Image
                src="/assets/images/logo-white.png"
                width={500}
                height={300}
                alt=""
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
          <div className="w-full pr-8">
            <div className="flex flex-col gap-y-14 pb-6 border-b-2 border-b-grey-9/30">
              <div className="relative">
                <Typography.H2
                  weight="semibold"
                  fontColor="white"
                  size="xlarge"
                >
                  Boost Your Teaching Skills with AI-powered Tools and Courses
                  on Our Online Learning App
                </Typography.H2>
                <div className="absolute -bottom-14">
                  <Image
                    alt=""
                    width={500}
                    height={30}
                    src="/assets/images/needle-underline.png"
                  />
                  {/* <UnderlineOneIcon width={1209} height={30} /> */}
                </div>
              </div>
              <Typography.P fontColor="light">
                Enhance your teaching skills with our AI-powered learning
                platform designed for educators. Access expert-led courses and
                advanced tools to elevate your teaching experience and student
                engagement. Join a community of innovative teachers and stay
                ahead in education today!
              </Typography.P>
            </div>
            <div className="flex flex-wrap gap-4 py-6">
              {categories.map((category) => (
                <div
                  key={generateKey()}
                  className="py-2 px-3 rounded-lg bg-grey-8/20"
                >
                  <Typography.P weight="medium" fontColor="light">
                    {category}
                  </Typography.P>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
