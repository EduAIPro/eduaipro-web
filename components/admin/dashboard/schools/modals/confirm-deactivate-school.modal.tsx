import { updateSchoolStatusKey } from "@/api/keys";
import { updateSchoolStatus } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BanIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type ConfirmDeactivateSchoolModalProps = {
  schoolId: string;
  refetch: VoidFunction;
};

export const ConfirmDeactivateSchoolModal = ({
  schoolId,
  refetch,
}: ConfirmDeactivateSchoolModalProps) => {
  const [open, setOpen] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    schoolId ? updateSchoolStatusKey(schoolId) : null,
    updateSchoolStatus
  );

  async function handleDeactivateSchool() {
    try {
      await trigger({ active: false });
      toast.success("School deactivated successfully");
      refetch();
      setOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      title="Deactivate school"
      open={open}
      toggleModal={setOpen}
      trigger={
        <Button variant="outline" className="max-md:w-full">
          <BanIcon />
          Deactivate school
        </Button>
      }
      footer={
        <>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button loading={isMutating} onClick={handleDeactivateSchool}>
            Yes, continue
          </Button>
        </>
      }
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to deactivate this school? This will restrict the
        school from accessing their dashboard and managing their {"teacher's"}{" "}
        course progress. You can reactive this account at any time
      </p>
    </Modal>
  );
};
