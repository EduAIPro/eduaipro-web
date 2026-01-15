"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { generalFetcher } from "@/api/queries";
import {
  declineSurveyResponse,
  startSurveyResponse,
  submitSurveyResponse,
} from "@/api/mutations";
import { Survey, SurveyAnswer, UserSurveyList } from "@/types/admin/surveys";
import { toast } from "sonner";
import { SurveyModal } from "./survey-modal";
import { declineSurveyKey, startSurveyKey, submitSurveyKey } from "@/api/keys";

type SurveyContextType = {
  isOpen: boolean;
  toggleOpen: (open: boolean) => void;
  isLoading: boolean;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // We only show surveys on dashboard pages
  const isDashboard = pathname?.startsWith("/dashboard");

  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"list" | "form" | "success">("list");
  const [activeSurvey, setActiveSurvey] = useState<Survey | null>(null);
  const [responseId, setResponseId] = useState<string | null>(null);
  const [isContinuing, setIsContinuing] = useState<boolean>(false);

  // Fetch surveys
  // Only fetch if on dashboard and user is logged in (handled by layout usually)
  const { data: surveys, mutate } = useSWR<UserSurveyList>(
    isDashboard ? "/surveys" : null,
    generalFetcher,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        // "if a user hasn't submitted a response"
        // The API returns a list of surveys. We filter locally or API filters?
        // Prompt: "lazy load surveys from my api (GET /surveys) and if a user hasn't submitted a response, show a modal"
        // Assumption: GET /surveys returns only pending surveys or we check a property.
        // If the array is not empty, we assume they are pending.
        const hasClosedModal = sessionStorage.getItem("survey_modal_closed");
        console.log({ data, hasClosedModal });
        if (data && data.data.length > 0 && !hasClosedModal) {
          setIsOpen(true);
        }
      },
    }
  );

  const { trigger: startTrigger, isMutating: isStarting } = useSWRMutation(
    startSurveyKey,
    startSurveyResponse
  );

  const { trigger: submitTrigger, isMutating: isSubmitting } = useSWRMutation(
    submitSurveyKey,
    submitSurveyResponse
  );

  const { trigger: declineTrigger, isMutating: isDeclining } = useSWRMutation(
    declineSurveyKey,
    declineSurveyResponse
  );

  const handleStart = async (survey: Survey) => {
    try {
      setActiveSurvey(survey);

      const detailedSurvey = await generalFetcher(`/surveys/${survey.id}`);
      setActiveSurvey(detailedSurvey || survey);

      const res = await startTrigger({ surveyId: survey.id });
      if (res?.id) {
        setResponseId(res.id);
        setView("form");
      }
    } catch (e) {
      toast.error("Failed to start survey");
      console.error(e);
    }
  };

  const handleContinue = async (survey: Survey) => {
    try {
      setIsContinuing(true);
      setActiveSurvey(survey);

      const detailedSurvey = await generalFetcher(`/surveys/${survey.id}`);
      setActiveSurvey(detailedSurvey || survey);

      if (survey?.responses?.length > 0) {
        setResponseId(survey?.responses[0]?.id);
        setView("form");
      }
    } catch (e) {
      toast.error("Failed to start survey");
      console.error(e);
    } finally {
      setIsContinuing(false);
    }
  };

  const handleSubmit = async (answers: SurveyAnswer[]) => {
    if (!responseId) return;
    try {
      await submitTrigger({ responseId, answers });
      setView("success");
    } catch (e) {
      toast.error("Failed to submit survey");
    }
  };

  const handleDecline = async (surveyId: string) => {
    // "declining will show a confirmation"
    if (!confirm("Are you sure you want to decline this survey?")) return;

    try {
      await declineTrigger({ surveyId });
      toast.success("Survey declined");
      // Refresh list
      mutate();
    } catch (e) {
      toast.error("Failed to decline survey");
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("survey_modal_closed", "true");
    setIsOpen(false);
    setTimeout(() => {
      setView("list");
      setActiveSurvey(null);
      setResponseId(null);
    }, 300);
  };

  return (
    <SurveyContext.Provider
      value={{ isOpen, toggleOpen: setIsOpen, isLoading: false }}
    >
      {children}
      {isOpen && (
        <SurveyModal
          open={isOpen}
          onClose={handleClose}
          view={view}
          surveys={surveys?.data || []}
          activeSurvey={activeSurvey}
          onStart={handleStart}
          onContinue={handleContinue}
          onSubmit={handleSubmit}
          onDecline={handleDecline}
          isContinuing={isContinuing}
          isStarting={isStarting}
          isSubmitting={isSubmitting}
          isDeclining={isDeclining}
        />
      )}
    </SurveyContext.Provider>
  );
};
