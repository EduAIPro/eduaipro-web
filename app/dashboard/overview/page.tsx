"use client";
import MultiStepFormModal from "@/components/auth/PostRegistrationForm";
import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";
import DashboardOverview from "@/components/dashboard/overview/DashboardOverview";
import DashboardProfile from "@/components/dashboard/overview/DashboardProfile";
import TourGuide from "@/components/dashboard/overview/TourGuide";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const userType = useSearchParams().get("type");
  return (
    <div className="flex flex-col gap-5 md:gap-10">
      <DashboardHeaderAndSubtitle
        title="Overview"
        subtitle="View your course progress, profile, accreditation status, and notifications."
      />
      <div className="flex justify-between min-h-screen divide-x divide-grey-3">
        <div className="w-[100%] lg:w-[65%] min-h-full">
          <DashboardOverview />
        </div>

        <div className="g:flex px-3 max-lg:hidden w-[35%]">
          <DashboardProfile />
        </div>
        {/* {userType === "teacher" ? <MultiStepFormModal /> : null} */}
        <TourGuide />
      </div>
    </div>
  );
}
