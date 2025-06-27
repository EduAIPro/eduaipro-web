"use client";

import Pill from "../common/ui/Pill";

import { generateKey } from "@/utils/key";
import { features } from "./data";

export default function ReasonsToChooseUs() {
  return (
    <section className="bg-primary-100 py-20 max-md:px-5">
      <div className="md:max-w-[80%] mx-auto space-y-20">
        <div className="space-y-3 text-center lg:max-w-[60%] mx-auto">
          <Pill text="Why choose us" pillBg="#F5F8FF" />
          <h1 className="text-grey-800 font-medium text-2xl sm:text-3xl md:text-4xl">
            A Platform Designed for Educators Supercharged by AI
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f) => (
            <div key={generateKey()} className="md:p-5 space-y-6">
              <div className="rounded-full bg-[#D9E3F8] size-12 flex items-center justify-center">
                <div className="size-6 flex-shrink-0">
                  <f.icon width={24} height={24} className="w-full" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-base md:text-xl font-medium text-primary">
                  {f.title}
                </h3>
                <p className="text-base text-[#333333]">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
