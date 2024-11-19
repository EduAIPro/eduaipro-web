"use client";

import FormInput from "@/components/common/ui/FormInput";
import Typography from "@/components/common/ui/Typography";
import { signupValidation } from "@/utils/validation/auth";
import { Button } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { Eye, EyeSlash, KeySquare, ProfileCircle, Sms } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <main className="lg:flex flex-row justify-between">
      <section className="w-full p-4 xs:p-6 max-lg:min-h-screen">
        <div className="flex items-center justify-between">
          <Image
            src="/assets/images/logo-outline.png"
            width={120}
            height={70}
            alt=""
          />
          <div className="max-sm:hidden">
            <LoginComp />
          </div>
        </div>
        <div className="lg:h-[85vh] max-xs:mt-10 max-lg:mt-20 sm:justify-center flex flex-col">
          <div className="w-full sm:w-2/3 mx-auto flex-col flex gap-y-6">
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
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                if (values.password !== values.confirmPassword) {
                  alert("Your password must match");
                } else {
                  router.push("/dashboard");
                }
              }}
              validationSchema={signupValidation}
            >
              {({ touched, errors }) => (
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
                        touched.lastName && errors.lastName
                          ? errors.lastName
                          : null
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
                      touched.username && errors.username
                        ? errors.username
                        : null
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
                  <FormInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    error={
                      touched.password && errors.password
                        ? errors.password
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
                    <Button className="primary__btn btn !w-full">
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
        </div>
      </section>
      <section className="w-full h-screen bg-auth-bg bg-cover max-lg:hidden"></section>
    </main>
  );
}

function LoginComp() {
  return (
    <div className="flex items-center gap-x-3">
      <Typography.H3 className="text-center" weight="medium" size="base">
        Already have an account?{" "}
      </Typography.H3>
      <Link href="/login">
        <Button className="btn" size="2">
          <h3 className="font-medium">Login</h3>
        </Button>
      </Link>
    </div>
  );
}
