import { SelectInput } from "@/components/common/ui/FormInput";
import PdfIcon from "@/components/svgs/pdf.svg";
import { Button } from "@/components/ui/button";
import { ModuleFormValue } from "@/utils/validation/admin";
import { FieldArray, useFormikContext } from "formik";
import { PlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { useRef } from "react";
import { emptyModuleItem, moduleItemTypeOptions } from "../constants";
import { PageFormField } from "./pages";
import { Modal } from "@/components/ui/modal";

type ModuleItemFormFieldProps = {
  fieldName: string;
  moduleObj: ModuleFormValue;
  isEdit?: boolean;
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
  isEdit = false,
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
    moduleItemIndex: number,
  ) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file, moduleItemIndex);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const { unitId, moduleId } = extractIds(fieldName);
  const field = isEdit ? fieldName.slice(8) : fieldName;
  return (
    <FieldArray name={field}>
      {({ remove, push }) => (
        <div className="mt-2 space-y-5">
          {moduleObj.moduleItems.map((modItem, moduleItemIndex) => {
            const pdfFile = (
              (values as any).units
                ? (values as any).units[Number(unitId)]
                : values
            ).modules[Number(moduleId)]?.moduleItems[moduleItemIndex]
              ?.pdfFile as File;
            return (
              <div key={moduleItemIndex}>
                <div className="flex items-baseline gap-2 sm:gap-4 max-[500px]:flex-col">
                  <SelectInput
                    name={`${field}.${moduleItemIndex}.type`}
                    options={moduleItemTypeOptions}
                    error={
                      fieldError(`${field}.${moduleItemIndex}.type` as any) as
                        | string
                        | null
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
                      name={`${field}.${moduleItemIndex}.pdfFile`}
                      accept=".pdf"
                      disabled={false}
                      onChange={(e) => handleInputChange(e, moduleItemIndex)}
                      className="hidden"
                    />
                  </div>
                </div>
                {pdfFile ? (
                  <div className="flex items-center gap-5 mt-3 border border-gray-200 rounded-lg p-2 w-fit">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">
                        <PdfIcon />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">
                          {pdfFile.name ?? "PDF File"}
                        </h3>
                        {pdfFile.size ? (
                          <p className="text-xs text-grey-600 mt-0.5">
                            {(pdfFile.size / 1048576).toFixed(2)} mb
                          </p>
                        ) : (
                          <Modal
                            title="View PDF"
                            trigger={
                              <button className="text-xs font-medium text-primary underline">
                                View PDF
                              </button>
                            }
                            containerClassName="max-w-7xl h-[85vh]"
                            className="w-full p-0"
                          >
                            <iframe
                              src={pdfFile as unknown as string}
                              className="w-full h-full border-0"
                            />
                          </Modal>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        const computedFieldName = isEdit
                          ? `${fieldName.slice(8)}.${moduleItemIndex}.pdfFile`
                          : `${fieldName}.${moduleItemIndex}.pdfFile`;
                        setFieldValue(computedFieldName, null, true);
                      }}
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
                    fieldName={`${field}.${moduleItemIndex}.pages`}
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
