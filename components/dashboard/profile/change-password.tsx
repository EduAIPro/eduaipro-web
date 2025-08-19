import { changePasswordKey } from "@/api/keys";
import { changePassword } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { trimObj } from "@/utils/key";
import {
  ChangePasswordFormValue,
  changePasswordValidation,
} from "@/utils/validation/teacher-profile/settings";
import { Form, Formik } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    changePasswordKey,
    changePassword
  );

  async function onSubmit(
    values: ChangePasswordFormValue,
    { resetForm }: { resetForm: VoidFunction }
  ) {
    if (values.password !== values.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (values) {
      const payload = {
        newPassword: values.password,
        currentPassword: values.oldPassword,
      };
      await trigger(trimObj(payload));
      toast.success("Password changed successfully");
      resetForm();
    }
  }

  const PasswordIcon = () => (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
    </Button>
  );
  return (
    <div>
      <div>
        <h3 className="font-semibold md:text-lg">Change password</h3>
      </div>
      <Formik
        initialValues={{
          password: "",
          oldPassword: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordValidation}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ touched, errors, isValid }) => (
          <Form className="space-y-4 mt-4">
            <FormInput
              label="Former password"
              name="oldPassword"
              placeholder="Enter your former password"
              error={
                touched.oldPassword && errors.oldPassword
                  ? errors.oldPassword
                  : null
              }
              type={showPassword ? "text" : "password"}
              rightIcon={<PasswordIcon />}
            />
            <FormInput
              label="New password"
              name="password"
              placeholder="Enter your new password"
              error={
                touched.password && errors.password ? errors.password : null
              }
              type={showPassword ? "text" : "password"}
              rightIcon={<PasswordIcon />}
            />
            <FormInput
              name="confirmPassword"
              label="Confirm password"
              placeholder="Enter your password again"
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : null
              }
              type={showPassword ? "text" : "password"}
              rightIcon={<PasswordIcon />}
            />
            <div className="mt-4 w-full flex items-center justify-end">
              <Button type="submit" loading={isMutating} disabled={!isValid}>
                <p>Change</p>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
