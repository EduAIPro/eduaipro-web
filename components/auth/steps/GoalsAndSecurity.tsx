import FormInput, {
  CheckboxInput,
  SelectInput,
} from "@/components/common/ui/FormInput";
import { learningGoal } from "@/utils/data";
import { GoalsFormValue } from "@/utils/validation/auth";
import { FormikErrors, FormikTouched } from "formik";
import { Cup } from "iconsax-react";
import ModalTitleAndDesc from "../ModalTitleAndDesc";

type GoalsAndSecurityProps = {
  touched: FormikTouched<GoalsFormValue>;
  errors: FormikErrors<GoalsFormValue>;
};

export default function GoalsAndSecurity({
  touched,
  errors,
}: GoalsAndSecurityProps) {
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
          label="Primary Learning Goal"
          options={learningGoal}
          error={
            touched.learningGoals && errors.learningGoals
              ? errors.learningGoals
              : null
          }
        />
        <FormInput
          label="Other Learning Goals (optional)"
          placeholder="Enter other goals you are looking to achieve"
          className="w-full"
          name="otherLearningGoals"
          note="Separate by a comma"
          error={
            touched.otherLearningGoals && errors.otherLearningGoals
              ? errors.otherLearningGoals
              : null
          }
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
