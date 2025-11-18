import { SelectInput } from "@/components/common/ui/FormInput";
import PdfIcon from "@/components/svgs/pdf.svg";
import { Button } from "@/components/ui/button";
import { ModuleFormValue } from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { useRef } from "react";
import { emptyModuleItem, moduleItemTypeOptions } from "../constants";
import { PageFormField } from "./pages";

type ModuleItemFormFieldProps = {
  fieldName: string;
  moduleObj: ModuleFormValue;
};

function extractIds(text: string) {
  const parts = text.split(".");
  const unitId = parts[1];
  const moduleId = parts[3];
  return { unitId, moduleId };
}

// units.${unitIndex}.modules.${moduleIndex}.moduleItems
export const ModuleItemFormField = <T,>({
  fieldName,
  moduleObj,
}: ModuleItemFormFieldProps) => {
  const { touched, errors, setFieldValue, values } = useFormikContext<T>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fieldError = (fieldName: keyof T) =>
    touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  function onFileSelect(file: File | null, moduleItemIndex: number) {
    if (file) {
      setFieldValue(`${fieldName}.${moduleItemIndex}.pdfFile`, file, true);
    } else {
      setFieldValue(`${fieldName}.${moduleItemIndex}.pdfFile`, null, true);
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    moduleItemIndex: number
  ) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file, moduleItemIndex);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const { unitId, moduleId } = extractIds(fieldName);

  return (
    <FieldArray name={fieldName}>
      {({ remove, push }) => (
        <div className="mt-2 space-y-5">
          {moduleObj.moduleItems.map((modItem, moduleItemIndex) => {
            const pdfFile = (
              (values as any).units
                ? (values as any).units[Number(unitId)]
                : values
            ).modules[Number(moduleId)]?.moduleItems[moduleItemIndex]
              .pdfFile as File;
            return (
              <div key={moduleItemIndex}>
                <div className="flex items-baseline gap-2 sm:gap-4 max-[500px]:flex-col">
                  <SelectInput
                    name={`${fieldName}.${moduleItemIndex}.type`}
                    options={moduleItemTypeOptions}
                    error={
                      fieldError(
                        `${fieldName}.${moduleItemIndex}.type` as any
                      ) as string | null
                    }
                    placeholder="Select a module type"
                    className="w-full"
                  />
                  <div>
                    <Button
                      disabled={!!pdfFile}
                      onClick={handleClick}
                      variant="outline"
                    >
                      <PlusIcon />
                      Add file
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      name={`${fieldName}.${moduleItemIndex}.pdfFile`}
                      accept=".pdf"
                      disabled={false}
                      onChange={(e) => handleInputChange(e, moduleItemIndex)}
                      className="hidden"
                    />
                  </div>
                </div>
                {pdfFile ? (
                  <div className="flex items-center gap-5 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0">
                        <PdfIcon />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{pdfFile.name}</h3>
                        <p className="text-xs text-grey-600 mt-0.5">
                          {(pdfFile.size / 1048576).toFixed(2)} mb
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        setFieldValue(
                          `${fieldName}.${moduleItemIndex}.pdfFile`,
                          null,
                          true
                        )
                      }
                      className="min-w-fit"
                      variant="ghost"
                    >
                      <XIcon />
                    </Button>
                  </div>
                ) : null}
                <div className="pl-5 mt-4">
                  <PageFormField<T>
                    moduleItem={modItem}
                    fieldName={`${fieldName}.${moduleItemIndex}.pages`}
                  />
                </div>
                <div className="flex items-center gap-3 justify-end mt-3">
                  <Button
                    onClick={() => push(emptyModuleItem)}
                    className="border-primary-260 text-primary-260"
                    variant="outline"
                    size="sm"
                  >
                    <PlusIcon />
                    <p>New sub-module</p>
                  </Button>
                  {moduleObj.moduleItems.length > 1 && (
                    <Button
                      onClick={() => remove(moduleItemIndex)}
                      variant="destructive"
                      size="sm"
                      className="min-w-fit"
                    >
                      <Trash2Icon />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </FieldArray>
  );
};
