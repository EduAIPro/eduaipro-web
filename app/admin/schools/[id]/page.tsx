"use client";
import {
  SchoolDetailsHeader,
  SchoolInfo,
} from "@/components/admin/dashboard/schools/school-details";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SchoolDetailsPage() {
  const router = useRouter();
  return (
    <section className="">
      <div className="h-[140px]">
        <Button onClick={() => router.back()} variant="ghost">
          <ChevronLeftIcon size={24} />
          <p className="text-xl">School Detail</p>
        </Button>
      </div>
      <div className="bg-white -mx-4 px-5 border border-transparent space-y-9">
        <SchoolDetailsHeader />
        <SchoolInfo />
      </div>
    </section>
  );
}
