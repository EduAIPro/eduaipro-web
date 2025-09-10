import { adminCreateCourseKey } from "@/api/keys";
import { createCourse } from "@/api/mutations";
import {
  CreateCourseFormValue,
  createCourseValidation,
} from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import useSWRMutation from "swr/mutation";
import { emptyUnit } from "./constants";
import { CourseDetails } from "./course-details";
import { CourseSchedule } from "./course-schedule";

export const CreateCourse = () => {
  const { trigger, isMutating } = useSWRMutation(
    adminCreateCourseKey,
    createCourse
  );
  async function handleSubmit(values: CreateCourseFormValue) {
    try {
    } catch (error) {}
  }

  const createCourseInitialValues: CreateCourseFormValue = {
    courseName: "",
    description: "",
    teachingLevel: "",
    completionPeriod: "",
    validityPeriod: "",
    units: [emptyUnit as any],
  };
  return (
    <div>
      <Formik
        validateOnMount
        initialValues={createCourseInitialValues}
        onSubmit={handleSubmit}
        validationSchema={createCourseValidation}
      >
        {({}) => {
          return (
            <Form className="grid grid-cols-3 gap-4">
              <CourseDetails />
              <div className="col-span-2">
                <CourseSchedule />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
