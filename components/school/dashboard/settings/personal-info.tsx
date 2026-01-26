import { updatePersonalInfoKey } from "@/api/keys";
import { updatePersonalInfo } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import { UpdatePersonalInfoPayload } from "@/types/school/auth";
import { User } from "@/types/user";
import { trimObj } from "@/utils/key";
import {
  PersonalInfoFormValue,
  personalInfoValidation,
} from "@/utils/validation/school";
import { Form, Formik } from "formik";
import { useMemo } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type PersonalInfoSettingsProps = {
  user: (Partial<User> & { positionDescription: string }) | null;
  refetch: VoidFunction;
};

type PersonalSettingsPayload = Omit<
  UpdatePersonalInfoPayload,
  "userHasSeenOnboarding" | "userHasIntroPlayed"
>;

export const PersonalInfoSettings = ({
  user,
  refetch,
}: PersonalInfoSettingsProps) => {
  const { trigger, isMutating } = useSWRMutation(
    updatePersonalInfoKey,
    updatePersonalInfo,
  );

  const initialData = useMemo(() => {
    const userName = user
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`
      : "";
    const data = {
      name: userName,
      position: user?.positionDescription ?? "",
      phone: {
        dialCode: user?.phoneCountryCode ?? "",
        digits: user?.phoneNumber ?? "",
      },
    };
    return data;
  }, [user]);

  async function handleSubmit(
    data: PersonalInfoFormValue,
    { resetForm }: { resetForm: VoidFunction },
  ) {
    const [firstName, ...lastName] = data.name.trim().split(" ");
    if (!firstName.length || !lastName.length) {
      toast.error("First and last names are both required");
      return;
    }
    try {
      const payload: PersonalSettingsPayload = {
        userFirstName: firstName,
        userLastName: lastName.join(" "),
        phoneCountryCode: data.phone.dialCode,
        phoneNumber: data.phone.digits,
        positionDescription: data.position,
      };

      const values: Partial<PersonalSettingsPayload> = {};

      Object.entries(payload).forEach(([key, value]) => {
        if (value && value !== "") {
          values[key as keyof PersonalSettingsPayload] = value;
        }
      });

      await trigger(trimObj(values));

      toast.success("Profile updated successfully");

      refetch();
      resetForm();
    } catch (error) {
      toast.error(error as string);
    }
  }
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
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ touched, errors, setFieldValue, isValid }) => {
            const fieldError = (fieldNames: string[]) => {
              const errorMessages = fieldNames
                .map((field) => {
                  if (
                    touched[field as keyof PersonalInfoFormValue] &&
                    errors[field as keyof PersonalInfoFormValue]
                  ) {
                    return errors[field as keyof PersonalInfoFormValue];
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
                      Full name
                    </h2>
                    <FormInput
                      placeholder="Enter your name"
                      className="sm:max-w-[60%] w-full"
                      name="name"
                      error={fieldError(["name"])}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Email address
                    </h2>
                    <div className="py-2 rounded-lg sm:max-w-[60%] w-full border bg-muted/50 px-3">
                      <p>{user?.email ?? "hello world"}</p>
                    </div>
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Phone number
                    </h2>
                    <PhoneInput
                      name="phone.digits"
                      dialCodeName="phone.dialCode"
                      setFieldValue={setFieldValue}
                      error={fieldError(["phone.digits", "phone.dialCode"])}
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
                      error={fieldError(["position"])}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:justify-end sm:items-end w-full">
                  <Button
                    loading={isMutating}
                    type="submit"
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
