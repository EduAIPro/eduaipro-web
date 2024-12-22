"use client";

import {
  Building3,
  Call,
  Eye,
  EyeSlash,
  KeySquare,
  People,
  Sms,
} from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Typography from "../common/ui/Typography";
import { Form, Formik } from "formik";
import FormInput, { CheckboxInput, SelectInput } from "../common/ui/FormInput";
import {
  institutionSignupValidation,
  signupValidation,
} from "@/utils/validation/auth";
import { Button } from "@radix-ui/themes";
import { LoginComp } from "./LoginComp";
import { schoolFocusAreas, schoolType } from "@/utils/data";
import { LuGraduationCap, LuMapPin } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";

export default function InstitutionSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  return (
    <div className="flex-col flex gap-y-6 h-[80vh] overflow-y-scroll no-scrollbar">
      <div className="text-left">
        <Typography.H2 size="basePro" weight="semibold">
          Welcome to EduAI Pro!
        </Typography.H2>
        <Typography.P weight="medium" size="large" fontColor="medium">
          Empowering Institutions for Professional Development Excellence.
        </Typography.P>
      </div>
      <Formik
        initialValues={{
          name: "",
          type: "",
          email: "",
          location: "",
          phone: "",
          password: "",
          confirmPassword: "",
          focusAreas: "",
          staffCount: "",
          wantsCertification: false,
          acceptsTerms: false,
        }}
        onSubmit={(values) => {
          if (values.password !== values.confirmPassword) {
            alert("Your password must match");
          } else {
            router.replace("/register?type=admin");
          }
        }}
        validationSchema={institutionSignupValidation}
      >
        {({ touched, errors, values }) => (
          <Form className="flex-col flex gap-y-4">
            {/* <div className="flex items-center justify-between gap-x-3"> */}
            <FormInput
              label="Institution Name"
              placeholder="Nnamdi Azikiwe University"
              name="name"
              error={touched.name && errors.name ? errors.name : null}
              leftIcon={<Building3 />}
            />
            {values.type && values.type.toLowerCase() === "other" ? (
              <FormInput
                label="Type of Institution"
                placeholder="Enter your institution type"
                name="type"
                error={touched.type && errors.type ? errors.type : null}
                leftIcon={<LuGraduationCap size={16} />}
              />
            ) : (
              <SelectInput
                name="type"
                label="Type of Institution"
                options={schoolType}
                error={touched.type && errors.type ? errors.type : null}
                leftIcon={<LuGraduationCap size={18} />}
              />
            )}
            <FormInput
              label="Location (Address)"
              placeholder="Enter the institution's location"
              className="w-full"
              name="location"
              error={
                touched.location && errors.location ? errors.location : null
              }
              leftIcon={<LuMapPin size={20} />}
            />
            <FormInput
              label="Contact number"
              placeholder="Enter a preferred contact phone number"
              className="w-full"
              name="phone"
              error={touched.phone && errors.phone ? errors.phone : null}
              leftIcon={<Call />}
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

            <div className="flex items-center justify-between gap-3">
              <SelectInput
                name="focusAreas"
                className="w-full"
                label="Focus areas"
                options={schoolFocusAreas}
                error={
                  touched.focusAreas && errors.focusAreas
                    ? errors.focusAreas
                    : null
                }
                leftIcon={<TbTargetArrow size={18} />}
              />

              <FormInput
                label="Number of staff to enroll"
                placeholder="Enter an approximate number of state to be enrolled"
                className="w-full"
                name="staffCount"
                error={
                  touched.staffCount && errors.staffCount
                    ? errors.staffCount
                    : null
                }
                leftIcon={<People size={20} />}
              />
            </div>
            <CheckboxInput
              single
              name="wantsCertification"
              label="Opt in to customized certifications for your staff?"
              error={
                touched.wantsCertification && errors.wantsCertification
                  ? errors.wantsCertification
                  : null
              }
            />
            <CheckboxInput
              single
              name="acceptsTerms"
              label="I agree to the Terms of Service and Privacy Policy."
              error={
                touched.acceptsTerms && errors.acceptsTerms
                  ? errors.acceptsTerms
                  : null
              }
            />
            <div className="mt-4 w-full">
              <Button type="submit" className="primary__btn btn !w-full">
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
