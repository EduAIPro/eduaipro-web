"use client";
import { generateKey } from "@/utils/key";
import { useRef } from "react";
import ReactPlayer from "react-player";
import { BaseCard } from "./BaseCard";
import { categories } from "./data";

export default function BoostCareer() {
  const playerRef = useRef<ReactPlayer>(null);
  return (
    <section className="py-20">
      <div className="max-w-[70%] mx-auto">
        <BaseCard>
          <div className="grid grid-cols-2 gap-7 z-20 relative">
            <div className="space-y-5 h-full flex flex-col justify-center">
              <h2 className="text-primary-400 font-semibold text-3xl">
                Boost Your Teaching Skills with AI-powered Tools and Courses on
                Our Online Learning App
              </h2>
              <p className="text-grey-800 font-medium text-base leading-7">
                Enhance your teaching skills with our AI-powered learning
                platform designed for educators. Access expert-led courses and
                advanced tools to elevate your teaching experience and student
                engagement. Join a community of innovative educators and stay
                ahead in education today!
              </p>
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <div
                    key={generateKey()}
                    className="py-2 px-3 rounded-full bg-[#D9E3F8]"
                  >
                    <p className="font-medium text-primary text-sm">
                      {category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="rounded-2xl xl:w-fit xl:mx-auto overflow-hidden">
                <ReactPlayer
                  ref={playerRef}
                  // playing
                  controls
                  style={{ borderRadius: "12px" }}
                  width="100%"
                  height={403}
                  url="https://res.cloudinary.com/dccxqee2z/video/upload/v1744391203/intro_qe9vih.mp4"
                  fallback={
                    <div className="w-full h-full rounded-lg animate-pulse bg-gray-200/60"></div>
                  }
                />
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>
  );
}
