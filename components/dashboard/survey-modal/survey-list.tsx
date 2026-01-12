import React from "react";
import { Survey } from "@/types/admin/surveys";
import { Button } from "@/components/ui/button";
import { FileTextIcon, XIcon } from "lucide-react";
import useUser from "@/hooks/use-user";

type SurveyListProps = {
  surveys: Survey[];
  onStart: (survey: Survey) => void;
  onContinue: (survey: Survey) => void;
  onDecline: (surveyId: string) => void;
  isStarting: boolean;
  isContinuing: boolean;
  isDeclining: boolean;
};

export const SurveyList: React.FC<SurveyListProps> = ({
  surveys,
  onStart,
  onContinue,
  onDecline,
  isStarting,
  isDeclining,
  isContinuing,
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
        <h2 className="font-semibold text-base md:text-lg text-black">
          Hello {user?.firstName},
        </h2>
        <p className="text-grey-11 text-[15px]">
          We value your feedback. Please take a moment to answer existing
          surveys.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="flex lg:items-center justify-between max-lg:flex-col w-full p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow gap-3 lg:gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 size-12 flex items-center justify-center shrink-0 p-0 rounded-full">
                <FileTextIcon className="size-5 shrink-0 text-grey-11" />
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-zinc-800 text-sm">
                  {survey.title}
                </h4>
                <p className="text-sm text-zinc-500 lg:line-clamp-1">
                  {survey.description || "No description provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {survey.responses.length > 0 ? (
                <Button
                  size="sm"
                  className="max-lg:flex-1"
                  onClick={() => onContinue(survey)}
                  loading={isContinuing}
                >
                  Continue
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 max-lg:flex-1"
                    onClick={() => {
                      setDeclinedSurveyId(survey.id);
                      onDecline(survey.id);
                    }}
                    disabled={isDeclining}
                    loading={isDeclining && declinedSurveyId === survey.id}
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    className="max-lg:flex-1"
                    onClick={() => onStart(survey)}
                    loading={isStarting}
                  >
                    Answer
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
