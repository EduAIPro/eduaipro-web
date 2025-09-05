"use client";
import { getAdminAggregatesKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import {
  BottomLeftSection,
  BottomRightSection,
  TopDashboardCards,
} from "@/components/admin/dashboard/overview";
import { GetAdminAggregates } from "@/types/admin";
import useSWR from "swr";

export default function AdminPage() {
  const { data, isLoading } = useSWR<GetAdminAggregates>(
    getAdminAggregatesKey,
    generalFetcher
  );
  const props = { data, isLoading };

  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Dashboard
        </h1>
        <div className="space-y-3 xl:space-y-5">
          <TopDashboardCards {...props} />
          <div className="grid xl:grid-cols-2 gap-3 xl:gap-5">
            <BottomLeftSection />
            <BottomRightSection
              isLoading={isLoading}
              totalAccreditedTeachers={data?.totalAccreditedTeachers}
              courseCompletionRate={data?.courseCompletionRate}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
