import { useMutationApi } from "@/api/hooks/useMutationApi";
import { schoolSignup } from "@/api/mutations";
import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import useSchoolStore from "@/store/school";
import { SchoolSignupPayload } from "@/types/auth";
import {
  CreateAccountFormValue,
  SetupAccountFormValue,
  setupAccountValidation,
} from "@/utils/validation/auth/signup";
import { Form, Formik } from "formik";
import { Location, ProfileCircle, Sms } from "iconsax-react";
import { useRouter } from "next/navigation";

type SetupSchoolProfileProps = {
  accountValues: CreateAccountFormValue;
};

export const SetupSchoolProfile = ({
  accountValues,
}: SetupSchoolProfileProps) => {
  const { setSchool } = useSchoolStore();
  const router = useRouter();

  // mutation
  const createAccount = useMutationApi(
    "CREATE_ACCOUNT_MUTATION_KEY",
    schoolSignup,
    {
      onSuccess(values) {
        if (values.data?.school) {
          setSchool(values.data?.school);
          router.push("/register/success");
        }
      },
    }
  );

  const initialValues = {
    institutionName: "",
    state: "",
    city: "",
    address: "",
    type: "",
    contactEmail: "",
    contactPhone: "",
  };

  async function handleSubmit(values: SetupAccountFormValue) {
    const payload: SchoolSignupPayload = {
      name: values.institutionName,
      city: values.city,
      state: values.state,
      adminName: accountValues.name,
      type: values.type,
      password: accountValues.password,
      location: values.address,
      contactNumber: values.contactPhone,
      contactEmail: values.contactEmail,
      officialEmail: accountValues.email,
      phoneNumber: accountValues.phone,
      position: accountValues.position,
    };
    createAccount.mutate(payload);
  }

  const schoolOptions = [
    {
      label: "Primary School",
      value: "Primary School",
    },
    {
      label: "Secondary School",
      value: "Secondary School",
    },
    {
      label: "Primary and Secondary School",
      value: "Primary and Secondary School",
    },
    {
      label: "University",
      value: "University",
    },
  ];

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
                label="Institution name"
                placeholder="Enter institution name"
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
              <SelectInput
                name="type"
                label="Administrator Role"
                options={schoolOptions}
                error={fieldError("type")}
                leftIcon={<ProfileCircle size={18} />}
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

              <Button
                disabled={!isValid}
                loading={createAccount.isLoading}
                className="w-full"
                type="submit"
              >
                <h3>Continue</h3>
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
