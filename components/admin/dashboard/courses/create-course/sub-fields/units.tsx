import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { CreateCourseFormValue } from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, TrashIcon } from "lucide-react";
import { emptyUnit } from "../constants";
import { ModuleFormField } from "./modules";

export const UnitFormField = () => {
  const { values, touched, errors } = useFormikContext<CreateCourseFormValue>();

  const fieldError = (fieldName: keyof CreateCourseFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <FieldArray name="units">
      {({ remove, push }) => (
        <div>
          <h3 className="text-lg font-medium mb-3">Units</h3>
          {values.units.map((unit, unitIndex) => (
            <div key={unitIndex} className="">
              <FormInput
                name={`units.${unitIndex}.title`}
                label="Unit title"
                placeholder="Enter unit title"
                error={
                  fieldError(`units.${unitIndex}.title` as any) as string | null
                }
              />
              <ModuleFormField
                unitItem={unit}
                fieldName={`units.${unitIndex}.modules`}
              />

              {values.units.length > 1 && (
                <Button onClick={() => remove(unitIndex)} variant="destructive">
                  <TrashIcon />
                </Button>
              )}
            </div>
          ))}
          <div className="flex items-center justify-end">
            <Button onClick={() => push(emptyUnit)}>
              <PlusIcon />
              <p>Add unit</p>
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  );
};
