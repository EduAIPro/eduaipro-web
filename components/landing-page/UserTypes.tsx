"use client";
import { UserTypeTabSwitch } from "@/types/enum";
import { generateKey } from "@/utils/key";
import { SegmentedControl } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";

export default function UserTypes() {
  const [activeTab, setActiveTab] = useState<UserTypeTabSwitch>(
    UserTypeTabSwitch.educator
  );

  const handleTabSwitch = (tab: UserTypeTabSwitch) => {
    setActiveTab(tab);
  };

  const tabs = [
    { title: "For Educators", value: UserTypeTabSwitch.educator },
    { title: "For Institutions", value: UserTypeTabSwitch.institution },
  ];

  return (
    <section className="responsive__section">
      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <SegmentedControl.Root
          variant="classic"
          defaultValue={activeTab}
          onValueChange={(value) => handleTabSwitch(value as UserTypeTabSwitch)}
          radius="full"
        >
          {tabs.map((tab) => (
            <SegmentedControl.Item key={generateKey()} value={tab.value}>
              {tab.title}
            </SegmentedControl.Item>
          ))}
        </SegmentedControl.Root>
      </div>

      {/* Content Section with Animation */}
      <div className="relative">
        {activeTab === UserTypeTabSwitch.educator && (
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
    <div className="p-6 bg-grey-2/30 rounded-lg ">
      <div className="flex items-center gap-8">
        <div>
          <Image
            width={600}
            height={500}
            alt=""
            className="rounded-xl"
            src="/assets/images/wo.jpg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Features for Educators</h2>
          <ul className="list-disc pl-5">
            <li>AI-powered tools to enhance teaching efficiency</li>
            <li>Expert-led courses to expand your knowledge</li>
            <li>Customizable teaching resources and materials</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function InstitutionsComponent() {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Features for Institutions</h2>
      <ul className="list-disc pl-5">
        <li>Comprehensive dashboard to track teacher progress</li>
        <li>AI-driven insights on course effectiveness</li>
        <li>Tools to manage institution-wide training programs</li>
      </ul>
    </div>
  );
}
