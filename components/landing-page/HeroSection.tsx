import { Box, Button, Flex, Text, Theme } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import Typography from "../common/ui/Typography";
import { Apple, GooglePlay } from "iconsax-react";
import { appIcons } from "./data";
import { generateKey } from "@/utils/key";
import CompaniesMarquee from "./CompaniesMarquee";

export default function HeroSection() {
  return (
    <section className="pb-12">
      <Box
        style={{ borderRadius: "24px" }}
        className="px-4 sm:px-6 lg:px-8 py-12 bg-brand-1000 overflow-hidden relative"
      >
        {/* L-shaped border radius overlay */}
        <div className="absolute trusted__companies bottom-0 left-0 w-full md:w-3/5 bg-white rounded-tr-[50px] flex items-center justify-between space-x-4">
          <CompaniesMarquee />
        </div>

        <div className="flex flex-col md:flex-row items-center p-8 md:p-12 relative z-10">
          <div className="flex-1 text-white pb-28">
            <div className="inline-block bg-brand-700 bg-opacity-35 rounded-full px-4 py-1 mb-3">
              <Typography.H2 size="small" fontColor="large" weight="semibold">
                📈 ENHANCE YOUR CAREER
              </Typography.H2>
            </div>
            <div className="flex flex-col gap-y-4">
              <Typography.H1
                fontColor="white"
                className="capitalize"
                size="xxlarge"
                weight="bold"
              >
                Access the world&apos;s
                <br />
                best learning course
                <br />
                with EduAIpro
              </Typography.H1>
              <Typography.P weight="medium" fontColor="white">
                Unlock a world of educational resources with our cutting-edge
                course app for teachers. Empower yourself to excel in your
                teaching career, inspire your students, and streamline your
                classroom management.
              </Typography.P>
            </div>
            <div className="flex gap-x-4 my-6 items-center">
              {appIcons.map((item) => (
                <div key={generateKey()} className="app__download">
                  <item.icon variant="Bold" color="white" />
                </div>
              ))}
              <Typography.P weight="semibold" fontColor="white">
                Download now
              </Typography.P>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            {/* <img
                src="/api/placeholder/500/500"
                alt="Maxlearn App"
                className="w-full h-auto object-contain"
              /> */}
          </div>
        </div>
      </Box>
    </section>
  );
}
