"use client";
import { ChatBot } from "@/components/chatbot";
import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";
import ProgressTracker from "@/components/dashboard/common/ProgressTracker";
import { Notifications } from "@/components/dashboard/notifications";
import PersonalDevPlan from "@/components/dashboard/PersonalDevPlan/PersonalDevPlan";
import { greetUser } from "@/utils/dashboard";
// import { useSearchParams } from "next/navigation";

if (typeof Promise.withResolvers === "undefined") {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

const PersonalDevelopmentPalnPage = () => {
  // const userType = useSearchParams().get("type");
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
