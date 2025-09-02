"use client";

import { useState } from "react";
import SurveyTable from "@/components/survey/survey-table";
import { Survey } from "@/app/types/survey";
import { surveysData } from "@/app/types/survey-data";
import SurveyHeader from "@/components/survey/survey-header";
import TopSurveyCards from "@/components/survey/top-survey-cards";

export default function AdminSurveyPage() {
  const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>(surveysData);

  return (
    <section>
      <p className="text-[28px] font-semibold text-[#141414] leading-[100%]">
        Survey
      </p>
      <div className="mt-[40px]">
        <TopSurveyCards/>
      </div>

      <div className="flex flex-col gap-[20px] mt-[40px]">
        <SurveyHeader />
        <SurveyTable surveys={filteredSurveys} />
      </div>
    </section>
  );
}