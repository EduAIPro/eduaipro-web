"use client";

import {
  AccredicationCard,
  CertificateRenewalCard,
  CompletionRateCard,
  TeachersCard,
} from "@/components/school/dashboard/overview";

function SchoolPage() {
  return (
    <section>
      <div className="space-y-5">
        <h1>Dashboard</h1>
        <div className="grid grid-cols-4 gap-5">
          <TeachersCard />
          <AccredicationCard />
          <CompletionRateCard />
          <CertificateRenewalCard />
        </div>
      </div>
    </section>
  );
}

export default SchoolPage;
