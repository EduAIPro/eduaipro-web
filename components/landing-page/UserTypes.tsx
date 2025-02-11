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
    { title: "Educators", value: UserTypeTabSwitch.teachers },
    // {
    //   title: "Teaching Assistants",
    //   value: UserTypeTabSwitch.teachingAssistants,
    // },
    // { title: "Mentors", value: UserTypeTabSwitch.mentors },
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
              ? "Benefits of the EduAI Pro Platform for Institutions"
              : // : activeTab === UserTypeTabSwitch.teachingAssistants
                // ? "Enhance Your Teaching Support with Smart Tools and AI Guidance"
                "Benefits of the EduAI Pro Platform for Mentors, Teaching Assistant, Primary Teachers, Secondary Teachers and higher-education teachers (Educators)"
            // : "Elevate Your Mentorship with AI-Powered Guidance and Professional Excellence"
          }
          // description={
          //   activeTab === UserTypeTabSwitch.institution
          //     ? "With AI-powered chatbots and personalized support, you can provide your teachers with the resources they need to grow, while accessing comprehensive data to drive institutional improvement."
          //     : activeTab === UserTypeTabSwitch.teachers
          //     ? " As an educator, access a wide variety of courses designed to enhance your skills, earn certifications, and track your progress in real time."
          //     : activeTab === UserTypeTabSwitch.teachingAssistants
          //     ? "Get instant help with lesson preparation and classroom management, while developing your skills through AI-powered resources and personalized learning paths."
          //     : "Boost your confidence as a mentor with cutting-edge AI tools and resources. Lead transformative change while advancing your professional expertise."
          // }
          type={activeTab}
          data={
            activeTab === UserTypeTabSwitch.institution
              ? institutionBenefits
              : teacherBenefits
          }
        />
      </div>
    </section>
  );
}

function OtherTypeComponent({
  title,
  // description,
  data,
  type,
}: {
  type: UserTypeTabSwitch;
  title: string;
  // description: string;
  data: { title: string; description: string; icon: IconType | Icon }[];
}) {
  return (
    <div className="py-6 max-md:mt-6">
      <div className="w-full">
        {/* <div className="mb-10 flex flex-col gap-y-2">
          <Typography.H2 size="xl" weight="medium">
            {title}
          </Typography.H2>
          {/* <Typography.P fontColor="medium">{description}</Typography.P> 
        </div> */}
        <ul className="list-disc grid sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
          {data.map((benefit) => (
            <li key={generateKey()} className="flex items-start gap-2">
              <div className="bg-accent-100 rounded-full p-2 w-fit">
                <benefit.icon className="w-6 h-6 text-brand-1001" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography.H3 fontColor="large" size="base" weight="semibold">
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
  );
}
