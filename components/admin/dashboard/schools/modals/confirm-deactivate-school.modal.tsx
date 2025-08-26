import { getSchoolStaffsKey } from "@/api/keys";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BanIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

type ConfirmDeactivateSchoolModalProps = {
  schoolId: string;
};

export const ConfirmDeactivateSchoolModal = ({
  schoolId,
}: ConfirmDeactivateSchoolModalProps) => {
  const [open, setOpen] = useState(false);

  // const { trigger, isMutating } = useSWRMutation(
  //   getSchoolStaffsKey,
  //   deactivateStaff
  // );

  async function handleDeactivateStaff() {
    try {
      // await trigger({ schoolId });
      toast.success("School deactivated successfully");
      setOpen(false);
      mutate(`${getSchoolStaffsKey}/${schoolId}`);
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
          <Button onClick={handleDeactivateStaff}>
            {/* <Button loading={isMutating} onClick={handleDeactivateStaff}> */}
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
