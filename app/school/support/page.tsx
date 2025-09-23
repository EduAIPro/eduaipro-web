"use client";

import {
  CreateTicketModal,
  TicketsTable,
} from "@/components/school/dashboard/support-tickets";

export default function SchoolSupportPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Support
        </h1>

        <CreateTicketModal />
      </div>
      <TicketsTable />
    </section>
  );
}
