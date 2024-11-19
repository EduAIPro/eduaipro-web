import React, { ReactNode } from "react";
import Typography from "../common/ui/Typography";
import { Icon } from "iconsax-react";

export default function ModalTitleAndDesc({
  Icon,
  title,
  description,
}: {
  title: string;
  description: string;
  Icon: Icon;
}) {
  return (
    <div className="border-b pb-3 border-b-grey-3">
      <div className="p-2 w-fit rounded-full bg-blue-300/10">
        <div className="p-2 w-fit rounded-full bg-blue-500/10">
          <Icon size={25} color="#3e3e3e" />
        </div>
      </div>
      <div>
        <Typography.H3 weight="semibold" size="large">
          {title}
        </Typography.H3>
        <Typography.P>{description}</Typography.P>
      </div>
    </div>
  );
}
