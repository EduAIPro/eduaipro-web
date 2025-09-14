"use client";

import { CoursesTable } from "@/components/admin/dashboard/courses";

export default function AdminCoursesPage() {
  return (
    <section>
      <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
        Courses
      </h1>
      <CoursesTable />
    </section>
  );
}
