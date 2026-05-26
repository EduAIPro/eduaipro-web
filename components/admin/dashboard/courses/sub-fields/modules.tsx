import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { UnitFormValue } from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { emptyModule } from "../constants";
import { ModuleItemFormField } from "./module-items";

type ModuleFormFieldProps = {
  mode?: "edit" | "create";
  fieldName: string;
  unitItem: Omit<UnitFormValue, "title">;
};

// units.${unitIndex}.modules
export const ModuleFormField = <T,>({
  fieldName,
  unitItem,
  mode = "create",
}: ModuleFormFieldProps) => {
  const { touched, errors } = useFormikContext<T>();

  const fieldError = (fieldName: keyof T) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;
  const field = mode === "edit" ? fieldName.slice(8) : fieldName;

  return (
    <FieldArray name={field}>
      {({ remove, push }) => (
        <div className="space-y-8">
          {unitItem.modules.map((mod, moduleIndex) => (
            <div key={moduleIndex} className="">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-grey-650">
                  Module {moduleIndex + 1}
                </h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary"
                    onClick={() => push(emptyModule)}
                  >
                    <PlusIcon />
                    <p>Add module</p>
                  </Button>
                  {unitItem.modules.length > 1 && (
                    <Button
                      onClick={() => remove(moduleIndex)}
                      variant="destructive"
                      className="min-w-fit"
                      size="sm"
                    >
                      <Trash2Icon />
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <FormInput
                  name={`${field}.${moduleIndex}.title`}
                  placeholder="Enter module title"
                  error={
                    fieldError(`${field}.${moduleIndex}.title` as any) as
                      | string
                      | null
                  }
                />
                <ModuleItemFormField<T>
                  isEdit={mode === "edit"}
                  moduleObj={mod}
                  fieldName={`${fieldName}.${moduleIndex}.moduleItems`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  );
};
