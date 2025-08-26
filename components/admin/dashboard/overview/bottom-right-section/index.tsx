import { AccreditationCard } from "./accreditation-card";
import { CompletionRateCard } from "./course-completion-rate";
import { TopEngagingSchool } from "./top-engaging-school";

export const BottomRightSection = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <CompletionRateCard />
      <AccreditationCard />
      <TopEngagingSchool />
    </div>
  );
};
