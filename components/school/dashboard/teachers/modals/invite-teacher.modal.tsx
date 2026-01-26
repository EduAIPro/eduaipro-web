import { Link2Icon, PlusIcon } from "lucide-react";

import { getSchoolInviteLinkKey, schoolInviteKey } from "@/api/keys";
import { sendInvitation } from "@/api/mutations";
import { generalFetcher } from "@/api/queries";
import UploadIcon from "@/components/svgs/school/upload.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { SchoolInviteToken } from "@/types/school/invites";
import { extractCsvMetadataFromFile } from "@/utils/helpers";
import { useRef, useState } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

type InviteTeacherModalProps = {
  key?: string;
};

export const InviteTeacherModal = ({ key }: InviteTeacherModalProps) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { mutate } = useSWRConfig();

  const { data, isLoading } = useSWR<SchoolInviteToken>(
    getSchoolInviteLinkKey,
    generalFetcher,
  );

  const { trigger, isMutating } = useSWRMutation(
    schoolInviteKey,
    sendInvitation,
  );

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const fields = await extractCsvMetadataFromFile(file);
    }
  }

  async function handleSendInvite() {
    try {
      if (email) {
        await trigger({ email });
        if (key) {
          mutate(key);
        }
        toast.success("Invitation email sent successfully");
        setEmail("");
        setIsOpen(false);
      } else {
        toast.error("An email is required");
      }
    } catch (error) {
      toast.error(error as string);
    }
  }
  return (
    <Modal
      open={isOpen}
      title={
        step === 1
          ? "Invite teacher"
          : step === 2
            ? "Map Properties"
            : "Import csv Summary"
      }
      trigger={
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="max-sm:w-full flex-1"
        >
          <PlusIcon strokeWidth={2} />
          <p className="font-medium">Invite teacher</p>
        </Button>
      }
      toggleModal={(v) => setIsOpen(v)}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="relative w-full">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="h-11"
              disabled={isMutating}
            />
            <Button
              size="sm"
              disabled={!email}
              loading={isMutating}
              onClick={handleSendInvite}
              className="absolute right-1 top-1 bottom-0.5 !scale-100"
            >
              Send invite
            </Button>
          </div>
          <Button
            variant="ghost"
            loading={isLoading}
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_TEACHER_SIGNUP_LINK}&token=${data?.token}`,
              );
              toast.success("Invite link copied successfully");
            }}
          >
            <div className="flex items-center gap-1 text-primary-400 hover:underline cursor-pointer">
              <Link2Icon className="-rotate-45 size-4" />
              <p className="text-sm">Copy invite link</p>
            </div>
          </Button>
        </div>
        <div>
          <p className="text-center text-grey-500 font-medium text-sm">
            or import from a file
          </p>
        </div>
        <div className="bg-[#FAFAFA] rounded-lg p-3 space-y-2">
          <h3 className="text-base font-semibold">
            Process of Uploading CSV file
          </h3>
          <ul className="text-sm list-decimal pl-4">
            <li>
              <p>
                Download{" "}
                <span className="underline text-primary">CSV template</span>
              </p>
            </li>
            <li>
              <p>
                Add teachers detail as per the guideline provided in the
                template
              </p>
            </li>
            <li>
              <p>Upload the CSV file to proceed</p>
            </li>
          </ul>
        </div>
        <div
          onClick={() => fileRef?.current?.click()}
          className="w-full border-dashed border-2 rounded-xl bg-primary-50 hover:bg-primary-100/30 hover:cursor-pointer duration-300 py-16 border-primary-400"
        >
          <div className="w-fit mx-auto space-y-2">
            <div className="w-fit mx-auto">
              <UploadIcon height={61} />
            </div>

            <div className="text-primary-400 text-base">
              <p className="text-center">
                <strong>Select a csv file to upload</strong>
                <br />
                or drag and drop it here
              </p>
            </div>
          </div>
          <Input
            accept=".csv,text/csv"
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div></div>
      </div>
    </Modal>
  );
};

const MapProperties = ({ columns }: { columns: string[] }) => {
  const filedsToMatch = ["Name", "Email", "Phone number", "Teaching level"];

  return <div className=""></div>;
};
