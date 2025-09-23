"use client";
import { EditCourseUnits } from "@/components/admin/dashboard/courses";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function EditUnitPage() {
  return (
    <section className="space-y-6">
      <Suspense>
        <TopNav />
        <EditCourseUnits />
      </Suspense>
    </section>
  );
}

const TopNav = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const isCreating = searchParams.get("create");
  return (
    <div>
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="!px-0 hover:!px-3"
      >
        <ChevronLeftIcon size={24} />
        <p className="text-lg md:text-xl">
          {isCreating ? "Create" : "Edit"} unit
        </p>
      </Button>
    </div>
  );
};
