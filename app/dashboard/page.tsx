"use client";
import MultiStepFormModal from "@/components/auth/PostRegistrationForm";
import Typography from "@/components/common/ui/Typography";
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <Typography.P>tHIS IS THE DASHBOARD</Typography.P>
      <MultiStepFormModal />
    </div>
  );
}
