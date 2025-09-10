import FormFileInput from "@/components/common/ui/File";
import { SelectInput } from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import {
  CreateCourseFormValue,
  ModuleFormValue,
} from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, TrashIcon } from "lucide-react";
import { emptyModuleItem, moduleItemTypeOptions } from "../constants";
import { PageFormField } from "./pages";

type ModuleItemFormFieldProps = {
  fieldName: string;
  moduleObj: ModuleFormValue;
};

// units.${unitIndex}.modules.${moduleIndex}.moduleItems
export const ModuleItemFormField = ({
  fieldName,
  moduleObj,
}: ModuleItemFormFieldProps) => {
  const { touched, errors } = useFormikContext<CreateCourseFormValue>();

  const fieldError = (fieldName: keyof CreateCourseFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <FieldArray name={fieldName}>
      {({ remove, push }) => (
        <div>
          <h3 className="text-lg font-medium mb-3">Module items</h3>
          {moduleObj.moduleItems.map((modItem, moduleItemIndex) => (
            <div key={moduleItemIndex} className="">
              <SelectInput
                name={`${fieldName}.${moduleItemIndex}.type`}
                label="Module type"
                options={moduleItemTypeOptions}
                error={
                  fieldError(`${fieldName}.${moduleItemIndex}.type` as any) as
                    | string
                    | null
                }
                placeholder="Select a module type"
              />
              <FormFileInput
                name={`${fieldName}.${moduleItemIndex}.pdfFile`}
                label="Add file"
                placeholder="Click to select or drag and drop"
                accept=".pdf"
                maxSize={5} // 5MB
                note="PDF only (max 5MB)"
                error={
                  fieldError(
                    `${fieldName}.${moduleItemIndex}.pdfFile` as any
                  ) as string | null
                }
              />

              <PageFormField
                moduleItem={modItem}
                fieldName={`${fieldName}.${moduleItemIndex}.pages`}
              />

              {moduleObj.moduleItems.length > 1 && (
                <Button
                  onClick={() => remove(moduleItemIndex)}
                  variant="destructive"
                >
                  <TrashIcon />
                </Button>
              )}
            </div>
          ))}

          <Button onClick={() => push(emptyModuleItem)}>
            <PlusIcon />
            <p>Add module item</p>
          </Button>
        </div>
      )}
    </FieldArray>
  );
};
