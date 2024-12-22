"use client";
import { Eye, EyeSlash, KeySquare, ProfileCircle, Sms } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Typography from "../common/ui/Typography";
import { Form, Formik } from "formik";
import FormInput, { SelectInput } from "../common/ui/FormInput";
import {
  adminSignupValidation,
  signupValidation,
} from "@/utils/validation/auth";
import { Button } from "@radix-ui/themes";
import { LoginComp } from "./LoginComp";
import { adminRoles } from "@/utils/data";

export default function AdminSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="flex-col flex gap-y-6">
      <div className="text-left">
        <Typography.H2 size="basePro" weight="semibold">
          Add an Admin
        </Typography.H2>
        <Typography.P weight="medium" size="large" fontColor="medium">
          Register an admin under your account
        </Typography.P>
      </div>
      <Formik
        initialValues={{
          adminName: "",
          adminRole: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          if (values.password !== values.confirmPassword) {
            alert("Your password must match");
          } else {
            router.push("/dashboard?type=institution");
          }
        }}
        validationSchema={adminSignupValidation}
      >
        {({ touched, errors, values }) => (
          <Form className="flex-col flex gap-y-4">
            <FormInput
              label="Administrator Name"
              placeholder="John Doe"
              name="adminName"
              error={
                touched.adminName && errors.adminName ? errors.adminName : null
              }
              leftIcon={<ProfileCircle />}
            />
            {values.adminRole && values.adminRole.toLowerCase() === "other" ? (
              <FormInput
                label="Administrator Role"
                placeholder="Enter the admin's role"
                name="adminRole"
                error={
                  touched.adminRole && errors.adminRole
                    ? errors.adminRole
                    : null
                }
                leftIcon={<ProfileCircle size={16} />}
              />
            ) : (
              <SelectInput
                name="adminRole"
                label="Administrator Role"
                options={adminRoles}
                error={
                  touched.adminRole && errors.adminRole
                    ? errors.adminRole
                    : null
                }
                leftIcon={<ProfileCircle size={18} />}
              />
            )}

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
              placeholder="Enter admin password"
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
              placeholder="Confirm the admin's password"
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
                <Typography.P fontColor="white">Sign up</Typography.P>
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
