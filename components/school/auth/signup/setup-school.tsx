import { getSupportedCountries, signupSchoolKey } from "@/api/keys";
import { schoolSignup } from "@/api/mutations";
import { generalFetcher } from "@/api/queries";
import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/constants/config";
import { CountriesList } from "@/types/school";
import { SchoolSignupPayload } from "@/types/school/auth";
import { storeAccessToken } from "@/utils/auth/helpers";
import { trimObj } from "@/utils/key";
import {
  CreateAccountFormValue,
  SetupAccountFormValue,
  setupAccountValidation,
} from "@/utils/validation/auth/school";
import { Form, Formik } from "formik";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useMemo } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

type SetupSchoolProfileProps = {
  accountValues: CreateAccountFormValue;
  setStep: Dispatch<SetStateAction<number>>;
};

export const SetupSchoolProfile = ({
  accountValues,
  setStep,
}: SetupSchoolProfileProps) => {
  const router = useRouter();

  // mutation
  const { trigger, isMutating } = useSWRMutation(signupSchoolKey, schoolSignup);
  const { data } = useSWR<CountriesList>(getSupportedCountries, generalFetcher);

  async function onSubmit(data: SetupAccountFormValue) {
    try {
      const [firstName, ...lastName] = accountValues.name.split(" ");
      if (!firstName || !lastName) {
        toast.error("First and last names are both required");
        return;
      }
      const personalInfo = {
        firstName,
        lastName: lastName.join(" "),
        phoneNumber: accountValues.phone.digits,
        phoneCountryCode: accountValues.phone.dialCode.slice(1),
        position: accountValues.position,
        password: accountValues.password,
        email: accountValues.email,
      };

      const school = {
        institutionName: data.institutionName,
        city: data.city,
        state: data.state,
        streetAddress: data.address,
        contactEmail: data.contactEmail,
        contactPhoneNumber: data.contactPhone.digits,
        contactPhoneCountryCode: data.contactPhone.dialCode.slice(1),
        countryId: data.country,
      };

      const payload: SchoolSignupPayload = {
        personal: personalInfo,
        school,
      };

      const res = await trigger(trimObj(payload));
      const { tokens, user } = res.data;

      if (tokens.access) {
        storeAccessToken(tokens.access);
        sessionStorage.setItem(CONFIG.USER_IDENTIFIER, user.id);
      }

      router.push(
        `/verify-email?email=${encodeURIComponent(
          accountValues.email
        )}&role=OWNER`
      );
      // router.push("/school");
      // router.push("/register/success");
    } catch (error: any) {
      toast.error(error);
    }
  }

  const countries = useMemo(() => {
    if (data) {
      return data.data.map((c) => ({ label: c.name, value: c.id }));
    } else {
      return [];
    }
  }, [data]);

  const initialValues = {
    institutionName: "",
    state: "",
    city: "",
    country: "",
    address: "",
    contactEmail: "",
    contactPhone: {
      dialCode: "",
      digits: "",
    },
  };

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
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={setupAccountValidation}
      >
        {({ touched, errors, setFieldValue, isValid }) => {
          const fieldError = (fieldNames: string[]) => {
            const errorMessages = fieldNames
              .map((field) => {
                if (
                  touched[field as keyof SetupAccountFormValue] &&
                  errors[field as keyof SetupAccountFormValue]
                ) {
                  return errors[field as keyof SetupAccountFormValue];
                } else {
                  return null;
                }
              })
              .filter((i) => i !== null);
            return errorMessages.join(", ");
          };

          return (
            <Form className="space-y-5">
              <FormInput
                label="Institution name"
                placeholder="Enter institution name"
                name="institutionName"
                error={fieldError(["institutionName"])}
              />

              <div className="flex items-center gap-2">
                <FormInput
                  label="State"
                  placeholder="Enter your state"
                  name="state"
                  className="w-full"
                  error={fieldError(["state"])}
                />

                <FormInput
                  label="City"
                  placeholder="Enter your city"
                  name="city"
                  className="w-full"
                  error={fieldError(["city"])}
                />
              </div>
              <FormInput
                label="Address"
                placeholder="Enter your institution address"
                className="w-full"
                name="address"
                error={fieldError(["address"])}
              />

              <SelectInput
                name="country"
                label="Country"
                options={countries}
                error={fieldError(["country"])}
              />
              <FormInput
                label="Contact email"
                placeholder="Enter an email address we can reach the institution with"
                name="contactEmail"
                error={fieldError(["contactEmail"])}
              />

              <PhoneInput
                label="Contact phone"
                name="contactPhone.digits"
                dialCodeName="contactPhone.dialCode"
                setFieldValue={setFieldValue}
                error={fieldError([
                  "contactPhone.digits",
                  "contactPhone.dialCode",
                ])}
              />
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeftIcon />
                  <h3>Back</h3>
                </Button>
                <Button
                  disabled={!isValid}
                  loading={isMutating}
                  className="col-span-2"
                  type="submit"
                >
                  <h3>Continue</h3>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
