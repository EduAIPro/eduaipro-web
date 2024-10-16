import React from "react";
import Typography from "../common/ui/Typography";
import { AppStoreDownloadIcon, GooglePlayDownloadIcon } from "../svgs";

export default function CallToAction() {
  return (
    <section className="responsive__section">
      <div className="rounded-3xl bg-brand-1000 p-20">
        <div className="flex items-center justify-between gap-x-12">
          <div className="w-full">
            <div className="flex flex-col gap-y-2">
              <Typography.H2 weight="semibold" fontColor="white" size="xlarge">
                Take Your Teaching to the Next Level with EduAiPro's Mobile App
              </Typography.H2>
              <Typography.P fontColor="light">
                Stay connected and enhance your learning anytime, anywhere with
                EduAiPro's mobile app. Access courses, track your progress, and
                get support from our AI chatbot—all at your fingertips. Download
                now and start maximizing your teaching potential on the go!
              </Typography.P>
            </div>
            <div className="flex items-center gap-x-5">
              <AppStoreDownloadIcon
                className="border w-fit"
                width={96}
                height={30}
              />
              <GooglePlayDownloadIcon width={300} height={30} />
            </div>
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </section>
  );
}
