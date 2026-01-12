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
  onSubmit: (answers: SurveyAnswer[]) => void;
  onDecline: (survey: Survey) => void;
  isStarting: boolean;
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
  onSubmit,
  onDecline,
  isStarting,
  isSubmitting,
  isDeclining,
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
        view === "form" ? "min-w-[600px] max-w-2xl" : "max-w-xl"
      }
    >
      {view === "list" && (
        <SurveyList
          surveys={surveys}
          onStart={onStart}
          onDecline={onDecline}
          isStarting={isStarting}
          isDeclining={isDeclining}
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
