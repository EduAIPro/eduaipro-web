"use client";
import { getSchoolsKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import {
  SchoolDetailsHeader,
  SchoolInfo,
} from "@/components/admin/dashboard/schools/school-details";
import { Button } from "@/components/ui/button";
import { RetrieveSchoolDetails } from "@/types/admin/schools";
import { ChevronLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

export default function SchoolDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data, isLoading } = useSWR<RetrieveSchoolDetails>(
    id ? `${getSchoolsKey}/${id}` : null,
    generalFetcher
  );

  console.log({ data });
  return (
    <section className="">
      <div className="h-[140px]">
        <Button onClick={() => router.back()} variant="ghost">
          <ChevronLeftIcon size={24} />
          <p className="text-xl">School Detail</p>
        </Button>
      </div>
      <div className="bg-white -mx-4 px-5 border border-transparent space-y-9 py-3 pb-12">
        <SchoolDetailsHeader isLoading={isLoading} data={data} />
        <SchoolInfo isLoading={isLoading} data={data} />
      </div>
    </section>
  );
}
