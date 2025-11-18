import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

type ConfirmDeleteSchoolModalProps = {};

export const ConfirmDeleteSchoolModal = ({}: ConfirmDeleteSchoolModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      title="Delete school"
      open={open}
      toggleModal={setOpen}
      trigger={
        <Button variant="destructive" className="max-md:w-full">
          <Trash2Icon />
          Delete school
        </Button>
      }
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            Yes, delete
          </Button>
        </>
      }
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to delete this school from the database? This will
        delete all related information on this teacher including teachers,
        certifications and course progress. This action cannot be undone
      </p>
    </Modal>
  );
};
