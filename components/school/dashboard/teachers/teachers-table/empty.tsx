import EmptyIcon from "@/components/svgs/school/empty-table.svg";
import { InviteTeacherModal } from "../modals/invite-teacher.modal";

export const Empty = () => {
  return (
    <div className="max-w-lg w-full flex items-center justify-center mx-auto min-h-[60vh]">
      <div className="">
        <div>
          <EmptyIcon className="w-full h-32 sm:h-40" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="font-semibold text-lg sm:text-2xl">
            Nothing here yet!
          </h2>
          <p className="w-full whitespace-normal break-words text-base font-medium text-grey-11">
            It looks like you {"haven't"} added any teachers yet. Start by
            inviting a teacher to manage their details and track their
            accreditation!
          </p>
          <InviteTeacherModal />
        </div>
      </div>
    </div>
  );
};
