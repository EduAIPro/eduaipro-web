import { AccreditationChart } from "./chart";

type AccredicationCardProps = {};

export const AccredicationCard = ({}: AccredicationCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 pb-0 border hover:scale-[1.02] duration-300 border-grey-400 flex flex-col justify-between space-y-14">
      <div className="space-y-4">
        <p className="text-grey-500 text-base font-medium">Accreditation</p>
        <AccreditationChart />
      </div>
    </div>
  );
};
