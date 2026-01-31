/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getCourseWithProgress, submitAssessmentKey } from "@/api/keys";
import { submitAssessment } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  AssessmentSubmitResponse,
  GeneratedQuestions,
} from "@/types/assessment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { useSurvey } from "../../survey-modal/survey-context";

type AssessmentProps = {
  data?: GeneratedQuestions;
  error?: string;
  isLoading: boolean;
  initialTime?: number;
  removeAssessmentScreen: VoidFunction;
  onSubmisson: (v: AssessmentSubmitResponse) => void;
};

export const Assessment: React.FC<AssessmentProps> = ({
  data,
  error,
  isLoading,
  removeAssessmentScreen,
  onSubmisson,
  initialTime = 1200, // 15 minutes default
}) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<{ [q: number]: string }>({});
  const [timer, setTimer] = React.useState(initialTime);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = data ? data?.AssessmentQuestion.length : 0;
  const q = data?.AssessmentQuestion[current];

  const isOnLastStep = useMemo(() => current === total - 1, [current, total]);
  const isSubmitDisabled = useMemo(
    () => isOnLastStep && Object.entries(selected).length < total,
    [isOnLastStep, selected],
  );

  const { mutate } = useSWRConfig();
  const { toggleOpen } = useSurvey();

  const {
    trigger,
    isMutating,
    error: submissionError,
  } = useSWRMutation(submitAssessmentKey, submitAssessment);

  const submitAssessments = () => {
    trigger(selected).then((res) => {
      if (res) {
        // refetch course progress
        mutate(getCourseWithProgress);

        onSubmisson(res);
        removeAssessmentScreen();
        // open surveys if the surveys array exists
        toggleOpen(!!res.surveys.length, { surveys: res.surveys });
      }
    });
  };

  // Timer effect
  React.useEffect(() => {
    if (isLoading || error) return;
    timerRef.current = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading, error]);

  useEffect(() => {
    if (timer === 0) {
      submitAssessments();
    }
  }, [timer]);

  useEffect(() => {
    if (error || submissionError) {
      toast.error((error || submissionError).toString());
    }
  }, [error, submissionError]);

  useEffect(() => {
    if (data) {
      toast.warning(
        <div>
          <h3 className="font-semibold text-sm mb-1">
            Warning: Do not leave this tab!
          </h3>
          <p className="text-grey-500 text-sm">
            If you navigate away from this page, your quiz will be automatically
            submitted with your current answers.
          </p>
        </div>,
      );
    }
  }, [data]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        submitAssessments();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Animation classes
  const getAnimationClass = (dir: "left" | "right") =>
    dir === "right" ? "animate-slide-in-right" : "animate-slide-in-left";

  // Format timer
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <Card className="w-full mx-auto mt-10 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-16" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-3/4 mb-6" />
          <div className="space-y-4 my-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full mx-auto mt-10">
        <CardContent>
          <div className="text-red-500 text-center py-8">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="w-full mx-auto mt-10 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Graded Quiz: Assessment for Learning
        </CardTitle>
        <div className="text-sm font-mono text-muted-foreground">
          {formatTime(timer)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-medium text-muted-foreground">
            Question {current + 1} of {total}
          </span>
        </div>
        <div
          className={cn(
            "transition-all duration-500",
            getAnimationClass(direction),
          )}
          key={q?.index}
        >
          <div className="text-base font-medium mb-6">{q?.questionText}</div>
          <div className="space-y-4">
            {q?.AssessmentQuestionOption.map((opt) => (
              <button
                key={opt.id}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center",
                  selected[current] === opt.identifier
                    ? "border-primary-300 bg-primary-300 text-primary-foreground"
                    : "bg-[#F9FBFC] hover:bg-muted border-[#E6E8EA]",
                )}
                onClick={() => {
                  setSelected((prev) => ({
                    ...prev,
                    [current]: opt.identifier,
                  }));
                }}
                type="button"
              >
                <Checkbox checked={selected[current] === opt.identifier} />
                <span className="font-semibold mx-2">{opt.identifier}.</span>
                <p>{opt.value}</p>
              </button>
            ))}
          </div>
        </div>
        {isOnLastStep ? (
          <div className="mt-3">
            <p className="text-grey-500">
              By clicking submit, you confirm that you have completed this quiz
              on your own without any assistance from others, and you understand
              that leaving this tab will result in automatic submission of your
              quiz.
            </p>
          </div>
        ) : null}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            disabled={current === 0}
            onClick={() => {
              setDirection("left");
              setCurrent((c) => Math.max(0, c - 1));
            }}
          >
            Previous
          </Button>
          <Button
            loading={isMutating}
            disabled={isSubmitDisabled}
            onClick={() => {
              if (isOnLastStep) {
                submitAssessments();
              } else {
                setDirection("right");
                setCurrent((c) => Math.min(total - 1, c + 1));
              }
            }}
          >
            {isOnLastStep ? "Submit" : "Next"}
          </Button>
        </div>
      </CardContent>
      <style jsx global>{`
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s;
        }
      `}</style>
    </Card>
  );
};
