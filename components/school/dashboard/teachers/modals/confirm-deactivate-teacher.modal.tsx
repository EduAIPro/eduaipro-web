import { getSchoolStaffsKey } from "@/api/keys";
import { deactivateStaff } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BanIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

type ConfirmDeactivateTeacherModalProps = {
  staffId: string;
};

export const ConfirmDeactivateTeacherModal = ({
  staffId,
}: ConfirmDeactivateTeacherModalProps) => {
  const [open, setOpen] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    getSchoolStaffsKey,
    deactivateStaff
  );

  async function handleDeactivateStaff() {
    try {
      await trigger({ staffId });
      toast.success("Staff deactivated successfully");
      setOpen(false);
      mutate(`${getSchoolStaffsKey}/${staffId}`);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      open={open}
      toggleModal={setOpen}
      trigger={
        <Button variant="outline" className="max-md:w-full">
          <BanIcon />
          Deactivate user
        </Button>
      }
      footer={
        <>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button loading={isMutating} onClick={handleDeactivateStaff}>
            Yes, continue
          </Button>
        </>
      }
      title="Deactivate user"
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to deactivate this teacher? This will restrict the
        teacher from accessing their dashboard and completing their professional
        development course. You can reactive this account at any time
      </p>
    </Modal>
  );
};
