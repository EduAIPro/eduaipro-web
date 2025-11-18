import { TeacherLoading } from "@/components/school/dashboard/teachers/profile/loading";
import UserProfile from "@/components/svgs/school/profile.svg";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StaffDetail } from "@/types/school/teachers";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import {
  ConfirmActivateAdminModal,
  ConfirmDeactivateAdminModal,
} from "../modals";

type ProfileSheetProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  staff: StaffDetail | undefined;
  loading: boolean;
};

export const ProfileSheet = ({
  open,
  toggleOpen,
  staff,
  loading = true,
}: ProfileSheetProps) => {
  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
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
          <SheetTitle>Admin profile</SheetTitle>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-6 h-full">
          {loading ? (
            <TeacherLoading isAdmin />
          ) : staff ? (
            <AdminContent staff={staff} />
          ) : (
            <div className="text-center h-full flex items-center justify-center flex-col md:max-w-lg mx-auto min-h-[50vh]">
              <h2 className="font-semibold text-lg md:text-2xl text-grey-800/80">
                Ooops, an error occured
              </h2>
              <p className="font-medium text-grey-500 text-base">
                We searched far and wide but {"couldn't"} find that {"admin's"}
                details. Please try again later
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

type AdminContentProps = {
  staff: StaffDetail;
};

const AdminContent = ({ staff }: AdminContentProps) => {
  const { user, positionDescription, school, schoolId } = staff;
  const staffName = user.firstName + " " + user.lastName;
  const router = useRouter();

  const profileInfo = [
    {
      label: "Admin name",
      value: staffName,
    },
    {
      label: "Email address",
      value: user.email,
    },
    {
      label: "Phone number",
      value: user.phoneNumber,
    },
    {
      label: "Position",
      value: positionDescription ?? "",
    },
    {
      label: "Status",
      value: staff?.isActive ? "Active" : "Inactive",
    },
  ];

  const schoolInfo = [
    {
      label: "Institution name",
      value: school?.institutionName,
    },
    {
      label: "State",
      value: school?.state,
    },
    {
      label: "City",
      value: school?.city,
    },
    {
      label: "Address",
      value: school?.streetAddress,
    },
    {
      label: "Contact email",
      value: school?.contactEmail,
    },
    {
      label: "Contact phone",
      value: school?.contactPhoneCountryCode ?? "" + school?.contactPhoneNumber,
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
            <h2 className="text-grey-800 font-medium text-lg">{staffName}</h2>
            <p className="text-sm font-medium text-grey-500">{user.email}</p>
          </div>
          <div className="flex items-center gap-3 max-md:w-full">
            {staff.isActive ? (
              <ConfirmDeactivateAdminModal
                schoolId={staff.schoolId}
                staffId={staff.id}
              />
            ) : (
              <ConfirmActivateAdminModal
                schoolId={staff.schoolId}
                staffId={staff.id}
              />
            )}
          </div>
        </div>
      </div>
      <div className="pt-6 space-y-5">
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">Admin profile</h2>
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
            School information
          </h2>
          <ul className="space-y-2">
            {schoolInfo.map((p) => (
              <li key={p.label} className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-grey-500">{p.label}</h3>
                <p className="text-sm font-medium text-grey-800 text-left">
                  {p.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end">
          <Button
            onClick={() => router.push(`/admin/schools/${schoolId}`)}
            variant="ghost"
          >
            <p className="text-primary underline">View school profile</p>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
