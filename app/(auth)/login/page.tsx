"use client";

import FormInput from "@/components/common/ui/FormInput";
import Typography from "@/components/common/ui/Typography";
import { loginValidation } from "@/utils/validation/auth";
import { Button } from "@radix-ui/themes";
import { Form, Formik } from "formik";
import { Eye, EyeSlash, KeySquare, Sms } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
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
          <div className="flex items-center gap-x-3 max-sm:hidden">
            <Typography.H3 className="text-center" weight="medium" size="base">
              {"Don't"} have an account?{" "}
            </Typography.H3>
            <Link href="/register">
              <Button className="btn" size="2">
                <h3 className="font-medium">Sign up</h3>
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:h-[70vh] max-xs:mt-10  max-lg:mt-20 sm:justify-center flex flex-col">
          <div className="w-full sm:w-2/3 mx-auto flex-col flex gap-y-6">
            <div className="text-left">
              <Typography.H2 size="basePro" weight="semibold">
                Welcome back
              </Typography.H2>
              <Typography.P weight="medium" size="large" fontColor="medium">
                Fill in your details
              </Typography.P>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginValidation}
              onSubmit={() => router.push("/dashboard/overview")}
              autoComplete="off"
            >
              {({ errors, touched }) => (
                <Form className="flex-col flex gap-y-4">
                  <FormInput
                    name="email"
                    label="Email address"
                    placeholder="name@example.com"
                    type="email"
                    error={touched.email && errors.email ? errors.email : null}
                    leftIcon={<Sms />}
                  />
                  <FormInput
                    name="password"
                    label="Password"
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
                  <div className="flex justify-end">
                    <Typography.H3
                      fontColor="brand"
                      weight="medium"
                      size="base"
                    >
                      Forgot your password?
                    </Typography.H3>
                  </div>
                  <Button className="primary__btn btn">
                    <Typography.P fontColor="white">Login</Typography.P>
                  </Button>
                  <div className="sm:hidden">
                    <Typography.H3
                      className="text-center"
                      weight="medium"
                      size="base"
                    >
                      {"Don't"} have an account?{" "}
                      <Link href="/register">
                        <h3 className="underline text-brand-900 inline-block">
                          Sign up
                        </h3>
                      </Link>
                    </Typography.H3>
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
{
  /* <Image
  src="/assets/images/img17.jpg"
  alt=""
  width="700"
  height="700"
  className="w-full h-screen"
/> */
}
// 6, 7, 10, 12, 13, 14, 16, 17
