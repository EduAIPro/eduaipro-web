import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import {
  CreateCourseFormValue,
  SurveyQuestionsFormValue,
} from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { emptyOption } from "../../constants";

type OptionFormFieldProps = {
  fieldName: string;
  questionItem: SurveyQuestionsFormValue;
};

// questions.${questionIndex}.options
export const QuestionOptionFormField = ({
  fieldName,
  questionItem,
}: OptionFormFieldProps) => {
  const { touched, errors } = useFormikContext<CreateCourseFormValue>();

  const fieldError = (fieldName: keyof CreateCourseFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
  console.log({ fieldName });
  return (
    <FieldArray name={fieldName}>
      {({ remove, push }) => (
        <div className="space-y-2 mt-4">
          <h3 className="text-sm font-semibold text-grey-650 mb-3">Options</h3>
          {questionItem.options?.map((option, optionIndex) => {
            console.log({ key: `${fieldName}.${optionIndex}.label` });
            return (
              <div key={optionIndex} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <FormInput
                    //   label={`Option ${optionIndex + 1}`}
                    name={`${fieldName}.${optionIndex}.label`}
                    className="min-w-[calc(100%-55px)]"
                    placeholder="Enter option label"
                    error={
                      fieldError(`${fieldName}.${optionIndex}.label` as any) as
                        | string
                        | null
                    }
                  />
                  {questionItem.options && questionItem.options?.length > 1 && (
                    <Button
                      className="min-w-fit border-error-600 text-error-600 bg-error-surface"
                      size="sm"
                      onClick={() => remove(optionIndex)}
                      variant="destructive"
                    >
                      <Trash2Icon />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
          <Button
            onClick={() => push(emptyOption)}
            className="border-primary text-primary"
            variant="ghost"
            size="sm"
          >
            <PlusIcon />
            <p>Add option</p>
          </Button>
        </div>
      )}
    </FieldArray>
  );
};
