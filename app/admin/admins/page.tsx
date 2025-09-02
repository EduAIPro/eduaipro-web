"use client";
import { Admin } from "@/app/types/admin";
import { adminData } from "@/app/types/admin-data";
import AdminSearch from "@/components/admin-admin/admin-search";
import AdminTable from "@/components/admin-admin/admin-table";
import { useState } from "react";

export default function AdminAdminsPage() {
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>(adminData);
  return (
    <section>
      {" "}
      <p className="text-[24px] sm:text-[28px] font-semibold sm:font-bold text-[#141414] leading-[100%]">
        Admin
      </p>
      <div className="flex flex-col gap-[20px] mt-[40px]">
        <AdminSearch admins={adminData} onSearch={setFilteredAdmins} />
        <AdminTable admins={filteredAdmins} />
      </div>
    </section>
  );
}
