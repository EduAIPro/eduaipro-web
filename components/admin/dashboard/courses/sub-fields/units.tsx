import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { CreateCourseFormValue } from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Fragment } from "react";
import { emptyUnit } from "../constants";
import { ModuleFormField } from "./modules";

export const UnitFormField = () => {
  const { values, touched, errors } = useFormikContext<CreateCourseFormValue>();

  const fieldError = (fieldName: keyof CreateCourseFormValue) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <FieldArray name="units">
      {({ remove, push }) => (
        <div className="border rounded-xl bg-primary-200/10">
          {values.units.map((unit, unitIndex) => (
            <Fragment key={unitIndex}>
              <div className="flex items-center justify-between pb-3 border-b border-grey-400 p-4">
                <div className="flex items-baseline gap-5">
                  <h3 className="text-sm font-semibold text-grey-650 mb-3 whitespace-nowrap">
                    Unit {unitIndex + 1}
                  </h3>
                  <FormInput
                    name={`units.${unitIndex}.title`}
                    label=""
                    placeholder="Enter unit title"
                    className="bg-white rounded-xl max-sm:min-w-full sm:min-w-96"
                    inputClassName="border-grey-400"
                    error={
                      fieldError(`units.${unitIndex}.title` as any) as
                        | string
                        | null
                    }
                  />
                </div>

                {values.units.length > 1 && (
                  <Button
                    onClick={() => remove(unitIndex)}
                    variant="destructive"
                    size="sm"
                    className="min-w-fit"
                  >
                    <Trash2Icon />
                  </Button>
                )}
              </div>
              <div className="bg-white p-4">
                <ModuleFormField<CreateCourseFormValue>
                  unitItem={unit}
                  fieldName={`units.${unitIndex}.modules`}
                />
              </div>
            </Fragment>
          ))}

          <div className="flex items-center justify-end bg-white pb-4 pr-4 rounded-xl">
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
