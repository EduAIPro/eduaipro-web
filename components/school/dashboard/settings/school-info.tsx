import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import useSchoolStore from "@/store/school";
import {
  SchoolInfoFormValue,
  schoolInfoValidation,
} from "@/utils/validation/school";
import { Form, Formik } from "formik";

type SchoolInformationSettingsProps = {};

export const SchoolInformationSettings =
  ({}: SchoolInformationSettingsProps) => {
    const { school } = useSchoolStore();

    const initialData = {
      address: school?.location ?? "",
      state: school?.state ?? "",
      institutionName: school?.name ?? "",
      contactEmail: school?.contactEmail ?? "",
      city: school?.city ?? "",
      contactPhone: school?.contactNumber ?? "",
    };
    return (
      <div className="space-y-4">
        <div className="pb-1 border-b border-grey-400">
          <h2 className="text-lg font-semibold text-grey-800/80">
            School information
          </h2>
        </div>
        <div className="w-full">
          <Formik
            validationSchema={schoolInfoValidation}
            initialValues={initialData}
            validateOnMount
            onSubmit={(values: SchoolInfoFormValue) => {}}
          >
            {({ touched, errors, setFieldValue, isValid, values }) => {
              const fieldError = (fieldName: keyof SchoolInfoFormValue) =>
                touched[fieldName] && errors[fieldName]
                  ? errors[fieldName]
                  : null;

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
                        error={fieldError("institutionName")}
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
                        error={fieldError("contactEmail")}
                      />
                    </div>

                    <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                      <h2 className="font-semibold sm:whitespace-nowrap">
                        Contact phone number
                      </h2>
                      <PhoneInput
                        name="contactPhone"
                        setFieldValue={setFieldValue}
                        error={fieldError("contactPhone")}
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
                        error={fieldError("state")}
                      />
                    </div>

                    <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                      <h2 className="font-semibold sm:whitespace-nowrap">
                        City
                      </h2>
                      <FormInput
                        placeholder="Enter city"
                        className="sm:max-w-[60%] w-full"
                        name="city"
                        error={fieldError("city")}
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
                        error={fieldError("address")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:justify-end sm:items-end w-full">
                    <Button className="max-sm:w-full" disabled={!isValid}>
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
