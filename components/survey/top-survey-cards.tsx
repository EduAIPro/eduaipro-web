import React from "react";
import { TotalSurveysCard } from "./survey-cards/survey-created";
import { TotalResponseCard } from "./survey-cards/survey-response";
import { SurveysResponseRateCard } from "./survey-cards/survey-response-rate";
import { TotalSurveysLastCard } from "./survey-cards/survey-created-last";

const TopSurveyCards = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <TotalSurveysCard value={27} />
      <TotalResponseCard value={4352} />
      <SurveysResponseRateCard value={36} />
      <TotalSurveysLastCard value={27} />
    </div>
  );
};

export default TopSurveyCards;
