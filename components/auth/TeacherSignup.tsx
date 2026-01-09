"use client";
import { signupTeacherKey } from "@/api/keys";
import { signup } from "@/api/mutations";
import { CONFIG } from "@/constants/config";
import { TeacherSignup as TeacherSignupType } from "@/types/auth";
import { storeAccessToken } from "@/utils/auth/helpers";
import { trimObj } from "@/utils/key";
import { SignupFormValue, signupValidation } from "@/utils/validation/auth";
import { Form, Formik } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import FormInput from "../common/ui/FormInput";
import PhoneInput from "../common/ui/PhoneInput";
import Typography from "../common/ui/Typography";
import { Button } from "../ui/button";

export default function TeacherSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitationCode = searchParams.get("token");
  const userEmail = searchParams.get("email");

  const { trigger, isMutating } = useSWRMutation(signupTeacherKey, signup);

  async function onSubmit(data: SignupFormValue) {
    if (data.password !== data.confirmPassword) {
      toast.error("Your password must match");
      return;
    }
    try {
      const payload: TeacherSignupType = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber.digits,
        phoneCountryCode: data.phoneNumber.dialCode.slice(1),
        password: data.password,
        ...(invitationCode && { invitationCode }),
      };

      const res = await trigger(trimObj(payload));
      const { user, tokens } = res.data;

      if (tokens.access) {
        storeAccessToken(tokens.access);
        sessionStorage.setItem(CONFIG.USER_IDENTIFIER, user.id);
      }

      if (invitationCode) {
        router.push("/dashboard");
      } else {
        router.push(
          `/verify-email?email=${encodeURIComponent(data.email)}&role=TEACHER`
        );
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  const defaultValues: SignupFormValue = {
    firstName: "",
    lastName: "",
    email: userEmail ? decodeURIComponent(userEmail) : "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: {
      dialCode: "",
      digits: "",
    },
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
    <div className="flex-col flex gap-y-6">
      <div className="text-left">
        <Typography.H2 size="basePro" weight="semibold">
          Sign up
        </Typography.H2>
        <Typography.P weight="medium" size="large" fontColor="medium">
          Enter your details to create your account
        </Typography.P>
      </div>
      <Formik
        initialValues={defaultValues}
        validationSchema={signupValidation}
        onSubmit={onSubmit}
        validateOnBlur
        validateOnMount
      >
        {({ touched, errors, setFieldValue, isValid }) => (
          <Form className="flex-col flex gap-y-4">
            <div className="flex items-center justify-between gap-x-3">
              <FormInput
                label="First name"
                placeholder="John"
                className="w-full"
                name="firstName"
                disabled={isMutating}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : null
                }
              />
              <FormInput
                label="Last name"
                placeholder="Okoye"
                className="w-full"
                name="lastName"
                disabled={isMutating}
                error={
                  touched.lastName && errors.lastName ? errors.lastName : null
                }
              />
            </div>
            <FormInput
              label="Username"
              placeholder="Enter your preferred username"
              className="w-full"
              name="username"
              disabled={isMutating}
              error={
                touched.username && errors.username ? errors.username : null
              }
            />
            <FormInput
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
              disabled={!!userEmail || isMutating}
              error={touched.email && errors.email ? errors.email : null}
            />
            <PhoneInput
              label="Phone number"
              name="phoneNumber.digits"
              setFieldValue={setFieldValue}
              dialCodeName="phoneNumber.dialCode"
              error={
                touched.phoneNumber?.digits && errors.phoneNumber?.digits
                  ? errors.phoneNumber.digits
                  : null
              }
            />
            <FormInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              rightIcon={<PasswordIcon />}
              disabled={isMutating}
              error={
                touched.password && errors.password ? errors.password : null
              }
            />
            <div>
              <FormInput
                name="confirmPassword"
                label="Confirm password"
                placeholder="Enter your password again"
                disabled={isMutating}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : null
                }
                type={showPassword ? "text" : "password"}
                rightIcon={<PasswordIcon />}
              />
              <p className="text-grey-500 text-sm mt-2">
                Your password must contain at least 8 characters including at
                least one digit, symbol, uppercase and lowercase letter
              </p>
            </div>
            <div className="mt-4 w-full">
              <Button
                type="submit"
                loading={isMutating}
                disabled={!isValid}
                className="w-full"
              >
                <p className="white">Register</p>
              </Button>
            </div>

            <div>
              <p className="text-center">
                Already have an account?{" "}
                <span className="text-primary-300 hover:scale-95 duration-300 underline font-medium">
                  <Link href="/login">Login</Link>
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// deevyn.edeh+90@gmail.com
