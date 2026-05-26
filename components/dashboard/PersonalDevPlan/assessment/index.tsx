/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getCourseWithProgress, submitAssessmentKey } from "@/api/keys";
import { submitAssessment } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { AssessmentError } from "./error";

type AssessmentProps = {
  data?: GeneratedQuestions;
  error?: string;
  isLoading: boolean;
  initialTime?: number;
  removeAssessmentScreen: VoidFunction;
  onSubmisson: (v: AssessmentSubmitResponse) => void;
  goBackOnErr: VoidFunction;
};

export const Assessment: React.FC<AssessmentProps> = ({
  data,
  error,
  isLoading,
  removeAssessmentScreen,
  onSubmisson,
  goBackOnErr,
  initialTime = 1200,
}) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<{ [q: number]: string }>({});
  const [timer, setTimer] = React.useState(initialTime);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animKey, setAnimKey] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = data ? data?.AssessmentQuestion.length : 0;
  const q = data?.AssessmentQuestion[current];

  const isOnLastStep = useMemo(() => current === total - 1, [current, total]);
  const answeredCount = Object.keys(selected).length;
  const allAnswered = answeredCount === total;
  const isSubmitDisabled = useMemo(
    () => isOnLastStep && !allAnswered,
    [isOnLastStep, allAnswered],
  );
  const isTimerUrgent = timer <= 120;

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
        mutate(getCourseWithProgress);
        onSubmisson(res);
        removeAssessmentScreen();
        toggleOpen(!!res.surveys.length, { surveys: res.surveys });
      }
    });
  };

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
    if (timer === 0) submitAssessments();
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
      if (document.visibilityState === "hidden") submitAssessments();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const s = (t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const navigate = (dir: "left" | "right") => {
    setDirection(dir);
    setAnimKey((k) => k + 1);
    setCurrent((c) =>
      dir === "right" ? Math.min(total - 1, c + 1) : Math.max(0, c - 1),
    );
  };

  // ── Skeleton ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Card className="w-full mx-auto mt-10 shadow-none border-0">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-[3px] w-full rounded-full" />
          </div>
          <Skeleton className="h-14 w-4/5" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
          <div className="flex justify-between pt-4 border-t border-border/30">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-1.5 w-1.5 rounded-full" />
              ))}
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <AssessmentError error={error} removeAssessmentScreen={goBackOnErr} />
    );
  }

  if (!data) return null;

  const progressPct = (answeredCount / total) * 100;

  // ── Main ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=DM+Sans:wght@400;500&display=swap");

        .assessment-wrap {
          font-family: "DM Sans", sans-serif;
        }
        .assessment-question-serif {
          font-family: "Lora", serif;
          font-weight: 500;
        }
        .assessment-title-serif {
          font-family: "Lora", serif;
          font-weight: 600;
        }

        @keyframes assessment-slide-right {
          from {
            opacity: 0;
            transform: translateX(22px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes assessment-slide-left {
          from {
            opacity: 0;
            transform: translateX(-22px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .assessment-slide-right {
          animation: assessment-slide-right 0.3s ease both;
        }
        .assessment-slide-left {
          animation: assessment-slide-left 0.3s ease both;
        }

        @keyframes assessment-timer-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.35;
          }
        }
        .assessment-timer-pulse {
          animation: assessment-timer-pulse 1s infinite;
        }
      `}</style>

      <Card className="assessment-wrap w-full mx-auto mt-10 shadow-none border-0">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          {/* Title */}
          <div>
            <p className="assessment-title-serif text-[17px] text-foreground leading-tight m-0">
              Graded Quiz
            </p>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              Assessment for Learning
            </p>
          </div>

          {/* Timer pill */}
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium tabular-nums border",
              isTimerUrgent
                ? "bg-destructive/10 text-destructive border-destructive/20"
                : "bg-muted/60 text-foreground border-border/50",
            )}
          >
            <span
              className={cn(
                "block w-1.5 h-1.5 rounded-full",
                isTimerUrgent
                  ? "bg-destructive assessment-timer-pulse"
                  : "bg-emerald-500",
              )}
            />
            {formatTime(timer)}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-muted-foreground">
                Question {current + 1} of {total}
              </span>
              <span className="text-[13px] font-medium text-foreground">
                {answeredCount} answered
              </span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question + Options */}
          <div
            key={animKey}
            className={cn(
              direction === "right"
                ? "assessment-slide-right"
                : "assessment-slide-left",
            )}
          >
            <p className="assessment-question-serif text-[16px] leading-relaxed text-foreground mb-5">
              {q?.questionText}
            </p>

            <div className="flex flex-col gap-2.5">
              {q?.AssessmentQuestionOption.map((opt) => {
                const isSelected = selected[current] === opt.identifier;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [current]: opt.identifier,
                      }))
                    }
                    className={cn(
                      "w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-150",
                      isSelected
                        ? "border-foreground bg-muted/60"
                        : "border-border/60 bg-background hover:border-border hover:bg-muted/30",
                    )}
                  >
                    {/* Letter badge */}
                    <span
                      className={cn(
                        "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium border transition-all duration-150",
                        isSelected
                          ? "bg-foreground text-background border-foreground"
                          : "text-muted-foreground border-border/70",
                      )}
                    >
                      {opt.identifier}
                    </span>
                    <span className="text-[14px] text-foreground leading-snug">
                      {opt.value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disclaimer on last step */}
          {isOnLastStep && (
            <p className="text-[12px] text-muted-foreground leading-relaxed bg-muted/50 rounded-lg px-3.5 py-3">
              By clicking submit, you confirm that you completed this quiz
              independently and understand that leaving this tab will result in
              automatic submission of your answers.
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            {/* Dot nav */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "block rounded-full transition-all duration-200",
                    i === current
                      ? "w-2 h-2 bg-foreground scale-125"
                      : selected[i]
                        ? "w-1.5 h-1.5 bg-foreground"
                        : "w-1.5 h-1.5 bg-border",
                  )}
                />
              ))}
            </div>

            {/* Prev / Next-Submit */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={current === 0}
                onClick={() => navigate("left")}
                className="gap-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Previous
              </Button>

              <Button
                size="sm"
                loading={isMutating}
                disabled={isSubmitDisabled}
                onClick={() => {
                  if (isOnLastStep) {
                    submitAssessments();
                  } else {
                    navigate("right");
                  }
                }}
                className="gap-1.5"
              >
                {isOnLastStep ? (
                  <>
                    Submit
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </>
                ) : (
                  <>
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
