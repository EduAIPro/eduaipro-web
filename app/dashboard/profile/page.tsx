import DashboardHeaderAndSubtitle from "@/components/dashboard/common/DashboardHeaderAndSubtitle";
import Profile from "@/components/dashboard/Profile/Profile";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-10">
      <DashboardHeaderAndSubtitle
        title="Profile"
        subtitle="View and update your personal information."
      />
      <Profile />
    </div>
  );
};

export default ProfilePage;
