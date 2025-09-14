import { getSurveysKey } from "@/api/keys";
import { createSurvey } from "@/api/mutations";
import {
  CreateSurveyOption,
  CreateSurveyPayload,
  CreateSurveyQueston,
  SurveyVisibilityEum,
} from "@/types/admin/surveys";
import {
  CreateSurveyFormValue,
  createSurveyValidation,
} from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { emptyQuestion } from "./constants";
import { SurveyDetails } from "./survey-details";
import { SurveyQuestions } from "./survey-questions";

export type SurveyStatus = "ACTIVE" | "DRAFT";

export const CreateSurvey = () => {
  const [status, setStatus] = useState<SurveyStatus>("ACTIVE");

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(getSurveysKey, createSurvey);

  async function handleSubmit(
    values: CreateSurveyFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    try {
      const surveyQuestions: CreateSurveyQueston[] = values.questions.map(
        (question, questionIndex) => {
          const options: CreateSurveyOption[] | undefined =
            question.options?.map((option, optionIndex) => ({
              value: option.label,
              label: option.label,
              index: optionIndex + 1,
              isActive: true,
            }));
          return {
            type: question.type as any,
            title: question.title,
            index: questionIndex + 1,
            isRequired: true,
            isActive: true,
            ...(options && { options }),
          };
        }
      );
      const visibility = values.visibility.includes("ADMIN")
        ? "ADMIN_ONLY"
        : values.visibility.includes("SCHOOL")
        ? "SCHOOL"
        : "TEACHER_ONLY";

      const payload: CreateSurveyPayload = {
        title: values.title,
        description: values.description,
        status,
        visibility,
        allowMultipleSubmissions: false,
        startsAt: values.startsAt,
        endsAt: values.endsAt,
        ...(values.schoolId?.length && { schoolId: values.schoolId[0] }),
        ...(values.thankyouMessage && {
          thankyouMessage: values.thankyouMessage,
        }),
        questions: surveyQuestions,
      };

      await trigger(payload);
      toast.success("Survey created successfully");

      router.push("/admin/survey");
      resetForm();
    } catch (error) {
      console.log({ error });
      toast.error((error as any).toString() as string);
    }
  }

  const createSurveyInitialValues: CreateSurveyFormValue = {
    title: "",
    description: "",
    visibility: SurveyVisibilityEum.SCHOOL_ONLY,
    startsAt: "",
    endsAt: "",
    thankyouMessage: "",
    questions: [emptyQuestion],
  };
  return (
    <div>
      <Formik
        validateOnMount
        initialValues={createSurveyInitialValues}
        onSubmit={handleSubmit}
        validationSchema={createSurveyValidation}
      >
        <Form className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-4">
          <SurveyDetails
            onSelect={(status: SurveyStatus) => setStatus(status)}
            loading={isMutating}
          />
          <div className="lg:col-span-2">
            <SurveyQuestions />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
