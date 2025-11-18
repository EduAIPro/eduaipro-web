"use client";

import { SupportTicketsTable } from "@/components/admin/dashboard/support";

export default function AdminSupportPage() {
  return (
    <section className="space-y-6">
      <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
        Support
      </h1>
      <SupportTicketsTable />
    </section>
  );
}
