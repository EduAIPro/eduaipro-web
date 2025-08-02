"use client";
import MultiStepFormModal from "@/components/auth/PostRegistrationForm";
import { ChatBot } from "@/components/chatbot";
import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";
import ProgressTracker from "@/components/dashboard/common/ProgressTracker";
import { Notifications } from "@/components/dashboard/notifications";
import PersonalDevPlan from "@/components/dashboard/PersonalDevPlan/PersonalDevPlan";
import useUser from "@/hooks/use-user";
import { Staff } from "@/types/user";
import { greetUser } from "@/utils/dashboard";

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

export default function OverviewPage() {
  const { user, staff, isLoading } = useUser();

  return (
    <>
      {staff && user && !(staff as Staff)?.acceptedTermsAndConditions ? (
        <MultiStepFormModal userPhone={!!user?.phoneNumber} />
      ) : null}

      <div className="flex flex-col gap-5 bg-[#F9FAFC]">
        <DashboardHeaderAndSubtitle
          title={greetUser(user?.firstName)}
          subtitle="Resume your learning journey"
          rightElement={
            <div className="flex items-center max-sm:justify-between gap-6">
              <ProgressTracker />
              <Notifications />
            </div>
          }
        />
        <PersonalDevPlan />
      </div>
      <ChatBot />
    </>
  );
}

// background: linear-gradient(180deg, #FFFFFF 0%, #EBEBEB 100%);
