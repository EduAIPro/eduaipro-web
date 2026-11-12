import { getSupportedCountries, signupSchoolKey } from "@/api/keys";
import { schoolSignup } from "@/api/mutations";
import { generalFetcher } from "@/api/queries";
import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import Typography from "@/components/common/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useFormikContext } from "formik";
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
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
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
      return data.data.map((c) => ({
        label: c.name,
        value: c.id,
        isoCode: c.isoCode,
      }));
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

              <LocationFields countries={countries} fieldError={fieldError} />
              <FormInput
                label="Address"
                placeholder="Enter your institution address"
                className="w-full"
                name="address"
                error={fieldError(["address"])}
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

type CountryOption = { label: string; value: string; isoCode: string };

type LocationFieldsProps = {
  countries: CountryOption[];
  fieldError: (fieldNames: string[]) => string;
};

const selectLabelClassName = "block font-medium text-base mb-1 text-grey-650";
const selectTriggerClassName =
  "h-auto shadow-lg !shadow-grey-2 py-2 px-2 w-full border rounded-lg text-base text-grey-12";

const SelectError = ({ error }: { error: string }) => (
  <div className="mt-2">
    <Typography.P size="small" fontColor="error">
      {error}
    </Typography.P>
  </div>
);

// Country and State as keyboard-accessible Radix selects. State options come
// from the selected country's ISO code, loaded on demand so the state data is
// not in the page's initial JS; a country with no known states (or a failed
// load) falls back to free text. Stored values: country = supported-country
// id, state = state name.
const LocationFields = ({ countries, fieldError }: LocationFieldsProps) => {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<SetupAccountFormValue>();

  const isoCode = countries.find((c) => c.value === values.country)?.isoCode;
  const [loadedStates, setLoadedStates] = useState<{
    isoCode: string;
    names: string[];
  } | null>(null);

  useEffect(() => {
    if (!isoCode) return;
    let cancelled = false;
    import("country-state-city/lib/state")
      .then((m) => m.getStatesOfCountry(isoCode).map((s) => s.name))
      .catch(() => [] as string[])
      .then((names) => {
        if (!cancelled) setLoadedStates({ isoCode, names });
      });
    return () => {
      cancelled = true;
    };
  }, [isoCode]);

  const statesLoading = !!isoCode && loadedStates?.isoCode !== isoCode;
  const states = !statesLoading && loadedStates ? loadedStates.names : [];

  const countryError = fieldError(["country"]);
  const stateError = fieldError(["state"]);

  return (
    <>
      <div>
        <label htmlFor="country" className={selectLabelClassName}>
          Country
        </label>
        <Select
          value={values.country}
          onValueChange={(value) => {
            setFieldValue("country", value);
            setFieldValue("state", "");
            setFieldValue("city", "");
          }}
          onOpenChange={(open) => {
            if (!open) setFieldTouched("country");
          }}
        >
          <SelectTrigger
            id="country"
            className={cn(
              selectTriggerClassName,
              countryError ? "border-red-400" : "border-grey-4/50",
            )}
          >
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem
                key={country.value}
                value={country.value}
                textValue={country.label}
              >
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {countryError ? <SelectError error={countryError} /> : null}
      </div>

      <div className="flex items-start gap-2">
        {values.country && !statesLoading && states.length === 0 ? (
          <FormInput
            label="State"
            placeholder="Enter your state"
            name="state"
            className="w-full"
            error={stateError}
          />
        ) : (
          <div className="w-full">
            <label htmlFor="state" className={selectLabelClassName}>
              State
            </label>
            <Select
              value={values.state}
              disabled={!values.country || statesLoading}
              onValueChange={(value) => setFieldValue("state", value)}
              onOpenChange={(open) => {
                if (!open) setFieldTouched("state");
              }}
            >
              <SelectTrigger
                id="state"
                className={cn(
                  selectTriggerClassName,
                  stateError ? "border-red-400" : "border-grey-4/50",
                )}
              >
                <SelectValue
                  placeholder={
                    !values.country
                      ? "Select a country first"
                      : statesLoading
                        ? "Loading states…"
                        : "Select a state"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state} textValue={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {stateError ? <SelectError error={stateError} /> : null}
          </div>
        )}

        <FormInput
          label="City"
          placeholder="Enter your city"
          name="city"
          className="w-full"
          error={fieldError(["city"])}
        />
      </div>
    </>
  );
};
