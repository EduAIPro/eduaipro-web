import {
  adminCreateCourseUnitKey,
  adminUpdateCourseUnitKey,
  getCoursesKey,
} from "@/api/keys";
import { createCourseUnit, updateCourseUnits } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type NewUnitModalProps = {
  unitId?: string;
  prevTitle?: string;
  courseId?: string;
  lastIndex?: number;
};

export const NewUnitModal = ({
  courseId,
  lastIndex = 0,
  prevTitle,
  unitId,
}: NewUnitModalProps) => {
  const [title, setTitle] = useState(prevTitle ?? "");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    courseId ? adminCreateCourseUnitKey(courseId) : null,
    createCourseUnit
  );

  const { trigger: updateUnit, isMutating: isUnitUpdating } = useSWRMutation(
    unitId ? adminUpdateCourseUnitKey(unitId) : null,
    updateCourseUnits
  );

  async function handleSubmit() {
    if (!title.trim()) {
      toast.error("A unit title is required to proceed");
      return;
    }
    try {
      if (unitId && prevTitle) {
        await updateUnit({ title });
        router.push(`/admin/courses/edit-unit?unit-id=${unitId}`);
      } else {
        const { id: unitId } = await trigger({ index: lastIndex + 1, title });
        router.push(`/admin/courses/edit-unit?create=true&unit-id=${unitId}`);
      }

      toast.success(
        prevTitle
          ? "Unit title updated successfully"
          : "New unit created successfully"
      );
      setOpen(false);
      mutate(getCoursesKey);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      open={open}
      title={prevTitle ? "Update unit" : "Create unit"}
      toggleModal={setOpen}
      trigger={
        prevTitle ? (
          <Button onClick={() => setOpen(false)} variant="ghost" size="sm">
            <p className="text-primary underline">Update unit</p>
          </Button>
        ) : (
          <Button>
            <PlusIcon />
            <p>New unit</p>
          </Button>
        )
      }
      footer={
        <>
          {prevTitle && unitId ? (
            <Button
              onClick={() => {
                router.push(`/admin/courses/edit-unit?unit-id=${unitId}`);
                setOpen(false);
              }}
              variant="outline"
              className="max-sm:w-full"
            >
              Update unit modules
            </Button>
          ) : null}
          <Button
            className="max-sm:w-full"
            loading={isMutating || isUnitUpdating}
            onClick={handleSubmit}
            disabled={prevTitle ? prevTitle.trim() === title.trim() : !title}
          >
            Submit
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <p className="font-medium text-base text-grey-500">
          {prevTitle
            ? "Update the unit title"
            : "Enter a title for the new unit"}
        </p>
        <div className="space-y-1">
          <label htmlFor="unitTitle">
            <p className="font-medium text-base text-grey-800">Unit title</p>
          </label>
          <Input
            name="unitTitle"
            placeholder="Enter unit title"
            className="bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};
