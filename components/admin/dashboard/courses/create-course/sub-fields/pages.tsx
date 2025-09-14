import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import {
  CreateCourseFormValue,
  ModuleItemFormValue,
} from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { emptyPage } from "../constants";
type PageFormFieldProps = {
  fieldName: string;
  moduleItem: ModuleItemFormValue;
};

// units.${unitIndex}.modules.${moduleIndex}.moduleItems.${moduleItemsIndex}.pages
export const PageFormField = ({
  fieldName,
  moduleItem,
}: PageFormFieldProps) => {
  const { touched, errors } = useFormikContext<CreateCourseFormValue>();

  const fieldError = (fieldName: keyof CreateCourseFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <FieldArray name={fieldName}>
      {({ remove, push }) => (
        <div className="space-y-4">
          {moduleItem.pages.map((page, pageIndex) => (
            <div key={pageIndex} className="space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-grey-650 mb-3">
                  Slide {pageIndex + 1}
                </h3>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => push(emptyPage)}
                    className="border-success-600 text-success-600"
                    variant="ghost"
                    size="sm"
                  >
                    <PlusIcon />
                    <p>Add slide</p>
                  </Button>

                  {moduleItem.pages.length > 1 && (
                    <Button
                      className="min-w-fit"
                      size="sm"
                      onClick={() => remove(pageIndex)}
                      variant="destructive"
                    >
                      <Trash2Icon />
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <FormInput
                  name={`${fieldName}.${pageIndex}.title`}
                  placeholder="Enter slide title"
                  error={
                    fieldError(`${fieldName}.${pageIndex}.title` as any) as
                      | string
                      | null
                  }
                />
                <FormInput
                  name={`${fieldName}.${pageIndex}.number`}
                  placeholder="Enter slide page number"
                  error={
                    fieldError(`${fieldName}.${pageIndex}.number` as any) as
                      | string
                      | null
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  );
};
