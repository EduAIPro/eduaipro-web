import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BanIcon } from "lucide-react";
import { useState } from "react";

type ConfirmDeactivateTeacherModalProps = {};

export const ConfirmDeactivateTeacherModal =
  ({}: ConfirmDeactivateTeacherModalProps) => {
    const [open, setOpen] = useState(false);
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
            <Button variant="outline">Cancel</Button>
            <Button onClick={() => setOpen(false)}>Yes, continue</Button>
          </>
        }
        title="Deactivate user"
      >
        <p className="text-[15px] text-grey-500">
          Are you sure you want to deactivate this teacher? This will restrict
          the teacher from accessing their dashboard and completing their
          professional development course. You can reactive this account at any
          time
        </p>
      </Modal>
    );
  };
