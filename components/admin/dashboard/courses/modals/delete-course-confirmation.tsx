import { getCoursesKey } from "@/api/keys";
import { deleteCourse } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type ConfirmDeleteCourseModalProps = {
  courseId: string;
};

export const ConfirmDeleteCourseModal = ({
  courseId,
}: ConfirmDeleteCourseModalProps) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(getCoursesKey, deleteCourse);

  async function handleDeleteCourse() {
    try {
      await trigger({ id: courseId });
      toast.success("Course deleted successfully");
      setOpen(false);
      mutate(getCoursesKey);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      open={open}
      title="Delete course"
      toggleModal={setOpen}
      trigger={
        <Button
          variant="destructive"
          className="max-md:w-full text-error-600 bg-error-surface rounded-t-none hover:scale-100 hover:text-white justify-start"
        >
          <Trash2Icon />
          Delete
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
            onClick={handleDeleteCourse}
            variant="destructive"
          >
            Yes, delete
          </Button>
        </>
      }
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to delete this course? This will delete all traces
        of this course from our entire database. Teachers who are currently
        enrolled in this course will lose their progress. This action cannot be
        undone
      </p>
    </Modal>
  );
};
