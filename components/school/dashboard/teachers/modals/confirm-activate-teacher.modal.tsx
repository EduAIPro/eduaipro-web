import { useMutationApi } from "@/api/hooks/useMutationApi";
import {
  ACTIVATE_SCHOOL_TEACHER_MUTATION_KEY,
  GET_ALL_SCHOOL_TEACHERS_QUERY_KEY,
  GET_SCHOOL_TEACHER_BY_ID_QUERY_KEY,
} from "@/api/keys";
import { approveTeacherAccount } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BanIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ConfirmActivateTeacherModalProps = {
  teacherId: string;
};

export const ConfirmActivateTeacherModal = ({
  teacherId,
}: ConfirmActivateTeacherModalProps) => {
  const [open, setOpen] = useState(false);

  const activateTeacherAccountMutation = useMutationApi(
    ACTIVATE_SCHOOL_TEACHER_MUTATION_KEY,
    approveTeacherAccount,
    {
      onSuccess() {
        toast.success("Teacher approved successfully!");
        setOpen(false);
      },
      onError(error) {
        toast.error((error as any)?.message as string);
        setOpen(false);
      },
    },
    [GET_SCHOOL_TEACHER_BY_ID_QUERY_KEY, GET_ALL_SCHOOL_TEACHERS_QUERY_KEY]
  );
  return (
    <Modal
      open={open}
      toggleModal={setOpen}
      trigger={
        <Button className="max-md:w-full">
          <BanIcon />
          Activate user
        </Button>
      }
      footer={
        <>
          <Button variant="outline" className="max-sm:w-full">
            Cancel
          </Button>
          <Button
            className="max-sm:w-full"
            loading={activateTeacherAccountMutation.isLoading}
            onClick={() => {
              activateTeacherAccountMutation.mutate(teacherId);
            }}
          >
            Yes, continue
          </Button>
        </>
      }
      title="Activate user"
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to activate this teacher? This will grant the
        teacher access to their dashboard and their professional development
        course. You can deactivate this account at any time
      </p>
    </Modal>
  );
};
