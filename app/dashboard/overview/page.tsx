"use client";
import MultiStepFormModal from "@/components/auth/PostRegistrationForm";
import Typography from "@/components/common/ui/Typography";
import DashboardOverview from "@/components/dashboard/overview/DashboardOverview";
import DashboardProfile from "@/components/dashboard/overview/DashboardProfile";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const userType = useSearchParams().get("type");

  return (
    <div className="flex justify-between min-h-screen">
      <div className="w-[100%] lg:w-[65%] lg:border-r min-h-full">
        <DashboardOverview />
      </div>

      <div className="hidden lg:flex  w-[35%]">
        <DashboardProfile />
      </div>
      {userType === "teacher" ? <MultiStepFormModal /> : null}
    </div>
  );
}
