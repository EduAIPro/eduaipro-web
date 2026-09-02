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
import { MailIcon, PhoneIcon, UserIcon, UserRoundPenIcon } from "lucide-react";
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
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#1A56DB] bg-[#EFF6FF]">
          <UserRoundPenIcon size={16} />
        </div>
        <h3 className="font-bold text-grey-800 md:text-lg">
          Personal information
        </h3>
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
              leftIcon={<UserIcon size={16} className="text-[#1A56DB]" />}
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
              leftIcon={<UserIcon size={16} className="text-[#1A56DB]" />}
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
              leftIcon={<MailIcon size={16} className="text-[#1A56DB]" />}
              error={touched.email && errors.email ? errors.email : null}
            />
            <FormInput
              label="Phone number"
              name="phoneNumber"
              placeholder="806 902 5433"
              leftIcon={<PhoneIcon size={16} className="text-[#1A56DB]" />}
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
