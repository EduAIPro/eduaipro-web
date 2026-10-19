import { Badge } from "@/components/ui/badge";
import { Accreditation } from "@/types/certificates";
import { format, isValid } from "date-fns";

type OverdueItemProps = {
  item: Accreditation;
  dueDate: Date;
  isOverdue: boolean;
};

export const OverdueItem = ({ item, dueDate, isOverdue }: OverdueItemProps) => {
  return (
    <div className="w-full flex items-center justify-between space-x-4">
      <div className="max-w-2/3">
        <h2 className="font-semibold text-base">{item.issuingBodyName}</h2>
        <p className="text-sm text-grey-500 font-medium">
          {item.certificateName}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {isOverdue && <Badge variant="destructive">Overdue</Badge>}
        <p className="text-sm font-medium text-grey-500">
          Due{" "}
          <span className="text-grey-12">
            {isValid(dueDate) ? format(dueDate, "dd/MM/yyyy") : "—"}
          </span>
        </p>
      </div>
    </div>
  );
};
