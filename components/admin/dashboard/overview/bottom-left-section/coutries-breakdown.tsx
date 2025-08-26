import { cn } from "@/lib/utils";

export const CountriesBreakdown = () => {
  return (
    <div className="school_card space-y-5">
      <p className="text-grey-500 text-base font-medium">Countries breakdown</p>
      <ul className="space-y-3">
        {countries.map((c, i) => (
          <li key={i}>
            <p className="font-medium text-grey-800">{c.name}</p>
            <div className="flex items-center justify-between gap-3">
              <div className="relative w-[220px] h-2 bg-grey-400/40 rounded-full">
                <div
                  style={{
                    width: `${c.percentage}%`,
                  }}
                  className={cn("absolute h-full rounded-full bg-success-600")}
                ></div>
              </div>
              <h3 className="font-semibold text-grey-500">{c.percentage}%</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const countries = [
  {
    name: "Nigeria",
    percentage: 60,
  },
  {
    name: "United Kingdom",
    percentage: 10,
  },
  {
    name: "United States",
    percentage: 10,
  },
  {
    name: "Ukraine",
    percentage: 15,
  },
  {
    name: "Russia",
    percentage: 5,
  },
];
