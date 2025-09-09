/* eslint-disable react-hooks/exhaustive-deps */
import CancelCircle from "@/components/svgs/cancel-bold-error-round.svg";
import CancelSquare from "@/components/svgs/cancel-bold-error-square.svg";
import CheckCircle from "@/components/svgs/check-bold-round.svg";
import CheckSquare from "@/components/svgs/check-bold-square.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AssessmentSubmitResponse } from "@/types/assessment";
import { SquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type AssessmentResultsProps = {
  response: AssessmentSubmitResponse;
  retakeAssessment: VoidFunction;
  questionsLoading: boolean;
  closeModal: VoidFunction;
};

export const AssessmentResults = ({
  response,
  retakeAssessment,
  questionsLoading,
  closeModal,
}: AssessmentResultsProps) => {
  const router = useRouter();

  const { result, assessmentPassed, assessmentRecord } = response;
  const [questionIndex, setQuestionIndex] = useState(result?.[0].index);

  const activeQuestion = useMemo(
    () => result?.[questionIndex],
    [questionIndex, result]
  );
  const isLastQuestion = useMemo(
    () => activeQuestion?.index === result?.length - 1,
    [activeQuestion]
  );

  return (
    <section className="flex flex-col-reverse md:grid grid-cols-3 gap-5">
      <div className="p-5 border border-grey-400 rounded-xl space-y-3 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-grey-650">Questions</h2>
          <p
            className={cn(
              "font-medium",
              assessmentRecord.gradePercentage <= 25
                ? "text-error-600"
                : assessmentRecord.gradePercentage < 70
                ? "text-warning-500"
                : "text-success-600"
            )}
          >
            {assessmentRecord.gradePercentage}%
          </p>
        </div>
        <ul className="space-y-3">
          {result?.map((res) => {
            const isActive = questionIndex === res.index;
            const isCorrect = res.userAnswer
              ? res.correctOptionIdentifiers.includes(res.userAnswer)
              : false;
            const Icon = isCorrect ? CheckCircle : CancelCircle;
            return (
              <li key={res.index.toString()} className="max-w-full">
                <button
                  onClick={() => setQuestionIndex(res.index)}
                  className={cn(
                    "rounded-md w-full cursor-pointer hover:bg-grey-400/20 px-3 py-2 flex items-center gap-2",
                    isActive ? "bg-[#F9FBFC] border border-[#E6E8EA]" : ""
                  )}
                >
                  <div className="shrink-0 size-5">
                    <Icon />
                  </div>
                  <p className="font-medium text-grey-650 break-words text-sm truncate line-clamp-1">
                    {res.questionText}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-span-2 space-y-5">
        <div className="p-5 border border-grey-400 rounded-xl bg-white pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Answers to Quiz: Assessment for Learning
            </h2>
            <Button onClick={closeModal}>Go back to learning</Button>
          </div>
          <div className="mt-8">
            <div className="space-y-1 relative">
              <p className="font-medium text-grey-500">
                Question {questionIndex + 1} of {result.length}{" "}
              </p>
              <h2 className="font-semibold text-grey-650">
                {activeQuestion.questionText}
              </h2>
              {!activeQuestion.userAnswer ? (
                <div className="rounded-md bg-primary-180 border border-primary-190 uppercase w-fit px-1.5 text-xs absolute top-0 left-36">
                  <p>unanswered</p>
                </div>
              ) : null}
            </div>
            <ul className="space-y-3 mt-6">
              {activeQuestion?.AssessmentQuestionOption?.map((option) => {
                const userAnswerExists = !!activeQuestion.userAnswer;
                const isCorrect =
                  activeQuestion.correctOptionIdentifiers.includes(
                    option.identifier
                  );
                const isUserSelected =
                  userAnswerExists &&
                  activeQuestion.userAnswer === option.identifier;

                let Icon: any = SquareIcon;
                let styles =
                  "p-2.5 rounded-lg border bg-primary-180 border-primary-190";

                if (userAnswerExists) {
                  if (isCorrect) {
                    // User answered, and this is the correct option
                    Icon = CheckSquare;
                    styles =
                      "p-2.5 rounded-lg border bg-success-surface border-success-600 text-success-600";
                  } else if (isUserSelected) {
                    // User answered, but this is the wrong option they selected
                    Icon = CancelSquare;
                    styles =
                      "p-2.5 rounded-lg border bg-error-surface border-error-600 text-error-600";
                  } else {
                    // User answered, but this is not the correct or selected option
                    Icon = SquareIcon;
                    styles =
                      "p-2.5 rounded-lg border bg-primary-180 border-primary-190";
                  }
                } else {
                  // User did not answer
                  if (isCorrect) {
                    // Highlight the correct option
                    Icon = CheckSquare;
                    styles =
                      "p-2.5 rounded-lg border bg-success-surface border-success-600 text-success-600";
                  } else {
                    Icon = SquareIcon;
                    styles =
                      "p-2.5 rounded-lg border bg-primary-180 border-primary-190";
                  }
                }

                return (
                  <li key={option.id} className={cn(styles)}>
                    <div className="flex items-center gap-2.5">
                      <div className="shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p>{option.value}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            disabled={questionIndex === 0}
            onClick={() => setQuestionIndex((prev) => prev - 1)}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            loading={questionsLoading}
            onClick={() => {
              if (isLastQuestion) {
                if (assessmentPassed) {
                  router.refresh();
                } else {
                  retakeAssessment();
                }
              } else {
                setQuestionIndex((prev) => prev + 1);
              }
            }}
          >
            {isLastQuestion
              ? assessmentPassed
                ? "Next unit"
                : "Retake assessment"
              : "Next"}
          </Button>
        </div>
      </div>
    </section>
  );
};
