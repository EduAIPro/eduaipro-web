import { createTicketKey, getTicketsKey } from "@/api/keys";
import { createTicket } from "@/api/mutations";
import FormInput, { SelectInput } from "@/components/common/ui/FormInput";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import useUser from "@/hooks/use-user";
import { CreateTicketPayload, TicketCategory } from "@/types/admin/support";
import {
  CreateTicketFormValue,
  createTicketValidation,
} from "@/utils/validation/school";
import { Form, Formik } from "formik";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const CreateTicketModal = () => {
  const [open, setOpen] = useState(false);

  const { user } = useUser();
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(createTicketKey, createTicket);

  async function handleSubmit(values: CreateTicketFormValue) {
    try {
      const userName = user?.firstName ?? "" + " " + user?.lastName ?? "";
      const payload: CreateTicketPayload = {
        name: userName,
        email: user?.email,
        category: values.category as TicketCategory,
        message: values.message,
      };
      await trigger(payload);
      toast.success("Ticket opened successfully");
      mutate(getTicketsKey);
      setOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <Modal
      title="Open ticket"
      open={open}
      toggleModal={setOpen}
      containerClassName="min-h-[80hv]"
      trigger={
        <Button className="hover:scale-100 justify-start">
          <PlusIcon />
          <p className="font-medium">New ticket</p>
        </Button>
      }
    >
      <div>
        <Formik
          validateOnMount
          initialValues={{ category: "GENERAL", message: "" }}
          onSubmit={handleSubmit}
          validationSchema={createTicketValidation}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <div className="space-y-4">
                <SelectInput
                  name="category"
                  label="Category"
                  options={categories}
                  error={
                    touched.category && errors.category ? errors.category : null
                  }
                />
                <FormInput
                  as="textarea"
                  name="message"
                  label="Message Body"
                  placeholder="e.g, 'Hello team, I faced this issue while using the app...'"
                  error={
                    touched.message && errors.message ? errors.message : null
                  }
                />
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
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

const categories = [
  {
    label: "General",
    value: TicketCategory.GENERAL,
  },
  {
    label: "Technical issue",
    value: TicketCategory.TECHNICAL_ISSUE,
  },
  {
    label: "Account help",
    value: TicketCategory.ACCOUNT_HELP,
  },
  {
    label: "Content feedback",
    value: TicketCategory.CONTENT_FEEDBACK,
  },
  {
    label: "Other",
    value: TicketCategory.OTHER,
  },
];
