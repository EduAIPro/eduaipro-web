import { GetAdminAggregates } from "@/types/admin";
import { EnrolledInCourseCard } from "./enrolled-in-course";
import { TotalAdminsCard } from "./total-admins";
import { TotalSchoolsCard } from "./total-schools";
import { TotalTeachersCard } from "./total-teachers";

type TopDashboardCardsProps = {
  isLoading: boolean;
  data: GetAdminAggregates | undefined;
};

export const TopDashboardCards = ({
  isLoading,
  data,
}: TopDashboardCardsProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-5">
      <TotalSchoolsCard isLoading={isLoading} value={data?.totalSchools} />
      <TotalTeachersCard isLoading={isLoading} teachers={data?.totalTeachers} />
      <TotalAdminsCard isLoading={isLoading} admins={data?.totalAdmins} />
      <EnrolledInCourseCard
        isLoading={isLoading}
        enrolled={data?.totalEnrolled}
      />
    </div>
  );
};
