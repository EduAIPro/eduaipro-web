"use client";

import { getSchoolAnalyticsKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import {
  AccredicationCard,
  CertificateRenewalCard,
  CompletionRateCard,
  CourseProgress,
  OverdueRenewals,
  Referral,
  TeachersCard,
  UpcomingEvents,
} from "@/components/school/dashboard/overview";
import { SchoolAnalytics } from "@/types/school";
import useSWR from "swr";

function SchoolPage() {
  const { data, isLoading } = useSWR<SchoolAnalytics>(
    getSchoolAnalyticsKey,
    generalFetcher
  );
  // error is not read because the axios interceptor throws undefined on network errors (QA-36, api/base.ts:58-61)
  const hasError = !isLoading && !data;
  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Dashboard
        </h1>
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            <TeachersCard
              staffActivity={data?.staffActivity}
              isLoading={isLoading}
              hasError={hasError}
            />
            <AccredicationCard
              accreditationStatus={data?.accreditationStatus}
              isLoading={isLoading}
              hasError={hasError}
            />
            <CompletionRateCard
              progress={data?.courseProgress}
              data={data?.completionRateHistory}
              isLoading={isLoading}
              hasError={hasError}
            />
            <CertificateRenewalCard
              renewals={data?.renewals}
              isLoading={isLoading}
              hasError={hasError}
            />
          </div>
          <div className="grid xl:grid-cols-3 gap-5">
            <div className="space-y-5">
              <CourseProgress
                progress={data?.courseProgress}
                isLoading={isLoading}
                hasError={hasError}
              />
              <Referral />
            </div>
            <div className="grid md:grid-cols-2 gap-5 xl:col-span-2">
              <OverdueRenewals />
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SchoolPage;
