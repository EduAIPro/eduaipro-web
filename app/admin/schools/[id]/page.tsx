"use client";
import { getSchoolsKey } from "@/api/keys";
import { fetchWithSingleParam } from "@/api/queries";
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

  const { data, isLoading, mutate } = useSWR<RetrieveSchoolDetails>(
    id ? [getSchoolsKey, id] : null,
    fetchWithSingleParam
  );

  console.log({ data });
  return (
    <section className="">
      <div className="h-24 md:h-[140px]">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="!px-0 hover:!px-3"
        >
          <ChevronLeftIcon size={24} />
          <p className="text-lg md:text-xl">School Detail</p>
        </Button>
      </div>
      <div className="bg-white -mx-4 px-2 md:px-5 border border-transparent space-y-9 py-3 pb-12">
        <SchoolDetailsHeader
          isLoading={isLoading}
          data={data}
          refetch={mutate}
        />
        <SchoolInfo isLoading={isLoading} data={data} />
      </div>
    </section>
  );
}
