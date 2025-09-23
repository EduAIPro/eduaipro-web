import {
  getSchoolsKey,
  getSupportedCountries,
  sendNotificationKey,
} from "@/api/keys";
import { sendMessageNotification } from "@/api/mutations";
import { fetchWithSearchQuery, generalFetcher } from "@/api/queries";
import FormInput, {
  CheckboxInput,
  SelectInput,
} from "@/components/common/ui/FormInput";
import { MultiSearchSelectInput } from "@/components/common/ui/Select";
import MicrophoneIcon from "@/components/svgs/school/microphone.svg";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  NotificationRecipient,
  NotificationTypes,
  SendNotificationPayload,
} from "@/types/admin/notifications";
import { SchoolslistResponse } from "@/types/admin/schools";
import { TeacherLevelType } from "@/types/course";
import { CountriesList } from "@/types/school";
import {
  SendMessageFormValue,
  sendMessageValidation,
} from "@/utils/validation/admin";
import { Form, Formik } from "formik";
import { ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { messageTypes, recipientTypes, teachersList } from "./constants";

export const SendMessageModal = ({
  modalTrigger,
  type = "admin",
}: {
  modalTrigger?: ReactNode;
  type?: "school" | "admin";
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isSchool = type === "school";

  const { data: schools, isLoading: schoolsLoading } =
    useSWR<SchoolslistResponse>(
      [getSchoolsKey, searchTerm],
      fetchWithSearchQuery
    );
  const { data } = useSWR<CountriesList>(getSupportedCountries, generalFetcher);

  const { trigger, isMutating } = useSWRMutation(
    sendNotificationKey,
    sendMessageNotification
  );

  async function handleSubmit(values: SendMessageFormValue) {
    try {
      const recipientType = values.recipient;
      let optionalPayloads: Partial<SendNotificationPayload> = {};
      if (
        recipientType === "TEACHER" &&
        values.teacherLevels &&
        !values.teacherLevels.includes("all")
      ) {
        optionalPayloads = {
          teacherLevels: values.teacherLevels.filter(
            (i) => i !== undefined
          ) as TeacherLevelType[],
        };
      } else if (
        recipientType === "SCHOOL" &&
        values.schoolIds &&
        !values.schoolIds.includes("all")
      ) {
        optionalPayloads = {
          schoolIds: values.schoolIds.filter((i) => i !== undefined),
        };
      } else if (
        recipientType === "COUNTRY" &&
        values.countryIds &&
        !values.countryIds.includes("all")
      ) {
        optionalPayloads = {
          schoolIds: values.countryIds.filter((i) => i !== undefined),
        };
      }

      const payload: SendNotificationPayload = {
        title: values.title,
        message: values.body,
        recipientType: values.recipient,
        type: values.type,
        ...optionalPayloads,
      };
      await trigger(payload);
      toast.success("Message successfully sent to recipients");
      setOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  }

  const initialData = {
    title: "",
    body: "",
    recipient: NotificationRecipient.TEACHER,
    type: NotificationTypes.INFO,
    countryIds: [],
    teacherLevels: [],
    schoolIds: [],
  };

  const countries = useMemo(() => {
    if (data) {
      const countriesList = data.data.map((c) => ({
        label: c.name,
        value: c.id,
      }));
      return [{ label: "All countries", value: "all" }, ...countriesList];
    } else {
      return [];
    }
  }, [data]);

  const schoolsArr = useMemo(() => {
    const defaultValues = { label: "All schools", value: "all" };
    if (schools) {
      const options = schools.data.map((s) => ({
        label: s.institutionName,
        value: s.id,
      }));
      return [defaultValues, ...options];
    } else return [defaultValues];
  }, [schools]);

  return (
    <Modal
      title="Send message"
      open={open}
      toggleModal={setOpen}
      containerClassName="min-h-[80hv]"
      trigger={
        modalTrigger ?? (
          <Button variant="ghost" className="hover:scale-100 justify-start">
            <MicrophoneIcon />
            <p className="font-medium">Send message</p>
          </Button>
        )
      }
    >
      <div>
        <Formik
          validateOnMount
          initialValues={initialData}
          onSubmit={handleSubmit}
          validationSchema={sendMessageValidation}
        >
          {({ errors, touched, isValid, values }) => (
            <Form>
              <div className="space-y-4">
                <FormInput
                  name="title"
                  label="Message Title"
                  placeholder="e.g, 'Reminder: Certification Renewal'"
                  error={touched.title && errors.title ? errors.title : null}
                  disabled={false}
                  autoFocus
                />
                <FormInput
                  name="body"
                  label="Message Body"
                  placeholder="e.g, 'Your certification is overdue as of 03/12/2025. Please renew soon'"
                  error={touched.body && errors.body ? errors.body : null}
                />
                <SelectInput
                  name="type"
                  label="Message Type"
                  options={messageTypes}
                  error={touched.type && errors.type ? errors.type : null}
                />
                {!isSchool ? (
                  <SelectInput
                    name="recipient"
                    label="Recipient"
                    options={recipientTypes}
                    error={
                      touched.recipient && errors.recipient
                        ? errors.recipient
                        : null
                    }
                  />
                ) : null}
                {values.recipient === NotificationRecipient.TEACHER ? (
                  <CheckboxInput
                    name="teacherLevels"
                    label="Select Category of Teachers"
                    options={teachersList}
                    error={
                      touched.teacherLevels && errors.teacherLevels
                        ? (errors.teacherLevels as string)
                        : null
                    }
                  />
                ) : values.recipient === NotificationRecipient.COUNTRY ? (
                  <CheckboxInput
                    name="countryIds"
                    label="Select Countries"
                    options={countries}
                    error={
                      touched.countryIds && errors.countryIds
                        ? (errors.countryIds as string)
                        : null
                    }
                  />
                ) : (
                  <MultiSearchSelectInput
                    label="Select schools"
                    name="schoolIds"
                    placeholder="Choose schools"
                    searchPlaceholder="Search schools..."
                    options={schoolsArr}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    error={errors.countryIds as string}
                    showSelectedCount={false}
                    isLoading={schoolsLoading}
                  />
                )}
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-grey-500/10 mt-5">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  type="button"
                >
                  Cancel
                </Button>
                <Button loading={isMutating} type="submit" disabled={!isValid}>
                  Send
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
