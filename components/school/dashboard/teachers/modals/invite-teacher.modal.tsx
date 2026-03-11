import { Link2Icon, PlusIcon } from "lucide-react";

import {
  bulkSchoolInviteKey,
  getSchoolInviteLinkKey,
  getSchoolStaffsKey,
  schoolInviteKey,
} from "@/api/keys";
import { sendInvitation, StaffInvite } from "@/api/mutations";
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
  const [staffs, setStaffs] = useState<StaffInvite[]>([]);
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

  const { trigger: triggerBulk, isMutating: isBulkInviting } = useSWRMutation(
    bulkSchoolInviteKey,
    sendInvitation,
  );

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const result = await extractCsvMetadataFromFile(file);

        const mappedStaffs: StaffInvite[] = result.data.map((row) => {
          const firstNameIndex = result.columnNames.findIndex((c) =>
            c.toLowerCase().includes("first name"),
          );
          const lastNameIndex = result.columnNames.findIndex((c) =>
            c.toLowerCase().includes("last name"),
          );
          const emailIndex = result.columnNames.findIndex((c) =>
            c.toLowerCase().includes("email"),
          );
          const phoneIndex = result.columnNames.findIndex((c) =>
            c.toLowerCase().includes("phone"),
          );
          const levelIndex = result.columnNames.findIndex((c) =>
            c.toLowerCase().includes("level"),
          );

          const fullPhone = phoneIndex !== -1 ? row[phoneIndex] : "";
          const phoneCleaned = fullPhone.replace(/[^\d+]/g, "");
          let phoneCountryCode = "234";
          let phoneNumber = phoneCleaned;

          if (phoneCleaned.startsWith("+")) {
            phoneCountryCode = phoneCleaned.substring(1, 4);
            phoneNumber = phoneCleaned.substring(4);
          } else if (phoneCleaned.length > 10) {
            phoneCountryCode = phoneCleaned.substring(0, 3);
            phoneNumber = phoneCleaned.substring(3);
          }

          return {
            firstName: firstNameIndex !== -1 ? row[firstNameIndex] : "",
            lastName: lastNameIndex !== -1 ? row[lastNameIndex] : "",
            email: emailIndex !== -1 ? row[emailIndex] : "",
            phoneCountryCode,
            phoneNumber,
            level:
              levelIndex !== -1 ? row[levelIndex]?.toUpperCase() : "PRIMARY",
          };
        });

        setStaffs(mappedStaffs);
        setStep(2);
      } catch (error) {
        toast.error("Failed to parse CSV file");
      }
    }
  }

  async function handleSendInvite() {
    try {
      if (email) {
        await trigger({ email });
        if (key) {
          mutate([key, 1]);
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

  async function handleBulkInvite() {
    try {
      await triggerBulk({ staffs });
      if (key) {
        mutate([key, 1]);
      }
      toast.success(`${staffs.length} invitations sent successfully`);
      setStaffs([]);
      setStep(1);
      setIsOpen(false);
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
            ? "Teachers Data"
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
      toggleModal={(v) => {
        setIsOpen(v);
        if (!v) {
          setStep(1);
          setStaffs([]);
        }
      }}
    >
      {step === 1 && (
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
                  <a
                    href="/templates/teacher_invite_template.csv"
                    download
                    className="underline text-primary"
                  >
                    CSV template
                  </a>
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
      )}

      {step === 2 && (
        <MapProperties
          staffs={staffs}
          onConfirm={handleBulkInvite}
          onCancel={() => setStep(1)}
          loading={isBulkInviting}
        />
      )}
    </Modal>
  );
};

const MapProperties = ({
  staffs,
  onConfirm,
  onCancel,
  loading,
}: {
  staffs: StaffInvite[];
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) => {
  return (
    <div className="space-y-6">
      <div className="max-h-[400px] overflow-auto border rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#FAFAFA] border-b sticky top-0">
            <tr>
              <th className="p-3 font-semibold text-gray-700">First Name</th>
              <th className="p-3 font-semibold text-gray-700">Last Name</th>
              <th className="p-3 font-semibold text-gray-700">Email</th>
              <th className="p-3 font-semibold text-gray-700">Phone</th>
              <th className="p-3 font-semibold text-gray-700">Level</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff, index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-gray-50/50"
              >
                <td className="p-3">{staff.firstName}</td>
                <td className="p-3">{staff.lastName}</td>
                <td className="p-3">{staff.email}</td>
                <td className="p-3">
                  +{staff.phoneCountryCode} {staff.phoneNumber}
                </td>
                <td className="p-3">
                  <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-bold uppercase tracking-wider">
                    {staff.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button onClick={onConfirm} className="flex-1" loading={loading}>
          Send {staffs.length} Invitations
        </Button>
      </div>
    </div>
  );
};
