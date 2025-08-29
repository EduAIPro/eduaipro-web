"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, SearchIcon } from "lucide-react";
import Image from "next/image";
import { Course } from "@/app/types/Course";

interface CoursesSearchProps {
  courses: Course[];
  onSearch: (filtered: Course[]) => void;
}

const CoursesSearch: React.FC<CoursesSearchProps> = ({
  courses,
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = courses.filter(
      (t) =>
        t.title.toLowerCase().includes(value.toLowerCase()) ||
        t.enrolled.toString().includes(value.toLowerCase()) ||
        t.completed.toString().includes(value.toLowerCase())
    );

    onSearch(filtered);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-full max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search Courses"
          className="pl-10"
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="flex items-center gap-[10px]">
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

        <Button variant="default">
          <Plus />
          Create New Course
        </Button>
      </div>
    </div>
  );
};

export default CoursesSearch;
