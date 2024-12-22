"use client";
import MultiStepFormModal from "@/components/auth/PostRegistrationForm";
import Typography from "@/components/common/ui/Typography";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const userType = useSearchParams().get("type");

  return (
    <div>
      <Typography.P>tHIS IS THE DASHBOARD</Typography.P>
      {userType === "teacher" ? <MultiStepFormModal /> : null}
    </div>
  );
}
