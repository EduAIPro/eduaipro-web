"use client";
import { signupTeacherKey } from "@/api/keys";
import { signup } from "@/api/mutations";
import { TeacherSignup as TeacherSignupType } from "@/types/auth";
import { trimObj } from "@/utils/key";
import {
  SignupFormValue,
  signupValidation,
} from "@/utils/validation/auth/index";
import { Form, Formik } from "formik";
import { Eye, EyeSlash } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import FormInput from "../common/ui/FormInput";
import PhoneInput from "../common/ui/PhoneInput";
import Typography from "../common/ui/Typography";
import { Button } from "../ui/button";
import { LoginComp } from "./LoginComp";

export default function TeacherSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { trigger, isMutating, error } = useSWRMutation(
    signupTeacherKey,
    signup
  );

  async function onSubmit(data: SignupFormValue) {
    try {
      const payload: TeacherSignupType = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber.digits,
        phoneCountryCode: data.phoneNumber.dialCode.slice(1),
        password: data.password,
      };

      const result = await trigger(trimObj(payload));

      console.log({ result });
    } catch (error) {
      console.log({ error });
    }
  }
  const defaultValues: SignupFormValue = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: {
      dialCode: "",
      digits: "",
    },
  };

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
        onSubmit={async (values) => {
          if (values.password !== values.confirmPassword) {
            toast.error("Your password must match");
          } else {
            onSubmit(values)
              .then(() => {
                toast.success("Registration successful 🎉");

                router.push("/dashboard");
              })
              .catch((err) => {
                console.log({ err });
              });
          }
        }}
        validationSchema={signupValidation}
      >
        {({ touched, errors, setFieldValue, isValid }) => (
          <Form className="flex-col flex gap-y-4">
            <div className="flex items-center justify-between gap-x-3">
              <FormInput
                label="First name"
                placeholder="John"
                className="w-full"
                name="firstName"
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : null
                }
                // leftIcon={<ProfileCircle />}
              />
              <FormInput
                label="Last name"
                placeholder="Okoye"
                className="w-full"
                name="lastName"
                error={
                  touched.lastName && errors.lastName ? errors.lastName : null
                }
                // leftIcon={<ProfileCircle />}
              />
            </div>
            <FormInput
              label="Username"
              placeholder="Enter your preferred username"
              className="w-full"
              name="username"
              error={
                touched.username && errors.username ? errors.username : null
              }
              // leftIcon={<ProfileCircle />}
            />
            <FormInput
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
              error={touched.email && errors.email ? errors.email : null}
              // leftIcon={<Sms />}
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
              error={
                touched.password && errors.password ? errors.password : null
              }
              type={showPassword ? "text" : "password"}
              // leftIcon={<KeySquare />}
              rightIcon={
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </div>
              }
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
              // leftIcon={<KeySquare />}
              rightIcon={
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </div>
              }
            />
            <div className="mt-4 w-full">
              <Button type="submit" loading={isMutating} disabled={!isValid}>
                <p className="white">Register</p>
              </Button>
            </div>
            <div className="sm:hidden flex items-center justify-center">
              <LoginComp />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
