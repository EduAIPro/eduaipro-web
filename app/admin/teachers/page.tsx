"use client";

import { useState } from "react";
import SearchInput from "@/components/teachers/SearchInput";
import TeachersTable from "@/components/teachers/TeachersTable";
import { teachersData } from "@/app/types/teacherData";
import { Teacher } from "@/app/types/Teacher";    

export default function AdminTeachersPage() {
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>(teachersData);

  return ( 
    <section>
      <p className="text-[28px] font-semibold text-[#141414] leading-[100%]">
        Teacher
      </p>

      <div className="flex flex-col gap-[20px] mt-[40px]">
        <SearchInput teachers={teachersData} onSearch={setFilteredTeachers} />
        <TeachersTable teachers={filteredTeachers} />
      </div>
    </section>
  );
}
