import { editProfileKey } from "@/api/keys";
import { updateTeacherProfile } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { trimObj } from "@/utils/key";
import {
  PersonalInfoFormValue,
  personalInfoValidation,
} from "@/utils/validation/teacher-profile/settings";
import { Form, Formik } from "formik";
import useSWRMutation from "swr/mutation";

type EditProfileProps = {
  user: PersonalInfoFormValue;
};

export const EditProfile = ({ user }: EditProfileProps) => {
  const { trigger, isMutating } = useSWRMutation(
    editProfileKey,
    updateTeacherProfile
  );

  function onSubmit(values: PersonalInfoFormValue) {
    if (values) {
      trigger(trimObj(values));
    }
  }
  return (
    <div>
      <div>
        <h3 className="font-semibold md:text-lg">Personal information</h3>
      </div>
      <Formik
        initialValues={user}
        validationSchema={personalInfoValidation}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ touched, errors, isValid, initialTouched }) => (
          <Form className="space-y-4 mt-4">
            <FormInput
              label="Full name"
              placeholder={user?.fullName}
              className="w-full"
              name="fullName"
              error={
                touched.fullName && errors.fullName ? errors.fullName : null
              }
            />
            <FormInput
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
              error={touched.email && errors.email ? errors.email : null}
            />
            <FormInput
              label="Phone number"
              name="phoneNumber"
              placeholder="name@example.com"
              error={touched.email && errors.email ? errors.email : null}
            />
            <div className="mt-4 w-full flex items-center justify-end">
              <Button
                type="submit"
                loading={isMutating}
                disabled={
                  (!isValid &&
                    (touched.email ||
                      touched.fullName ||
                      touched.phoneNumber)) ||
                  !initialTouched
                }
              >
                <p>Edit</p>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
