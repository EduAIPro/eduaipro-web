import { Box, Button, Flex, Text, Theme } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import Typography from "../common/ui/Typography";
import { appIcons } from "./data";
import { generateKey } from "@/utils/key";
import CompaniesMarquee from "./CompaniesMarquee";

export default function HeroSection() {
  return (
    <section className="">
      <Box
        style={{ borderRadius: "24px" }}
        className="px-4 sm:px-6 lg:px-8 py-6 max-md:pb-12 md:py-12 bg-accent-100 border-white overflow-x-clip relative"
      >
        {/* L-shaped border radius overlay */}
        <div className="absolute trusted__companies bottom-0 left-0 w-full xl:w-3/5 bg-white rounded-tr-[50px] flex items-center justify-between space-x-4">
          <CompaniesMarquee />
        </div>

        <div className="flex flex-col md:flex-row items-centermd:p-6 lg:p-12 relative z-10">
          <div className="flex-1 text-brand max-sm:pb-24 pb-14 md:pb-28">
            <div className="inline-block bg-accent-400 bg-opacity-35 rounded-full px-4 py-1 mb-3">
              <Typography.H2
                size="small"
                fontColor="brand"
                weight="semibold"
                className="uppercase"
              >
                📈 Enhance Teaching Excellence
              </Typography.H2>
            </div>
            <div className="flex flex-col gap-y-4">
              <Typography.H1 fontColor="brand" size="xlarge" weight="bold">
                {"Access the world's best AI-Powered Accredited CPD Program"}
              </Typography.H1>
              <Typography.P weight="medium" fontColor="brand">
                {
                  "Transform your teaching with EduAI Pro's accredited Continued Professional Development (CPD) courses. Designed for mentors, teaching assistants, primary, secondary, and higher institution educators, our AI-powered platform equips you with the tools to thrive and make a lasting impact."
                }
              </Typography.P>
            </div>
            <div className="flex gap-x-4 my-6 items-center">
              {appIcons.map((item) => (
                <div key={generateKey()} className="app__download">
                  <item.icon variant="Bold" color="white" />
                </div>
              ))}
              <Typography.P weight="semibold" fontColor="brand">
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
