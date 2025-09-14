"use client";
import { AdminLayoutHeader } from "@/components/admin/layout/header";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full p-5 bg-[#F9FAFC] pt-24 sm:pt-32 min-h-screen">
      <AdminLayoutHeader />

      <div className="pb-20">{children}</div>
    </main>
  );
}
