import { format } from "date-fns";
import { Calendar } from "iconsax-react";
import { Clock } from "lucide-react";

type EventInfoItemProps = {
  event: {
    title: string;
    description: string;
    date: string;
    time?: string;
  };
};

export const EventInfoItem = ({ event }: EventInfoItemProps) => {
  return (
    <div className="space-y-1">
      <div>
        <h2 className="text-base font-semibold">{event.title}</h2>
        <p className="font-medium text-sm">{event.description}</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-1 items-center">
          <Calendar className="size-4 text-[#656565]" />
          <p className="text-grey-500">{event.date}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Clock className="size-4 text-[#656565]" />
          <p className="text-grey-500">{format(new Date(), "HH:mm a")}</p>
        </div>
      </div>
    </div>
  );
};
