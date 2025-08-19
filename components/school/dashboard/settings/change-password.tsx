import { changePasswordKey } from "@/api/keys";
import { changePassword } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { trimObj } from "@/utils/key";
import {
  ChangePasswordFormValue,
  changePassowordValidation,
} from "@/utils/validation/school";
import { Form, Formik } from "formik";
import { Eye, EyeClosed } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type ChangePasswordSettingsProps = {};

export const ChangePasswordSettings = ({}: ChangePasswordSettingsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { trigger, isMutating } = useSWRMutation(
    changePasswordKey,
    changePassword
  );

  const initialData = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  async function onSubmit(
    values: ChangePasswordFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    if (values.newPassword !== values.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (values) {
      const payload = {
        newPassword: values.newPassword,
        currentPassword: values.oldPassword,
      };
      await trigger(trimObj(payload));
      toast.success("Password changed successfully");
      resetForm();
    }
  }

  const inputType = useMemo(
    () => (showPassword ? "text" : "password"),
    [showPassword]
  );

  const PasswordIcon = () => (
    <div
      className="cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <Eye className="size-5" />
      ) : (
        <EyeClosed className="size-5" />
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="pb-1 border-b border-grey-400">
        <h2 className="text-lg font-semibold text-grey-800/80">
          Change password
        </h2>
      </div>
      <div className="w-full">
        <Formik
          validationSchema={changePassowordValidation}
          initialValues={initialData}
          validateOnMount
          onSubmit={onSubmit}
        >
          {({ touched, errors, isValid }) => {
            const fieldError = (fieldName: keyof ChangePasswordFormValue) =>
              touched[fieldName] && errors[fieldName]
                ? errors[fieldName]
                : null;

            return (
              <Form className="py-4 grid sm:grid-cols-3 lg:grid-cols-4 max-sm:gap-5 text-grey-500">
                <div className="max-lg:hidden"></div>
                <div className="space-y-2.5 w-full max-sm:space-y-5 sm:col-span-2">
                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Current password
                    </h2>
                    <FormInput
                      placeholder="Enter your current password"
                      className="sm:max-w-[60%] w-full"
                      name="oldPassword"
                      error={fieldError("oldPassword")}
                      type={inputType}
                      rightIcon={<PasswordIcon />}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      New password
                    </h2>
                    <FormInput
                      placeholder="Enter your new password"
                      className="sm:max-w-[60%] w-full"
                      name="newPassword"
                      error={fieldError("newPassword")}
                      type={inputType}
                      rightIcon={<PasswordIcon />}
                    />
                  </div>

                  <div className="flex max-sm:flex-col justify-between w-full sm:items-center gap-4">
                    <h2 className="font-semibold sm:whitespace-nowrap">
                      Confirm password
                    </h2>
                    <FormInput
                      placeholder="Confirm your new password"
                      className="sm:max-w-[60%] w-full"
                      name="confirmPassword"
                      error={fieldError("confirmPassword")}
                      type={inputType}
                      rightIcon={<PasswordIcon />}
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
                    Update
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
