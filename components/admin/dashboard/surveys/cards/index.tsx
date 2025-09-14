import { getSurveysAggregatesKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { SurveyAggregates } from "@/types/admin/surveys";
import { useMemo } from "react";
import useSWR from "swr";
import { CardItem } from "./card-item";

export const SurveyAggregatesCards = () => {
  const { data, isLoading } = useSWR<SurveyAggregates>(
    getSurveysAggregatesKey,
    generalFetcher
  );
  const cards = useMemo(
    () => [
      {
        title: "Surveys created",
        value: data?.totalSurveys ?? 0,
      },
      {
        title: "Surveys responses",
        value: data?.totalResponses ?? 0,
      },
      {
        title: "Surveys response rate",
        value: data?.responseRate ?? "0%",
      },
      {
        title: "Completed surveys",
        value: data?.completedResponses ?? 0,
      },
    ],
    [data]
  );
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <CardItem isLoading={isLoading} title={card.title} value={card.value} />
      ))}
    </div>
  );
};
