import React from "react";
import { Modal } from "@/components/ui/modal";
import { Survey, SurveyAnswer } from "@/types/admin/surveys";
import { SurveyForm } from "./survey-form";
import { SurveyList } from "./survey-list";
import { SurveySuccess } from "./survey-success";

type SurveyModalProps = {
  open: boolean;
  onClose: () => void;
  view: "list" | "form" | "success";
  surveys: Survey[];
  activeSurvey: Survey | null;
  onStart: (survey: Survey) => void;
  onContinue: (survey: Survey) => void;
  onSubmit: (answers: SurveyAnswer[]) => void;
  onDecline: (surveyId: string) => void;
  isStarting: boolean;
  isContinuing: boolean;
  isSubmitting: boolean;
  isDeclining: boolean;
};

export const SurveyModal: React.FC<SurveyModalProps> = ({
  open,
  onClose,
  view,
  surveys,
  activeSurvey,
  onStart,
  onContinue,
  onSubmit,
  onDecline,
  isStarting,
  isSubmitting,
  isDeclining,
  isContinuing,
}) => {
  return (
    <Modal
      open={open}
      toggleModal={onClose}
      title={
        view === "list"
          ? "Pending Surveys"
          : view === "form" && activeSurvey
          ? activeSurvey.title
          : "Survey Completed"
      }
      hideTitle={view === "success"}
      autoClose={false}
      modal={true}
      containerClassName={
        view === "form"
          ? "w-full md:min-w-[600px] md:max-w-2xl"
          : "w-full md:max-w-xl"
      }
    >
      {view === "list" && (
        <SurveyList
          surveys={surveys}
          onStart={onStart}
          onContinue={onContinue}
          onDecline={onDecline}
          isStarting={isStarting}
          isDeclining={isDeclining}
          isContinuing={isContinuing}
        />
      )}
      {view === "form" && activeSurvey && (
        <SurveyForm
          survey={activeSurvey}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={onClose}
        />
      )}
      {view === "success" && <SurveySuccess onClose={onClose} />}
    </Modal>
  );
};
