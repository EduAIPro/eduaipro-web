import { getSchoolsKey, updateSchoolKey } from "@/api/keys";
import { editSchoolInfo } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { trimObj } from "@/utils/key";
import {
  EditSchoolInfoFormValue,
  editSchoolInfoValidation,
} from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

type EditSchoolInfoProps = {
  initialData: EditSchoolInfoFormValue;
  toggleOpen: (v: boolean) => void;
  isOpen: boolean;
  schoolId?: string;
};

export const EditSchoolInfo = ({
  initialData,
  isOpen,
  toggleOpen,
  schoolId,
}: EditSchoolInfoProps) => {
  const { trigger, isMutating } = useSWRMutation(
    schoolId ? updateSchoolKey(schoolId) : null,
    editSchoolInfo
  );

  async function onSubmit(
    values: EditSchoolInfoFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    try {
      const payload = {
        ...values,
        contactPhoneNumber: values.contactPhone.digits,
        contactPhoneCountryCode: values.contactPhone.dialCode,
      };
      await trigger(trimObj(payload));

      toast.success("School information updated successfully");

      mutate(`${getSchoolsKey}/${schoolId}`);
      resetForm();
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
      <SheetContent className="max-sm:w-full">
        <SheetHeader className="">
          <h2 className="font-semibold text-lg text-left">
            Edit School Information
          </h2>
        </SheetHeader>
        <Formik
          enableReinitialize
          initialValues={initialData}
          validationSchema={editSchoolInfoValidation}
          onSubmit={onSubmit}
        >
          {({ touched, errors, setFieldValue, isValid }) => {
            const fieldError = (fieldNames: string[]) => {
              const errorMessages = fieldNames
                .map((field) => {
                  if (
                    touched[field as keyof EditSchoolInfoFormValue] &&
                    errors[field as keyof EditSchoolInfoFormValue]
                  ) {
                    return errors[field as keyof EditSchoolInfoFormValue];
                  } else {
                    return null;
                  }
                })
                .filter((i) => i !== null);
              return errorMessages.join(", ");
            };

            return (
              <Form className="h-full mt-6 pb-12 gap-12 justify-between flex flex-col">
                <div className="space-y-5">
                  <FormInput
                    placeholder="Enter institution name"
                    name="institutionName"
                    label="Institution Name"
                    error={fieldError(["institutionName"])}
                  />
                  <FormInput
                    placeholder="Enter new email"
                    name="contactEmail"
                    label="Contact email address"
                    error={fieldError(["contactEmail"])}
                  />
                  <PhoneInput
                    name="contactPhone"
                    setFieldValue={setFieldValue}
                    label="Contact phone number"
                    error={fieldError([
                      "contactPhone.digits",
                      "contactPhone.dialCode",
                    ])}
                  />
                  <FormInput
                    placeholder="Enter state"
                    name="state"
                    label="State"
                    error={fieldError(["state"])}
                  />
                  <FormInput
                    placeholder="Enter city"
                    name="city"
                    label="City"
                    error={fieldError(["city"])}
                  />
                  <FormInput
                    placeholder="Enter school address"
                    name="streetAddress"
                    label="Street address"
                    error={fieldError(["address"])}
                  />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    onClick={() => toggleOpen(false)}
                    type="button"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!isValid}
                    loading={isMutating}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </SheetContent>
    </Sheet>
  );
};
