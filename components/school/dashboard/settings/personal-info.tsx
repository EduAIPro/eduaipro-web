import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import useSchoolStore from "@/store/school";
import {
  PersonalInfoFormValue,
  personalInfoValidation,
} from "@/utils/validation/school";
import { Form, Formik } from "formik";

type PersonalInfoSettingsProps = {};

export const PersonalInfoSettings = ({}: PersonalInfoSettingsProps) => {
  const { school } = useSchoolStore();

  const initialData = {
    name: school?.adminName ?? "",
    email: school?.officialEmail ?? "",
    position: school?.position ?? "",
    phone: school?.contactNumber ?? "",
  };
  return (
    <div className="space-y-4">
      <div className="pb-1 border-b border-grey-400">
        <h2 className="text-lg font-semibold text-grey-800/80">
          Personal information
        </h2>
      </div>
      <div className="w-full">
        <Formik
          validationSchema={personalInfoValidation}
          initialValues={initialData}
          validateOnMount
          onSubmit={(values: PersonalInfoFormValue) => {}}
        >
          {({ touched, errors, setFieldValue, isValid }) => {
            const fieldError = (fieldName: keyof PersonalInfoFormValue) =>
              touched[fieldName] && errors[fieldName]
                ? errors[fieldName]
                : null;

            return (
              <Form className="py-4 grid sm:grid-cols-3 lg:grid-cols-4 max-sm:gap-5 text-grey-500">
                <div className="max-lg:hidden"></div>
                <div className="space-y-2.5 w-full max-sm:space-y-5 sm:col-span-2">
                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Full name
                    </h2>
                    <FormInput
                      placeholder="Enter your name"
                      className="sm:max-w-[60%] w-full"
                      name="name"
                      error={fieldError("name")}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Email address
                    </h2>
                    <FormInput
                      placeholder="Enter your email"
                      className="sm:max-w-[60%] w-full"
                      name="email"
                      error={fieldError("email")}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Phone number
                    </h2>
                    <PhoneInput
                      name="phone"
                      setFieldValue={setFieldValue}
                      error={fieldError("phone")}
                      className="sm:max-w-[60%] w-full"
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Position
                    </h2>
                    <FormInput
                      placeholder="Enter your position"
                      className="sm:max-w-[60%] w-full"
                      name="position"
                      error={fieldError("position")}
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
