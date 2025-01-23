import React from "react";
import Typography from "../common/ui/Typography";
import { AppStoreDownloadIcon, GooglePlayDownloadIcon } from "../svgs";
import { appIcons } from "./data";
import { generateKey } from "@/utils/key";

export default function CallToAction() {
  return (
    <section className="responsive__section">
      <div className="rounded-3xl bg-accent-800 p-6 sm:p-10 md:p-20">
        <div className="flex max-sm:flex-col items-center justify-between gap-x-12">
          <div className="w-full">
            <div className="flex flex-col gap-y-2">
              <Typography.H2 weight="semibold" fontColor="white" size="xlarge">
                Take Your Teaching to the Next Level with EduAiPro&apos;s Mobile
                App
              </Typography.H2>
              <Typography.P fontColor="light">
                Stay connected and enhance your learning anytime, anywhere with
                EduAiPro&apos;s mobile app. Access courses, track your progress,
                and get support from our AI chatbot—all at your fingertips.
                Download now and start maximizing your teaching potential on the
                go!
              </Typography.P>
            </div>
            <div className="flex max-sm:justify-between max-sm:gap-y-2 max-sm:w-full items-center gap-x-2 sm:gap-x-5 mt-6">
              {appIcons.map((item) => (
                <div
                  key={generateKey()}
                  className="app__download max-sm:w-full !bg-opacity-70 hover:!bg-opacity-85"
                >
                  <item.icon variant="Bold" color="white" />
                  <div className="pl-2">
                    <Typography.P
                      size="small"
                      weight="bold"
                      fontColor="light"
                      className="whitespace-nowrap uppercase !text-brand/50 -mb-1"
                    >
                      {item.title}
                    </Typography.P>
                    <Typography.H3
                      size="base"
                      weight="semibold"
                      fontColor="white"
                      className="whitespace-nowrap !text-brand/75"
                    >
                      {item.platformName}
                    </Typography.H3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </section>
  );
}
