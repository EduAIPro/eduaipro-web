import React from "react";
import { Survey } from "@/types/admin/surveys";
import { Button } from "@/components/ui/button";
import { FileTextIcon, XIcon } from "lucide-react";
import useUser from "@/hooks/use-user";

type SurveyListProps = {
  surveys: Survey[];
  onStart: (survey: Survey) => void;
  onDecline: (survey: Survey) => void;
  isStarting: boolean;
  isDeclining: boolean;
};

export const SurveyList: React.FC<SurveyListProps> = ({
  surveys,
  onStart,
  onDecline,
  isStarting,
  isDeclining,
}) => {
  const [declinedSurveyId, setDeclinedSurveyId] = React.useState<string | null>(
    null
  );

  const { user } = useUser();
  if (surveys.length === 0) {
    return (
      <div className="flex bg-white flex-col items-center justify-center py-10 text-center">
        <p className="text-zinc-500">No pending surveys at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="">
        <h2 className="font-semibold text-lg">Hello {user?.firstName},</h2>
        <p className="text-grey-11 text-[15px]">
          We value your feedback. Please take a moment to answer existing
          surveys.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="flex items-center justify-between w-full p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 p-2 rounded-full">
                <FileTextIcon className="w-5 h-5 text-primary-500" />
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-zinc-800 text-sm">
                  {survey.title}
                </h4>
                <p className="text-sm text-zinc-500 line-clamp-1">
                  {survey.description || "No description provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                onClick={() => {
                  setDeclinedSurveyId(survey.id);
                  onDecline(survey);
                }}
                disabled={isStarting || isDeclining}
                loading={isDeclining && declinedSurveyId === survey.id}
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={() => onStart(survey)}
                loading={isStarting}
              >
                Answer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
