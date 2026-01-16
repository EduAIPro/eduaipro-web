"use client";

import { editProfileKey, updatePersonalInfoKey } from "@/api/keys";
import { updatePersonalInfo, updateTeacherProfile } from "@/api/mutations";
import MultiStepFormModal from "@/components/auth/PostRegistrationForm";
// import { ChatBot } from "@/components/chatbot";
import { CircularProgress } from "@/components/dashboard/common/ProgressTracker";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import { OnboardingWalkthrough } from "@/components/dashboard/onboarding";
import PersonalDevPlan from "@/components/dashboard/PersonalDevPlan/PersonalDevPlan";
import DocumentIcon from "@/components/svgs/document.svg";
import useCourse from "@/hooks/use-course";
import { useIsMobile } from "@/hooks/use-mobile";
import useUser from "@/hooks/use-user";
import { Staff } from "@/types/user";
import { useEffect, useMemo, useState } from "react";
import useSWRMutation from "swr/mutation";

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
  const { user, staff, isLoading, mutate: mutateUser } = useUser();
  const {
    course,
    courseProgress,
    isLoading: courseLoading,
    refetch,
  } = useCourse({
    acceptedTermsAndConditions: !!(staff as Staff)?.acceptedTermsAndConditions,
  });
  const isMobile = useIsMobile(768);

  const { trigger: updateProfile } = useSWRMutation(
    updatePersonalInfoKey,
    updatePersonalInfo
  );

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Only show if user is loaded, valid, and hasn't seen onboarding
    if (user && !isLoading && user.hasSeenOnboarding === false) {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, isLoading]);

  const handleFinishOnboarding = async () => {
    setShowOnboarding(false);
    try {
      if (user) {
        // Optimistic update
        mutateUser(
          (currentData) => {
            if (!currentData) return undefined;
            return {
              ...currentData,
              user: {
                ...currentData.user,
                hasSeenOnboarding: true,
              },
            };
          },
          { revalidate: false }
        );

        await updateProfile({
          userHasSeenOnboarding: true,
        });
        mutateUser(); // Revalidate to be sure
      }
    } catch (error) {
      console.error("Failed to update onboarding status", error);
    }
  };

  const onboardingSteps = useMemo(
    () => [
      {
        targetId: "center",
        title: "Welcome to EduAI Pro!",
        description:
          "We're excited to have you here. Let's take a quick tour of your dashboard to get you started.",
        position: "center",
      },
      {
        targetId: "course-title",
        title: "Your Active Course",
        description:
          "Access your enrolled course details and track your progress.",
        position: "bottom",
      },
      ...(isMobile
        ? [
            {
              targetId: "mobile-rotate-hint",
              title: "Enhanced View",
              description:
                "On mobile? Tap here to rotate your view for a better reading experience.",
              position: "bottom",
            },
          ]
        : []),
      {
        targetId: "nav-prev",
        title: "Navigation Control",
        description: "Easily navigate between course pages and modules.",
        position: "top",
      },
      {
        targetId: "start-assessment-btn",
        title: "Take Assessments",
        description:
          "Ready to test your knowledge? Click here to start the unit assessment.",
        position: "bottom",
      },
      {
        targetId: "units-sidebar",
        title: "Course Units",
        description:
          "Browse all units and modules here. The current unit is automatically expanded for you.",
        position: "left",
      },
    ],
    [isMobile]
  );

  const percentage = useMemo(() => {
    if (!course || !courseProgress) return 0;
    const currIndex = courseProgress?.unit.index;
    const total = course?.units.length;

    const percent = ((currIndex / total) * 100).toFixed(0);
    return Number(percent);
  }, [courseProgress, course]);

  return isLoading || courseLoading ? (
    <DashboardSkeleton />
  ) : staff && !(staff as Staff)?.acceptedTermsAndConditions ? (
    <MultiStepFormModal
      isInvited={!!(staff as Staff).schoolId}
      userPhone={!!user?.phoneNumber}
    />
  ) : (
    course &&
    courseProgress && (
      <>
        <OnboardingWalkthrough
          open={showOnboarding}
          onClose={handleFinishOnboarding}
          onFinish={handleFinishOnboarding}
          steps={onboardingSteps as any}
        />
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <h2 id="course-title" className="text-xl font-semibold capitalize">
              {course.title}
            </h2>
            <div className="flex items-start gap-10">
              <div id="course-content-stats">
                <h3 className="font-medium text-sm">Content</h3>
                <div className="flex items-center gap-1">
                  <div className="shrink-0">
                    <DocumentIcon width={20} height={20} />
                  </div>
                  <p className="text-sm font-medium text-grey-500">
                    {course.units.length} units
                  </p>
                </div>
              </div>

              <div id="course-progress-stats">
                <h3 className="font-medium text-sm">Progress</h3>
                <div className="flex items-center gap-1">
                  <div className="shrink-0">
                    <CircularProgress
                      progress={percentage}
                      size={20}
                      strokeWidth={4}
                      duration={2000}
                    />
                  </div>
                  <p className="text-sm font-medium text-grey-500">
                    {percentage}%
                  </p>
                </div>
              </div>

              <div id="units-completed-stats">
                <h3 className="font-medium text-sm">Units completed</h3>

                <p className="text-sm font-semibold text-grey-500">
                  Unit {courseProgress?.unit.index} of {course.units.length}
                </p>
              </div>
            </div>
          </div>

          <div id="personal-dev-plan">
            <PersonalDevPlan
              introVideoUrl={course.introductoryVideoUrl}
              courseProgress={courseProgress}
              refetchCourse={refetch}
              units={course.units}
            />
          </div>
        </div>
        {/* <ChatBot /> */}
      </>
    )
  );
}
