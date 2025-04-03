"use client";
import { ChatBot } from "@/components/chatbot";
import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";
import ProgressTracker from "@/components/dashboard/common/ProgressTracker";
import { Notifications } from "@/components/dashboard/notifications";
import PersonalDevPlan from "@/components/dashboard/PersonalDevPlan/PersonalDevPlan";
import { greetUser } from "@/utils/dashboard";
import { useSearchParams } from "next/navigation";

const PersonalDevelopmentPalnPage = () => {
  const userType = useSearchParams().get("type");
  return (
    <>
      <div className="flex flex-col gap-5">
        <DashboardHeaderAndSubtitle
          title={greetUser("James")}
          subtitle="Resume your learning journey"
          rightElement={
            <div className="flex items-center max-sm:justify-between gap-6">
              <ProgressTracker />
              <Notifications />
            </div>
          }
        />
        <PersonalDevPlan />

        {/* {userType === "teacher" ? <MultiStepFormModal /> : null} */}
      </div>
      <ChatBot />
    </>
  );
};

export default PersonalDevelopmentPalnPage;
