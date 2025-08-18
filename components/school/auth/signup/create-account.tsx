import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import {
  CreateAccountFormValue,
  createAccountValidation,
} from "@/utils/validation/auth/signup";
import { Form, Formik } from "formik";
import { Eye, EyeSlash, KeySquare, ProfileCircle, Sms } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";

type CreateSchoolAccountProps = {
  onSave: (v: CreateAccountFormValue) => void;
};

export const CreateSchoolAccount = ({ onSave }: CreateSchoolAccountProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position: "",
    password: "",
    confirmPassword: "",
  };

  function handleSubmit(values: CreateAccountFormValue) {
    if (values) {
      onSave(values);
    }
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Create Account</h2>
        <p className="text-base text-grey-10">
          Create an account now to manage your teachers and their accreditation!
        </p>
      </div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={createAccountValidation}
      >
        {({ touched, errors, setFieldValue, isValid, values }) => {
          const fieldError = (fieldName: keyof CreateAccountFormValue) =>
            touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

          return (
            <Form className="space-y-5">
              <FormInput
                label="Full name"
                placeholder="Enter your name"
                className="w-full"
                name="name"
                error={fieldError("name")}
                leftIcon={<ProfileCircle />}
              />

              <FormInput
                label="Email address"
                placeholder="Enter your email"
                className="w-full"
                name="email"
                error={fieldError("email")}
                leftIcon={<Sms />}
              />

              <PhoneInput
                label="Phone number"
                name="phone"
                setFieldValue={setFieldValue}
                error={fieldError("phone")}
              />

              <FormInput
                label="Position"
                placeholder="Enter your position"
                className="w-full"
                name="position"
                error={fieldError("position")}
                leftIcon={<ProfileCircle />}
              />

              <FormInput
                label="Password"
                placeholder="Enter password"
                className="w-full"
                name="password"
                leftIcon={<KeySquare />}
                error={fieldError("password")}
                type={showPassword ? "text" : "password"}
                rightIcon={
                  <Button variant="ghost" size="sm" onClick={togglePassword}>
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </Button>
                }
              />

              <FormInput
                label="Confirm password"
                placeholder="Confirm your password"
                className="w-full"
                name="confirmPassword"
                leftIcon={<KeySquare />}
                error={fieldError("confirmPassword")}
                type={showPassword ? "text" : "password"}
                rightIcon={
                  <Button variant="ghost" size="sm" onClick={togglePassword}>
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </Button>
                }
              />

              <Button disabled={!isValid} className="w-full" type="submit">
                <h3>Create account</h3>
              </Button>

              <div className="flex items-center justify-between">
                <p>Already have an account?</p>
                <Link href="/login/school">
                  <h3 className="text-base underline font-medium">Login</h3>
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
