import EmptyIcon from "@/components/svgs/school/empty-table.svg";
import { InviteSchoolModal } from "../modals/invite-school-modal";

export const Empty = () => {
  return (
    <div className="max-w-sm md:max-w-lg w-full flex items-center justify-center mx-auto min-h-[60vh]">
      <div className="">
        <div className="mx-auto w-fit">
          <EmptyIcon className="w-full h-32 mx-auto" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="font-semibold text-lg sm:text-2xl">
            Nothing here yet!
          </h2>
          <p className="w-full whitespace-normal break-words text-base font-medium text-grey-11">
            It looks like we have no schools yet. Start by inviting a school to
            manage their details and track their teachers accreditation!
          </p>
          <InviteSchoolModal />
        </div>
      </div>
    </div>
  );
};
