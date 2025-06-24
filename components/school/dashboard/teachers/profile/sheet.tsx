import CertificateIcon from "@/components/svgs/school/certificate.svg";
import UserProfile from "@/components/svgs/school/profile.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Teacher } from "@/types/school";
import { Certificate } from "@/types/school/teachers";
import { format } from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { ConfirmActivateTeacherModal } from "../modals/confirm-activate-teacher.modal";
import { ConfirmDeactivateTeacherModal } from "../modals/confirm-deactivate-teacher.modal";
import { ConfirmDeleteTeacherModal } from "../modals/confirm-delete-teacher.modal";
import { CertificateSheet } from "./certificate-sheet";
import { TeacherLoading } from "./loading";

type ProfileSheetProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  teacher: Teacher | null;
  loading: boolean;
};

export const ProfileSheet = ({
  open,
  toggleOpen,
  teacher,
  loading = true,
}: ProfileSheetProps) => {
  const [selectedCert, setSelectedCert] = useState<null | Certificate>(null);

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) setSelectedCert(null);
        toggleOpen(v);
      }}
    >
      <SheetContent className="animate-fade-in-up w-full md:min-w-[60vw] xl:min-w-[40vw] p-0 overflow-y-scroll h-screen pb-6">
        <SheetHeader
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #EBEBEB 100%)",
          }}
          className="min-h-32 p-5"
        >
          <SheetTitle>
            {selectedCert ? "Certificate details" : "Teacher profile"}
          </SheetTitle>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-6 h-full">
          {loading ? (
            <TeacherLoading />
          ) : selectedCert ? (
            <CertificateSheet
              certificate={selectedCert}
              onBack={() => setSelectedCert(null)}
            />
          ) : teacher ? (
            <TeacherContent
              teacher={teacher}
              onSelectCert={(c) => setSelectedCert(c)}
            />
          ) : (
            <div className="text-center h-full flex items-center justify-center flex-col md:max-w-lg mx-auto min-h-[50vh]">
              <h2 className="font-semibold text-lg md:text-2xl text-grey-800/80">
                Ooops, an error occured
              </h2>
              <p className="font-medium text-grey-500 text-base">
                We searched far and wide but couldn't find that teachers
                details. Please try again later
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

type TeacherContentProps = {
  teacher: Teacher;
  onSelectCert: (cert: Certificate) => void;
};

const TeacherContent = ({ teacher, onSelectCert }: TeacherContentProps) => {
  const profileInfo = [
    {
      label: "Full name",
      value: teacher.name,
    },
    {
      label: "Email address",
      value: teacher.email,
    },
    {
      label: "Phone number",
      value: teacher.phoneNumber,
    },
    {
      label: "Teaching level",
      value: teacher.teachingLevel,
    },
    {
      label: "Status",
      value: teacher.approvalStatus,
    },
    {
      label: "Last login",
      value: format(new Date(), "do MMMM, yyyy"),
    },
  ];

  const personalInfo = [
    {
      label: "Date of birth",
      value: format(new Date(), "do MMMM, yyyy"),
    },
    {
      label: "Gender",
      value: "Male",
    },
  ];

  const certifications = [
    {
      name: "Certificate of completion",
      course: "Professional Development Plan",
      id: "JO8IBIU",
      timeline: {
        start: new Date(),
        end: new Date(),
      },
      progress: 67,
      issued: new Date(),
      expires: new Date(),
    },
    {
      name: "Certificate of completion",
      course: "Professional Development Plan",
      id: "JO8IBIU",
      timeline: {
        start: new Date(),
        end: new Date(),
      },
      progress: 82,
      issued: new Date(),
      expires: new Date(),
    },
    {
      name: "Certificate of completion",
      course: "Professional Development Plan",
      id: "IUHFU943",
      timeline: {
        start: new Date(),
        end: new Date(),
      },
      progress: 100,
      issued: new Date(),
      expires: new Date(),
    },
    {
      name: "Certificate of completion",
      course: "Professional Development Plan",
      id: "ONEIRN",
      timeline: {
        start: new Date(),
        end: new Date(),
      },
      progress: 14,
      issued: new Date(),
      expires: new Date(),
    },
    {
      name: "Certificate of completion",
      course: "Professional Development Plan",
      id: "IB84HAU",
      timeline: {
        start: new Date(),
        end: new Date(),
      },
      progress: 100,
      issued: new Date(),
      expires: new Date(),
    },
  ];
  return (
    <Fragment>
      <div className="space-y-4 -mt-10 animate-in">
        <div className="border-[2.5px] border-white rounded-full size-[100px] flex items-center justify-center bg-[#F6F6F6]">
          <UserProfile className="size-[72px]" />
        </div>
        <div className="flex md:items-center justify-between max-md:flex-col gap-5">
          <div>
            <h2 className="text-grey-800 font-medium text-lg">
              {teacher.name}
            </h2>
            <p className="text-sm font-medium text-grey-500">{teacher.email}</p>
          </div>
          <div className="flex items-center gap-3 max-md:w-full">
            {teacher.isActive ? (
              <ConfirmDeactivateTeacherModal />
            ) : (
              <ConfirmActivateTeacherModal teacherId={teacher._id} />
            )}
            <ConfirmDeleteTeacherModal />
          </div>
        </div>
      </div>
      <div className="pt-6 space-y-5">
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            {"Teacher's"} profile
          </h2>
          <ul className="space-y-2">
            {profileInfo.map((p) => (
              <li key={p.label} className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-grey-500">{p.label}</h3>
                <p className="text-sm font-medium text-grey-800 text-left">
                  {p.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            Personal information
          </h2>
          <ul className="space-y-2">
            {personalInfo.map((p) => (
              <li key={p.label} className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-grey-500">{p.label}</h3>
                <p className="text-sm font-medium text-grey-800 text-left">
                  {p.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            Certifications
          </h2>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c.id}>
                <button
                  className="flex w-full items-center gap-2.5 group cursor-pointer hover:bg-grey-2 py-2 px-4"
                  onClick={() => onSelectCert(c)}
                >
                  <div className="rounded-full flex items-center justify-center bg-[#F3F7FF] size-9">
                    <CertificateIcon color="#0043BE" className="size-6" />
                  </div>
                  <div className="max-md:justify-between flex items-center max-md:w-full md:gap-20">
                    <div className="md:w-[300px]">
                      <h3 className="text-sm text-grey-800/80 font-medium text-left">
                        {c.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="relative w-[220px] h-2 bg-grey-4 rounded-full">
                          <div
                            style={{ width: `${c.progress}%` }}
                            className={cn(
                              "absolute h-full rounded-full",
                              c.progress <= 50
                                ? "bg-amber-600"
                                : c.progress < 80
                                ? "bg-amber-400"
                                : "bg-green-700"
                            )}
                          ></div>
                        </div>

                        <p className="font-medium text-sm text-grey-500">
                          {c.progress}%
                        </p>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon className="size-4 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
