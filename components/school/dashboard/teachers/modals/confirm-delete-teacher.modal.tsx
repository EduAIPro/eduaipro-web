import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

type ConfirmDeleteTeacherModalProps = {};

export const ConfirmDeleteTeacherModal =
  ({}: ConfirmDeleteTeacherModalProps) => {
    const [open, setOpen] = useState(false);
    return (
      <Modal
        open={open}
        toggleModal={setOpen}
        trigger={
          <Button variant="destructive" className="max-md:w-full">
            <Trash2Icon />
            Delete user
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
        title="Delete user"
      >
        <p className="text-[15px] text-grey-500">
          Are you sure you want to delete this teacher from the database? This
          will delete all related information on this teacher inclusing
          certifications and course progress. This action cannot be undone
        </p>
      </Modal>
    );
  };
