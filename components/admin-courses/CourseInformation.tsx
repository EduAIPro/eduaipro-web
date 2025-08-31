"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CourseInformation() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [validity, setValidity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCourse = {
      courseName,
      description,
      duration,
      validity,
    };

    console.log("Course Created:", newCourse);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-md rounded-[12px] p-[20px] flex flex-col max-w-[440px]">
      <h2 className="text-[18px] text-[#141414] font-semibold">
        Course Information
      </h2>

      <div className="mt-[30px] flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[5px]">
          <label className="block text-[14px] font-medium">Course Name</label>
          <Input
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <label className="block text-[14px] font-medium">Description</label>
          <Textarea
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-[152px]"
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <label className="block text-[14px] font-medium">
            Course Duration
          </label>
          <Select onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Select Course Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="3-months">3 Months</SelectItem>
              <SelectItem value="6-months">6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-[5px]">
          <label className="block text-[14px] font-medium">
            Certificate Validity Period
          </label>
          <Select onValueChange={setValidity}>
            <SelectTrigger>
              <SelectValue placeholder="Select Validity Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-year">1 Year</SelectItem>
              <SelectItem value="2-years">2 Years</SelectItem>
              <SelectItem value="lifetime">Lifetime</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full mt-[200px]">
        Create Course
      </Button>
    </form>
  );
}
