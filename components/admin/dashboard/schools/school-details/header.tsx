import {
  ConfirmDeactivateSchoolModal,
  ConfirmDeleteSchoolModal,
} from "@/components/admin/dashboard/schools/modals";
import UserProfile from "@/components/svgs/school/profile.svg";

export const SchoolDetailsHeader = () => {
  return (
    <div className="space-y-4 -mt-12 flex items-end justify-between">
      <div className="flex items-end gap-4">
        <div className="border-[2.5px] border-white rounded-full size-[100px] flex items-center justify-center bg-[#F6F6F6]">
          <UserProfile className="size-[72px]" />
        </div>
        <div>
          <h2 className="text-grey-800 font-medium text-lg">
            Sunnydale High School
          </h2>
          <p className="text-sm font-medium text-grey-500">
            Last updated: 04:00 PM WAT, 05/31/2025
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 max-md:w-full">
        {/* {staff.isActive ? ( */}
        <ConfirmDeactivateSchoolModal schoolId="jenrte" />
        {/* ) : (
        <ConfirmActivateTeacherModal staffId={staff.id} />
      )} */}
        <ConfirmDeleteSchoolModal />
      </div>
    </div>
  );
};
