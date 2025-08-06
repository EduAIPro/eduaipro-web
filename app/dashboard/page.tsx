"use client";
import MultiStepFormModal from "@/components/auth/PostRegistrationForm";
// import { ChatBot } from "@/components/chatbot";
import { CircularProgress } from "@/components/dashboard/common/ProgressTracker";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import PersonalDevPlan from "@/components/dashboard/PersonalDevPlan/PersonalDevPlan";
import DocumentIcon from "@/components/svgs/document.svg";
import useCourse from "@/hooks/use-course";
import useUser from "@/hooks/use-user";
import { Staff } from "@/types/user";

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
  const {
    course,
    courseProgress,
    isLoading: courseLoading,
    refetch,
  } = useCourse();

  return isLoading || courseLoading ? (
    <DashboardSkeleton />
  ) : (
    course && courseProgress && (
      <>
        {staff && user && !(staff as Staff)?.acceptedTermsAndConditions ? (
          <MultiStepFormModal userPhone={!!user?.phoneNumber} />
        ) : null}

        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <div className="flex items-start gap-10">
              <div>
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

              <div>
                <h3 className="font-medium text-sm">Progress</h3>
                <div className="flex items-center gap-1">
                  <div className="shrink-0">
                    <CircularProgress
                      progress={67}
                      size={20}
                      strokeWidth={4}
                      duration={2000}
                    />
                  </div>
                  <p className="text-sm font-medium text-grey-500">67%</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm">Units completed</h3>

                <p className="text-sm font-semibold text-grey-500">
                  Unit {courseProgress?.unit.index} of {course.units.length}
                </p>
              </div>
            </div>
          </div>

          <PersonalDevPlan
            introVideoUrl={course.introductoryVideoUrl}
            courseProgress={courseProgress}
            refetchCourse={refetch}
            units={course.units}
          />
        </div>
        {/* <ChatBot /> */}
      </>
    )
  );
}

// background: linear-gradient(180deg, #FFFFFF 0%, #EBEBEB 100%);
