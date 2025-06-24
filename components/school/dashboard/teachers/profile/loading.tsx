import UserProfile from "@/components/svgs/school/profile.svg";
import { Skeleton } from "@/components/ui/skeleton";

export const TeacherLoading = () => {
  return (
    <div>
      <div className="space-y-4 -mt-10 animate-in">
        <div className="border-[2.5px] border-white rounded-full size-[100px] flex items-center justify-center bg-[#F6F6F6]">
          <UserProfile className="size-[72px]" />
        </div>
        <div className="flex md:items-center justify-between max-md:flex-col gap-5">
          <div className="space-y-2">
            <Skeleton className="w-32 h-3" />
            <Skeleton className="w-20 h-3" />
          </div>
          <div className="flex items-center gap-3 max-md:w-full">
            <Skeleton className="w-[100px] h-9 rounded-lg" />

            <Skeleton className="w-[100px] h-9 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="pt-6 space-y-5">
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            {"Teacher's"} profile
          </h2>
          <ul className="space-y-3">
            {new Array(6).fill("").map((p, i) => (
              <li
                key={i + 999}
                className="flex items-center justify-between gap-5"
              >
                <Skeleton className="w-1/3 h-3.5" />
                <Skeleton className="w-2/3 h-3.5" />
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            Personal information
          </h2>
          <ul className="space-y-3">
            {new Array(2).fill("").map((p, i) => (
              <li
                key={i + 9}
                className="flex items-center justify-between gap-5"
              >
                <Skeleton className="w-1/3 h-3.5" />
                <Skeleton className="w-2/3 h-3.5" />
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-grey-800 text-base font-medium">
            Certifications
          </h2>
          <ul className="space-y-2">
            {new Array(4).fill("").map((c, i) => (
              <li key={i}>
                <div className="flex w-full items-center gap-2.5 group cursor-pointer">
                  <Skeleton className="rounded-full flex items-center justify-center bg-[#F3F7FF] size-9"></Skeleton>
                  <div className="max-md:justify-between flex items-center max-md:w-full md:gap-20">
                    <div className="md:w-[300px] space-y-3">
                      <Skeleton className="w-2/3 h-3.5" />
                      <Skeleton className="w-full h-3.5" />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
