"use client";
import { ChatBot } from "@/components/chatbot";
import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";
import { Notifications } from "@/components/dashboard/notifications";
import DashboardOverview from "@/components/dashboard/overview/DashboardOverview";
import DashboardProfile from "@/components/dashboard/overview/DashboardProfile";
import TourGuide from "@/components/dashboard/overview/TourGuide";
// import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  // const userType = useSearchParams().get("type");
  return (
    <div className="flex flex-col gap-5 md:gap-10">
      <div className="flex items-start xs:items-center justify-between">
        <DashboardHeaderAndSubtitle
          title="Overview"
          subtitle="View your course progress, profile, accreditation status, and notifications."
        />
        <Notifications />
      </div>
      <div className="flex justify-between min-h-screen divide-x divide-grey-3">
        <div className="w-[100%] lg:w-[65%] min-h-full">
          <DashboardOverview />
        </div>

        <div className="g:flex px-3 max-lg:hidden w-[35%]">
          <DashboardProfile />
        </div>
        {/* <MultiStepFormModal /> */}
        {/* {userType === "teacher" ? <MultiStepFormModal /> : null} */}
        <TourGuide />
      </div>

      <ChatBot />
    </div>
  );
}
