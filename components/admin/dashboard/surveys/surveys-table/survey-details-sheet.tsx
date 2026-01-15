import { getSurveyResponsesKey, getSurveysKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  RetrieveSurveyResponseList,
  Survey,
  SurveyQuestion,
  TableSurvey,
} from "@/types/admin/surveys";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { useMemo } from "react";

type SurveyDetailsSheetProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  survey: TableSurvey | null; // We need the survey object for questions
};

export const SurveyDetailsSheet = ({
  open,
  toggleOpen,
  survey,
}: SurveyDetailsSheetProps) => {
  const { data: responsesData, isLoading } = useSWR<RetrieveSurveyResponseList>(
    survey ? getSurveyResponsesKey(survey.id) : null,
    generalFetcher
  );

  const { data: fullSurvey, isLoading: isSurveyLoading } = useSWR<Survey>(
    survey ? `${getSurveysKey}/${survey.id}` : null,
    generalFetcher
  );

  const stats = useMemo(() => {
    if (!responsesData || !fullSurvey) return null;

    const totalResponses = responsesData.data.length;

    // Let's perform aggregations for questions
    const questionStats: Record<
      string,
      {
        question: SurveyQuestion;
        totalAnswers: number;
        options: Record<string, number>; // optionId -> count
        textAnswers: { value: string; user: string }[]; // for text questions
      }
    > = {};

    // Initialize with questions
    fullSurvey.questions.forEach((q) => {
      questionStats[q.id] = {
        question: q,
        totalAnswers: 0,
        options: {},
        textAnswers: [],
      };
      // Initialize options
      q.options?.forEach((opt) => {
        questionStats[q.id].options[opt.id] = 0;
      });
    });

    responsesData.data.forEach((response) => {
      response.answers.forEach((answer) => {
        const createStat = (qId: string) => {
          if (!questionStats[qId]) {
            return null;
          }
          return questionStats[qId];
        };

        const stat = createStat(answer.questionId);
        if (stat) {
          stat.totalAnswers++;

          if (answer.selectedOptions) {
            if (answer.optionId) {
              stat.options[answer.optionId] =
                (stat.options[answer.optionId] || 0) + 1;
            } else if (
              answer.selectedOptions &&
              Array.isArray(answer.selectedOptions)
            ) {
              // If it's an array of IDs
              answer.selectedOptions.forEach((optId) => {
                stat.options[optId] = (stat.options[optId] || 0) + 1;
              });
            }
          }

          if (answer.textValue) {
            stat.textAnswers.push({
              value: answer.textValue,
              user: `${response.respondent.user.firstName} ${response.respondent.user.lastName}`,
            });
          }
        }
      });
    });

    return {
      totalResponses,
      questionStats,
    };
  }, [responsesData, fullSurvey]);

  const loading = isLoading || isSurveyLoading;

  return (
    <Sheet open={open} onOpenChange={toggleOpen}>
      <SheetContent className="w-full md:min-w-[600px] overflow-y-auto sm:max-w-xl">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle>Survey Details</SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : !fullSurvey || !stats ? (
          <div className="py-10 text-center text-muted-foreground">
            Failed to load data.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Cards */}
            <div className="rounded-xl border p-4 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">
                Responses
              </p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{stats.totalResponses}</p>
                <div className="flex items-end gap-1 h-8 opacity-20">
                  <div className="w-2 bg-black h-4 rounded-t-sm" />
                  <div className="w-2 bg-black h-8 rounded-t-sm" />
                  <div className="w-2 bg-black h-6 rounded-t-sm" />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-lg font-medium">Responses</h2>
              </div>

              <div className="space-y-6 mt-0">
                {fullSurvey.questions.map((question, qIndex) => {
                  const stat = stats.questionStats[question.id];
                  if (!stat) return null;

                  return (
                    <div
                      key={question.id}
                      className="rounded-xl border p-4 shadow-sm space-y-4"
                    >
                      <h3 className="font-medium text-base">
                        Question {qIndex + 1} - {question.title}
                      </h3>

                      <div className="space-y-4">
                        {question.type === "SHORT_TEXT"
                          ? (!question.options ||
                              question.options.length === 0 ||
                              question.type === "SHORT_TEXT") && (
                              <div className="space-y-4 pt-2">
                                {stat.textAnswers.length > 0 ? (
                                  stat.textAnswers.map((ans, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-gray-50 p-3 rounded-md border border-gray-100"
                                    >
                                      <p className="text-sm text-gray-800">
                                        {ans.value}
                                      </p>
                                      <p className="text-xs text-grey-500 mt-1 font-medium">
                                        - {ans.user}
                                      </p>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-sm text-muted-foreground italic">
                                    No text responses yet.
                                  </p>
                                )}
                              </div>
                            )
                          : question.options?.map((option) => {
                              const count = stat.options[option.id] || 0;
                              const percentage =
                                stat.totalAnswers > 0
                                  ? Math.round(
                                      (count / stat.totalAnswers) * 100
                                    )
                                  : 0;

                              return (
                                <div key={option.id} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-grey-11">
                                      {option.label}
                                    </span>
                                    <span className="font-medium">
                                      {percentage}%
                                    </span>
                                  </div>
                                  <div className="h-2 w-full rounded-full bg-secondary">
                                    <div
                                      className="h-full rounded-full bg-[#246BFD] transition-all duration-500 ease-in-out"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
