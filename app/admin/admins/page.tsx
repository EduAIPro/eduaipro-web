"use client";
import { Admin } from "@/app/types/admin";
import { adminData } from "@/app/types/admin-data";
import { AdminsTable } from "@/components/admin/dashboard/admins";
import { useState } from "react";

export default function AdminAdminsPage() {
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>(adminData);
  return (
    <section className="space-y-10">
      <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
        Admins
      </h1>
      <AdminsTable />
    </section>
  );
}
