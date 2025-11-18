import CheckBadge from "@/components/svgs/check-badge.svg";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type AssessmentCompletedModalProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

export const AssessmentCompletedModal = ({
  isOpen,
  setIsOpen,
}: AssessmentCompletedModalProps) => {
  function onClose(v: boolean) {
    setIsOpen(v);
  }
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
          <h2 className="font-semibold text-grey-800 text-xl">Nice work!</h2>{" "}
          <p className="font-medium text-grey-650 text-base">
            {"You've"} completed the quiz and submitted your answers.
          </p>
        </div>
      </div>
    </Modal>
  );
};
