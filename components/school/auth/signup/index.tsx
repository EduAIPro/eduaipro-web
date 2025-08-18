"use client";
import { CreateAccountFormValue } from "@/utils/validation/auth/signup";
import { FileQuestionIcon } from "lucide-react";
import { useState } from "react";
import { CreateSchoolAccount } from "./create-account";
import { SetupSchoolProfile } from "./setup-school";

type SchoolSignupProps = {};

export const SchoolSignup = ({}: SchoolSignupProps) => {
  const [accountValues, setAccountValues] =
    useState<null | CreateAccountFormValue>(null);
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 ? (
        <CreateSchoolAccount
          onSave={(values) => {
            setStep(2);
            setAccountValues(values);
          }}
        />
      ) : accountValues ? (
        <SetupSchoolProfile accountValues={accountValues} />
      ) : (
        <div className="max-w-md mx-auto space-y-4 max-lg:mt-20">
          <div className="size-32 sm:size-40 rounded-full mx-auto bg-grey-400/20 flex items-center justify-center">
            <FileQuestionIcon className=" size-8 sm:size-12 text-grey-500" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-lg md:text-2xl font-semibold">
              Ooops, an error occured
            </h2>
            <p className="text-grey-500 font-medium max-sm:text-sm">
              Seems like there was an issue displaying the next step... <br />{" "}
              Please refresh the page and try again. If the issue persists,
              kindly click{" "}
              <a
                href="mailto:support@eduaipro.ng"
                className="underline text-primary-300"
                target="_blank"
              >
                here
              </a>{" "}
              to send us an email
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
