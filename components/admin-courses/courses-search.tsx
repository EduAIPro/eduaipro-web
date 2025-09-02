"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Plus,  ArrowLeft } from "lucide-react";
import Image from "next/image";
import SearchWithActions from "../shared-components/shared-search-input";
import { Course } from "@/app/types/course";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetOverlay,
} from "../ui/sheet";
import CourseInformation from "@/components/admin-courses/course-information";
import CourseSchedule from "@/components/admin-courses/course-schedule";

interface CoursesSearchProps {
  courses: Course[];
  onSearch: (filtered: Course[]) => void;
}

export default function CoursesSearch({
  courses,
  onSearch,
}: CoursesSearchProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SearchWithActions<Course>
        data={courses}
        searchKeys={["title", "enrolled", "completed"]}
        placeholder="Search Course"
        onSearch={onSearch}
        extraActions={
          <>
            <Button
              variant="ghost"
              className="p-[10px] flex items-center text-[#656565]">
              <Image
                src="/assets/images/Vector.svg"
                alt="filter"
                width={15}
                height={13.5}
              />
              Filter
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="default" onClick={() => setOpen(true)}>
                  <Plus className="" />
                  Create New Course
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-full top-[84px] h-[calc(100vh-64px)] p-0 bg-[#F9FBFC] flex flex-col overflow-hidden"
                withOverlay={false}
                // className="w-full sm:max-w-full p-0 flex flex-col top-[84px] h-[calc(100vh-64px)] bg-[#F9FBFC] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out [&[data-state=open]]:duration-300 [&[data-state=closed]]:duration-200"
              >
                <SheetOverlay className="hidden" />
                <SheetHeader className="p-6">
                  <div
                    className="flex items-center gap-2 cursor-pointer w-[154px]"
                    onClick={() => setOpen(false)}>
                    <ArrowLeft className="w-[18px] h-[18px] mb-0.5" />
                    <p className="text-[18px] font-semibold text-[#141414]">
                      <SheetTitle className="">Create Course</SheetTitle>
                    </p>
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 -mt-[40px]">
                  <div className="flex gap-[30px]">
                    <CourseInformation />
                    <CourseSchedule />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </>
        }
      />
    </>
  );
}
