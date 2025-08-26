import { cn } from "@/lib/utils";

const colors = ["#F1F6FF", "#FFF7E8", "#E9FFE6", "#FFEBF9", "#FFE7EB"];

export const TopEngagingSchool = () => {
  return (
    <div className="md:col-span-2 school_card space-y-5">
      <p className="text-grey-500 text-base font-medium">Top Engaging School</p>
      <ul className="space-y-3">
        {schools.map((s, i) => (
          <li
            key={i}
            style={{
              backgroundColor: colors[i],
            }}
            className={cn(
              "w-full rounded-lg py-2.5 px-4 flex items-center justify-between"
            )}
          >
            <div className="flex items-center gap-5">
              <p className="text-grey-500 text-lg font-semibold">0{i + 1}</p>
              <h2 className="text-base font-semibold text-grey-800">
                {s.name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-primary font-medium">{s.score}%</p>
              <p className="text-grey-500 text-sm">Engagement score</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const schools = [
  {
    name: "Sunnydale High School",
    score: 95,
  },
  {
    name: "Riverdale Institute",
    score: 88,
  },
  {
    name: "Westview Academy",
    score: 72,
  },
  {
    name: "Maplewood School",
    score: 67,
  },
  {
    name: "Brookstone College",
    score: 54,
  },
];
