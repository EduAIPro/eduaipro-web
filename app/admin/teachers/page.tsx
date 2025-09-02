"use client";

import { useState } from "react";
import TeacherSearch from "@/components/teachers/teachers-search";
import TeachersTable from "@/components/teachers/teachers-table";
import { teachersData } from "@/app/types/teacher-data";
import { Teacher } from "@/app/types/teacher";

export default function AdminTeachersPage() {
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>(teachersData);

  return (
    <section>
      <p className="text-[28px] font-semibold text-[#141414] leading-[100%]">
        Teachers
      </p>

      <div className="flex flex-col gap-[20px] mt-[40px]">
        <TeacherSearch teachers={teachersData} onSearch={setFilteredTeachers} />
        <TeachersTable teachers={filteredTeachers} />
      </div>
    </section>
  );
}
