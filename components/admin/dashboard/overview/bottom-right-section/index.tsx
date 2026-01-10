import {
  CourseCompletionRateAggregate,
  TotalAccreditedAggregate,
} from "@/types/admin";
import { AccreditationCard } from "./accreditation";
import { CompletionRateCard } from "./course-completion-rate";
import { TopEngagingSchool } from "./top-engaging-school";

export const BottomRightSection = ({
  totalAccreditedTeachers,
  courseCompletionRate,
  isLoading,
}: {
  totalAccreditedTeachers: TotalAccreditedAggregate | undefined;
  courseCompletionRate: CourseCompletionRateAggregate | undefined;
  isLoading: boolean;
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-3 xl:gap-5">
      <CompletionRateCard isLoading={isLoading} data={courseCompletionRate} />
      <AccreditationCard
        isLoading={isLoading}
        status={totalAccreditedTeachers}
      />
      <TopEngagingSchool />
    </div>
  );
};
