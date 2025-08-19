import { getSchoolInfo, updateSchoolInfoKey } from "@/api/keys";
import { updateSchoolInfo } from "@/api/mutations";
import { generalFetcher } from "@/api/queries";
import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import {
  RetrieveSchoolInfoResponse,
  UpdateSchoolInfoPayload,
} from "@/types/school/auth";
import { trimObj } from "@/utils/key";
import {
  SchoolInfoFormValue,
  schoolInfoValidation,
} from "@/utils/validation/school";
import { Form, Formik } from "formik";
import { Loader2Icon } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const SchoolInformationSettings = () => {
  const { data, isLoading, mutate } = useSWR<RetrieveSchoolInfoResponse>(
    getSchoolInfo,
    generalFetcher
  );
  const { trigger, isMutating } = useSWRMutation(
    updateSchoolInfoKey,
    updateSchoolInfo
  );

  const initialData = useMemo(() => {
    const initData = {
      address: data?.streetAddress ?? "",
      state: data?.state ?? "",
      institutionName: data?.institutionName ?? "",
      contactEmail: data?.contactEmail ?? "",
      city: data?.city ?? "",
      contactPhone: {
        dialCode: data?.contactPhoneCountryCode ?? "",
        digits: data?.contactPhoneNumber ?? "",
      },
    };
    return initData;
  }, [data]);

  async function handleSubmit(
    data: SchoolInfoFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    try {
      const payload: UpdateSchoolInfoPayload = {
        institutionName: data.institutionName,
        contactEmail: data.contactEmail,
        contactPhoneNumber: data.contactPhone.digits,
        contactPhoneCountryCode: data.contactPhone.dialCode,
        state: data.state,
        city: data.city,
        streetAddress: data.address,
      };

      const values: Partial<UpdateSchoolInfoPayload> = {};

      Object.entries(payload).forEach(([key, value]) => {
        if (value && value !== "") {
          values[key as keyof UpdateSchoolInfoPayload] = value;
        }
      });

      await trigger(trimObj(values));

      toast.success("School information updated successfully");

      mutate();
      resetForm();
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <div className="space-y-4">
      <div className="pb-1 border-b border-grey-400">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-grey-800/80">
            School information
          </h2>
          {isLoading ? (
            <Loader2Icon className="animate-spin text-primary" size={20} />
          ) : null}
        </div>
      </div>
      <div className="w-full">
        <Formik
          validationSchema={schoolInfoValidation}
          initialValues={initialData}
          validateOnMount
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ touched, errors, setFieldValue, isValid, values }) => {
            const fieldError = (fieldNames: string[]) => {
              const errorMessages = fieldNames
                .map((field) => {
                  if (
                    touched[field as keyof SchoolInfoFormValue] &&
                    errors[field as keyof SchoolInfoFormValue]
                  ) {
                    return errors[field as keyof SchoolInfoFormValue];
                  } else {
                    return null;
                  }
                })
                .filter((i) => i !== null);
              return errorMessages.join(", ");
            };

            return (
              <Form className="py-4 grid sm:grid-cols-3 lg:grid-cols-4 max-sm:gap-5 text-grey-500">
                <div className="max-lg:hidden"></div>
                <div className="space-y-2.5 w-full max-sm:space-y-5 sm:col-span-2">
                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Institution name
                    </h2>
                    <FormInput
                      placeholder="Enter your name"
                      className="sm:max-w-[60%] w-full"
                      name="institutionName"
                      error={fieldError(["institutionName"])}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Contact email address
                    </h2>
                    <FormInput
                      placeholder="Enter your email"
                      className="sm:max-w-[60%] w-full"
                      name="contactEmail"
                      error={fieldError(["contactEmail"])}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Contact phone number
                    </h2>
                    <PhoneInput
                      name="contactPhone"
                      setFieldValue={setFieldValue}
                      error={fieldError([
                        "contactPhone.digits",
                        "contactPhone.dialCode",
                      ])}
                      className="sm:max-w-[60%] w-full"
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      State
                    </h2>
                    <FormInput
                      placeholder="Enter state"
                      className="sm:max-w-[60%] w-full"
                      name="state"
                      error={fieldError(["state"])}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">City</h2>
                    <FormInput
                      placeholder="Enter city"
                      className="sm:max-w-[60%] w-full"
                      name="city"
                      error={fieldError(["city"])}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Address
                    </h2>
                    <FormInput
                      placeholder="Enter school address"
                      className="sm:max-w-[60%] w-full"
                      name="address"
                      error={fieldError(["address"])}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:justify-end sm:items-end w-full">
                  <Button
                    type="submit"
                    loading={isMutating}
                    className="max-sm:w-full"
                    disabled={!isValid}
                  >
                    Edit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
