"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Plus, ArrowLeft } from "lucide-react";
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
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
     
      <div className="w-full md:flex-1">
        <SearchWithActions<Course>
          data={courses}
          searchKeys={["title", "enrolled", "completed"]}
          placeholder="Search Course"
          onSearch={onSearch}
        />
      </div>

      
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
        <Button
          variant="ghost"
          className="p-[10px] border flex items-center text-[#656565] w-full md:w-auto">
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
            <Button
              variant="default"
              onClick={() => setOpen(true)}
              className="w-full md:w-auto">
              <Plus />
              Create New Course
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:max-w-full top-[84px] h-[calc(100vh-64px)] p-0 bg-[#F9FBFC] flex flex-col overflow-hidden"
            withOverlay={false}>
            <SheetOverlay className="hidden" />
            <SheetHeader className="p-6">
              <div
                className="flex items-center gap-2 cursor-pointer w-[154px]"
                onClick={() => setOpen(false)}>
                <ArrowLeft className="w-[18px] h-[18px] mb-0.5" />
                <p className="text-[18px] font-semibold text-[#141414]">
                  <SheetTitle>Create Course</SheetTitle>
                </p>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-6 -mt-[40px]">
              <div className="flex gap-[30px] flex-col xl:flex-row">
                <CourseInformation />
                <CourseSchedule />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
