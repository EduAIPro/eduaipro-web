"use client";
import { CreateSurvey } from "@/components/admin/dashboard/surveys";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateSurveyPage() {
  const router = useRouter();
  return (
    <section className="space-y-6">
      <div>
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="!px-0 hover:!px-3"
        >
          <ChevronLeftIcon size={24} />
          <p className="text-lg md:text-xl">Create survey</p>
        </Button>
      </div>
      <CreateSurvey />
    </section>
  );
}
