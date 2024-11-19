import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { PostRegistrationFormValues } from "../PostRegistrationForm";
import {
  ArchiveBook,
  Book,
  Briefcase,
  PenAdd,
  ProfileTick,
  Star1,
} from "iconsax-react";
import ModalTitleAndDesc from "../ModalTitleAndDesc";
import {
  educationalLevels,
  interestedSkills,
  teachingLevels,
  yearsOfExperienceData,
} from "@/utils/data";

export default function ProfessionalBackground({
  touched,
  errors,
}: {
  touched: FormikTouched<PostRegistrationFormValues>;
  errors: FormikErrors<PostRegistrationFormValues>;
}) {
  return (
    <div>
      <ModalTitleAndDesc
        title="Professional Background"
        description="Please provide your professional and educational background to help us better understand your experience."
        Icon={Briefcase}
      />

      <div className="mt-6 flex-col flex gap-y-4">
        <SelectInput
          name="teachingLevel"
          label="Teaching Level"
          options={teachingLevels}
          error={
            touched.teachingLevel && errors.teachingLevel
              ? errors.teachingLevel
              : null
          }
          leftIcon={<ArchiveBook />}
        />
        <SelectInput
          name="educationLevel"
          label="Educational Level"
          options={educationalLevels}
          error={
            touched.educationLevel && errors.educationLevel
              ? errors.educationLevel
              : null
          }
          leftIcon={<Book />}
        />
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
          leftIcon={<Star1 />}
        />
        <SelectInput
          name="interestInSkills"
          label="Interested Skills"
          options={interestedSkills}
          error={
            touched.interestInSkills && errors.interestInSkills
              ? errors.interestInSkills
              : null
          }
          leftIcon={<PenAdd />}
        />
        <SelectInput
          name="yearsOfExperience"
          label="Years of Experience"
          options={yearsOfExperienceData}
          error={
            touched.yearsOfExperience && errors.yearsOfExperience
              ? errors.yearsOfExperience
              : null
          }
          leftIcon={<ProfileTick />}
        />
      </div>
    </div>
  );
}
