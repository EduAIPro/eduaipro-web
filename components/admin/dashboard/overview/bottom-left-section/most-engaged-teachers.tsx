export const MostEngagedTeachers = () => {
  return (
    <div className="school_card space-y-5">
      <p className="text-grey-500 text-base font-medium">
        Most Engaged Teachers
      </p>
      <ul className="space-y-3">
        {teachers.map((t, i) => (
          <li key={i} className="flex items-center gap-5">
            <div className="size-8 flex items-center justify-center bg-grey-400/30 rounded-full">
              <h2 className="font-semibold text-grey-500 text-base">
                0{i + 1}
              </h2>
            </div>
            <div>
              <h3 className="font-semibold text-sm">{t.name}</h3>
              <p className="font-medium text-grey-500 text-sm">{t.school}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const teachers = [
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
  {
    name: "Oliver Thompson",
    school: "Sunnydale High School",
  },
];
