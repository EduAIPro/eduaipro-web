"use client";

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

function SchoolPage() {
  return (
    <section>
      <div className="space-y-5">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Dashboard
        </h1>
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            <TeachersCard />
            <AccredicationCard />
            <CompletionRateCard />
            <CertificateRenewalCard />
          </div>
          <div className="grid xl:grid-cols-3 gap-5">
            <div className="space-y-5">
              <CourseProgress />
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
