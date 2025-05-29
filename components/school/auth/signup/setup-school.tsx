import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import {
  SetupAccountFormValue,
  setupAccountValidation,
} from "@/utils/validation/auth/signup";
import { Form, Formik } from "formik";
import { Location, ProfileCircle, Sms } from "iconsax-react";

type SetupSchoolProfileProps = {};

export const SetupSchoolProfile = ({}: SetupSchoolProfileProps) => {
  const initialValues = {
    institutionName: "",
    state: "",
    city: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
  };

  function handleSubmit(values: SetupAccountFormValue) {}

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Set up your school</h2>
        <p className="text-base text-grey-10">
          Kindly fill your Institution Information to get started.
        </p>
      </div>
      <Formik
        validateOnMount
        validateOnBlur
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={setupAccountValidation}
      >
        {({ touched, errors, setFieldValue, isValid }) => {
          const fieldError = (fieldName: keyof SetupAccountFormValue) =>
            touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

          return (
            <Form className="space-y-5">
              <FormInput
                label="Full name"
                placeholder="Enter your name"
                name="institutionName"
                error={fieldError("institutionName")}
                leftIcon={<ProfileCircle />}
              />

              <div className="flex items-center gap-2">
                <FormInput
                  label="State"
                  placeholder="Enter your state"
                  name="state"
                  className="w-full"
                  error={fieldError("state")}
                />

                <FormInput
                  label="City"
                  placeholder="Enter your city"
                  name="city"
                  className="w-full"
                  error={fieldError("city")}
                />
              </div>
              <FormInput
                label="Address"
                placeholder="Enter your institution address"
                className="w-full"
                name="address"
                error={fieldError("address")}
                leftIcon={<Location />}
              />
              <FormInput
                label="Contact email"
                placeholder="Enter an email address we can reach the institution with"
                name="contactEmail"
                error={fieldError("contactEmail")}
                leftIcon={<Sms />}
              />

              <PhoneInput
                label="Phone number"
                name="contactPhone"
                setFieldValue={setFieldValue}
                error={fieldError("contactPhone")}
              />

              <Button disabled={!isValid} className="w-full" type="submit">
                <h3>Continue</h3>
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
