import { adminGetStaffKey, getSchoolStaffsKey } from "@/api/keys";
import { reactivateStaff } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type ConfirmActivateTeacherModalProps = {
  staffId: string;
};

export const ConfirmActivateTeacherModal = ({
  staffId,
}: ConfirmActivateTeacherModalProps) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    getSchoolStaffsKey,
    reactivateStaff
  );

  async function handleReactivateStaff() {
    try {
      await trigger({ staffId });
      toast.success("Staff reactivated successfully");
      setOpen(false);
      mutate([`${getSchoolStaffsKey}/${staffId}`, adminGetStaffKey]);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      open={open}
      toggleModal={setOpen}
      trigger={
        <Button className="max-md:w-full">
          <CheckIcon />
          Activate user
        </Button>
      }
      footer={
        <>
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="max-sm:w-full"
          >
            Cancel
          </Button>
          <Button
            className="max-sm:w-full"
            loading={isMutating}
            onClick={handleReactivateStaff}
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
