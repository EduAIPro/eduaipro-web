import Link from "next/link";
import overdueRenewals from "../../../data/overdue-renewals.json";
import { OverdueItem } from "./table";
type OverdueRenewalsProps = {};

export const OverdueRenewals = ({}: OverdueRenewalsProps) => {
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5 h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Overdue Renewals</h2>
          <Link href="/school">
            <p className="underline text-primary-300 font-medium">View all</p>
          </Link>
        </div>
        {overdueRenewals.length ? (
          overdueRenewals
            .slice(0, 6)
            .map((i) => <OverdueItem item={i} key={i.teacher} />)
        ) : (
          <div>
            <p className="text-sm text-center text-grey-500">
              There are no overdue renewals
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
