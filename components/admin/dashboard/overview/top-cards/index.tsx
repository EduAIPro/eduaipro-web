import { EnrolledInCourseCard } from "./enrolled-in-course";
import { TotalAdminsCard } from "./total-admins";
import { TotalSchoolsCard } from "./total-schools";
import { TotalTeachersCard } from "./total-teachers";

export const TopDashboardCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <TotalSchoolsCard value={0} />
      <TotalTeachersCard />
      <TotalAdminsCard />
      <EnrolledInCourseCard />
    </div>
  );
};
