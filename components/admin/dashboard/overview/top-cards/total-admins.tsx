import { StaffActivity } from "@/types/school";
// import { useMemo } from "react";

type TotalAdminsCardProps = {
  staffActivity?: StaffActivity | undefined;
};

export const TotalAdminsCard = ({ staffActivity }: TotalAdminsCardProps) => {
  //   const totalStaff = useMemo(() => {
  //     if (staffActivity) {
  //       return (
  //         staffActivity.totalActiveStaffs + staffActivity.totalInactiveStaffs
  //       );
  //     } else {
  //       return 0;
  //     }
  //   }, [staffActivity]);
  //   const percentage = useMemo(() => {
  //     if (totalStaff) {
  //       const percentActive = (
  //         (staffActivity!.totalActiveStaffs / totalStaff) *
  //         100
  //       ).toFixed(0);
  //       const percentInactive = 100 - Number(percentActive);
  //       return { percentActive, percentInactive };
  //     } else {
  //       return { percentInactive: 50, percentActive: 50 };
  //     }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [totalStaff]);
  return (
    <div className="school_card flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">Total Admins</p>
        <h2 className="text-2xl font-semibold">34</h2>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 justify-between">
          <div
            style={{ width: "40%" }}
            // style={{ width: `${percentage.percentActive}%` }}
            className="rounded-full h-1.5 bg-purple-800"
          ></div>
          <div
            style={{ width: "60%" }}
            // style={{ width: `${percentage.percentInactive}%` }}
            className="rounded-full h-1.5 bg-purple-600"
          ></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-purple-800"></div>
            <p>2 active</p>
            {/* <p>{staffActivity?.totalActiveStaffs ?? 0} active</p> */}
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-purple-600"></div>
            <p>32 inactive</p>
            {/* <p>{staffActivity?.totalInactiveStaffs ?? 0} inactive</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
