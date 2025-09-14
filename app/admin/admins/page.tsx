"use client";
import { AdminsTable } from "@/components/admin/dashboard/admins";

export default function AdminAdminsPage() {
  return (
    <section className="space-y-10">
      <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
        Admins
      </h1>
      <AdminsTable />
    </section>
  );
}
