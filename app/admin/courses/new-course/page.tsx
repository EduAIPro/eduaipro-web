"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CourseInformation from "@/components/admin-courses/CourseInformation";
import CourseSchedule from "@/components/admin-courses/CourseSchedule";

export default function AdminCreateCoursesPage() {
  const router = useRouter();

  return (
    <section>
      <div className="flex items-center gap-[10px]">
        <MoveLeft className="w-[18px] h-[18px]" />
        <p
          className="text-[18px] font-semibold text-[#141414] cursor-pointer"
          onClick={() => router.back()}>
          {" "}
          Create Course
        </p>
      </div>

      <div className="flex gap-[30px] mt-[30px]">
        <CourseInformation />
        <CourseSchedule />
      </div>
    </section>
  );
}
