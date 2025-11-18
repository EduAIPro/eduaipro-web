"use client";

import {
  SurveyAggregatesCards,
  SurveysTable,
} from "@/components/admin/dashboard/surveys";

export default function AdminSurveyPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
          Survey
        </h1>
        <SurveyAggregatesCards />
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Recent surveys</h2>
        <SurveysTable />
      </div>
    </section>
  );
}
