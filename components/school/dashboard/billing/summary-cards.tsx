import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SchoolSeatsData } from "@/types/school/billing";
import { format } from "date-fns";

const Stat = ({ label, value }: { label: string; value: number }) => (
  <Card className="p-3.5">
    <p className="text-[11px] font-medium text-grey-500">{label}</p>
    <p className="mt-1 text-2xl font-bold text-grey-800">{value}</p>
  </Card>
);

export const SummaryCards = ({
  data,
  onBuy,
}: {
  data: SchoolSeatsData;
  onBuy: () => void;
}) => {
  const empty = data.purchased === 0;
  return (
    <div className="space-y-3">
      {empty ? (
        <Card className="flex flex-col items-center gap-3 p-8 text-center">
          <h3 className="text-base font-semibold text-grey-800">No seats yet</h3>
          <p className="max-w-sm text-sm text-grey-500">
            Buy seats to cover your teachers’ certificates. Course content stays
            free for everyone.
          </p>
          <Button onClick={onBuy}>Buy seats</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Purchased" value={data.purchased} />
          <Stat label="Assigned" value={data.assigned} />
          <Stat label="Consumed" value={data.consumed} />
          <Stat label="Available" value={data.available} />
        </div>
      )}
      {data.term ? (
        <p className="text-xs text-grey-500">
          Term: {format(new Date(data.term.startsAt), "dd MMM yyyy")} →{" "}
          {format(new Date(data.term.endsAt), "dd MMM yyyy")}
        </p>
      ) : null}
    </div>
  );
};
