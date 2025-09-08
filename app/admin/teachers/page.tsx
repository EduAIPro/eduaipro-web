"use client";

import { SystemTeachersTable } from "@/components/admin/dashboard/teachers";

export default function AdminTeachersPage() {
  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Teachers
        </h1>
        <SystemTeachersTable />
      </div>
    </section>
  );
}
