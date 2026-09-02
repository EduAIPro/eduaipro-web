import CheckBadge from "@/components/svgs/check-badge.svg";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type AssessmentCompletedModalProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  firstName?: string;
  passed?: boolean;
  gradePercentage?: number;
};

export const AssessmentCompletedModal = ({
  isOpen,
  setIsOpen,
  firstName,
  passed,
  gradePercentage,
}: AssessmentCompletedModalProps) => {
  function onClose(v: boolean) {
    setIsOpen(v);
  }

  const greeting = firstName ? `Nice work, ${firstName}!` : "Nice work!";
  const message =
    passed === undefined
      ? "You've completed the quiz and submitted your answers."
      : passed
        ? `You've passed the assessment${
            gradePercentage !== undefined ? ` with a score of ${gradePercentage}%` : ""
          }. Great job!`
        : `You've completed the quiz, but didn't reach the passing score${
            gradePercentage !== undefined ? ` (you scored ${gradePercentage}%)` : ""
          }. Don't worry, you can review the material and try again.`;

  return (
    <Modal
      hideCloseButton
      footer={<Button onClick={() => onClose(false)}>View results</Button>}
      open={isOpen}
      toggleModal={onClose}
      title="Assessment completed"
    >
      <div>
        <div className="w-fit mx-auto">
          <CheckBadge />
        </div>
        <div className="space-y-1 text-center max-w-sm mx-auto mt-4">
          <h2 className="font-semibold text-grey-800 text-xl">{greeting}</h2>
          <p className="font-medium text-grey-650 text-base">{message}</p>
        </div>
      </div>
    </Modal>
  );
};
