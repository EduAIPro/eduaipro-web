import { updateSchoolStatusKey } from "@/api/keys";
import { updateSchoolStatus } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type ConfirmActivateSchoolModalProps = {
  schoolId: string;
  refetch: VoidFunction;
};

export const ConfirmActivateSchoolModal = ({
  schoolId,
  refetch,
}: ConfirmActivateSchoolModalProps) => {
  const [open, setOpen] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    schoolId ? updateSchoolStatusKey(schoolId) : null,
    updateSchoolStatus
  );

  async function handleReactivateSchool() {
    try {
      await trigger({ active: true });
      toast.success("School reactivated successfully");
      refetch();
      setOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      title="Reactivate school"
      open={open}
      toggleModal={setOpen}
      trigger={
        <Button className="max-md:w-full">
          <CheckIcon />
          Reactivate school
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
            onClick={handleReactivateSchool}
          >
            Yes, continue
          </Button>
        </>
      }
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to activate this school? This will grant the
        teacher access to their dashboard and management of teachers under their
        school. This action can be undone at any time
      </p>
    </Modal>
  );
};
