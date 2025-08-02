import FormInput, { DateInput } from "@/components/common/ui/FormInput";
import { PersonalInfoFormValue } from "@/utils/validation/auth";
import { FormikErrors, FormikTouched } from "formik";
import { UserAdd } from "iconsax-react";
import ModalTitleAndDesc from "../ModalTitleAndDesc";

type PersonalInfoProps = {
  touched: FormikTouched<PersonalInfoFormValue>;
  errors: FormikErrors<PersonalInfoFormValue>;
  userPhoneExists: boolean;
};

export default function PersonalInfo({
  touched,
  errors,
  userPhoneExists,
}: PersonalInfoProps) {
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
        />
        {userPhoneExists ? null : (
          <FormInput
            label="Contact number"
            type="number"
            placeholder="Enter your mobile number"
            className="w-full"
            name="phone"
            error={touched.phone && errors.phone ? errors.phone : null}
          />
        )}
        <FormInput
          label="Location"
          placeholder="Enter your location (city and country)"
          className="w-full"
          name="location"
          error={touched.location && errors.location ? errors.location : null}
        />
      </div>
    </div>
  );
}
