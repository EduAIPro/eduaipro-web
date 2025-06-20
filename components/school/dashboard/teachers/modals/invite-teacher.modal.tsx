import { Link2Icon, PlusIcon } from "lucide-react";

import UploadIcon from "@/components/svgs/school/upload.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { extractCsvMetadataFromFile } from "@/utils/helpers";
import { useRef, useState } from "react";

type InviteTeacherModalProps = {};

export const InviteTeacherModal = ({}: InviteTeacherModalProps) => {
  const [step, setStep] = useState(1);
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      console.log({ file });
      const fields = await extractCsvMetadataFromFile(file);
      console.log({ fields });
    }
  }
  return (
    <Modal
      title={
        step === 1
          ? "Invite teacher"
          : step === 2
          ? "Map Properties"
          : "Import csv Summary"
      }
      trigger={
        <Button>
          <PlusIcon strokeWidth={2} />
          <p className="font-medium">Invite teacher</p>
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="relative w-full">
            <Input placeholder="Enter email address" className="h-11" />
            <Button
              size="sm"
              className="absolute right-1 top-1 bottom-0.5 !scale-100"
            >
              Send invite
            </Button>
          </div>
          <div className="flex items-center gap-1 text-primary-400 hover:underline cursor-pointer">
            <Link2Icon className="-rotate-45 size-4" />
            <p className="text-sm">Copy invite link</p>
          </div>
        </div>
        <div>
          <p className="text-center text-grey-500 font-medium text-sm">
            or import from a file
          </p>
        </div>
        <div
          onClick={() => fileRef?.current?.click()}
          className="w-full border-dashed border-2 rounded-xl bg-primary-50 hover:bg-primary-100/30 hover:cursor-pointer duration-300 py-16 border-primary-400"
        >
          <div className="w-fit mx-auto space-y-2">
            <UploadIcon width="100%" height={61} />
            <div className="text-primary-400">
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
