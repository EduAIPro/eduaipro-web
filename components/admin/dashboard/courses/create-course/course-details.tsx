import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { CreateCourseFormValue } from "@/utils/validation/admin";
import { useFormikContext } from "formik";
import {
  courseDurationOptions,
  teachingLevelOptions,
  validityPeriodOptions,
} from "./constants";

export const CourseDetails = () => {
  const { touched, errors } = useFormikContext<CreateCourseFormValue>();

  const fieldError = (fieldName: keyof CreateCourseFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl flex flex-col justify-between gap-20">
      <div>
        <h2 className="font-semibold text-grey-650">Course information</h2>
        <div className="space-y-5 mt-8">
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
      </div>

      <Button type="submit">
        <p>Create course</p>
      </Button>
    </div>
  );
};
