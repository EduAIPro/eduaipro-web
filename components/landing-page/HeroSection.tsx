import { Box, Button, Flex, Text, Theme } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import Typography from "../common/ui/Typography";
import { Apple, GooglePlay } from "iconsax-react";
import { appIcons } from "./data";
import { generateKey } from "@/utils/key";

export default function HeroSection() {
  return (
    <section>
      <Box
        style={{ backgroundColor: "var(--blue-a12)", borderRadius: "24px" }}
        className="px-4 sm:px-6 lg:px-8 py-12 overflow-hidden relative"
      >
        {/* L-shaped border radius overlay */}
        <div className="absolute trusted__companies bottom-0 left-0 w-full h-40 md:w-3/5 bg-white rounded-tr-[100px] py-20 flex items-center justify-between space-x-4">
          {/* <img src="/logo-microsoft.png" alt="Microsoft" className="h-10" />
            <img src="/logo-evernote.png" alt="Evernote" className="h-10" />
            <img src="/logo-medium.png" alt="Medium" className="h-10" /> */}
          {/* Add more logos as needed */}
        </div>

        <div className="flex flex-col md:flex-row items-center p-8 md:p-12 relative z-10">
          <div className="flex-1 text-white">
            <div className="inline-block bg-brand-900 bg-opacity-35 rounded-full px-4 py-1 mb-3">
              <Typography.P weight="semibold">
                📈 ENHANCE YOUR CAREER
              </Typography.P>
            </div>
            <div className="flex flex-col gap-y-4">
              <Typography.H1 fontColor="white" size="xxlarge" weight="bold">
                Access the world&apos;s
                <br />
                best learning course
                <br />
                with EduAIpro
              </Typography.H1>
              <Typography.P weight="medium">
                Unlock a world of educational resources with our cutting-edge
                course app for teachers. Empower yourself to excel in your
                teaching career, inspire your students, and streamline your
                classroom management.
              </Typography.P>
            </div>
            <div className="flex gap-x-4 my-6 items-center">
              {appIcons.map((item) => (
                <div
                  key={generateKey()}
                  className="bg-white cursor-pointer hover:-translate-y-1 duration-500 bg-opacity-50 backdrop-blur-lg backdrop-filter rounded-lg p-2 flex items-center justify-center"
                >
                  <item.icon variant="Bold" color="white" />
                </div>
              ))}
              <Typography.P weight="semibold" fontColor="white">
                Download now
              </Typography.P>
            </div>
            <div className="text-sm">
              More than 100+ companies trusted us
              <div className="flex space-x-4 mt-2">
                <span>Microsoft</span>
                <span>Evernote</span>
                <span>Medium</span>
              </div>
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
