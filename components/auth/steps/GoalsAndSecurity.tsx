import FormInput, {
  CheckboxInput,
  SelectInput,
} from "@/components/common/ui/FormInput";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { PostRegistrationFormValues } from "../PostRegistrationForm";
import { Book, Briefcase, Cup, MessageQuestion } from "iconsax-react";
import ModalTitleAndDesc from "../ModalTitleAndDesc";
import { learningGoal, preferredLearningMethod } from "@/utils/data";

export default function GoalsAndSecurity({
  touched,
  errors,
}: {
  touched: FormikTouched<PostRegistrationFormValues>;
  errors: FormikErrors<PostRegistrationFormValues>;
}) {
  return (
    <div>
      <ModalTitleAndDesc
        title="Professional Goals and Security"
        description="Tell us about your goals and background to personalize your learning experience."
        Icon={Cup}
      />

      <div className="mt-6 flex-col flex gap-y-4">
        <SelectInput
          name="learningGoals"
          label="Learning Goals"
          options={learningGoal}
          error={
            touched.learningGoals && errors.learningGoals
              ? errors.learningGoals
              : null
          }
          leftIcon={<Cup />}
        />
        <SelectInput
          name="learningMethod"
          label="Preferred Learning Method"
          options={preferredLearningMethod}
          error={
            touched.learningMethod && errors.learningMethod
              ? errors.learningMethod
              : null
          }
          leftIcon={<Book />}
        />
        <FormInput
          label="Security Question"
          placeholder="Enter a security question in case you forget your password"
          className="w-full"
          name="securityQuestion"
          error={
            touched.securityQuestion && errors.securityQuestion
              ? errors.securityQuestion
              : null
          }
          leftIcon={<MessageQuestion />}
        />
        <CheckboxInput
          single
          name="termsAccepted"
          label="I accept the terms and conditions"
          error={
            touched.termsAccepted && errors.termsAccepted
              ? errors.termsAccepted
              : null
          }
        />
      </div>
    </div>
  );
}
