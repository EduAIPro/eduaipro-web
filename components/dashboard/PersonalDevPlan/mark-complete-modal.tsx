import {
  adminGetStaffKey,
  getAllSystemAdmins,
  getSchoolStaffsKey,
} from "@/api/keys";
import { adminReactivateStaff } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CheckIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type MarkCompleteModalProps = {
  open: boolean;
  onClose: VoidFunction;
  onComplete: VoidFunction;
  confirmDialogDoc: {
    id: string;
    viewedCount: number;
    totalCount: number;
  } | null;
  trigger: ReactNode;
};

export const MarkCompleteModal = ({
  confirmDialogDoc,
  trigger,
  open,
  onClose,
  onComplete,
}: MarkCompleteModalProps) => {
  return (
    <Modal
      open={open}
      toggleModal={onClose}
      title="Mark section complete?"
      trigger={trigger}
      footer={
        <>
          <Button onClick={onClose} variant="outline" className="max-sm:w-full">
            Cancel
          </Button>
          <Button type="button" onClick={onComplete}>
            Mark Complete
          </Button>
        </>
      }
    >
      <p className="text-[15px] text-grey-500">
        {"You've"} viewed ${confirmDialogDoc?.viewedCount} of $
        {confirmDialogDoc?.totalCount} slides in this section. Mark it complete?
      </p>
    </Modal>
  );
};
