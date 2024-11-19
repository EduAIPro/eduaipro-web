import FormInput, { DateInput } from "@/components/common/ui/FormInput";
import Typography from "@/components/common/ui/Typography";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { PostRegistrationFormValues } from "../PostRegistrationForm";
import { Building3, Call, Pointer, UserAdd } from "iconsax-react";
import ModalTitleAndDesc from "../ModalTitleAndDesc";

export default function PersonalInfo({
  touched,
  errors,
}: {
  touched: FormikTouched<PostRegistrationFormValues>;
  errors: FormikErrors<PostRegistrationFormValues>;
}) {
  return (
    <div>
      <ModalTitleAndDesc
        title="Personal information"
        description="Please provide your basic details to help us personalize your
            experience."
        Icon={UserAdd}
      />

      <div className="mt-6 flex-col flex gap-y-4">
        <DateInput
          name="dateOfBirth"
          label="Date of Birth"
          error={
            touched.dateOfBirth && errors.dateOfBirth
              ? errors.dateOfBirth
              : null
          }
        />
        <FormInput
          label="School name"
          placeholder="Enter your school name"
          className="w-full"
          name="schoolName"
          error={
            touched.schoolName && errors.schoolName ? errors.schoolName : null
          }
          leftIcon={<Building3 />}
        />
        <FormInput
          label="Contact number"
          type="number"
          placeholder="Enter your mobile number"
          className="w-full"
          name="phone"
          error={touched.phone && errors.phone ? errors.phone : null}
          leftIcon={<Call />}
        />
        <FormInput
          label="Location"
          placeholder="Enter your location (city and country)"
          className="w-full"
          name="location"
          error={touched.location && errors.location ? errors.location : null}
          leftIcon={<Pointer />}
        />
      </div>
    </div>
  );
}
