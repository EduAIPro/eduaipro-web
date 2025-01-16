"use client";
import { UserTypeTabSwitch } from "@/types/enum";
import { generateKey } from "@/utils/key";
import { SegmentedControl } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
import {
  educatorBenefits,
  institutionBenefits,
  mentorBenefits,
  teacherBenefits,
  teachingAssistantBenefits,
} from "./data";
import Typography from "../common/ui/Typography";
import TeachersBenefits from "./TeachersBenefits";
import { Icon } from "iconsax-react";
import { IconType } from "react-icons";

export default function UserTypes() {
  const [activeTab, setActiveTab] = useState<UserTypeTabSwitch>(
    UserTypeTabSwitch.teachers
  );

  const handleTabSwitch = (tab: UserTypeTabSwitch) => {
    setActiveTab(tab);
  };

  const tabs = [
    { title: "Teachers", value: UserTypeTabSwitch.teachers },
    // {
    //   title: "Teaching Assistants",
    //   value: UserTypeTabSwitch.teachingAssistants,
    // },
    { title: "Mentors", value: UserTypeTabSwitch.mentors },
    { title: "Institutions", value: UserTypeTabSwitch.institution },
  ];

  return (
    <section className="responsive__section">
      <div className="md:max-w-[700px] mx-auto text-center mb-8">
        <Typography.H2 weight="semibold" size="xlarge">
          Transforming Education: Tailored Solutions for Educators and
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
        <OtherTypeComponent
          title={
            activeTab === UserTypeTabSwitch.institution
              ? "Maximize Staff Development with Advanced Insights and AI Support"
              : activeTab === UserTypeTabSwitch.teachingAssistants
              ? "Enhance Your Teaching Support with Smart Tools and AI Guidance"
              : activeTab === UserTypeTabSwitch.teachers
              ? "Empower Your Teaching with AI-Powered Learning and Professional Development"
              : "Elevate Your Mentorship with AI-Powered Guidance and Professional Excellence"
          }
          description={
            activeTab === UserTypeTabSwitch.institution
              ? "With AI-powered chatbots and personalized support, you can provide your teachers with the resources they need to grow, while accessing comprehensive data to drive institutional improvement."
              : activeTab === UserTypeTabSwitch.teachers
              ? " As an educator, access a wide variety of courses designed to enhance your skills, earn certifications, and track your progress in real time."
              : activeTab === UserTypeTabSwitch.teachingAssistants
              ? "Get instant help with lesson preparation and classroom management, while developing your skills through AI-powered resources and personalized learning paths."
              : "Boost your confidence as a mentor with cutting-edge AI tools and resources. Lead transformative change while advancing your professional expertise."
          }
          data={
            activeTab === UserTypeTabSwitch.institution
              ? institutionBenefits
              : activeTab === UserTypeTabSwitch.teachingAssistants
              ? teachingAssistantBenefits
              : activeTab === UserTypeTabSwitch.teachers
              ? teacherBenefits
              : mentorBenefits
          }
        />
      </div>
    </section>
  );
}

function EducatorsComponent() {
  return (
    <div className="py-6">
      <div className="flex max-lg:flex-col items-center gap-4">
        {/* <div className="w-full max-lg:hidden">
          <Image
            width={600}
            height={500}
            alt=""
            className="rounded-xl"
            src="/assets/images/wo.jpg"
          />
        </div> */}
        <div className="w-full">
          <div className="mb-5 flex flex-col gap-y-2 max-w-[65%]">
            <Typography.H2 size="basePro" weight="medium">
              Empower Your Teaching with AI-Powered Learning and Professional
              Development
            </Typography.H2>
            <Typography.P fontColor="medium">
              As an educator, access a wide variety of courses designed to
              enhance your skills, earn certifications, and track your progress
              in real time.
            </Typography.P>
          </div>
          <div></div>
          {/* <TeachersBenefits /> */}
          {/* <ul className="list-disc grid xs:grid-cols-2 gap-4">
            {educatorBenefits.map((benefit) => (
              <li key={generateKey()} className="flex gap-x-2 items-center">
                <div>
                  <benefit.icon className="w-5 h-5 xs:w-6 xs:h-6 text-brand-1001" />
                </div>
                <div className="max-w-[70%]">
                  <Typography.H3 fontColor="large" size="small" weight="medium">
                    {benefit.title}
                  </Typography.H3>
                </div>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

function OtherTypeComponent({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: { title: string; description: string; icon: IconType | Icon }[];
}) {
  return (
    <div className="py-6">
      <div className="flex flex-col items-center gap-4">
        {/* <div className="w-full max-lg:hidden border-2">
          <Image
            width={600}
            height={500}
            alt=""
            className="rounded-xl"
            src="/assets/images/school.jpg"
          />
        </div> */}
        <div className="w-full">
          <div className="mb-5 flex flex-col gap-y-2 sm:max-w-[65%]">
            <Typography.H2 size="basePro" weight="medium">
              {title}
            </Typography.H2>
            <Typography.P fontColor="medium">{description}</Typography.P>
          </div>
          <ul className="list-disc grid md:grid-cols-2 gap-x-4 gap-y-8">
            {data.map((benefit) => (
              <li key={generateKey()} className="flex flex-col gap-2">
                <div className="bg-accent-100 rounded-full p-2 w-fit">
                  <benefit.icon className="w-5 h-5 xs:w-7 xs:h-7 text-brand-1001" />
                </div>
                <div className="flex flex-col gap-1">
                  <Typography.H3
                    fontColor="large"
                    size="base"
                    weight="semibold"
                  >
                    {benefit.title}
                  </Typography.H3>
                  <Typography.P size="small" fontColor="medium">
                    {benefit.description}
                  </Typography.P>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
