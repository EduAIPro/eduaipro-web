import Typography from "@/components/common/ui/Typography";
import { Icon } from "iconsax-react";
import React from "react";
import { IconTree, IconType } from "react-icons";

const OverviewItem: React.FC<{
  digits?: string;
  status?: string;
  title: string;
  Icon?: Icon | IconType;
}> = ({ digits, status, title, Icon }) => {
  return (
    <div className=" relative flex flex-col gap-2 h-28 justify-between p-2 rounded-md border-2 border-brand-400 bg-[#6589ED]/10 w-full">
      <Typography.H2
        weight="semibold"
        fontColor="medium"
        size="large"
        className="max-w-[80%]"
      >
        {title}
      </Typography.H2>
      {digits ? (
        <Typography.P weight="bold" fontColor="brand" size="xlarge">
          {digits}
        </Typography.P>
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
        <div className="absolute p-2 bg-white/50 right-0 top-0 rounded-full">
          <div className=" bg-white/90 p-2 top-0 right-0 rounded-full">
            <Icon size={20} className="text-brand-1001" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewItem;
