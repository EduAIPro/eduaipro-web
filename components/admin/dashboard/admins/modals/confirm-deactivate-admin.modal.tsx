import {
  adminGetStaffKey,
  getAllSystemAdmins,
  getSchoolStaffsKey,
} from "@/api/keys";
import { adminDeactivateStaff } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BanIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type ConfirmDeactivateAdminModalProps = {
  staffId: string;
  schoolId: string;
};

export const ConfirmDeactivateAdminModal = ({
  staffId,
  schoolId,
}: ConfirmDeactivateAdminModalProps) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    `/admin${getSchoolStaffsKey}`,
    adminDeactivateStaff
  );

  async function handleDeactivateStaff() {
    try {
      await trigger({ staffId, schoolId });
      toast.success("School admin deactivated successfully");
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
        <Button variant="outline" className="max-md:w-full">
          <BanIcon />
          Deactivate admin
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
      title="Deactivate admin"
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to deactivate this admin? This will restrict the
        admin from accessing their dashboard as well as their school and
        teachers. You can reactive this account at any time
      </p>
    </Modal>
  );
};
