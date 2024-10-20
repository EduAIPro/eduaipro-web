"use client";
import { UserTypeTabSwitch } from "@/types/enum";
import { generateKey } from "@/utils/key";
import { SegmentedControl } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
import { educatorBenefits, institutionBenefits } from "./data";
import Typography from "../common/ui/Typography";

export default function UserTypes() {
  const [activeTab, setActiveTab] = useState<UserTypeTabSwitch>(
    UserTypeTabSwitch.teachers
  );

  const handleTabSwitch = (tab: UserTypeTabSwitch) => {
    setActiveTab(tab);
  };

  const tabs = [
    { title: "For Teachers", value: UserTypeTabSwitch.teachers },
    { title: "For Institutions", value: UserTypeTabSwitch.institution },
  ];

  return (
    <section className="responsive__section">
      <div className="md:max-w-[700px] mx-auto text-center mb-8">
        <Typography.H2 weight="semibold" size="xlarge">
          Transforming Education: Tailored Solutions for Teachers and
          Institutions
        </Typography.H2>
      </div>
      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 md:mb-8">
        <SegmentedControl.Root
          variant="classic"
          defaultValue={activeTab}
          onValueChange={(value) => handleTabSwitch(value as UserTypeTabSwitch)}
          radius="full"
        >
          {tabs.map((tab) => (
            <SegmentedControl.Item
              key={generateKey()}
              value={tab.value}
              className="!cursor-pointer"
            >
              {tab.title}
            </SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
      </div>

      {/* Content Section with Animation */}
      <div className="relative">
        {activeTab === UserTypeTabSwitch.teachers && (
          <div className="animate-fade-in-up">
            <EducatorsComponent />
          </div>
        )}
        {activeTab === UserTypeTabSwitch.institution && (
          <div className="animate-fade-in-up">
            <InstitutionsComponent />
          </div>
        )}
      </div>
    </section>
  );
}

function EducatorsComponent() {
  return (
    <div className="py-6">
      <div className="flex max-lg:flex-col items-center gap-4">
        <div className="w-full max-lg:hidden">
          <Image
            width={600}
            height={500}
            alt=""
            className="rounded-xl"
            src="/assets/images/wo.jpg"
          />
        </div>
        <div className="w-full">
          <div className="mb-5 flex flex-col gap-y-2">
            <Typography.H2 size="basePro">
              Empower Your Teaching with AI-Powered Learning and Professional
              Development
            </Typography.H2>
            <Typography.P fontColor="medium">
              As a teacher, access a wide variety of courses designed to enhance
              your skills, earn certifications, and track your progress in real
              time.
            </Typography.P>
          </div>
          <ul className="list-disc grid xs:grid-cols-2 gap-4">
            {educatorBenefits.map((benefit) => (
              <li key={generateKey()} className="flex gap-x-2 items-center">
                <div>
                  <benefit.icon className="w-5 h-5 xs:w-6 xs:h-6 text-grey-11" />
                </div>
                <div className="max-w-[70%]">
                  <Typography.H3 fontColor="large" size="small" weight="medium">
                    {benefit.title}
                  </Typography.H3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InstitutionsComponent() {
  return (
    <div className="py-6">
      <div className="flex max-lg:flex-col items-center gap-4">
        <div className="w-full max-lg:hidden">
          <Image
            width={600}
            height={500}
            alt=""
            className="rounded-xl"
            src="/assets/images/school.jpg"
          />
        </div>
        <div className="w-full">
          <div className="mb-5 flex flex-col gap-y-2">
            <Typography.H2 size="basePro">
              Maximize Staff Development with Advanced Insights and AI Support
            </Typography.H2>
            <Typography.P fontColor="medium">
              With AI-powered chatbots and personalized support, you can provide
              your teachers with the resources they need to grow, while
              accessing comprehensive data to drive institutional improvement.
            </Typography.P>
          </div>
          <ul className="list-disc grid xs:grid-cols-2 gap-4">
            {institutionBenefits.map((benefit) => (
              <li key={generateKey()} className="flex gap-x-2 items-center">
                <div>
                  <benefit.icon className="w-5 h-5 xs:w-6 xs:h-6 text-grey-11" />
                </div>
                <div className="max-w-[70%]">
                  <Typography.H3 fontColor="large" size="small" weight="medium">
                    {benefit.title}
                  </Typography.H3>
                  {/* <Typography.P fontColor="medium">
                        {benefit.description}
                      </Typography.P> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
