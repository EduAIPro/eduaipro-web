import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import {
  CreateCourseFormValue,
  ModuleItemFormValue,
} from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, TrashIcon } from "lucide-react";
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
        <div>
          <h3 className="text-lg font-medium mb-3">Slides</h3>
          {moduleItem.pages.map((page, pageIndex) => (
            <div key={pageIndex} className="">
              <FormInput
                name={`${fieldName}.${pageIndex}.title`}
                label="Page title"
                placeholder="Enter slide title"
                error={
                  fieldError(`${fieldName}.${pageIndex}.title` as any) as
                    | string
                    | null
                }
              />
              <FormInput
                name={`${fieldName}.${pageIndex}.number`}
                label="Page number"
                placeholder="Enter slide page number"
                error={
                  fieldError(`${fieldName}.${pageIndex}.number` as any) as
                    | string
                    | null
                }
              />

              {moduleItem.pages.length > 1 && (
                <Button onClick={() => remove(pageIndex)} variant="destructive">
                  <TrashIcon />
                </Button>
              )}
            </div>
          ))}

          <Button onClick={() => push(emptyPage)}>
            <PlusIcon />
            <p>Add slide</p>
          </Button>
        </div>
      )}
    </FieldArray>
  );
};
