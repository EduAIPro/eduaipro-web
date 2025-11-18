import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { SurveyQuestionTypeEnum } from "@/types/admin/surveys";
import { CreateSurveyFormValue } from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { emptyQuestion, questionTypesOptions } from "../../constants";
import { QuestionOptionFormField } from "./options";

export const SurveyQuestionsField = () => {
  const { values, touched, errors } = useFormikContext<CreateSurveyFormValue>();

  const fieldError = (fieldName: keyof CreateSurveyFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <FieldArray name="questions">
      {({ remove, push }) => (
        <div className="space-y-8">
          {values.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <div className="flex items-center justify-between pb-3">
                <FormInput
                  name={`questions.${questionIndex}.title`}
                  label={`Question ${questionIndex + 1}`}
                  placeholder="Enter question title"
                  className="bg-white rounded-xl max-sm:min-w-full sm:min-w-96"
                  inputClassName="border-grey-400"
                  error={
                    fieldError(`questions.${questionIndex}.title` as any) as
                      | string
                      | null
                  }
                />

                {values.questions.length > 1 && (
                  <Button
                    onClick={() => remove(questionIndex)}
                    variant="destructive"
                    size="sm"
                    className="min-w-fit"
                  >
                    <Trash2Icon />
                  </Button>
                )}
              </div>
              <div>
                <SelectInput
                  name={`questions.${questionIndex}.type`}
                  label="Question type"
                  options={questionTypesOptions}
                  error={
                    fieldError(`questions.${questionIndex}.type` as any) as
                      | string
                      | null
                  }
                  placeholder="What type of question is this?"
                />

                {values.questions[questionIndex].type !==
                SurveyQuestionTypeEnum.SHORT_TEXT ? (
                  <QuestionOptionFormField
                    fieldName={`questions.${questionIndex}.options`}
                    questionItem={question}
                  />
                ) : null}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end mt-5">
            <Button onClick={() => push(emptyQuestion)}>
              <PlusIcon />
              <p>Add question</p>
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  );
};
