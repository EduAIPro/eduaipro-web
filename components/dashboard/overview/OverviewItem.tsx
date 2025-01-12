import Typography from "@/components/common/ui/Typography";
import React from "react";

const OverviewItem: React.FC<{
  digits?: string;
  status?: string;
  title: string;
  Icon?: React.ReactNode;
}> = ({ digits, status, title, Icon }) => {
  return (
    <div className=" relative flex flex-col gap-2 h-28 justify-between p-2 rounded-md shadow-lg bg-white w-[48%] md:w-[30%]">
      <Typography.P className="max-w-[80%]">{title}</Typography.P>
      {digits ? (
        <Typography.H5 className="font-semibold text-3xl">
          {digits}
        </Typography.H5>
      ) : (
        <Typography.P
          className={`font-semibold ${
            status === "Approved"
              ? "text-success"
              : status === "In progress"
              ? "text-yellow-500"
              : "text-error"
          }`}
        >
          {status}
        </Typography.P>
      )}

      {Icon && (
        <div className="absolute p-2 right-0 top-0 rounded-md">
          <div className=" bg-brand-300 p-2 lg:p-2 top-0 right-0 rounded-md">
            {Icon}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewItem;
