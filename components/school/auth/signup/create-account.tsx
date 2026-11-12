import FormInput from "@/components/common/ui/FormInput";
import PhoneInput from "@/components/common/ui/PhoneInput";
import { Button } from "@/components/ui/button";
import {
  CreateAccountFormValue,
  createAccountValidation,
} from "@/utils/validation/auth/school";
import { Form, Formik, getIn } from "formik";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type CreateSchoolAccountProps = {
  onSave: (v: CreateAccountFormValue) => void;
  defaultValues: CreateAccountFormValue;
};

export const CreateSchoolAccount = ({
  onSave,
  defaultValues,
}: CreateSchoolAccountProps) => {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(values: CreateAccountFormValue) {
    const [firstName, ...lastName] = values.name.trim().split(" ");
    if (!firstName.length || !lastName.length) {
      toast.error("First and last names are both required");
      return;
    }
    if (values) {
      onSave(values);
    }
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const PasswordIcon = () => (
    <Button type="button" size="icon" variant="ghost" onClick={togglePassword}>
      {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
    </Button>
  );
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
        initialValues={defaultValues}
        validationSchema={createAccountValidation}
      >
        {({ touched, errors, setFieldValue, setFieldTouched, isValid }) => {
          const fieldError = (fieldNames: string[]) => {
            const errorMessages = fieldNames
              .map((field) => {
                if (getIn(touched, field) && getIn(errors, field)) {
                  return getIn(errors, field) as string;
                } else {
                  return null;
                }
              })
              .filter((i) => i !== null);
            return errorMessages.join(", ");
          };

          return (
            <Form className="space-y-5">
              <FormInput
                label="Full name"
                placeholder="Enter your name"
                name="name"
                error={fieldError(["name"])}
                note="Enter your first and last name"
              />

              <FormInput
                label="Email address"
                placeholder="Enter your email"
                name="email"
                error={fieldError(["email"])}
              />

              <div onBlur={() => setFieldTouched("phone.digits")}>
                <PhoneInput
                  label="Phone number"
                  name="phone.digits"
                  dialCodeName="phone.dialCode"
                  setFieldValue={setFieldValue}
                  error={fieldError(["phone.digits", "phone.dialCode"])}
                />
              </div>

              <FormInput
                label="Position"
                placeholder="Enter your position"
                name="position"
                error={fieldError(["position"])}
              />

              <FormInput
                label="Password"
                placeholder="Enter password"
                name="password"
                error={fieldError(["password"])}
                note="At least 8 characters, with an uppercase letter, a number and a symbol"
                type={showPassword ? "text" : "password"}
                rightIcon={<PasswordIcon />}
              />
              <div>
                <FormInput
                  label="Confirm password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  error={fieldError(["confirmPassword"])}
                  type={showPassword ? "text" : "password"}
                  rightIcon={<PasswordIcon />}
                />
              </div>

              <Button disabled={!isValid} className="w-full" type="submit">
                <h3>Create account</h3>
              </Button>

              <div className="flex items-center justify-between">
                <p>Already have an account?</p>
                <Link href="/login">
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
