"use client";
import { useMutationApi } from "@/api/hooks/useMutationApi";
import { SIGNUP_EDUCATOR_MUTATION_KEY } from "@/api/keys";
import { signup } from "@/api/mutations";
import { useToast } from "@/hooks/use-toast";
import { trimObj } from "@/utils/key";
import { signupValidation } from "@/utils/validation/auth";
import { Button } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { Eye, EyeSlash, KeySquare, ProfileCircle, Sms } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInput from "../common/ui/FormInput";
import PhoneInput from "../common/ui/PhoneInput";
import Typography from "../common/ui/Typography";
import { LoginComp } from "./LoginComp";

export default function TeacherSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const signupMutation = useMutationApi(SIGNUP_EDUCATOR_MUTATION_KEY, signup, {
    onSuccess: (data) => {
      const _res = data.data;
      window.localStorage.setItem("user", JSON.stringify(_res.user));
      window.localStorage.setItem(
        "access_token",
        JSON.stringify(_res.tokens.token)
      );
      window.localStorage.setItem(
        "refresh_token",
        JSON.stringify(_res.tokens.refreshToken)
      );

      toast({
        title: "Registration successful 🎉",
      });

      router.push("/dashboard/personal-development-plan?type=teacher");
    },
    onError(err) {
      toast({
        title: err as string,
        variant: "destructive",
      });
    },
  });

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
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          if (values.password !== values.confirmPassword) {
            toast({
              title: "Your password must match",
              variant: "destructive",
            });
          } else {
            signupMutation.mutate(trimObj(values));
          }
        }}
        validationSchema={signupValidation}
      >
        {({ touched, errors, setFieldValue }) => (
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
                leftIcon={<ProfileCircle />}
              />
              <FormInput
                label="Last name"
                placeholder="Okoye"
                className="w-full"
                name="lastName"
                error={
                  touched.lastName && errors.lastName ? errors.lastName : null
                }
                leftIcon={<ProfileCircle />}
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
              leftIcon={<ProfileCircle />}
            />
            <FormInput
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
              error={touched.email && errors.email ? errors.email : null}
              leftIcon={<Sms />}
            />
            <PhoneInput
              label="Phone number"
              name="phoneNumber"
              setFieldValue={setFieldValue}
              error={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
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
              leftIcon={<KeySquare />}
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
              leftIcon={<KeySquare />}
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
              <Button
                loading={signupMutation.isLoading}
                disabled={signupMutation.isLoading}
                type="submit"
                className="primary__btn btn !w-full"
              >
                <Typography.P fontColor="white">Register</Typography.P>
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
