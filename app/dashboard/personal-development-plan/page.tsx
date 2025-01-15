import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";
import PersonalDevPlan from "@/components/dashboard/PersonalDevPlan/PersonalDevPlan";
import React from "react";

const PersonalDevelopmentPalnPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <DashboardHeaderAndSubtitle
        title="Personal Development Plan"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, alias."
      />
      <PersonalDevPlan />
    </div>
  );
};

export default PersonalDevelopmentPalnPage;
