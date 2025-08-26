import { getSchoolStaffsKey } from "@/api/keys";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

type ConfirmActivateSchoolModalProps = {
  schoolId: string;
};

export const ConfirmActivateSchoolModal = ({
  schoolId,
}: ConfirmActivateSchoolModalProps) => {
  const [open, setOpen] = useState(false);

  // const { trigger, isMutating } = useSWRMutation(
  //   getSchoolStaffsKey,
  //   reactivateStaff
  // );

  async function handleReactivateStaff() {
    try {
      // await trigger({ schoolId });
      toast.success("School activated successfully");
      setOpen(false);
      mutate(getSchoolStaffsKey);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      title="Activate school"
      open={open}
      toggleModal={setOpen}
      trigger={
        <Button className="max-md:w-full">
          <CheckIcon />
          Activate school
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
            // loading={isMutating}
            onClick={handleReactivateStaff}
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
