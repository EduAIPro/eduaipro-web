"use client";
import { confirmPasswordResetKey } from "@/api/keys";
import { confirmPasswordReset } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import {
  ResetPasswordFormValue,
  resetPasswordValidation,
} from "@/utils/validation/auth";
import { Form, Formik } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function ResetPassword() {
  return (
    <div className="max-xs:mt-10 max-lg:mt-20 h-full sm:justify-center flex flex-col space-y-6 lg:max-w-xl mx-auto">
      <div>
        <h2 className="font-semibold text-grey-800 text-2xl">New password</h2>
        <p className="text-base font-medium text-grey-650 mt-2">
          Enter a new password that you would use to log in to your account.
          Enter a password that is secure (and you would remember this time)
        </p>
      </div>

      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    confirmPasswordResetKey,
    confirmPasswordReset
  );

  async function onSubmit(values: ResetPasswordFormValue) {
    if (!email || !token) {
      toast.error("Invalid URL. Kindly click on the link from your email");
      return;
    }
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await trigger({ password: values.password, email, token });

      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

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
      <Formik
        initialValues={defaultValues}
        validationSchema={resetPasswordValidation}
        onSubmit={onSubmit}
      >
        {({ touched, errors, isValid }) => (
          <Form className="flex-col flex gap-y-4">
            <FormInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              rightIcon={<PasswordIcon />}
              error={
                touched.password && errors.password ? errors.password : null
              }
            />
            <FormInput
              name="confirmPassword"
              label="Confirm password"
              placeholder="Enter your password again"
              type={showPassword ? "text" : "password"}
              rightIcon={<PasswordIcon />}
              error={
                touched.confirmPassword && errors.confirmPassword
                  ? errors.confirmPassword
                  : null
              }
            />
            <div className="mt-4 w-full">
              <Button
                type="submit"
                loading={isMutating}
                disabled={!isValid}
                className="w-full"
              >
                <p className="white">Submit</p>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
