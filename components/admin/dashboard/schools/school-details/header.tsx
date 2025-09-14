import {
  ConfirmActivateSchoolModal,
  ConfirmDeactivateSchoolModal,
  ConfirmDeleteSchoolModal,
} from "@/components/admin/dashboard/schools/modals";
import UserProfile from "@/components/svgs/school/profile.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { RetrieveSchoolDetails } from "@/types/admin/schools";
import { format } from "date-fns";

type SchoolDetailsProps = {
  isLoading: boolean;
  data: RetrieveSchoolDetails | undefined;
  refetch: VoidFunction;
};

export const SchoolDetailsHeader = ({
  isLoading,
  data,
  refetch,
}: SchoolDetailsProps) => {
  return (
    <div className="space-y-4 -mt-8 flex lg:items-end justify-between max-lg:flex-col">
      <div className="flex items-end gap-4">
        <div className="border-[2.5px] shrink-0 border-white rounded-full size-[100px] flex items-center justify-center bg-[#F6F6F6]">
          <UserProfile className="size-[72px]" />
        </div>
        <div>
          {isLoading ? (
            <>
              <Skeleton className="w-3/4 h-4 rounded-lg mb-3" />
              <Skeleton className="w-1/2 h-3 rounded-lg" />
            </>
          ) : (
            <>
              <h2 className="text-grey-800 font-medium text-lg">
                {data?.institutionName}
              </h2>
              <p className="text-sm font-medium text-grey-500">
                Last updated:{" "}
                {format(
                  data?.updatedAt ?? (new Date() as any),
                  "HH:mm a, dd/mm/yyyy"
                )}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 max-md:w-full">
        {isLoading ? (
          <Skeleton className="rounded-lg w-40 h-9" />
        ) : data ? (
          data?.isActive ? (
            <ConfirmDeactivateSchoolModal
              schoolId={data.id}
              refetch={refetch}
            />
          ) : (
            <ConfirmActivateSchoolModal schoolId={data.id} refetch={refetch} />
          )
        ) : null}
        <ConfirmDeleteSchoolModal />
      </div>
    </div>
  );
};
