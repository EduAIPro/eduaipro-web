import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import {
  educationalLevels,
  teachingLevels,
  yearsOfExperienceData,
} from "@/utils/data";
import { ProfessionalBackgroundFormValue } from "@/utils/validation/auth";
import { FormikErrors, FormikTouched } from "formik";
import { Briefcase } from "iconsax-react";
import ModalTitleAndDesc from "../ModalTitleAndDesc";

type ProfessionalBackgroundProps = {
  touched: FormikTouched<ProfessionalBackgroundFormValue>;
  errors: FormikErrors<ProfessionalBackgroundFormValue>;
  values: ProfessionalBackgroundFormValue;
};

export default function ProfessionalBackground({
  touched,
  errors,
  values,
}: ProfessionalBackgroundProps) {
  return (
    <div>
      <ModalTitleAndDesc
        title="Professional Background"
        description="Please provide your professional and educational background to help us better understand your experience."
        Icon={Briefcase}
      />

      <div className="mt-6 flex-col flex gap-y-4">
        {/* {values.teachingLevel === "other" ? (
          <FormInput
            label="Professional Level"
            placeholder="Enter your professional level"
            className="w-full"
            name="otherTeachingLevel"
            error={
              touched.otherTeachingLevel && errors.teachingLevel
                ? errors.teachingLevel
                : null
            }
          />
        ) : ( */}
        <SelectInput
          name="teachingLevel"
          label="Professional Level"
          options={teachingLevels}
          error={
            touched.teachingLevel && errors.teachingLevel
              ? errors.teachingLevel
              : null
          }
        />
        {/* )} */}

        {/* {values.educationLevel === "other" ? (
          <FormInput
            label="Educational Level"
            placeholder="Enter your educational level"
            className="w-full"
            name="otherEducationLevel"
            error={
              touched.otherEducationLevel && errors.educationLevel
                ? errors.educationLevel
                : null
            }
          />
        ) : ( */}
        <SelectInput
          name="educationLevel"
          label="Educational Level"
          options={educationalLevels}
          error={
            touched.educationLevel && errors.educationLevel
              ? errors.educationLevel
              : null
          }
        />
        {/* )} */}

        <FormInput
          label="Area of specialization"
          placeholder="Enter the subject which you specialize in"
          className="w-full"
          name="areaOfSpecialization"
          error={
            touched.areaOfSpecialization && errors.areaOfSpecialization
              ? errors.areaOfSpecialization
              : null
          }
        />

        <FormInput
          label="Interested Skills"
          placeholder="Enter skills you want to learn"
          className="w-full"
          name="interestInSkills"
          note="Separate by a comma"
          error={
            touched.interestInSkills && errors.interestInSkills
              ? errors.interestInSkills
              : null
          }
        />

        {/* <SelectInput
          name="interestInSkills"
          
          options={interestedSkills}
          error={
            touched.interestInSkills && errors.interestInSkills
              ? errors.interestInSkills
              : null
          }
          leftIcon={<PenAdd />}
        /> */}
        <SelectInput
          name="yearsOfExperience"
          label="Years of Experience"
          options={yearsOfExperienceData}
          error={
            touched.yearsOfExperience && errors.yearsOfExperience
              ? errors.yearsOfExperience
              : null
          }
        />
      </div>
    </div>
  );
}
