import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { rosterStats } from "@/lib/school-roster";

type Stats = ReturnType<typeof rosterStats>;

const StatCard = ({
  label,
  value,
  note,
  warn,
}: {
  label: string;
  value: number;
  note: string;
  warn?: boolean;
}) => (
  <Card className="p-3.5">
    <p className="text-[11px] font-medium text-grey-500">{label}</p>
    <p className={cn("mt-1 text-2xl font-bold", warn ? "text-amber-700" : "text-grey-800")}>
      {value}
    </p>
    <p className="mt-0.5 text-[10.5px] text-grey-500">{note}</p>
  </Card>
);

export const RosterStatCards = ({ stats }: { stats: Stats }) => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <StatCard label="Teachers" value={stats.teachers} note="on your roster" />
    <StatCard
      label="Enrolments"
      value={stats.enrolments}
      note={`${stats.multi} on more than one`}
    />
    <StatCard
      label="Certificates issued"
      value={stats.certificates}
      note="across all pathways"
    />
    <StatCard
      label="Expiring in 90 days"
      value={stats.renewals.length}
      note="needs a refresher"
      warn={stats.renewals.length > 0}
    />
  </div>
);
