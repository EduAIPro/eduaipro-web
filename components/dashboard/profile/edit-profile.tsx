import { editProfileKey } from "@/api/keys";
import { updateTeacherProfile } from "@/api/mutations";
import FormInput from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { trimObj } from "@/utils/key";
import {
  EditUserFormValue,
  editUserValidation,
} from "@/utils/validation/teacher-profile/settings";
import { Form, Formik } from "formik";
import useSWRMutation from "swr/mutation";

type EditProfileProps = {
  user: EditUserFormValue;
  refetch: VoidFunction;
};

export const EditProfile = ({ user, refetch }: EditProfileProps) => {
  const { trigger, isMutating } = useSWRMutation(
    editProfileKey,
    updateTeacherProfile
  );

  async function onSubmit(values: EditUserFormValue) {
    if (values) {
      const { email, ...rest } = values;
      await trigger(trimObj(rest));
      refetch();
    }
  }
  return (
    <div>
      <div>
        <h3 className="font-semibold md:text-lg">Personal information</h3>
      </div>
      <Formik
        initialValues={user}
        validationSchema={editUserValidation}
        enableReinitialize
        onSubmit={onSubmit}
        validateOnMount
      >
        {({ touched, errors, isValid, initialTouched }) => (
          <Form className="space-y-4 mt-4">
            <FormInput
              label="First name"
              placeholder={user?.userFirstName}
              className="w-full"
              name="userFirstName"
              error={
                touched.userFirstName && errors.userFirstName
                  ? errors.userFirstName
                  : null
              }
            />
            <FormInput
              label="Last name"
              placeholder={user?.userLastName}
              className="w-full"
              name="userLastName"
              error={
                touched.userLastName && errors.userLastName
                  ? errors.userLastName
                  : null
              }
            />
            <FormInput
              label="Email address"
              name="email"
              placeholder="name@example.com"
              type="email"
              disabled
              className="opacity-50"
              error={touched.email && errors.email ? errors.email : null}
            />
            <FormInput
              label="Phone number"
              name="phoneNumber"
              placeholder="806 902 5433"
              error={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : null
              }
            />
            <div className="mt-4 w-full flex items-center justify-end">
              <Button
                type="submit"
                loading={isMutating}
                disabled={
                  (!isValid &&
                    (touched.email ||
                      touched.userFirstName ||
                      touched.userLastName ||
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
