import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import SearchWithActions from "../sharedComponents/SharedSearchInput";
import { Course } from "@/app/types/Course";
import Link from "next/link";

interface CoursesSearchProps {
  courses: Course[];
  onSearch: (filtered: Course[]) => void;
}

export default function CoursesSearch({
  courses,
  onSearch,
}: CoursesSearchProps) {
  return (
    <SearchWithActions<Course>
      data={courses}
      searchKeys={["title", "enrolled", "completed"]}
      placeholder="Search Courses"
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

          <Link href="/admin/courses/new-course">
            <Button variant="default">
              <Plus />
              Create New Course
            </Button>
          </Link>
        </>
      }
    />
  );
}
