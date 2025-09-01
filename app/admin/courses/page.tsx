"use client";

import { coursesData } from "@/app/types/coursesData";
import CoursesSearch from "@/components/admin-courses/CoursesSearch";
import { Course } from "@/app/types/Course";
import { useState } from "react";
import CoursesTable from "@/components/admin-courses/CoursesTable";

export default function AdminCoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(coursesData);
  return (
    <section>
      {" "}
      <p className="text-[28px] font-semibold text-[#141414] leading-[100%]">
        Courses
      </p>
      <div className="flex flex-col gap-[20px] mt-[40px]">
        <CoursesSearch courses={coursesData} onSearch={setFilteredCourses} />
        <CoursesTable courses={filteredCourses} />
      </div>
    </section>
  );
}
