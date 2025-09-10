import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { CreateCourseFormValue, UnitFormValue } from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, TrashIcon } from "lucide-react";
import { emptyModule } from "../constants";
import { ModuleItemFormField } from "./module-items";
type ModuleFormFieldProps = {
  fieldName: string;
  unitItem: UnitFormValue;
};

// units.${unitIndex}.modules
export const ModuleFormField = ({
  fieldName,
  unitItem,
}: ModuleFormFieldProps) => {
  const { touched, errors } = useFormikContext<CreateCourseFormValue>();

  const fieldError = (fieldName: keyof CreateCourseFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <FieldArray name={fieldName}>
      {({ remove, push }) => (
        <div>
          <h3 className="text-lg font-medium mb-3">Modules</h3>
          {unitItem.modules.map((mod, moduleIndex) => (
            <div key={moduleIndex} className="">
              <FormInput
                name={`${fieldName}.${moduleIndex}.title`}
                label="Module title"
                placeholder="Enter module title"
                error={
                  fieldError(`${fieldName}.${moduleIndex}.title` as any) as
                    | string
                    | null
                }
              />
              <ModuleItemFormField
                moduleObj={mod}
                fieldName={`${fieldName}.${moduleIndex}.moduleItems`}
              />

              {unitItem.modules.length > 1 && (
                <Button
                  onClick={() => remove(moduleIndex)}
                  variant="destructive"
                >
                  <TrashIcon />
                </Button>
              )}
            </div>
          ))}

          <Button onClick={() => push(emptyModule)}>
            <PlusIcon />
            <p>Add module</p>
          </Button>
        </div>
      )}
    </FieldArray>
  );
};
