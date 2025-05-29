"use client";
import { useState } from "react";
import { CreateSchoolAccount } from "./create-account";
import { SetupSchoolProfile } from "./setup-school";

type SchoolSignupProps = {};

export const SchoolSignup = ({}: SchoolSignupProps) => {
  const [step, setStep] = useState(2);
  return (
    <div>
      {step === 1 ? (
        <CreateSchoolAccount onSave={() => setStep(2)} />
      ) : (
        <SetupSchoolProfile />
      )}
    </div>
  );
};
