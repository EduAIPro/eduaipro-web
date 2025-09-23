import {
  adminGetStaffKey,
  getAllSystemAdmins,
  getSchoolStaffsKey,
} from "@/api/keys";
import { adminReactivateStaff } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type ConfirmActivateAdminModalProps = {
  staffId: string;
  schoolId: string;
};

export const ConfirmActivateAdminModal = ({
  staffId,
  schoolId,
}: ConfirmActivateAdminModalProps) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    `/admin${getSchoolStaffsKey}`,
    adminReactivateStaff
  );

  async function handleReactivateStaff() {
    try {
      await trigger({ staffId, schoolId });
      toast.success("Staff reactivated successfully");
      setOpen(false);
      mutate([getAllSystemAdmins, `${adminGetStaffKey}/${staffId}`]);
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
          Activate admin
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
      title="Activate admin"
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to activate this admin? This will grant the admin
        access to their dashboard and their {"school's"} information. You can
        deactivate this account at any time
      </p>
    </Modal>
  );
};
