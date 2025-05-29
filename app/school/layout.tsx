"use client";
import { SchoolLayoutHeader } from "@/components/school/layout/header";
import { ReactNode } from "react";

export default function SchoolLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full p-5 bg-[#F9FAFC] pt-24 sm:pt-32 min-h-screen">
      <SchoolLayoutHeader />

      <>{children}</>
    </section>
  );
}
