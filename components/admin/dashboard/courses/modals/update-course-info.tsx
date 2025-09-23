import { adminUpdateCourseSummaryUnitKey, getCoursesKey } from "@/api/keys";
import { updateCourseSummary } from "@/api/mutations";
import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UpdateCoursePayload } from "@/types/admin/courses";
import { TeacherLevelType } from "@/types/course";
import { UpdateCourseSummaryFormValue } from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import { PenSquareIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import {
  courseDurationOptions,
  teachingLevelOptions,
  validityPeriodOptions,
} from "../constants";

type UpdateCourseSummaryModalProps = {
  courseId: string;
  defaultValues: UpdateCourseSummaryFormValue;
};

export const UpdateCourseSummary = ({
  courseId,
  defaultValues,
}: UpdateCourseSummaryModalProps) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    courseId ? adminUpdateCourseSummaryUnitKey(courseId) : null,
    updateCourseSummary
  );

  async function handleSubmit(
    values: UpdateCourseSummaryFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    try {
      const payload: UpdateCoursePayload = {
        title: values.courseName,
        description: values.description,
        level: values.teachingLevel as TeacherLevelType,
        certificateValidationDays: Number(values.validityPeriod),
        introductoryVideoUrl: values.introductoryVideo,
        completionDurationDays: Number(values.completionPeriod),
      };
      await trigger(payload);
      toast.success("Course summary updated successfully");
      setOpen(false);
      resetForm();
      mutate(getCoursesKey);
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      open={open}
      title="Update course summary"
      toggleModal={setOpen}
      trigger={
        <Button variant="outline" className="border-primary text-primary">
          <PenSquareIcon />
          Update
        </Button>
      }
    >
      <p className="text-base text-grey-500"></p>

      <div>
        <Formik initialValues={defaultValues} onSubmit={handleSubmit}>
          {({ touched, errors }) => {
            const fieldError = (
              fieldName: keyof UpdateCourseSummaryFormValue
            ) =>
              touched[fieldName] && errors[fieldName]
                ? errors[fieldName]
                : null;
            return (
              <Form>
                <div className="space-y-4">
                  <FormInput
                    name="courseName"
                    label="Course name"
                    placeholder="Enter course name"
                    error={fieldError("courseName") as string | null}
                  />
                  <FormInput
                    as="textarea"
                    name="description"
                    label="Course description"
                    placeholder="Enter a suitable course description"
                    error={fieldError("description") as string | null}
                  />
                  <FormInput
                    name="introductoryVideo"
                    label="Introductory video link"
                    placeholder="Enter introductory video URL"
                    error={fieldError("introductoryVideo") as string | null}
                  />
                  <SelectInput
                    name="teachingLevel"
                    label="Professional level"
                    options={teachingLevelOptions}
                    error={fieldError("teachingLevel") as string | null}
                    placeholder="What professional level is this course is for?"
                  />
                  <SelectInput
                    name="completionPeriod"
                    label="Course duration"
                    options={courseDurationOptions}
                    error={fieldError("completionPeriod") as string | null}
                    placeholder="Select a course duration"
                  />
                  <SelectInput
                    name="validityPeriod"
                    label="Certificate validity period"
                    options={validityPeriodOptions}
                    error={fieldError("validityPeriod") as string | null}
                    placeholder="Select a course validity period"
                  />
                </div>

                <div className="flex items-center justify-end mt-6 gap-4">
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
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};
