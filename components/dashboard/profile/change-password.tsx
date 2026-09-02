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
import { EyeClosedIcon, EyeIcon, LockKeyholeIcon } from "lucide-react";
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
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#16A34A] bg-[#F0FDF4]">
          <LockKeyholeIcon size={16} />
        </div>
        <h3 className="font-bold text-grey-800 md:text-lg">
          Change password
        </h3>
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
              leftIcon={<LockKeyholeIcon size={16} className="text-[#1A56DB]" />}
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
              leftIcon={<LockKeyholeIcon size={16} className="text-[#1A56DB]" />}
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
              leftIcon={<LockKeyholeIcon size={16} className="text-[#1A56DB]" />}
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
