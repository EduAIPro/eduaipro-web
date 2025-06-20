import MicrophoneIcon from "@/components/svgs/school/microphone.svg";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { SendMessageFormValue } from "@/utils/validation/school";
import { Form, Formik } from "formik";
type SendMessageModalProps = {};

export const SendMessageModal = ({}: SendMessageModalProps) => {
  const initialValues: SendMessageFormValue = {
    title: "",
    body: "",
    recipient: "",
  };

  function handleSubmit(values: SendMessageFormValue) {}
  return (
    <Modal
      title="Send message"
      trigger={
        <Button>
          <MicrophoneIcon />
          <p className="font-medium">Send message</p>
        </Button>
      }
      footer={
        <>
          <Button variant="secondary" className="w-full sm:w-[100px]">
            Cancel
          </Button>
          <Button className="w-full sm:w-[100px]">Send</Button>
        </>
      }
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          {/* <FormInput
                label="Message title"
                placeholder="Enter your name"
                name="institutionName"
                error={fieldError("institutionName")}
                leftIcon={<ProfileCircle />}
              /> */}
        </Form>
      </Formik>
    </Modal>
  );
};
