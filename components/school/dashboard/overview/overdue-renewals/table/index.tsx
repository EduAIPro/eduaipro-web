import { Accreditation } from "@/types/certificates";
import { format } from "date-fns";

type OverdueItemProps = {
  item: Accreditation;
};

export const OverdueItem = ({ item }: OverdueItemProps) => {
  return (
    <div className="w-full flex items-center justify-between space-x-4">
      <div className="max-w-2/3">
        <h2 className="font-semibold text-base">{item.issuingBodyName}</h2>
        <p className="text-sm text-grey-500 font-medium">
          {item.certificateName}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-grey-500">
          Due
          <span className="text-grey-12 pl-1">
            {format(item.expiresAt, "dd/MM/yyy")}
          </span>
        </p>
      </div>
    </div>
  );
};
